'use strict'

const Role = use('App/Models/Role')

class StoreService {
  async handle(data) {
    const { name, description, slug } = data

    const role = await Role.create({ name, description, slug })

    return role
  }
}

module.exports = new StoreService()
