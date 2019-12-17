'use strict'

const { test, trait, beforeEach } = use('Test/Suite')(
  'Functional/Permission/Create'
)
const Database = use('Database')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')

beforeEach(async () => {
  await Database.truncate('permissions')
})

test('create permission successfully', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .post('/api/permissions')
    .loginVia(user)
    .field({ name: 'Read post' })
    .field({ description: 'Can read post' })
    .field({ slug: 'post_read' })
    .end()

  assert.equal(response.status, 200)
  assert.equal(response.body.name, 'Read post')
})

test('try to insert permission name null', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .post('/api/permissions')
    .loginVia(user)
    .send({
      name: null,
      description: 'Can read post',
      slug: 'post_read'
    })
    .end()

  assert.equal(response.status, 400)
  assert.equal(response.body[0].message, 'required validation failed on name')
})

test('try to insert permission description null', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .post('/api/permissions')
    .loginVia(user)
    .send({
      name: 'Read post',
      description: null,
      slug: 'post_read'
    })
    .end()

  assert.equal(response.status, 400)
  assert.equal(
    response.body[0].message,
    'required validation failed on description'
  )
})

test('try to insert permission slug null', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .post('/api/permissions')
    .loginVia(user)
    .send({
      name: 'Read post',
      description: 'Can read post',
      slug: null
    })
    .end()

  assert.equal(response.status, 400)
  assert.equal(response.body[0].message, 'required validation failed on slug')
})
