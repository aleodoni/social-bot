'use strict'

class Permission {
  get rules() {
    return {
      name: 'required',
      description: 'required',
      slug: 'required'
    }
  }
}

module.exports = Permission
