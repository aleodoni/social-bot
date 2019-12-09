'use strict'

const Schema = use('Schema')

class PostSchema extends Schema {
  up() {
    this.create('posts', table => {
      table.increments()
      table.string('name', 80).notNullable()
      table.text('text').notNullable()
      table.datetime('when')
      table.timestamps()
    })
  }

  down() {
    this.drop('posts')
  }
}

module.exports = PostSchema
