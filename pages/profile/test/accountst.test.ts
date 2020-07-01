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
  test('Test tab account', async () => {

    await page.goto(`${routes.private.account}?token=${token}`);
    await page.waitForSelector('.profile__header--title');

    await page.waitForSelector('#gender');
    await page.tap('#gender');
    await page.waitForSelector('body > #menu-gender > .MuiPaper-root > .MuiList-root > .MuiButtonBase-root:nth-child(1)');
    await page.click('body > #menu-gender > .MuiPaper-root > .MuiList-root > .MuiButtonBase-root:nth-child(1)');

    await page.waitForSelector('#dateOfBirth');
    await page.tap('#dateOfBirth');
    await page.type('#dateOfBirth', '04/25/1996');

    await page.waitForSelector('#phoneNumber');
    await page.tap('#phoneNumber');
    await page.type('#phoneNumber', '0396780093', { delay: 200 });

    await page.tap('.btn__save');

    await page.waitForSelector('.success');
    const html = await page.$eval('.success', (e) => e.innerHTML);
    expect(html).toBe('Lưu thành công');

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();

  });
  test('Test tab account không thành công ', async () => {

    await page.goto(`${routes.private.account}?token=${token}`);
    await page.waitForSelector('.profile__header--title');

    await page.tap('#gender');
    await page.waitForSelector('body > #menu-gender > .MuiPaper-root > .MuiList-root > .MuiButtonBase-root:nth-child(1)');
    await page.click('body > #menu-gender > .MuiPaper-root > .MuiList-root > .MuiButtonBase-root:nth-child(1)');

    await page.tap('#dateOfBirth');
    await page.type('#dateOfBirth', '04/25/1996');

    await page.waitForSelector('#phoneNumber');
    await page.click('#phoneNumber');
    await page.waitFor(1000);
    await page.mouse.click(600, 740, { clickCount: 3, delay: 200 });
    await page.waitFor(1000);
    await page.keyboard.press('Backspace');
    await page.waitFor(1000);

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
