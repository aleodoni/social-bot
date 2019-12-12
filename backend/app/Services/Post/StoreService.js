'use strict'

const Database = use('Database')
const Helpers = use('Helpers')

const Post = use('App/Models/Post')
const PostImage = use('App/Models/PostImage')
const GeneralException = use('App/Exceptions/GeneralException')

class StoreService {
  async handle(data) {
    const { postImage } = data
    const { name, text, postWhen, instagram, facebook, twitter } = data

    const trx = await Database.beginTransaction()

    try {
      const post = await Post.create(
        { name, text, post_when: postWhen, instagram, facebook, twitter },
        trx
      )

      const imageName = `${Date.now()}-${postImage.clientName}`

      await postImage.move(Helpers.tmpPath('uploads'), {
        name: imageName
      })

      if (!postImage.moved()) {
        await trx.rollback()
        return postImage.error()
      }

      await PostImage.create(
        {
          post_id: post.id,
          name: postImage.clientName,
          path: imageName
        },
        trx
      )

      await trx.commit()

      return post
    } catch (err) {
      await trx.rollback()
      console.log('---------------------------------------2')
      console.log(err)
      throw new GeneralException(400, "Can't save the post")
    }
  }
}

module.exports = new StoreService()
