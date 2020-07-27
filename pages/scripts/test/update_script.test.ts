
import { routes } from '../../../constants/routes';
import { getTokenAdmin } from '../../../helpers/get_token';
import { Viewport } from '../../../constants/view_port';

let browser;
let page;
let token;
let viewport;

const puppeteer = require('puppeteer');
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
    slowMo: 200,
    ignoreDefaultArgs: ['--no-sandbox'],
  });
  token = await getTokenAdmin();
  page = await browser.newPage();
  viewport = await page.setViewport(Viewport);

});

describe('Post Page', () => {
  test('Test update script failed', async () => {
    await page.goto(`${routes.private.scripts}?token=${token}`);
    await page.waitFor(3000);
    await page.waitForSelector('.list-item');
    await page.tap('.list-item');
    await page.tap('.script__edit');
    await page.waitFor(3000);
    await page.click('.script__body', { clickCount: 3, delay: 400 });
    await page.waitFor(3000);
    await page.keyboard.press('Backspace');
    await page.tap('.updatePost');
    await page.waitForSelector('.success');
    const html = await page.$eval('.success', (e) => e.innerHTML);
    expect(html).toBe('Cập nhật thất bại');

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();

  });

  test('Test update script success', async () => {
    await page.goto(`${routes.private.scripts}?token=${token}`);
    await page.waitFor(3000);
    await page.waitForSelector('.list-item');
    await page.tap('.list-item');
    await page.tap('.script__edit');
    await page.click('.script__body', { clickCount: 3, delay: 200 });
    await page.type('.script__body', 'Test scripts');
    await page.tap('.updatePost');
    await page.waitForSelector('.success');
    const html = await page.$eval('.success', (e) => e.innerHTML);
    expect(html).toBe('Cập nhật thành công');

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();

  });
});

afterAll(() => {
  browser.close();
});
