'use strict'

const Task = use('Task')
const Config = use('Config')
const InstagramService = use('App/Services/InstagramService')

const instagram = new InstagramService(Config)

class Post extends Task {
  static get schedule() {
    return '0 */1 * * * *'
  }

  async handle() {
    // await instagram.launch()
    // await instagram.login()
    console.log('Zen')
  }
}

module.exports = Post
