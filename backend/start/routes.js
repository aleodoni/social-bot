'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('sessions', 'SessionController.store').validator('SessionStore')
  Route.get('sessions', 'SessionController.show').middleware('auth')

  Route.put('users', 'UserController.update')
    .middleware('auth')
    .validator('UserUpdate')

  Route.post('register', 'RegisterController.store').validator('Register')

  Route.get('posts', 'PostController.index').middleware('auth')
  Route.get('posts/:id', 'PostController.show').middleware('auth')
  Route.post('posts', 'PostController.store')
    .middleware('auth')
    .validator('Post')
  Route.put('posts/:id', 'PostController.update')
    .middleware('auth')
    .validator('Post')
  Route.delete('posts/:id', 'PostController.delete').middleware('auth')
}).prefix('api')
