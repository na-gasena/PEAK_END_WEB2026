import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://peakend.org/',
  // 配置パス。さくら等のルート公開は '/'。GitHub Pages のみサブディレクトリ。
  // CI では SITE_BASE 環境変数で明示できる（さくら向けワークフローは '/' を渡す）。
  base: process.env.SITE_BASE || (process.env.GITHUB_ACTIONS ? '/PEAK_END_WEB2026/' : '/'),
  vite: {
    plugins: [tailwindcss()],
  },
});
