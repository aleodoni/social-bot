'use strict'

const Post = use('App/Models/Post')
const GeneralException = use('App/Exceptions/GeneralException')

class DeleteService {
  async handle(id) {
    const post = await Post.findOrFail(id)

    if (post.posted_when) {
      throw new GeneralException(400, "Can't delete a posted post")
    }

    await post.delete()
  }
}

module.exports = new DeleteService()
