'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostimageSchema extends Schema {
  up() {
    this.create('post_images', table => {
      table.increments()

      table
        .integer('post_id')
        .unsigned()
        .references('id')
        .inTable('posts')
        .notNullable()

      table.string('name').notNullable()

      table.string('path').notNullable()

      table.timestamps()
    })
  }

  down() {
    this.drop('post_images')
  }
}

module.exports = PostimageSchema
