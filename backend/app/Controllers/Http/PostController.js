'use strict'

const ListService = use('App/Services/Post/ListService')

class PostController {
  async index({ auth, response }) {
    const posts = await ListService.handle()

    return response.ok(posts)
  }
}

module.exports = PostController
