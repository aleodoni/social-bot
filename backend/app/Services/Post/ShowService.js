'use strict'

const Post = use('App/Models/Post')

class ShowService {
  async handle({ id }) {
    const post = await Post.findOrFail(id)

    return post
  }
}

module.exports = new ShowService()
