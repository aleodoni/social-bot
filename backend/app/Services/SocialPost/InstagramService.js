'use strict'

const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors')
const iPhone = devices['iPhone 6']

class InstagramService {
  constructor(Config) {
    this._instagramConfig = Config.get('instagram')
  }

  async launch() {
    console.log(`...inicializando instagram browser`)

    this._browser = await puppeteer.launch({
      headless: false
    })

    this._page = await this._browser.newPage()
    await this._page.emulate(iPhone)
  }

  async close() {
    console.log(`...encerrando instagram browser`)

    await this._page.waitFor(3500)
    await this._browser.close()
  }

  async login() {
    console.log(`...logando no instagram`)

    await this._page.goto(this._instagramConfig.page, {
      waitUntil: 'networkidle2'
    })

    await this._page.waitFor(3500)

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

  async post(post) {
    console.log(`...postando no instagram ${post.name}`)

    try {
      const futureFileChooser = this._page.waitForFileChooser()
      const novaSelector = 'span[aria-label="Nova publicação"]'
      await this._page.waitForSelector(novaSelector)
      await this._page.click(novaSelector)
      const fileChooser = await futureFileChooser
      await fileChooser.accept([post.image])

      await this._page.waitFor(2500)

      const avancarButton = await this._page.$x(
        '//button[contains(text(), "Avançar")]'
      )
      await avancarButton[0].click()

      const selector = 'textarea[aria-label="Escreva uma legenda..."]'
      await this._page.waitForSelector(selector)
      await this._page.type(selector, post.text)

      const compartilharButton = await this._page.$x(
        '//button[contains(text(), "Compartilhar")]'
      )
      // await compartilharButton[0].click()

      console.log(`...postado no instagram ${post.name}`)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = InstagramService
