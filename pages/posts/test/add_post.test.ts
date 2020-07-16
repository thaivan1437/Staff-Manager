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
    slowMo: 0,
    ignoreDefaultArgs: ['--no-sandbox'],
  });
  token = await getTokenAdmin();
  page = await browser.newPage();
  viewport = await page.setViewport(Viewport);

});

describe('Post Page', () => {
  test('Test tab modal add posts', async () => {

    await page.goto(`${routes.private.posts}?token=${token}`);
    await page.waitForSelector('.post');
    await page.waitForSelector('.addPost');
    await page.click('.addPost');

    await page.waitForSelector('.MuiGrid-root #title');
    await page.click('.MuiGrid-root #title');
    await page.type('#title', 'Test create');

    await page.waitForSelector('.MuiGrid-root #description');
    await page.click('.MuiGrid-root #description');
    await page.type('#description', 'test description');

    await page.waitForSelector('.MuiGrid-root #rate');
    await page.click('.MuiGrid-root #rate');
    await page.type('#rate', '1000');

    await page.waitForSelector('body');
    await page.click('body');

    await page.waitForSelector('#region');
    await page.click('#region');
    await page.waitForSelector('body > #menu-region > .MuiPaper-root > .MuiList-root > .MuiButtonBase-root:nth-child(2)');
    await page.click('body > #menu-region > .MuiPaper-root > .MuiList-root > .MuiButtonBase-root:nth-child(2)');

    await page.waitForSelector('.px-3 #rrule-1-start-datetime');
    await page.click('.px-3 #rrule-1-start-datetime');

    await page.waitForSelector('div > .px-0 > div:nth-child(1) > .px-3 > .form-group');
    await page.click('div > .px-0 > div:nth-child(1) > .px-3 > .form-group');

    await page.select('div #rrule-1-repeat-frequency', 'Weekly');

    await page.waitForSelector('div #rrule-1-repeat-frequency');
    await page.click('div #rrule-1-repeat-frequency');

    await page.waitForSelector('input[type=file]');
    const fileInput = await page.$('input[type=file]');
    await fileInput.uploadFile('static/images/test.jpg');
    await page.waitFor(7000);

    await page.waitForSelector('.createPost');
    await page.click('.createPost');

    await page.waitForSelector('.success');
    const html = await page.$eval('.success', (e) => e.innerHTML);
    expect(html).toBe('Thêm mới thành công!');

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();

  });
  test('Test tab add post failed ', async () => {

    await page.goto(`${routes.private.posts}?token=${token}error`);

    await page.waitForSelector('.post');
    await page.waitForSelector('.addPost');
    await page.click('.addPost');

    await page.waitForSelector('.MuiGrid-root #title');
    await page.click('.MuiGrid-root #title');
    await page.type('#title', 'Test create');

    await page.waitFor(2000);
    await page.waitForSelector('.createPost');
    await page.click('.createPost');

    await page.waitForSelector('.success');
    const html = await page.$eval('.success', (e) => e.innerHTML);
    expect(html).toBe('Thêm mới thất bại!');

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();

  });

  test('Test scroll', async () => {
    // đang test scroll
    await page.goto(`${routes.private.posts}?token=${token}`);
    await page.waitForSelector('.post');

    await page.waitForSelector('.content--fields');
    await page.waitFor(3000);
    await scrollTest(page);

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();

  });
});

afterAll(() => {
  browser.close();
});
