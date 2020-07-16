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
    slowMo: 20,
    ignoreDefaultArgs: ['--no-sandbox'],
  });
  token = await getTokenAdmin();
  page = await browser.newPage();
  viewport = await page.setViewport(Viewport);
});

describe('ConverSations Pgae', () => {
  test('Test click conversations', async () => {
    await page.goto(`${routes.private.get_conversations}?token=${token}`);

    await page.waitForSelector('.conversation__title');

    await page.waitFor(3000);

    await page.waitForSelector('.timeline-list > div:nth-child(2) > .timeline-item > .timeline-item--content > .timeline-item--label');
    await page.click('.timeline-list > div:nth-child(2) > .timeline-item > .timeline-item--content > .timeline-item--label');

    await page.waitFor(9000);

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();

  });

  test('Test scroll', async () => {
    // đang test scroll
    await page.goto(`${routes.private.get_conversations}?token=${token}`);
    await page.waitForSelector('.conversation__title');

    await page.waitFor(3000);
    await scrollTest(page);
    await page.waitFor(1000);

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();

  });

});

afterAll(() => {
  browser.close();
});
