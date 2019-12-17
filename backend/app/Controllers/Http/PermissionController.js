'use strict'

const ListService = use('App/Services/Permission/ListService')
const ShowService = use('App/Services/Permission/ShowService')
const StoreService = use('App/Services/Permission/StoreService')
const UpdateService = use('App/Services/Permission/UpdateService')
const DeleteService = use('App/Services/Permission/DeleteService')

class PermissionController {
  async index({ request, response }) {
    const permissions = await ListService.handle()

    return response.ok(permissions)
  }

  async show({ params, response }) {
    const { id } = params

    const permission = await ShowService.handle({ id })

    return response.ok(permission)
  }

  async store({ request, response }) {
    const data = request.only(['name', 'description', 'slug'])

    const permission = await StoreService.handle(data)

    return response.ok(permission)
  }

  async update({ params, request, response }) {
    const { id } = params

    const data = request.only(['name', 'description', 'slug'])

    const post = await UpdateService.handle(id, data)

    return response.ok(post)
  }

  async delete({ params, response }) {
    const { id } = params

    await DeleteService.handle(id)

    return response.ok()
  }
}

module.exports = PermissionController
