'use strict'

const { test, trait, beforeEach } = use('Test/Suite')('Functional/Role/Index')
const Database = use('Database')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')

beforeEach(async () => {
  await Database.truncate('roles')

  await Factory.model('App/Models/Role').createMany(2, [
    ['Admin', 'System Administrators', 'admin'],
    ['User', 'System Users', 'user']
  ])
})

test('load roles successfully', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .get('/api/roles')
    .loginVia(user)
    .end()

  assert.equal(response.status, 200)
  assert.typeOf(response.body, 'array')
  assert.lengthOf(response.body, 2)
})
