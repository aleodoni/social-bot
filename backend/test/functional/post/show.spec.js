'use strict'

const { test, trait, beforeEach } = use('Test/Suite')('Functional/Post/Show')
const Database = use('Database')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')

beforeEach(async () => {
  await Database.truncate('posts')
  await Factory.model('App/Models/Post').createMany(3, [
    ['Post 1', 'Post um', new Date(), true, true, true],
    ['Post 2', 'Post dois', new Date(), false, false, true],
    ['Post 3', 'Post três', new Date(), true, true, false]
  ])
})

test('get post service successfully', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .get('/api/posts/1')
    .loginVia(user)
    .end()

  assert.equal(response.status, 200)
  assert.equal(response.body.name, 'Post 1')
})

test('try to get inexistent post', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .get('/api/posts/100')
    .loginVia(user)
    .end()

  assert.equal(response.status, 404)
})
