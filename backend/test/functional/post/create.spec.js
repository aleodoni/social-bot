'use strict'

const { test, trait, beforeEach } = use('Test/Suite')('Functional/Post/Create')
const Database = use('Database')
const Factory = use('Factory')
const Helpers = use('Helpers')

trait('Test/ApiClient')
trait('Auth/Client')

beforeEach(async () => {
  await Database.truncate('posts')
})

test('create post successfully', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()
  const img = Helpers.appRoot('test/imgtest.png')

  const response = await client
    .post('/api/posts')
    .loginVia(user)
    .field({ name: 'Post 1' })
    .field({ text: 'Post Um' })
    .field({ postWhen: '2019-12-12 12:00' })
    // .field({ instagram: true })
    .attach('postImage', img)
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
      postWhen: new Date()
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
      postWhen: new Date()
    })
    .end()

  assert.equal(response.status, 400)
  assert.equal(response.body[0].message, 'required validation failed on text')
})

test('try to insert post postWhen null', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .post('/api/posts')
    .loginVia(user)
    .field({ name: 'Post 1' })
    .field({ text: 'Post Um' })
    .end()

  assert.equal(response.status, 400)
  assert.equal(
    response.body[0].message,
    'required validation failed on postWhen'
  )
})
