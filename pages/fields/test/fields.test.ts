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
describe('Fields page', () => {
  test('Create field success', async () => {
    await page.goto(`${routes.private.companies}?token=${token}`);

    await page.tap('.fields__dialog');
    await page.tap('.fields');
    await page.type('.fields', 'Name Fields 456');

    await page.tap('.fields__btn--success');

    await page.waitForSelector('.fields__success');

    const html = await page.$eval('.fields__success', (e) => e.innerHTML);
    expect(html).toBe('Thêm thành công');

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();

  });
  test('Create field fail', async () => {
    await page.goto(`${routes.private.companies}?token=${token}error`);

    await page.tap('.fields__dialog');
    await page.tap('.fields__btn--success');
    await page.waitForSelector('.fields__fail');
    const html = await page.$eval('.fields__fail', (e) => e.innerHTML);
    expect(html).toBe('Thêm thất bại');
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });
});

afterAll(() => {
  browser.close();
});
