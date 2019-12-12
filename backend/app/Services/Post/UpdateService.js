'use strict'

const Post = use('App/Models/Post')
const GeneralException = use('App/Exceptions/GeneralException')

class UpdateService {
  async handle(id, data) {
    const post = await Post.findOrFail(id)

    const { name, text, postWhen, instagram, facebook, twitter } = data

    if (post.posted_when) {
      throw new GeneralException(400, "Can't update a posted post")
    }

    post.merge({
      name,
      text,
      post_when: postWhen,
      instagram,
      facebook,
      twitter
    })

    await post.save()

    return post
  }
}

module.exports = new UpdateService()
