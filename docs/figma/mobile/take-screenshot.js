const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 393, height: 848 });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));
  const selector = '[data-name="About"]';
  const about = await page.$(selector);
  if (about) {
    await about.scrollIntoView();
    await new Promise(r => setTimeout(r, 300));
    await about.screenshot({ path: 'docs/figma/mobile/screenshot-about.png' });
    console.log('Screenshot saved: docs/figma/mobile/screenshot-about.png');
  } else {
    console.log('About section not found, saving full page');
    await page.screenshot({ path: 'docs/figma/mobile/screenshot-full.png', fullPage: true });
  }
  await browser.close();
})();
