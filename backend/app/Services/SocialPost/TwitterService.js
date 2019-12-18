'use strict'

const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors')
const iPhone = devices['iPhone 6']

class TwitterService {
  constructor(Config) {
    this._twitterConfig = Config.get('twitter')
  }

  async launch() {
    this._browser = await puppeteer.launch({
      headless: false
    })

    this._page = await this._browser.newPage()
    await this._page.emulate(iPhone)
  }

  async login() {
    await this._page.goto(this._twitterConfig.page, {
      waitUntil: 'networkidle2'
    })

    const loginButton = await this._page.$x(
      '//span[contains(text(), "Entrar")]'
    )
    await loginButton[0].click()

    await this._page.waitFor(3500)

    await this._page.type(
      'input[name="session[username_or_email]"]',
      this._twitterConfig.username,
      { delay: 100 }
    )
    await this._page.type(
      'input[name="session[password]"]',
      this._twitterConfig.password,
      {
        delay: 100
      }
    )

    await this._page.keyboard.press('Enter')

    await this._page.waitForNavigation()
  }

  async post(post) {
    if (!post.twitter) {
      return
    }

    await this._page.waitFor(3500)

    await this._page.click('a[href="/compose/tweet"]')

    const selector = 'textarea[aria-label="Texto do Tweet"]'
    await this._page.waitForSelector(selector)
    await this._page.type(selector, post.text)

    const futureFileChooser = this._page.waitForFileChooser()
    const addFoto = await 'div[aria-label="Adicionar fotos ou vídeo"]'
    await this._page.waitForSelector(addFoto)
    await this._page.click(addFoto)
    const fileChooser = await futureFileChooser
    await fileChooser.accept([post.image])

    const tweetarButton = await this._page.$x(
      '//span[contains(text(), "Tweetar")]'
    )
    await tweetarButton[0].click()
  }
}

module.exports = TwitterService
