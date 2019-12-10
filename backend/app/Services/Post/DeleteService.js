'use strict'

const Post = use('App/Models/Post')

class UpdateService {
  async handle(id) {
    const post = await Post.findOrFail(id)

    await post.delete()
  }
}

module.exports = new UpdateService()
