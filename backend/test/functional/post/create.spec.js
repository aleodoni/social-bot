'use strict'

const { test, trait, beforeEach } = use('Test/Suite')('Functional/Post/Create')
const Database = use('Database')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')

beforeEach(async () => {
  await Database.truncate('posts')
})

test('create post successfully', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .post('/api/posts')
    .loginVia(user)
    .send({
      name: 'Post 1',
      text: 'Post Um',
      when: new Date()
    })
    .end()

  assert.equal(response.status, 200)
  assert.equal(response.body.name, 'Post 1')
})

test('try to insert post name null', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .post('/api/posts')
    .loginVia(user)
    .send({
      name: null,
      text: 'Post Um',
      when: new Date()
    })
    .end()

  assert.equal(response.status, 400)
  assert.equal(response.body[0].message, 'required validation failed on name')
})

test('try to insert post text null', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .post('/api/posts')
    .loginVia(user)
    .send({
      name: 'Post 1',
      text: null,
      when: new Date()
    })
    .end()

  assert.equal(response.status, 400)
  assert.equal(response.body[0].message, 'required validation failed on text')
})

test('try to insert post when null', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .post('/api/posts')
    .loginVia(user)
    .send({
      name: 'Post 1',
      text: 'Post um',
      when: null
    })
    .end()

  assert.equal(response.status, 200)
  assert.equal(response.body.name, 'Post 1')
})