'use strict'

const Role = use('App/Models/Role')

class DeleteService {
  async handle(id) {
    const role = await Role.findOrFail(id)

    await role.delete()
  }
}

module.exports = new DeleteService()
