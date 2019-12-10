'use strict'

const Factory = use('Factory')
const Database = use('Database')
const User = use('App/Models/User')

const { test, trait, beforeEach } = use('Test/Suite')('User Profile')

trait('Test/ApiClient')
trait('Auth/Client')

beforeEach(async () => {
  await Database.truncate('users')
})

test('update profile without changing password', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .put('/api/users')
    .loginVia(user)
    .send({
      username: 'zaca',
      email: 'zaca@baratinha.com'
    })
    .end()

  response.assertStatus(200)
  assert.equal(response.body.username, 'zaca')
})

test('update password profile', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .put('/api/users')
    .loginVia(user)
    .send({
      username: 'zaca',
      email: 'zaca@baratinha.com',
      oldPassword: user.password,
      password: '123456',
      confirmPassword: '123456'
    })
    .end()

  response.assertStatus(200)
  assert.equal(response.body.username, 'zaca')
})

test('try to update password profile with wrong confirmation', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .put('/api/users')
    .loginVia(user)
    .send({
      username: 'zaca',
      email: 'zaca@baratinha.com',
      oldPassword: user.password,
      password: '123456',
      confirmPassword: 'xxxxxxx'
    })
    .end()

  response.assertStatus(400)
  assert.equal(
    response.body[0].message,
    'same validation failed on confirmPassword'
  )
})

test('try to update password profile without password', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .put('/api/users')
    .loginVia(user)
    .send({
      username: 'zaca',
      email: 'zaca@baratinha.com',
      oldPassword: user.password
    })
    .end()

  response.assertStatus(400)
  assert.equal(
    response.body[0].message,
    'required_if validation failed on password'
  )
})

test('try to update a profile with existing email', async ({
  assert,
  client
}) => {
  const { username, email, password } = await Factory.model(
    'App/Models/User'
  ).make()

  await User.create({
    username: username,
    email: email,
    password: password
  })

  const user = await User.create({
    username: 'ZACA',
    email: 'zaca@gmail.com',
    password: password
  })

  const response = await client
    .put('/api/users')
    .loginVia(user)
    .send({
      username: 'ZACA',
      email: email
    })
    .end()

  response.assertStatus(400)
  assert.equal(response.body.error, 'email exists.')
})
