// ビルド出力(dist)のHTML内の画像参照を WebP に書き換える（postbuildで自動実行）。
// - <img src="...images/x.png"> と CSS url(...images/x.png) を .webp に置換
// - <meta og:image> / <link rel=icon>（content= / href=）は対象外＝png/jpgのまま（SNS共有・favicon互換のため）
// - 置換後、参照されなくなった元画像(png/jpg)は dist から削除（FTPアップロードを軽量化）
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, unlinkSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";

function htmlFiles(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...htmlFiles(p));
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}

const htmls = htmlFiles(DIST);
let updated = 0;
for (const file of htmls) {
  let html = readFileSync(file, "utf8");
  const before = html;
  html = html.replace(/(src=["'][^"']*?\/images\/[^"']+?)\.(png|jpe?g)(["'])/gi, "$1.webp$3");
  html = html.replace(/(url\((["']?)[^)"']*?\/images\/[^)"']+?)\.(png|jpe?g)/gi, "$1.webp");
  if (html !== before) {
    writeFileSync(file, html);
    updated++;
  }
}

// 最終HTMLでまだ参照されている png/jpg を集める（og:image・favicon等は残す）
const referenced = new Set();
for (const file of htmls) {
  const html = readFileSync(file, "utf8");
  for (const m of html.matchAll(/\/images\/([^"')]+?\.(?:png|jpe?g))/gi)) referenced.add(m[1]);
}

// 参照されておらず webp 代替がある元画像を削除
let removed = 0,
  freed = 0;
const imgDir = join(DIST, "images");
if (existsSync(imgDir)) {
  for (const f of readdirSync(imgDir)) {
    if (!/\.(png|jpe?g)$/i.test(f)) continue;
    const webp = f.replace(/\.(png|jpe?g)$/i, ".webp");
    if (existsSync(join(imgDir, webp)) && !referenced.has(f)) {
      const sz = statSync(join(imgDir, f)).size;
      unlinkSync(join(imgDir, f));
      removed++;
      freed += sz;
    }
  }
}

console.log(
  `[webp] HTML updated: ${updated} file(s); removed ${removed} unused original(s)` +
    (freed ? `, freed ${(freed / 1024 / 1024).toFixed(1)}MB from dist` : "")
);
