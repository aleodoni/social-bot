'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
  static boot() {
    super.boot()
  }

  image() {
    return this.hasOne('App/Models/PostImage')
  }

  static get createdAtColumn() {
    return null
  }

  static get updatedAtColumn() {
    return null
  }
}

module.exports = Post
