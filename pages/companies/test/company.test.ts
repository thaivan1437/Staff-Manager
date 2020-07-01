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

describe('Company Page', () => {
  test('Test create company', async () => {
    await page.goto(`${routes.private.company}?token=${token}`);

    await page.waitForSelector('.create--company');

    await page.waitForSelector('.MuiGrid-root #combo-box-demo');
    await page.click('.MuiGrid-root #combo-box-demo');
    await page.type('.MuiGrid-root #combo-box-demo', 'Test');

    await page.waitForSelector('body #combo-box-demo-option-0');
    await page.click('body #combo-box-demo-option-0');

    await page.waitForSelector('.MuiGrid-root #name');
    await page.click('.MuiGrid-root #name');
    await page.type('.MuiGrid-root #name', 'Test Name');

    await page.waitForSelector('.MuiGrid-root #address');
    await page.click('.MuiGrid-root #address');
    await page.type('.MuiGrid-root #address', 'Test address');

    await page.waitForSelector('.MuiGrid-root #callLimit');
    await page.click('.MuiGrid-root #callLimit');
    await page.type('.MuiGrid-root #callLimit', '20');

    await page.waitForSelector('.MuiGrid-root #monthLimit');
    await page.click('.MuiGrid-root #monthLimit');
    await page.type('.MuiGrid-root #monthLimit', '20');

    await page.waitForSelector('.MuiGrid-root #intro');
    await page.click('.MuiGrid-root #intro');
    await page.type('.MuiGrid-root #intro', 'test intro');

    await page.waitForSelector('.MuiGrid-root:nth-child(3) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiChip-root > .MuiSvgIcon-root');
    await page.click('.MuiGrid-root:nth-child(3) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiChip-root > .MuiSvgIcon-root');

    await page.waitForSelector('.MuiGrid-root #hotlines');
    await page.click('.MuiGrid-root #hotlines');
    await page.type('.MuiGrid-root #hotlines', '03649852456');
    await page.keyboard.press('Enter');

    await page.waitForSelector('.MuiGrid-root:nth-child(4) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiChip-root > .MuiSvgIcon-root > path');
    await page.click('.MuiGrid-root:nth-child(4) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiChip-root > .MuiSvgIcon-root > path');

    await page.waitForSelector('.MuiGrid-root #phones');
    await page.click('.MuiGrid-root #phones');
    await page.type('.MuiGrid-root #phones', '03649852456');
    await page.keyboard.press('Enter');

    await page.tap('.btn--send');
    await page.waitForSelector('.success');
    const html = await page.$eval('.success', (e) => e.innerHTML);
    expect(html).toBe('Thêm mới thành công.');

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();

  });

  test('Test create company failed ', async () => {

    await page.goto(`${routes.private.company}?token=${token}`);

    await page.waitForSelector('.create--company');

    await page.waitForSelector('.MuiGrid-root #combo-box-demo');
    await page.click('.MuiGrid-root #combo-box-demo');
    await page.type('.MuiGrid-root #combo-box-demo', 'Test');

    await page.waitForSelector('body #combo-box-demo-option-0');
    await page.click('body #combo-box-demo-option-0');

    // await page.waitForSelector('.MuiGrid-root #name');
    // await page.click('.MuiGrid-root #name');
    // await page.type('.MuiGrid-root #name', 'Test Name');

    await page.waitForSelector('.MuiGrid-root #address');
    await page.click('.MuiGrid-root #address');
    await page.type('.MuiGrid-root #address', 'Test address');

    await page.tap('.btn--send');
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
