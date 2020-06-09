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
  test('Test tab account', async () => {

    await page.goto(`${routes.private.account}?token=${token}`);
    await page.waitForSelector('.profile__header--title');

    await page.tap('#gender');
    await page.click('#gender', 'FEMALE', { delay: 100 });

    await page.tap('#dateOfBirth');
    await page.type('#dateOfBirth', '04/25/1996');

    await page.tap('#phoneNumber');
    await page.type('#phoneNumber', '0396780093');
    await page.tap('.btn__save');
    await page.waitForSelector('.success');
    const html = await page.$eval('.success', (e) => e.innerHTML);
    expect(html).toBe('Lưu thành công');

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();

  });
  test('Test tab account không thành công ', async () => {

    await page.goto(`${routes.private.account}?token=${token}error`);
    await page.waitForSelector('.profile__header--title');

    await page.tap('#gender');
    await page.click('#gender', 'FEMALE', { delay: 100 });

    await page.tap('#dateOfBirth');
    await page.type('#dateOfBirth', '04/25/1996');

    await page.tap('#phoneNumber');
    await page.type('#phoneNumber', '0396780093');
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
