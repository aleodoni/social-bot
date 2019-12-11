'use strict'

const Post = use('App/Models/Post')
const GeneralException = use('App/Exceptions/GeneralException')

class UpdateService {
  async handle(id, data) {
    const post = await Post.findOrFail(id)

    if (post.posted_when) {
      throw new GeneralException(400, "Can't update a posted post")
    }

    post.merge(data)

    await post.save()

    return post
  }
}

module.exports = new UpdateService()
