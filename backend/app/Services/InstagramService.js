'use strict'

const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors')
const iPhone = devices['iPhone 6']

const Helpers = use('Helpers')
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

    await this._page.waitFor(2500)

    await this._page.type('input[name="username"]', 'aleodoni', { delay: 50 })
    await this._page.type('input[name="password"]', 'cupim2017', { delay: 50 })
    await this._page.keyboard.press('Enter')

    await this._page.waitForNavigation()

    const agoraNaoButton = await this._page.$x(
      '//button[contains(text(), "Agora não")]'
    )
    await agoraNaoButton[0].click()

    await this._page.waitFor(4500)

    const cancelarButton = await this._page.$x(
      '//button[contains(text(), "Cancelar")]'
    )

    await cancelarButton[0].click()

    // await this._page.waitForNavigation()

    const spanPost = await this._page.$x(
      '//span[@aria-label="Nova publicação"]'
    )

    await spanPost[0].click()

    const input = await this._page.$('input[type="file"]')

    await input.uploadFile(
      Helpers.tmpPath(
        `uploads/1576263442682-a-imagem-de-russell-b-que-maravilhou-o-mundo.jpg`
      )
    )
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

    await this._client.uploadPhoto({
      photo:
        'http://localhost:3333/api/images/1576263442682-a-imagem-de-russell-b-que-maravilhou-o-mundo.jpg',
      caption: 'Teste'
    })

    // arrayPosts.map(async post => {
    //   await this._client.uploadPhoto({
    //     photo: `http://localhost:3333/api/images/${post.image.path}`,
    //     caption: post.text
    //   })
    // })
  }
}

module.exports = InstagramService
