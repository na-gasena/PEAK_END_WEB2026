// public/images 内の png/jpg を WebP に変換（リサイズ付き）。
// 既に最新の .webp があるものはスキップ。ビルド前(prebuild)に自動実行される。
import { readdirSync, statSync, existsSync } from "node:fs";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const DIR = "public/images";
const MAX = 1600;     // 長辺の最大px（これ以上は縮小。元が小さければそのまま）
const QUALITY = 80;   // WebP品質

const files = readdirSync(DIR);
let converted = 0,
  skipped = 0,
  srcBytes = 0,
  outBytes = 0;

for (const f of files) {
  const ext = extname(f).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;

  const src = join(DIR, f);
  const dest = join(DIR, basename(f, ext) + ".webp");
  try {
    const s = statSync(src);
    // 変換済みかつ元画像より新しい webp があればスキップ
    if (existsSync(dest) && statSync(dest).mtimeMs >= s.mtimeMs) {
      skipped++;
      continue;
    }
    await sharp(src)
      .rotate() // EXIF の向きを反映（スマホ写真の回転対策）
      .resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(dest);

    const d = statSync(dest);
    srcBytes += s.size;
    outBytes += d.size;
    converted++;
    console.log(`  ${f}: ${(s.size / 1024).toFixed(0)}KB -> ${(d.size / 1024).toFixed(0)}KB (.webp)`);
  } catch (e) {
    console.warn(`  ! skip ${f}: ${e.message}`);
  }
}

console.log(
  `[webp] converted ${converted}, skipped ${skipped}` +
    (converted ? `, ${(srcBytes / 1024 / 1024).toFixed(1)}MB -> ${(outBytes / 1024 / 1024).toFixed(1)}MB` : "")
);
