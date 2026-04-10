const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 393, height: 960 });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  // Kotoba先頭付近を element screenshot
  const kotobaEl = await page.$('[data-name="iPhone 16 - kotoba"]');
  await kotobaEl.scrollIntoView({ block: 'start' });
  await new Promise(r => setTimeout(r, 400));
  // viewportのスクリーンショット（境界が見える）
  await page.screenshot({ path: 'docs/figma/mobile/screenshot-boundary.png' });
  console.log('boundary saved');

  // About全体
  const about = await page.$('[data-name="About"]');
  await about.scrollIntoView();
  await new Promise(r => setTimeout(r, 300));
  await about.screenshot({ path: 'docs/figma/mobile/screenshot-about.png' });
  console.log('about saved');

  await browser.close();
})();
