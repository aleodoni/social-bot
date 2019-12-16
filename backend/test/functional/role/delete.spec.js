'use strict'

const { test, trait, beforeEach } = use('Test/Suite')('Functional/Role/Delete')
const Database = use('Database')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')

beforeEach(async () => {
  await Database.truncate('roles')
  await Factory.model('App/Models/Role').createMany(1, [
    ['Admin', 'System Admin', 'admin']
  ])
})

test('delete role successfully', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .delete('/api/roles/1')
    .loginVia(user)
    .end()

  assert.equal(response.status, 200)
})

test('try to delete role inexistent', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .delete('/api/roles/100')
    .loginVia(user)
    .end()

  assert.equal(response.status, 404)
})
