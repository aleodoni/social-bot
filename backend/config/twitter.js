'use strict'

const Env = use('Env')

module.exports = {
  page: Env.get('TW_BASE', ''),
  username: Env.get('TW_USERNAME', ''),
  password: Env.get('TW_PASSWORD', '')
}
