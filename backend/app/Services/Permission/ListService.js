'use strict'

const Permission = use('App/Models/Permission')

class ListService {
  async handle() {
    const permissions = await Permission.query()
      .orderBy('name')
      .fetch()

    return permissions
  }
}

module.exports = new ListService()
