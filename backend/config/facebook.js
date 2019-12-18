'use strict'

const Env = use('Env')

module.exports = {
  page: Env.get('FB_BASE', ''),
  username: Env.get('FB_USERNAME', ''),
  password: Env.get('FB_PASSWORD', '')
}
