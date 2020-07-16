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
    slowMo: 0,
    ignoreDefaultArgs: ['--no-sandbox'],
  });
  token = await getTokenAdmin();
  page = await browser.newPage();
  viewport = await page.setViewport(Viewport);

});

describe('Post Page', () => {
  test('Test update post success', async () => {

    await page.goto(`${routes.private.posts}?token=${token}`);
    await page.waitForSelector('.post');
    await page.waitForSelector('.icon--upload');
    await page.click('.icon--upload');

    await page.waitForSelector('.MuiGrid-root #title');
    await page.waitFor(1000);
    await page.click('#title', { clickCount: 3, delay: 200 });
    await page.waitFor(1000);
    await page.keyboard.press('Backspace');
    await page.waitFor(1000);
    await page.type('#title', 'Test update');

    await page.waitForSelector('.MuiGrid-root #description');
    await page.waitFor(1000);
    await page.click('#description', { clickCount: 3, delay: 200 });
    await page.waitFor(1000);
    await page.keyboard.press('Backspace');
    await page.waitFor(1000);
    await page.type('#description', 'test update');

    await page.waitForSelector('.MuiGrid-root #rate');
    await page.click('.MuiGrid-root #rate');
    await page.type('#rate', '100');

    await page.waitForSelector('#region');
    await page.click('#region', { clickCount: 1, delay: 200 });
    await page.waitFor(1000);
    await page.mouse.click(900, 300, { clickCount: 1, delay: 200 });
    await page.waitFor(1000);

    await page.waitForSelector('.px-3 #rrule-1-start-datetime');
    await page.click('.px-3 #rrule-1-start-datetime');

    await page.waitForSelector('div > .px-0 > div:nth-child(1) > .px-3 > .form-group');
    await page.click('div > .px-0 > div:nth-child(1) > .px-3 > .form-group');

    await page.select('div #rrule-1-repeat-frequency', 'Weekly');

    await page.waitForSelector('div #rrule-1-repeat-frequency');
    await page.click('div #rrule-1-repeat-frequency');

    const fileInput = await page.$('input[type=file]');
    await fileInput.uploadFile('static/images/test.jpg');
    await page.waitFor(7000);

    await page.waitForSelector('.updatePost');
    await page.click('.updatePost');

    await page.waitForSelector('.success');
    const html = await page.$eval('.success', (e) => e.innerHTML);
    expect(html).toBe('Chỉnh sửa thành công!');

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();

  });

});

afterAll(() => {
  browser.close();
});
