'use strict'

const Env = use('Env')
const Youch = use('youch')
const BaseExceptionHandler = use('BaseExceptionHandler')

class ExceptionHandler extends BaseExceptionHandler {
  async handle(error, { request, response }) {
    if (error.name === 'InvalidJwtToken') {
      return response.status(error.status).send({ error: 'Invalid Token' })
    }

    if (error.name === 'PasswordMisMatchException') {
      return response.status(401).send({ error: 'Password Mismatch' })
    }

    if (error.name === 'NotFoundException') {
      return response.status(error.status).send({ error: 'Not Found' })
    }

    if (error.name === 'ValidationException') {
      return response.status(error.status).send(error.messages)
    }

    if (error.name === 'AuthenticateException') {
      return response
        .status(error.status)
        .send({ error: 'Invalid Credentials' })
    }

    if (error.name === 'InvalidTokenException') {
      return response.status(error.status).send({ error: 'Token Invalid' })
    }

    if (error.name === 'ModelNotFoundException') {
      return response.status(error.status).send({ error: 'Not Found' })
    }

    if (Env.get('NODE_ENV') === 'development') {
      const youch = new Youch(error, request.request)
      const errorJSON = await youch.toJSON()

      return response.status(error.status).send(errorJSON)
    }

    return response.status(error.status)
  }

  async report(error, { request }) {
    console.log(error)
  }
}

module.exports = ExceptionHandler
