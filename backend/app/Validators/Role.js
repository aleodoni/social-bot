'use strict'

class Role {
  get rules() {
    return {
      name: 'required',
      description: 'required',
      slug: 'required'
    }
  }
}

module.exports = Role
