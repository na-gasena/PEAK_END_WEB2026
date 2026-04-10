const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 393, height: 900 });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  const data = await page.evaluate(() => {
    const about = document.querySelector('[data-name="About"]');
    const aboutRect = about.getBoundingClientRect();
    const aboutTop = aboutRect.top + window.scrollY;

    // TEXT-ABOUT内のキャラクター画像
    const rin = about.querySelector('[data-name="TEXT-ABOUT"] div:nth-child(4)');
    const sola = about.querySelector('[data-name="TEXT-ABOUT"] div:nth-child(5)');
    // 本文テキスト (2157:862)
    const bodyText = about.querySelector('[data-node-id="2157:862"]');

    const getInfo = (el, label) => {
      if (!el) return { label, error: 'not found' };
      const r = el.getBoundingClientRect();
      return {
        label,
        top: r.top + window.scrollY - aboutTop,
        bottom: r.bottom + window.scrollY - aboutTop,
        height: r.height
      };
    };

    return {
      aboutHeight: aboutRect.height,
      rin: getInfo(rin, 'Rin'),
      sola: getInfo(sola, 'Sola'),
      bodyText: getInfo(bodyText, 'BodyText'),
    };
  });

  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})();
