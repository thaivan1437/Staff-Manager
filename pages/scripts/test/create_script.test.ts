
import { routes } from '../../../constants/routes';
import { getTokenAdmin } from '../../../helpers/get_token';
import { Viewport } from '../../../constants/view_port';
import { scrollTest } from '../../../helpers/scroll';

let browser;
let page;
let token;
let viewport;

const puppeteer = require('puppeteer');
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
    slowMo: 30,
    ignoreDefaultArgs: ['--no-sandbox'],
  });
  token = await getTokenAdmin();
  page = await browser.newPage();
  viewport = await page.setViewport(Viewport);
});
describe('Post Page', () => {
  test('Test create script failed', async () => {
    await page.goto(`${routes.private.scripts}?token=${token}`);
    await page.waitFor(3000);
    await page.click('.add-btn');
    await page.waitForSelector('.wrap__create');
    await page.click('.script__add--action');
    await page.waitFor(5000);
    await page.waitForSelector('.success');
    const html = await page.$eval('.success', (e) => e.innerHTML);
    expect(html).toBe('Thêm mới thất bại');
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });
  test('Test create script success', async () => {
    await page.goto(`${routes.private.scripts}?token=${token}`);
    await page.waitFor(5000);
    await page.click('.add-btn');
    await page.waitForSelector('.wrap__create');
    await page.click('.test__add--title');
    await page.type('.test__add--title', 'Test create');

    await page.click('.test__add--body');
    await page.type('.test__add--body', 'Test create');

    await page.click('.script__add--action');
    await page.waitFor(5000);
    await page.waitForSelector('.success');
    const html = await page.$eval('.success', (e) => e.innerHTML);
    expect(html).toBe('Thêm mới thành công');
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });
  test('Test scroll', async () => {
    await page.goto(`${routes.private.scripts}?token=${token}`);
    await page.waitForSelector('.script__create');
    await page.waitFor(3000);
    await scrollTest(page);
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });
});
afterAll(() => {
  browser.close();
});
