'use strict'

const User = use('App/Models/User')
const GeneralException = use('App/Exceptions/GeneralException')

class UpdateService {
  async handle(user, data) {
    const { id } = user
    const { username, email, password } = data

    const userDB = await User.findOrFail(id)

    if (email && email !== user.email) {
      const userExists = await User.query()
        .where('email', email)
        .first()

      if (userExists) {
        throw new GeneralException(400, 'email exists.')
      }
    }

    userDB.username = username
    userDB.email = email

    if (password) {
      userDB.password = password
    }

    await userDB.save()

    return userDB
  }
}

module.exports = new UpdateService()
