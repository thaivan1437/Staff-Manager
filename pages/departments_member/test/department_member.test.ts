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

describe('Department members page', () => {
  test('Test department members success', async () => {
    await page.goto(`${routes.private.department}?token=${token}`);
    await page.waitForSelector('.departments__title');
    await page.waitFor(3000);
    await page.waitForSelector('.departments__item');
    await page.tap('.departments__item');
    await page.waitFor(3000);
    await page.waitForSelector('.departments__nameCard');
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });
});

afterAll(async() => {
  await page.waitFor(2000);
  browser.close();
});
