'use strict'

class UserUpdate {
  get rules() {
    return {
      username: 'required',
      email: 'required|email',
      oldPassword: 'min:6',
      password: 'min:6|required_if:oldPassword',
      confirmPassword: 'min:6|required_if:password|same:password'
    }
  }
}

module.exports = UserUpdate
