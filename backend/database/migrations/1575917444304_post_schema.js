'use strict'

const Schema = use('Schema')

class PostSchema extends Schema {
  up() {
    this.create('posts', table => {
      table.increments()
      table.string('name', 80).notNullable()
      table.text('text').notNullable()
      table.datetime('post_when').notNullable()
      table.datetime('posted_when')
      table.boolean('instagram').defaultTo(true)
      table.boolean('facebook').defaultTo(true)
      table.boolean('twitter').defaultTo(true)
    })
  }

  down() {
    this.drop('posts')
  }
}

module.exports = PostSchema
