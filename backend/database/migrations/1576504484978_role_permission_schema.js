'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RolePermissionSchema extends Schema {
  up() {
    this.create('role_permissions', table => {
      table.increments()

      table
        .integer('role_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('roles')

      table
        .integer('permission_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('permissions')

      table.unique(['role_id', 'permission_id'])

      table.timestamps()
    })
  }

  down() {
    this.drop('role_permissions')
  }
}

module.exports = RolePermissionSchema
