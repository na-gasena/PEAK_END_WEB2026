import { defineConfig } from "tinacms";

// ローカル / オンライン 両対応の設定。
// ・ローカル: `npm run cms`（tinacms dev）は常にローカルモード。下記の env が無くても
//   http://localhost:4321/admin から編集でき、src/data/*.json に直接保存される。
// ・オンライン: GitHub Actions の `tinacms build` 時に下記 env（TinaCloudの認証情報）が
//   注入され、TinaCloud 経由で認証＋GitHubへコミットする本番用の管理画面が作られる。
const branch =
  process.env.TINA_BRANCH ||
  process.env.GITHUB_REF_NAME || // GitHub Actions が現在のブランチ名を入れる
  "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_PUBLIC_CLIENT_ID || "", // TinaCloudのClient ID（公開値）
  token: process.env.TINA_TOKEN || "",               // TinaCloudのRead Token（秘匿値）

  build: {
    outputFolder: "admin", // public/admin に管理画面を出力 → /admin でアクセス
    publicFolder: "public",
  },

  // 画像のアップロード先（既存の public/images をそのまま利用）
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "news",
        label: "News（お知らせ）",
        path: "src/data",
        format: "json",
        match: { include: "news" }, // src/data/news.json のみ対象
        // 単一ファイルなので新規作成・削除は無効化
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "object",
            name: "items",
            label: "お知らせ項目",
            list: true,
            ui: {
              // 一覧での各項目の見出しに本文を表示
              itemProps: (item) => ({ label: item?.title || "（新規項目）" }),
            },
            fields: [
              {
                type: "datetime",
                name: "date",
                label: "日付",
                ui: { dateFormat: "YYYY-MM-DD" },
              },
              {
                type: "string",
                name: "title",
                label: "見出し（一覧・吹き出しに表示）",
              },
              {
                type: "image",
                name: "thumbnail",
                label: "サムネイル画像（任意・未指定ならデフォルト画像）",
              },
              {
                type: "rich-text",
                name: "body",
                label: "本文（任意・画像/リンク/装飾OK。入力すると詳細ページが開けます）",
              },
            ],
          },
        ],
      },
      {
        name: "theaters",
        label: "THEATERS（上映劇場）",
        path: "src/data",
        format: "json",
        match: { include: "theaters" }, // src/data/theaters.json のみ対象
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "object",
            name: "items",
            label: "劇場",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.name ? `${item?.region ?? ""} ${item.name}` : "（新規劇場）",
              }),
            },
            fields: [
              {
                type: "string",
                name: "region",
                label: "地域（例: 東京都）",
              },
              {
                type: "string",
                name: "name",
                label: "劇場名",
              },
              {
                type: "string",
                name: "date",
                label: "公開日（例: 2026.6.13 / 近日発表 など自由入力）",
              },
              {
                type: "string",
                name: "url",
                label: "劇場サイトのURL（任意・入力すると劇場名がリンクになります）",
              },
            ],
          },
        ],
      },
      {
        name: "members",
        label: "MEMBERS（メンバー）",
        path: "src/data",
        format: "json",
        match: { include: "members" },
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "object",
            name: "items",
            label: "メンバー",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.name || "（新規メンバー）" }),
            },
            fields: [
              { type: "string", name: "name", label: "名前" },
              {
                type: "string",
                name: "roleCard",
                label: "肩書き・カード表示（例: Director / Actor）",
              },
              {
                type: "string",
                name: "roleDetail",
                label: "肩書き・詳細表示（例: (監督/企画/出演)）",
              },
              {
                type: "image",
                name: "photo",
                label: "顔写真（未指定ならデフォルト画像）",
              },
              {
                type: "string",
                name: "body",
                label: "プロフィール本文",
                ui: { component: "textarea" },
              },
            ],
          },
        ],
      },
      {
        name: "kotoba",
        label: "KOTOBA（コメント）",
        path: "src/data",
        format: "json",
        match: { include: "kotoba" },
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "object",
            name: "items",
            label: "コメント",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.name || "（新規コメント）" }),
            },
            fields: [
              { type: "string", name: "name", label: "お名前" },
              {
                type: "string",
                name: "role",
                label: "肩書き（例: （映画評論家））",
              },
              {
                type: "image",
                name: "photo",
                label: "顔写真（未指定ならデフォルト画像）",
              },
              {
                type: "string",
                name: "body",
                label: "コメント本文（カードには最初の段落が抜粋表示されます）",
                ui: { component: "textarea" },
              },
            ],
          },
        ],
      },
      {
        name: "sns",
        label: "SNS（リンク）",
        path: "src/data",
        format: "json",
        match: { include: "sns" },
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "object",
            name: "items",
            label: "SNSリンク",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.label || "（新規リンク）" }),
            },
            fields: [
              { type: "string", name: "label", label: "名称（例: Instagram）" },
              { type: "string", name: "href", label: "リンクURL" },
              {
                type: "image",
                name: "icon",
                label: "アイコン画像",
              },
            ],
          },
        ],
      },
      {
        name: "trailer",
        label: "TRAILER（予告編）",
        path: "src/data",
        format: "json",
        match: { include: "trailer" },
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "string",
            name: "youtubeUrl",
            label: "YouTube URL（動画ページのURLを貼り付け）",
          },
        ],
      },
    ],
  },
});
