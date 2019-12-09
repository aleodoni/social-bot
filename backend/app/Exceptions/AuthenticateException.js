'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')
const message = 'Invalid Credentials'
const status = 401
const code = 'E_AUTHENTICATION'

class AuthenticateException extends LogicalException {
  constructor() {
    super(message, status, code)
  }
}

module.exports = AuthenticateException
