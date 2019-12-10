'use strict'

class SessionController {
  async store({ auth, request }) {
    const { email, password } = request.only(['email', 'password'])

    const token = await auth.attempt(email, password)
    return token
  }

  async show({ auth }) {
    const user = auth.getUser()

    return user
  }
}

module.exports = SessionController
