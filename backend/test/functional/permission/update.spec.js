'use strict'

const { test, trait, beforeEach } = use('Test/Suite')(
  'Functional/Permission/Update'
)
const Database = use('Database')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')

beforeEach(async () => {
  await Database.truncate('permissions')
  await Factory.model('App/Models/Permission').createMany(1, [
    ['Read post', 'Can read post', 'post_read']
  ])
})

test('update permission successfully', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .put('/api/permissions/1')
    .loginVia(user)
    .send({
      name: 'Read post',
      description: 'Can read post updated',
      slug: 'post_read'
    })
    .end()

  assert.equal(response.status, 200)
  assert.equal(response.body.description, 'Can read post updated')
})

test('try to update inexistent permission', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .put('/api/permissions/100')
    .loginVia(user)
    .send({
      name: 'Read post',
      description: 'Can read post',
      slug: 'post_read'
    })
    .end()

  assert.equal(response.status, 404)
})

test('try to update permission name null', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .put('/api/permissions/1')
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

test('try to update permission description null', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .put('/api/permissions/1')
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

test('try to update permission slug null', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .put('/api/permissions/1')
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
