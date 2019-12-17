'use strict'

const Permission = use('App/Models/Permission')

class UpdateService {
  async handle(id, data) {
    const permission = await Permission.findOrFail(id)

    const { name, description, slug } = data

    permission.merge({
      name,
      description,
      slug
    })

    await permission.save()

    return permission
  }
}

module.exports = new UpdateService()
