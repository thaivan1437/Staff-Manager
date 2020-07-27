
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
    slowMo: 30,
    ignoreDefaultArgs: ['--no-sandbox'],
  });
  token = await getTokenAdmin();
  page = await browser.newPage();
  viewport = await page.setViewport(Viewport);

});

describe('Post Page', () => {
  test('Test delete script success', async () => {
    await page.goto(`${routes.private.scripts}?token=${token}`);
    await page.waitFor(3000);
    await page.waitForSelector('.list-item');
    await page.tap('.list-item');
    await page.tap('.script__delete');
    await page.waitForSelector('.title--delete');
    await page.tap('.confirmDeletePost');
    await page.waitFor(3000);
    await page.waitForSelector('.success');
    const html = await page.$eval('.success', (e) => e.innerHTML);
    expect(html).toBe('Xóa thành công');
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });
});

afterAll(() => {
  browser.close();
});
