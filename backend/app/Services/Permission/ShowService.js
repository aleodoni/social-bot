'use strict'

const Permission = use('App/Models/Permission')

class ShowService {
  async handle({ id }) {
    const permission = await Permission.findOrFail(id)

    return permission
  }
}

module.exports = new ShowService()
