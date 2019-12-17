'use strict'

const { test, trait, beforeEach } = use('Test/Suite')(
  'Functional/Permission/Delete'
)
const Database = use('Database')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')

beforeEach(async () => {
  await Database.truncate('roles')
  await Factory.model('App/Models/Permission').createMany(1, [
    ['Create post', 'Can create post', 'post_create']
  ])
})

test('delete permission successfully', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .delete('/api/permissions/1')
    .loginVia(user)
    .end()

  assert.equal(response.status, 200)
})

test('try to delete permission inexistent', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .delete('/api/permissions/100')
    .loginVia(user)
    .end()

  assert.equal(response.status, 404)
})
