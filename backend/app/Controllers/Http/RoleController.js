'use strict'

const ListService = use('App/Services/Role/ListService')
const ShowService = use('App/Services/Role/ShowService')
const StoreService = use('App/Services/Role/StoreService')
const UpdateService = use('App/Services/Role/UpdateService')
const DeleteService = use('App/Services/Role/DeleteService')

class RoleController {
  async index({ request, response }) {
    const roles = await ListService.handle()

    return response.ok(roles)
  }

  async show({ params, response }) {
    const { id } = params

    const role = await ShowService.handle({ id })

    return response.ok(role)
  }

  async store({ request, response }) {
    const data = request.only(['name', 'description', 'slug'])

    const role = await StoreService.handle(data)

    return response.ok(role)
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

module.exports = RoleController
