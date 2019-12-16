'use strict'

const Role = use('App/Models/Role')

class ShowService {
  async handle({ id }) {
    const role = await Role.findOrFail(id)

    return role
  }
}

module.exports = new ShowService()
