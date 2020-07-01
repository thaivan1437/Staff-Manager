import { routes } from '../../../constants/routes';
import { getTokenAdmin } from '../../../helpers/get_token';
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
  });
  token = await getTokenAdmin();
  page = await browser.newPage();
  viewport = await page.setViewport(Viewport);

});

describe('Profiles Page', () => {
  test('Test tab modal add fields', async () => {

    await page.goto(`${routes.private.fields}?token=${token}`);
    await page.waitForSelector('body > #\__next > div > .flex > .w__full');
    await page.click('body > #\__next > div > .flex > .w__full');
    await page.waitForSelector('.fields__dialog');
    await page.click('.fields__dialog');
    await page.waitForSelector('#form-dialog-title');
    await page.waitForSelector('.MuiPaper-root #name');
    await page.click('.MuiPaper-root #name');
    await page.type('#name', 'Add fields');
    await page.waitForSelector('.MuiDialog-container #btn--AddField');
    await page.click('.MuiDialog-container #btn--AddField');
    await page.waitForSelector('.success');
    const html = await page.$eval('.success', (e) => e.innerHTML);
    expect(html).toBe('Thêm mới thành công.');

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();

  });
  test('Test tab add field failed ', async () => {

    await page.goto(`${routes.private.fields}?token=${token}error`);

    await page.waitForSelector('body > #\__next > div > .flex > .w__full');
    await page.click('body > #\__next > div > .flex > .w__full');
    await page.waitForSelector('.fields__dialog');
    await page.click('.fields__dialog');
    await page.waitForSelector('#form-dialog-title');
    await page.waitForSelector('.MuiPaper-root #name');
    await page.click('.MuiPaper-root #name');
    await page.type('#name', 'test failed');
    await page.waitForSelector('.MuiDialog-container #btn--AddField');
    await page.click('.MuiDialog-container #btn--AddField');

    await page.waitForSelector('.success');
    const html = await page.$eval('.success', (e) => e.innerHTML);
    expect(html).toBe('Thêm mới thất bại.');

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();

  });
});

afterAll(() => {
  browser.close();
});
