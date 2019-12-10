'use strict'

const RegisterService = use('App/Services/RegisterService')

class RegisterController {
  async store({ request, response }) {
    const { username, email, password } = request.all()

    try {
      await RegisterService.checkExists(email)

      const userData = await RegisterService.register(username, email, password)

      return response.ok({
        user: userData
      })
    } catch (err) {
      return response.status(err.status).send({ error: err.message })
    }
  }
}

module.exports = RegisterController
