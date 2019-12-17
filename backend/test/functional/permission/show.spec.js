'use strict'

const { test, trait, beforeEach } = use('Test/Suite')(
  'Functional/Permission/Show'
)
const Database = use('Database')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')

beforeEach(async () => {
  await Database.truncate('permissions')

  await Factory.model('App/Models/Permission').createMany(2, [
    ['Read post', 'Can read post', 'post_read'],
    ['Create post', 'Can create post', 'post_create']
  ])
})

test('get permission successfully', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .get('/api/permissions/1')
    .loginVia(user)
    .end()

  assert.equal(response.status, 200)
  assert.equal(response.body.name, 'Read post')
})

test('try to get inexistent permission', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .get('/api/permissions/100')
    .loginVia(user)
    .end()

  assert.equal(response.status, 404)
})
