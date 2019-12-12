'use strict'

const Task = use('Task')

class Post extends Task {
  static get schedule() {
    return '0 */1 * * * *'
  }

  async handle() {
    console.log('Olá, tudo bem ?')
  }
}

module.exports = Post
