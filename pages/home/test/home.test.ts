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

describe('Home Page', () => {
  test('Typography loads correctly', async () => {
    await page.goto(routes.private.home)
    await page.waitForSelector('.AppBar-Tittle')

    const html = await page.$eval('.AppBar-Tittle', (e) => e.innerHTML)
    expect(html).toBe('COMPANY WEB')
  })
})

afterAll(() => {
  browser.close()
})
