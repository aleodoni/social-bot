'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

module.exports = {
  format: Env.get('DATE_FORMAT', 'dd/MM/yyyy')
}
