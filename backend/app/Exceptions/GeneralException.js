'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class GeneralException extends LogicalException {
  constructor(status, message) {
    super(message, status)
  }
}

module.exports = GeneralException
