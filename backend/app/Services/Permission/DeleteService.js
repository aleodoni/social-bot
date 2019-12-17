'use strict'

const Permission = use('App/Models/Permission')

class DeleteService {
  async handle(id) {
    const permission = await Permission.findOrFail(id)

    await permission.delete()
  }
}

module.exports = new DeleteService()
