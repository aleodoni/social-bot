'use strict'

const { test, trait, beforeEach } = use('Test/Suite')('Functional/Post/Update')
const Database = use('Database')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')

beforeEach(async () => {
  await Database.truncate('posts')
  await Factory.model('App/Models/Post').createMany(1, [
    ['Post 1', 'Post um', new Date()]
  ])
})

test('update post successfully', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .put('/api/posts/1')
    .loginVia(user)
    .send({
      name: 'Post 1',
      text: 'Post Um Alterado'
    })
    .end()

  assert.equal(response.status, 200)
  assert.equal(response.body.text, 'Post Um Alterado')
})

test('try to update post inexistent', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .put('/api/posts/100')
    .loginVia(user)
    .send({
      name: 'Post 1',
      text: 'Post Um Alterado'
    })
    .end()

  assert.equal(response.status, 404)
})

test('try to update post name null', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .put('/api/posts/1')
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

test('try to update post text null', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .put('/api/posts/1')
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

test('try to update post when null', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .put('/api/posts/1')
    .loginVia(user)
    .send({
      name: 'Post 1',
      text: 'Post um Alterado',
      when: null
    })
    .end()

  assert.equal(response.status, 200)
  assert.equal(response.body.text, 'Post um Alterado')
})
