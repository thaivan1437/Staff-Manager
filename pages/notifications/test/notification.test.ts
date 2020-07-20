import { routes } from '../../../constants/routes';
import { getTokenAuth } from '../../../helpers/get_token';
import { Viewport } from '../../../constants/view_port';

let browser;
let page;
let token;
let viewport;

const puppeteer = require('puppeteer');
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
    slowMo: 120,
    ignoreDefaultArgs: ['--no-sandbox'],
    args: ['--start-maximized'],
  });
  token = await getTokenAuth();
  page = await browser.newPage();
  viewport = await page.setViewport(Viewport);
});

describe('Notifications', () => {
  test('Test get notifications success', async () => {
    await page.goto(`${routes.private.posts}?token=${token}`);
    await page.waitForSelector('.sidebar_link');
    await page.tap('.sidebar_link');
    await page.waitFor(5000);
    await page.waitForSelector('.header__notification');
    await page.waitFor(3000);
    await page.tap('.header__notification');
    await page.waitFor(3000);
    await page.waitForSelector('.notification__title');
    await page.waitFor(3000);
    await page.waitForSelector('.notification-item__title');
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });
});

afterAll(async() => {
  await page.waitFor(2000);
  browser.close();
});
