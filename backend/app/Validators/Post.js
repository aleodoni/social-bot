'use strict'

class Post {
  get rules() {
    return {
      name: 'required',
      text: 'required'
    }
  }
}

module.exports = Post
