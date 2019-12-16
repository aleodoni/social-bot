'use strict'

const { test, trait, beforeEach } = use('Test/Suite')('Functional/Role/Update')
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

test('update role successfully', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .put('/api/roles/1')
    .loginVia(user)
    .send({
      name: 'Admin',
      description: 'Admin Updated',
      slug: 'admin'
    })
    .end()

  assert.equal(response.status, 200)
  assert.equal(response.body.description, 'Admin Updated')
})

test('try to update inexistent role', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .put('/api/roles/100')
    .loginVia(user)
    .send({
      name: 'Admin',
      description: 'System Admin',
      slug: 'admin'
    })
    .end()

  assert.equal(response.status, 404)
})

test('try to update role name null', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .put('/api/roles/1')
    .loginVia(user)
    .send({
      name: null,
      description: 'System Admin',
      slug: 'admin'
    })
    .end()

  assert.equal(response.status, 400)
  assert.equal(response.body[0].message, 'required validation failed on name')
})

test('try to update post description null', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .put('/api/roles/1')
    .loginVia(user)
    .send({
      name: 'Post 1',
      description: null,
      slug: 'admin'
    })
    .end()

  assert.equal(response.status, 400)
  assert.equal(
    response.body[0].message,
    'required validation failed on description'
  )
})

test('try to update role slug null', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .put('/api/roles/1')
    .loginVia(user)
    .send({
      name: 'Admin',
      description: 'System Admin',
      slug: null
    })
    .end()

  assert.equal(response.status, 400)
  assert.equal(response.body[0].message, 'required validation failed on slug')
})
