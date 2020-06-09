// TODO: need write test for auth in here
import { routes } from '../../../constants/routes';

let browser;
let page;

const puppeteer = require('puppeteer');
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
    slowMo: 120,
    ignoreDefaultArgs: ['--no-sandbox'],
  });
  page = await browser.newPage();
});

describe('Auth Page', () => {
  test('test', async () => {

    await page.goto(routes.private.home);
    await page.waitForSelector('.dashboard--title');
    const html = await page.$eval('.dashboard--title', (e) => e.innerHTML);
    expect(html).toBe('Dashboard');
  });
});

afterAll(() => {
  browser.close();
});
