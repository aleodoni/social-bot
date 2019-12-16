'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserRoleSchema extends Schema {
  up() {
    this.create('user_roles', table => {
      table.increments()

      table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')

      table
        .integer('role_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('roles')

      table.unique(['user_id', 'role_id'])

      table.timestamps()
    })
  }

  down() {
    this.drop('user_roles')
  }
}

module.exports = UserRoleSchema
