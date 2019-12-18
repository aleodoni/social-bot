'use strict'

const Schema = use('Schema')

class PostSchema extends Schema {
  up() {
    this.create('posts', table => {
      table.increments()
      table.string('name', 80).notNullable()
      table.text('text').notNullable()
      table.datetime('post_when').notNullable()
      table
        .boolean('instagram')
        .defaultTo(true)
        .notNullable()
      table
        .boolean('facebook')
        .defaultTo(true)
        .notNullable()
      table
        .boolean('twitter')
        .defaultTo(true)
        .notNullable()
      table.datetime('posted_instagram')
      table.datetime('posted_facebook')
      table.datetime('posted_twitter')
    })
  }

  down() {
    this.drop('posts')
  }
}

module.exports = PostSchema
