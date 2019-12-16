'use strict'

const Role = use('App/Models/Role')

class UpdateService {
  async handle(id, data) {
    const role = await Role.findOrFail(id)

    const { name, description, slug } = data

    role.merge({
      name,
      description,
      slug
    })

    await role.save()

    return role
  }
}

module.exports = new UpdateService()
