'use strict'

const { test, trait, beforeEach } = use('Test/Suite')('Functional/Post/Index')
const Database = use('Database')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')

beforeEach(async () => {
  await Database.truncate('posts')
  await Factory.model('App/Models/Post').createMany(3, [
    ['Post 1', 'Post um', new Date('2020-12-11 00:00'), true, true, true],
    ['Post 2', 'Post dois', new Date('2019-12-11 00:00'), false, false, true],
    ['Post 3', 'Post três', new Date('2019-12-11 00:00'), true, true, false]
  ])
})

test('load posts successfully', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .get('/api/posts?date=2019-12-11')
    .loginVia(user)
    .end()

  assert.equal(response.status, 200)
  assert.typeOf(response.body, 'array')
  assert.lengthOf(response.body, 2)
})
