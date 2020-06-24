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

describe('Profiles Page', () => {
  test('Test tab address', async () => {

    await page.goto(`${routes.private.address}?token=${token}`);
    await page.waitForSelector('.profile__header--title');

    await page.click('#address');
    await page.type('#address', 'address test');
    await page.click('#descriptions');
    await page.type('#descriptions', 'descriptions test');

    await page.tap('.btn__save');
    await page.waitForSelector('.success');
    const html = await page.$eval('.success', (e) => e.innerHTML);
    expect(html).toBe('Lưu thành công');

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();

  });
  test('Test tab address không thành công', async () => {

    await page.goto(`${routes.private.address}?token=${token}error`);
    await page.waitForSelector('.profile__header--title');

    await page.click('#address');
    await page.type('#address', 'address test');
    await page.click('#descriptions');
    await page.type('#descriptions', 'descriptions test');

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
