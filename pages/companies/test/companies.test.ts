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

describe('Companies page', () => {
  test('Update company success', async () => {
    await page.goto(`${routes.private.companies}?token=${token}`);
    await page.waitForSelector('.companies__title');
    await page.tap('.name');
    await page.type('.name', 'Name');
    await page.tap('.address');
    await page.type('.address', 'Hà Nội');
    await page.tap('.intro');
    await page.type('.intro', 'Intro');
    await page.tap('.callLimit');
    await page.type('.callLimit', '1');
    await page.tap('.paidAmount');
    await page.type('.paidAmount', '3');
    await page.tap('.monthLimit');
    await page.type('.monthLimit', '4');
    await page.tap('.companies__btn--success');
    await page.waitForSelector('.companies__success');
    const html = await page.$eval('.companies__success', (e) => e.innerHTML);
    expect(html).toBe('Cập nhật thành công');
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });
});
test('Update company fail', async () => {
  await page.goto(`${routes.private.companies}?token=${token}error`);
  await page.waitForSelector('.companies__title');
  await page.tap('.companies__btn--success');
  await page.waitForSelector('.companies__fail');
  const html = await page.$eval('.companies__fail', (e) => e.innerHTML);
  expect(html).toBe('Cập nhật thất bại');
  const image = await page.screenshot();
  expect(image).toMatchImageSnapshot();
});

afterAll(() => {
  browser.close();
});
