'use strict'

const User = use('App/Models/User')
const UsernameOrPasswordException = use(
  'App/Exceptions/UsernameOrPasswordException'
)

class RegisterService {
  constructor(Config) {
    this.Config = Config
  }

  async checkExists(email) {
    const searchEmail = await User.query()
      .where('email', email)
      .first()

    if (searchEmail) {
      throw new UsernameOrPasswordException()
    }
  }

  async handle(username, email, password) {
    const user = await User.create({ username, email, password })

    const userData = {
      id: user.id,
      username: user.username,
      email: user.email
    }

    return userData
  }
}

module.exports = new RegisterService()
