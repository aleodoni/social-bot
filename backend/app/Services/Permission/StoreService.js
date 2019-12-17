'use strict'

const Permission = use('App/Models/Permission')

class StoreService {
  async handle(data) {
    const { name, description, slug } = data

    const permission = await Permission.create({ name, description, slug })

    return permission
  }
}

module.exports = new StoreService()
