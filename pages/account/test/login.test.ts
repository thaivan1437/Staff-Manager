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

describe('Login Page', () => {
  test('user can login', async () => {
    await page.goto(routes.public.login)
    await page.waitForSelector('.Login-title')

    await page.tap('.Login-email')
    await page.type('.Login-email', 'test@mail.com')
    await page.tap('.Login-password')
    await page.type('.Login-password', '123')
    await page.tap('.Login-button')
    await page.waitForSelector('.Login-title')
  })
})

afterAll(() => {
  browser.close()
})
