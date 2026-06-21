import membersData from "../data/members.json";
import kotobaData from "../data/kotoba.json";

export type Member = {
  name: string;
  roleCard: string;   // カード（グリッド）に出す英語表記 例: "Director / Actor"
  roleDetail: string; // 詳細モーダルに出す日本語表記 例: "(監督/企画/出演)"
  photo?: string;
  body?: string;
};

export type Kotoba = {
  name: string;
  role: string; // 例: "（映画評論家）"
  photo?: string;
  body?: string;
};

/** 写真未指定時のデフォルト画像 */
export const DEFAULT_PERSON_PHOTO = "/images/63e4ec37dcc1d366edcc53ce9a5ae7d1dc8009b3.png";

export const members: Member[] = membersData.items as Member[];
export const kotobaItems: Kotoba[] = kotobaData.items as Kotoba[];

/** 本文を空行で段落分割 */
export function paragraphs(body?: string): string[] {
  return (body ?? "")
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}
