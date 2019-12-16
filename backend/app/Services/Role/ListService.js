'use strict'

const Role = use('App/Models/Role')

class ListService {
  async handle() {
    const roles = await Role.query()
      .orderBy('name')
      .fetch()

    return roles
  }
}

module.exports = new ListService()
