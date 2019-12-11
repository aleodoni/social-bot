'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', faker => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: '123456'
  }
})

Factory.blueprint('App/Models/Post', (faker, index, data) => {
  return {
    name: data[index][0],
    text: data[index][1],
    post_when: data[index][2]
  }
})
