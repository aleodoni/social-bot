'use strict'

class Post {
  get rules() {
    return {
      name: 'required',
      text: 'required',
      postWhen: 'required'
    }
  }
}

module.exports = Post
