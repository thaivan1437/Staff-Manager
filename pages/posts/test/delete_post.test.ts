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
    slowMo: 250,
    ignoreDefaultArgs: ['--no-sandbox'],
  });
  token = await getTokenAdmin();
  page = await browser.newPage();
  viewport = await page.setViewport(Viewport);

});

describe('Pots Page', () => {
  test('Test delete posts succes', async () => {

    await page.goto(`${routes.private.posts}?token=${token}`);
    await page.waitForSelector('.post');
    await page.waitForSelector('.deletePost');
    await page.click('.deletePost');

    await page.waitForSelector('.title--delete');
    await page.click('.title--delete');
    await page.waitForSelector('.confirmDeletePost');
    await page.click('.confirmDeletePost');

    await page.waitForSelector('.success');
    const html = await page.$eval('.success', (e) => e.innerHTML);
    expect(html).toBe('Xóa thành công!');

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();

  });

});

afterAll(() => {
  browser.close();
});
