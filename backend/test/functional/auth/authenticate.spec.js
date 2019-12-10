'use strict'

const Factory = use('Factory')
const User = use('App/Models/User')
const { test, trait } = use('Test/Suite')('Authenticate User')

trait('Test/ApiClient')
trait('Auth/Client')

test('authenticate user using email/password', async ({ assert, client }) => {
  const { username, email, password } = await Factory.model(
    'App/Models/User'
  ).make()

  const userCreated = new User()

  userCreated.fill({
    username,
    email,
    password
  })

  await userCreated.save()

  const response = await client
    .post('/api/sessions')
    .send({ email, password })
    .end()

  response.assertStatus(200)

  assert.isDefined(response.body.token)
})

test('authentication error wrong password', async ({ assert, client }) => {
  const user = await User.first()

  const response = await client
    .post('/api/sessions')
    .send({ email: user.email, password: '333444' })
    .end()

  assert.equal(response.status, 401)
  assert.isUndefined(response.body.token)
})

test('authentication error missing email', async ({ assert, client }) => {
  const response = await client
    .post('/api/sessions')
    .send({ password: '333444' })
    .end()

  response.assertStatus(400)

  assert.isUndefined(response.body.token)
})

test('authentication fails missing password', async ({ assert, client }) => {
  const response = await client
    .post('/api/sessions')
    .send({ email: 'dummy@test' })
    .end()

  response.assertStatus(400)

  assert.isUndefined(response.body.token)
})

test('get user info', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .get('/api/sessions')
    .loginVia(user)
    .end()

  response.assertStatus(200)
  assert.property(response.body, 'id')
  assert.property(response.body, 'username')
  assert.property(response.body, 'email')
})
