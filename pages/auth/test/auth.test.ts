import { routes } from '../../../constants/routes';
import { Viewport } from '../../../constants/view_port';

let browser;
let page;
let viewport;

const puppeteer = require('puppeteer');
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
    slowMo: 120,
    ignoreDefaultArgs: ['--no-sandbox'],
    args: ['--start-maximized'],
  });
  page = await browser.newPage();
  viewport = await page.setViewport(Viewport);
});

describe('Auth Page', () => {
  test('test', async () => {
    await page.goto(routes.private.home);
    await page.waitForSelector('.header__dash');
    const html = await page.$eval('.header__dash', (e) => e.innerHTML);
    expect(html).toBe('Dashboard');
  });
});

afterAll(() => {
  browser.close();
});
