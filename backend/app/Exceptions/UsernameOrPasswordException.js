'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')
const message = 'Username or email already exists'
const status = 400
const code = 'E_USEREMAILEXISTS'

class UsernameOrPasswordException extends LogicalException {
  constructor() {
    super(message, status, code)
  }
}

module.exports = UsernameOrPasswordException
