'use strict'

const Env = use('Env')

module.exports = {
  page: Env.get('IG_BASE', ''),
  username: Env.get('IG_USERNAME', ''),
  password: Env.get('IG_PASSWORD', '')
}
