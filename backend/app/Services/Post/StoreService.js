'use strict'

const Post = use('App/Models/Post')

class StoreService {
  async handle(data) {
    const post = await Post.create(data)

    return post
  }
}

module.exports = new StoreService()
