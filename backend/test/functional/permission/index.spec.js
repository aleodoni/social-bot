'use strict'

const { test, trait, beforeEach } = use('Test/Suite')(
  'Functional/Permission/Index'
)
const Database = use('Database')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')

beforeEach(async () => {
  await Database.truncate('permissions')

  await Factory.model('App/Models/Permission').createMany(2, [
    ['Read posts', 'Can read posts', 'posts_read'],
    ['Create posts', 'Can create posts', 'posts_create']
  ])
})

test('load permissions successfully', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .get('/api/permissions')
    .loginVia(user)
    .end()

  assert.equal(response.status, 200)
  assert.typeOf(response.body, 'array')
  assert.lengthOf(response.body, 2)
})
