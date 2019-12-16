'use strict'

const { test, trait, beforeEach } = use('Test/Suite')('Functional/Role/Create')
const Database = use('Database')
const Factory = use('Factory')
const Helpers = use('Helpers')

trait('Test/ApiClient')
trait('Auth/Client')

beforeEach(async () => {
  await Database.truncate('roles')
})

test('create role successfully', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .post('/api/roles')
    .loginVia(user)
    .field({ name: 'Admin' })
    .field({ description: 'System Admin' })
    .field({ slug: 'admin' })
    .end()

  assert.equal(response.status, 200)
  assert.equal(response.body.name, 'Admin')
})

test('try to insert role name null', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .post('/api/roles')
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

test('try to insert role description null', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .post('/api/roles')
    .loginVia(user)
    .send({
      name: 'Admin',
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

test('try to insert role slug null', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .post('/api/roles')
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
