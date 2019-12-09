'use strict'

const Post = use('App/Models/Post')

class ListService {
  async handle() {
    const posts = await Post.query()
      .orderBy('when')
      .fetch()

    return posts
  }
}

module.exports = new ListService()
