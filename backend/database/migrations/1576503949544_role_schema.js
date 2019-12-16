'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoleSchema extends Schema {
  up() {
    this.create('roles', table => {
      table.increments()

      table.string('name', 40).notNullable()
      table.string('description', 256).notNullable()
      table.string('slug', 40).notNullable()

      table.timestamps()
    })
  }

  down() {
    this.drop('roles')
  }
}

module.exports = RoleSchema
