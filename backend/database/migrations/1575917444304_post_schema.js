'use strict'

const Schema = use('Schema')

class PostSchema extends Schema {
  up() {
    this.create('posts', table => {
      table.increments()
      table.string('name', 80).notNullable()
      table.text('text').notNullable()
      table.datetime('post_when')
      table.datetime('posted_when')
    })
  }

  down() {
    this.drop('posts')
  }
}

module.exports = PostSchema
