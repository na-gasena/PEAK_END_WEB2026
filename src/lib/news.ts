import news from "../data/news.json";
import { marked } from "marked";

export type NewsItem = {
  date: string; // "YYYY-MM-DD"（Tinaの日付ピッカーが書き込む）
  title: string;
  thumbnail?: string;
  body?: string; // TinaCMS リッチテキスト = Markdown文字列（画像/リンク/装飾OK）
};

/**
 * 本文(Markdown)をHTMLに変換する。
 * サイト内画像パス(/images/...)は base 付きに正規化する。
 */
export function renderBody(body?: string, base = "/"): string {
  if (!body || !body.trim()) return "";
  const html = marked.parse(body, { async: false, breaks: true }) as string;
  return html.replaceAll('src="/images/', `src="${base}images/`);
}

/** サムネイル未指定時に使うデフォルト画像（リニューアル告知などで使用） */
export const DEFAULT_THUMBNAIL = "/images/63e4ec37dcc1d366edcc53ce9a5ae7d1dc8009b3.png";

/** 項目のサムネイル。指定が無ければデフォルトを返す。 */
export function thumbnailOf(item: NewsItem): string {
  const t = item.thumbnail?.trim();
  return t ? t : DEFAULT_THUMBNAIL;
}

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

/**
 * "2026-04-13" → "2026年4月13日(月)" に整形。
 * タイムゾーンによる日付ズレを避けるため、文字列の先頭 YYYY-MM-DD を直接解釈する。
 */
export function formatDate(value: string | undefined): string {
  if (!value) return "";
  const m = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return value; // 想定外の形式はそのまま表示
  const [, ys, ms, ds] = m;
  const y = Number(ys), mo = Number(ms), d = Number(ds);
  const wd = WEEKDAYS[new Date(y, mo - 1, d).getDay()];
  return `${y}年${mo}月${d}日(${wd})`;
}

/** クリックで詳細を開ける項目か（本文があるか） */
export function hasDetail(item: NewsItem): boolean {
  return !!(item.body && item.body.trim());
}

/** 日付の新しい順（安定ソート: 同日は入力順を保持） */
export const newsItems: NewsItem[] = [...(news.items as NewsItem[])].sort((a, b) =>
  a.date < b.date ? 1 : a.date > b.date ? -1 : 0
);

/** トップページに表示する最大件数 */
export const MAX_TOP_NEWS = 3;
