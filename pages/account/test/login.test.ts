import { routes } from '../../../constants/routes';
import { person } from '../../../constants/fake_data';

let browser;
let page;

const puppeteer = require('puppeteer');
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
    slowMo: 120,
    ignoreDefaultArgs: ['--no-sandbox'],
  });
  page = await browser.newPage();
});

describe('Login Page', () => {
  test('user can login', async () => {
    await page.goto(routes.public.login);
    await page.waitForSelector('.login-title');

    await page.tap('.login-email');
    await page.type('.login-email', person.email);
    await page.tap('.login-password');
    await page.type('.login-password', '123');
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
    await page.tap('.login-button');
    await page.waitForSelector('.login-title');
  });
});

afterAll(() => {
  browser.close();
});
