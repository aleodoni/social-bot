'use strict'

const ListService = use('App/Services/Post/ListService')
const ShowService = use('App/Services/Post/ShowService')
const StoreService = use('App/Services/Post/StoreService')
const UpdateService = use('App/Services/Post/UpdateService')
const DeleteService = use('App/Services/Post/DeleteService')

class PostController {
  async index({ request, response }) {
    const { date } = request.only(['date'])
    const posts = await ListService.handle(date)

    return response.ok(posts)
  }

  async show({ params, response }) {
    const { id } = params
    const post = await ShowService.handle({ id })

    return response.ok(post)
  }

  async store({ request, response }) {
    const data = request.only([
      'name',
      'text',
      'postWhen',
      'instagram',
      'facebook',
      'twitter'
    ])

    const postImage = request.file('postImage', {
      types: ['image'],
      size: '4mb'
    })

    const allData = {
      ...data,
      postImage
    }

    const post = await StoreService.handle(allData)

    return response.ok(post)
  }

  async update({ params, request, response }) {
    const { id } = params
    const data = request.only([
      'name',
      'text',
      'postWhen',
      'instagram',
      'facebook',
      'twitter'
    ])

    const post = await UpdateService.handle(id, data)

    return response.ok(post)
  }

  async delete({ params, response }) {
    const { id } = params

    await DeleteService.handle(id)

    return response.ok()
  }
}

module.exports = PostController
