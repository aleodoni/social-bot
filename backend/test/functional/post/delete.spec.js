'use strict'

const { test, trait, beforeEach } = use('Test/Suite')('Functional/Post/Delete')
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
