import { routes } from '../../../constants/routes'

let browser
let page

const puppeteer = require('puppeteer')
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
    slowMo: 120,
    ignoreDefaultArgs: ['--no-sandbox'],
  })
  page = await browser.newPage()
})

describe('About Page', () => {
  test('About page is exists', async () => {
    await page.goto(routes.private.about)
    await page.waitForSelector('.AppBar-about')

    await page.click('.AppBar-about')
    await page.waitForSelector('.AppBar-Tittle')

    const html = await page.$eval('.AppBar-Tittle', (e) => e.innerHTML)
    expect(html).toBe('COMPANY WEB')
  })
})

afterAll(() => {
  browser.close()
})
