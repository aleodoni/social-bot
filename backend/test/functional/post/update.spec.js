'use strict'

const { test, trait, beforeEach } = use('Test/Suite')('Functional/Post/Update')
const Database = use('Database')
const Factory = use('Factory')
const Post = use('App/Models/Post')

trait('Test/ApiClient')
trait('Auth/Client')

beforeEach(async () => {
  await Database.truncate('posts')
  await Factory.model('App/Models/Post').createMany(1, [
    ['Post 1', 'Post um', new Date(), true, true, false]
  ])
})

test('update post successfully', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .put('/api/posts/1')
    .loginVia(user)
    .send({
      name: 'Post 1',
      text: 'Post Um Alterado',
      postWhen: new Date(),
      instagram: true,
      facebook: true,
      twitter: true
    })
    .end()

  assert.equal(response.status, 200)
  assert.equal(response.body.text, 'Post Um Alterado')
  assert.equal(response.body.twitter, true)
})

test('try to update post inexistent', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .put('/api/posts/100')
    .loginVia(user)
    .send({
      name: 'Post 1',
      text: 'Post Um Alterado',
      postWhen: new Date()
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
      post_when: new Date()
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
      post_when: new Date()
    })
    .end()

  assert.equal(response.status, 400)
  assert.equal(response.body[0].message, 'required validation failed on text')
})

test('try to update post postWhen null', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .put('/api/posts/1')
    .loginVia(user)
    .send({
      name: 'Post 1',
      text: 'Post um Alterado',
      postWhen: null
    })
    .end()

  assert.equal(response.status, 400)
  assert.equal(
    response.body[0].message,
    'required validation failed on postWhen'
  )
})

test('try to update a posted post', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  await Post.create({
    name: 'Post Postado',
    text: 'Post já postado',
    post_when: new Date('2019-01-01 10:00'),
    posted_when: new Date('2019-01-01 10:00')
  })

  const response = await client
    .put('/api/posts/2')
    .loginVia(user)
    .send({
      name: 'Post 1',
      text: 'Post um Alterado',
      postWhen: new Date()
    })
    .end()

  assert.equal(response.status, 400)
  assert.deepEqual(response.body, { error: "Can't update a posted post" })
})
