'use strict'

const Post = use('App/Models/Post')

const DateFns = use('DateFns')

class ListService {
  async handle(date) {
    const dateSearch = DateFns.parseISO(date)
    const posts = await Post.query()
      .whereBetween('post_when', [
        DateFns.startOfDay(dateSearch),
        DateFns.endOfDay(dateSearch)
      ])
      .orderBy('post_when')
      .fetch()

    return posts
  }
}

module.exports = new ListService()
