'use strict'

const { test, trait, beforeEach } = use('Test/Suite')('Functional/Role/Show')
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

test('get role successfully', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .get('/api/roles/1')
    .loginVia(user)
    .end()

  assert.equal(response.status, 200)
  assert.equal(response.body.name, 'Admin')
})

test('try to get inexistent role', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .get('/api/roles/100')
    .loginVia(user)
    .end()

  assert.equal(response.status, 404)
})
