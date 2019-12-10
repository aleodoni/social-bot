'use strict'

const Post = use('App/Models/Post')

class UpdateService {
  async handle(id, data) {
    const post = await Post.findOrFail(id)

    post.merge(data)

    await post.save()

    return post
  }
}

module.exports = new UpdateService()
