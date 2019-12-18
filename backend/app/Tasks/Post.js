'use strict'

const Task = use('Task')
const Config = use('Config')
const PostService = use('App/Services/SocialPost/PostService')

const service = new PostService(Config)

class Post extends Task {
  static get schedule() {
    return '0 */1 * * * *'
  }

  async handle() {
    await service.formatPosts()
    await service.postInstagram()
    // await instagram.launch()
    // await instagram.login()
  }
}

module.exports = Post
