'use strict'

const { test, trait, beforeEach } = use('Test/Suite')('Services/Post/List')
const Database = use('Database')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')

beforeEach(async () => {
  await Database.truncate('posts')
  await Factory.model('App/Models/Post').createMany(3, [
    ['Post 1', 'Post um', new Date()],
    ['Post 2', 'Post dois', new Date()],
    ['Post 3', 'Post três', new Date()]
  ])
})

test('call post service successfully', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .get('/api/posts')
    .loginVia(user)
    .end()

  assert.equal(response.status, 200)
  console.log(response.body)
  assert.typeOf(response.body, 'array')
})
