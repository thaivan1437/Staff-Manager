import { routes } from '../../../constants/routes';
import { getTokenAdmin } from '../../../helpers/get_token';
import { scrollTest } from '../../../helpers/scroll';
import { v4 as uuid } from 'uuid';
import { Viewport } from '../../../constants/view_port';

let browser;
let page;
let token;
let viewport;

const puppeteer = require('puppeteer');
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
    slowMo: 350,
    ignoreDefaultArgs: ['--no-sandbox'],
  });
  token = await getTokenAdmin();
  page = await browser.newPage();
  viewport = await page.setViewport(Viewport);

});

describe('Invite Page', () => {
  test('Test tab invitation success', async () => {

    await page.goto(`${routes.private.invitation}?token=${token}`);
    await page.waitForSelector('.invite--title');

    await page.waitForSelector('.invite--company');

    await page.waitForSelector('.expand__company');
    await page.click('.expand__company');

    await page.mouse.click(1358, 848, { clickCount: 1, delay: 200 });

    await page.waitForSelector('.MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiChip-root > .MuiSvgIcon-root');
    await page.click('.MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiChip-root > .MuiSvgIcon-root');

    await page.waitForSelector('#emails1');
    await page.click('#emails1');
    await page.type('#emails1', `${uuid()}@gmail.com`);
    await page.keyboard.press('Enter');

    await page.click('.invite--roles');
    await page.waitForSelector('body > #menu-roleID > .MuiPaper-root > .MuiList-root > .MuiButtonBase-root:nth-child(4)');
    await page.click('body > #menu-roleID > .MuiPaper-root > .MuiList-root > .MuiButtonBase-root:nth-child(4)');

    await page.click('.invite--department');
    await page.waitForSelector('.MuiGrid-root > .MuiGrid-root:nth-child(3) > .MuiPaper-root > #panel1bh-header > .MuiExpansionPanelSummary-content');
    await page.click('.MuiGrid-root > .MuiGrid-root:nth-child(3) > .MuiPaper-root > #panel1bh-header > .MuiExpansionPanelSummary-content');

    await page.tap('.invite--btnSave');
    await page.waitForSelector('.success');
    const html = await page.$eval('.success', (e) => e.innerHTML);
    expect(html).toBe('Mời thành công');

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();

  });

  test('Test scroll', async () => {
    // đang test scroll
    await page.goto(`${routes.private.invitation}?token=${token}`);
    await page.waitForSelector('.invite--title');

    await page.waitForSelector('.invite--company');
    await page.waitFor(3000);
    await scrollTest(page);

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();

  });

  test('Test tab invitation failed ', async () => {

    await page.goto(`${routes.private.invitation}?token=${token}`);
    await page.waitForSelector('.invite--title');

    await page.waitForSelector('.invite--company');

    await page.waitForSelector('.expand__company');
    await page.click('.expand__company');

    await page.waitForSelector('.MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiChip-root > .MuiSvgIcon-root');
    await page.click('.MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiChip-root > .MuiSvgIcon-root');

    await page.waitForSelector('#emails1');
    await page.click('#emails1');
    await page.type('#emails1', 'test1234.com');
    await page.keyboard.press('Enter');
    await page.click('.invite--roles');
    await page.waitForSelector('body > #menu-roleID > .MuiPaper-root > .MuiList-root > .MuiButtonBase-root:nth-child(4)');
    await page.click('body > #menu-roleID > .MuiPaper-root > .MuiList-root > .MuiButtonBase-root:nth-child(4)');

    await page.waitForSelector('.invite--btnSave');
    await page.click('.invite--btnSave');
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
