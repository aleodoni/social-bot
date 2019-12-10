'use strict'

const UpdateService = use('App/Services/User/UpdateService')

class UserController {
  async update({ auth, request, response }) {
    const user = await auth.getUser()

    const data = request.only([
      'username',
      'email',
      'oldPassword',
      'password',
      'confirmPassword'
    ])

    const userUpdated = await UpdateService.handle(user, data)

    return response.ok(userUpdated)
  }
}

module.exports = UserController
