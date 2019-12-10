'use strict'

class Register {
  get rules() {
    return {
      username: 'required',
      email: 'required|email',
      password: 'required|min:6'
    }
  }
}

module.exports = Register
