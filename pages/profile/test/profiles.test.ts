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
    slowMo: 250,
    ignoreDefaultArgs: ['--no-sandbox'],
    args: ['--start-maximized'],
  });
  token = await getTokenAuth();
  page = await browser.newPage();
  viewport = await page.setViewport(Viewport);
});

describe('Profiles Page', () => {
  test('Test tab about success', async () => {

    await page.goto(`${routes.private.profile}?token=${token}`);
    await page.waitForSelector('.profile__header--title');

    await page.tap('.firstName');
    await page.type('.firstName', 'test');
    await page.tap('.lastName');
    await page.type('.lastName', 'test');
    await page.tap('.btn__save');

    await page.waitForSelector('.success');
    const html = await page.$eval('.success', (e) => e.innerHTML);
    expect(html).toBe('Lưu thành công');

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();

  });
  test('Test tab about no success', async () => {

    await page.goto(`${routes.private.profile}?token=${token}`);
    await page.waitForSelector('.profile__header--title');
    await page.waitForSelector('.firstName');
    await page.click('.firstName');
    await page.waitFor(1000);
    await page.mouse.click(880, 555, { clickCount: 3, delay: 200 });
    await page.waitFor(1000);
    await page.keyboard.press('Backspace');
    await page.waitFor(1000);
    await page.tap('.lastName');
    await page.type('.lastName', 'test');
    await page.tap('.btn__save');

    await page.waitForSelector('.success');
    const html = await page.$eval('.success', (e) => e.innerHTML);
    expect(html).toBe('Lưu không thành công');

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();

  });
});

afterAll(() => {
  browser.close();
});
