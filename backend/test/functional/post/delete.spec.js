'use strict'

const { test, trait, beforeEach } = use('Test/Suite')('Functional/Post/Delete')
const Database = use('Database')
const Factory = use('Factory')
const Post = use('App/Models/Post')

trait('Test/ApiClient')
trait('Auth/Client')

beforeEach(async () => {
  await Database.truncate('posts')
  await Factory.model('App/Models/Post').createMany(1, [
    ['Post 1', 'Post um', new Date(), true, true, true]
  ])
})

test('delete post successfully', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .delete('/api/posts/1')
    .loginVia(user)
    .end()

  assert.equal(response.status, 200)
})

test('try to delete post inexistent', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .delete('/api/posts/100')
    .loginVia(user)
    .end()

  assert.equal(response.status, 404)
})

test('try to delete a posted post', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  await Post.create({
    name: 'Post Postado',
    text: 'Post já postado',
    post_when: new Date('2019-01-01 10:00'),
    posted_when: new Date('2019-01-01 10:00'),
    instagram: true,
    facebook: true,
    twitter: false
  })

  const response = await client
    .delete('/api/posts/2')
    .loginVia(user)
    .send({
      name: 'Post 1',
      text: 'Post um Alterado',
      post_when: null
    })
    .end()

  assert.equal(response.status, 400)
  assert.deepEqual(response.body, { error: "Can't delete a posted post" })
})
