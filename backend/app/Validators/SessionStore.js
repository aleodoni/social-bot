'use strict'

class SessionStore {
  get rules() {
    return {
      email: 'required',
      password: 'required'
    }
  }
}

module.exports = SessionStore
