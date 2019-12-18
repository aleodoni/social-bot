'use strict'

const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors')
const iPhone = devices['iPhone 6']

class FacebookService {
  constructor(Config) {
    this._facebookConfig = Config.get('facebook')
  }

  async launch() {
    this._browser = await puppeteer.launch({
      headless: false
    })

    this._page = await this._browser.newPage()
    await this._page.emulate(iPhone)
  }

  async login() {
    await this._page.goto(this._facebookConfig.page, {
      waitUntil: 'networkidle2'
    })

    await this._page.type(
      'input[name="email"]',
      this._facebookConfig.username,
      { delay: 100 }
    )
    await this._page.type('input[name="pass"]', this._facebookConfig.password, {
      delay: 100
    })

    await this._page.keyboard.press('Enter')

    await this._page.waitForNavigation()

    await this._page.waitFor(2500)

    const agoraNaoButton = await this.page.$x(
      '//span[contains(text(), "Agora não")]'
    )
    await agoraNaoButton[0].click()
  }

  async post(post) {
    if (!post.facebook) {
      return
    }

    await this._page.waitForNavigation()

    const noQuePensando = await this._page.$x(
      '//div[contains(text(), "No que você está pensando?")]'
    )
    await noQuePensando[0].click()

    const selector = 'textarea[aria-label="No que você está pensando?"]'
    await this._page.waitForSelector(selector)
    await this._page.type(selector, post.text)

    const futureFileChooser = this._page.waitForFileChooser()
    const addFoto = await this._page.$x('//div[contains(text(), "Foto")]')
    await addFoto[2].click()
    const fileChooser = await futureFileChooser
    await fileChooser.accept([post.image])

    const publicarButton = await this._page.$x(
      '//button[contains(text(), "Publicar")]'
    )
    await publicarButton[1].click()
  }
}

module.exports = FacebookService
