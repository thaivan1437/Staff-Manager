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

describe('Invite Admin Page', () => {
  test('Test tab invitation Supper Admin', async () => {
    await page.goto(`${routes.private.adminInvitation}?token=${token}`);
    await page.waitForSelector('.invite--title');
    await page.waitForSelector('.invite__company--box');
    await page.waitForSelector('.MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiChip-root > .MuiSvgIcon-root');
    await page.click('.MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiChip-root > .MuiSvgIcon-root');

    await page.waitForSelector('.MuiGrid-root #emails');
    await page.click('.MuiGrid-root #emails');
    await page.type('#emails', 'thaivan1437@gmail.com');
    await page.keyboard.press('Enter');

    await page.tap('.send');
    await page.waitForSelector('.success');
    const html = await page.$eval('.success', (e) => e.innerHTML);
    expect(html).toBe('Mời thành công');

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();

  });

  test('Test tab invitation không thành công ', async () => {

    await page.goto(`${routes.private.adminInvitation}?token=${token}`);
    await page.waitForSelector('.invite--title');
    await page.waitForSelector('.invite__company--box');
    await page.waitForSelector('.MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiChip-root > .MuiSvgIcon-root');
    await page.click('.MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiChip-root > .MuiSvgIcon-root');

    await page.waitForSelector('.MuiGrid-root #emails');
    await page.click('.MuiGrid-root #emails');
    await page.type('#emails', 'test');
    await page.keyboard.press('Enter');

    await page.tap('.send');
    await page.waitForSelector('.success');
    const html = await page.$eval('.success', (e) => e.innerHTML);
    expect(html).toBe('Mời thất bại, kiểm tra lại !');

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();

  });
});

afterAll(() => {
  browser.close();
});
