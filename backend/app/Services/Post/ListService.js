'use strict'

const Post = use('App/Models/Post')

const DateFns = use('DateFns')

class ListService {
  async handle(date) {
    const teste = DateFns.format(new Date())
    console.log('--------------------------1')
    console.log(teste)
    const posts = await Post.query()
      .orderBy('when')
      .fetch()

    return posts
  }
}

module.exports = new ListService()
