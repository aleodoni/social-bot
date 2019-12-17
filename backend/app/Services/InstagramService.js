'use strict'

const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors')
const iPhone = devices['iPhone 6']

const Post = use('App/Models/Post')

class InstagramService {
  constructor(Config) {
    this._instagramConfig = Config.get('instagram')
  }

  async launch() {
    this._browser = await puppeteer.launch({
      headless: false
    })

    this._page = await this._browser.newPage()
    await this._page.emulate(iPhone)
  }

  async login() {
    await this._page.goto(this._instagramConfig.page, {
      waitUntil: 'networkidle2'
    })

    const loginButton = await this._page.$x(
      '//button[contains(text(), "Entrar")]'
    )

    await loginButton[0].click()

    await this._page.waitFor(3500)

    await this._page.type(
      'input[name="username"]',
      this._instagramConfig.username,
      {
        delay: 100
      }
    )
    await this._page.type(
      'input[name="password"]',
      this._instagramConfig.password,
      {
        delay: 100
      }
    )

    await this._page.keyboard.press('Enter')

    await this._page.waitForNavigation()

    await this._page.waitFor(3500)

    let agoraNaoButton = await this._page.$x(
      '//button[contains(text(), "Agora não")]'
    )
    await agoraNaoButton[0].click()

    await this._page.waitForNavigation()
    await this._page.waitFor(3500)

    const cancelarButton = await this._page.$x(
      '//button[contains(text(), "Cancelar")]'
    )
    await cancelarButton[0].click()

    await this._page.evaluate(() => {
      window.scrollBy(0, document.body.scrollHeight)
    })

    await this._page.waitFor(3500)

    agoraNaoButton = await this._page.$x(
      '//button[contains(text(), "Agora não")]'
    )
    await agoraNaoButton[0].click()
  }

  async post(image, text) {
    const futureFileChooser = this._page.waitForFileChooser()
    await this._page.click('span[aria-label="Nova publicação"]')
    const fileChooser = await futureFileChooser
    await fileChooser.accept([image])

    await this._page.waitFor(2500)

    const avancarButton = await this._page.$x(
      '//button[contains(text(), "Avançar")]'
    )
    await avancarButton[0].click()

    const selector = 'textarea[aria-label="Escreva uma legenda..."]'
    await this._page.waitForSelector(selector)
    await this._page.type(selector, text)

    const compartilharButton = await this._page.$x(
      '//button[contains(text(), "Compartilhar")]'
    )
    await compartilharButton[0].click()
  }

  async postScheduled() {
    const today = new Date()

    const postsToPost = await Post.query()
      .whereNull('posted_when')
      .andWhere('post_when', '<=', today)
      .with('image')
      .fetch()

    if (!postsToPost) {
      return
    }

    const arrayPosts = postsToPost.toJSON()

    arrayPosts.map(async post => {
      await this.post(
        `http://localhost:3333/api/images/${post.image.path}`,
        post.text
      )
    })
  }
}

module.exports = InstagramService
