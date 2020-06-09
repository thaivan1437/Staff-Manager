import { routes } from '../../../constants/routes';
import { getTokenAuth } from '../../../helpers/get_token';

let browser;
let page;
let token;

const puppeteer = require('puppeteer');
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
    slowMo: 120,
    ignoreDefaultArgs: ['--no-sandbox'],
  });
  token = await getTokenAuth();
  page = await browser.newPage();
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

    await page.goto(`${routes.private.profile}?token=${token}error`);
    await page.waitForSelector('.profile__header--title');

    await page.tap('.firstName');
    await page.type('.firstName', 'test');
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
