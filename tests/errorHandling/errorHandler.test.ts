import HttpError, { BadRequestError, UnauthorizedError, UnauthenticatedError, InternalServerError } from '../../src/errorHandling/httpError'

var assert = require('assert')

describe('Error Handler', () => {

  test('Return HTTP error code 400', () => {
    try {
      throw new BadRequestError([{
        'field': 'text',
        'errorMessage': 'some error',
        'userErrorMessage': 'some error',
        'validationCode': 'text.REQUIRED'
      }])
    } catch (e) {
      assert.deepEqual(e,
        {
          status: 400,
          title: 'Bad Request',
          message: 'A validation failed',
          userMessage: 'An error has ocurred',
          errors: [{
            field: 'text',
            errorMessage: 'some error',
            userErrorMessage: 'some error',
            validationCode: 'text.REQUIRED'
          }]
        }
      )
    }
  })

  test('Return HTTP error code 401', () => {
    try {
      throw new UnauthenticatedError()
    } catch (e) {
      assert.deepEqual(e,
        {
          status: 401,
          title: 'Unauthorized',
          message: 'Not authenticated',
          userMessage: 'Client needs to authenticate',
        }
      )
    }
  })

  test('Return HTTP error code 403', () => {
    try {
      throw new UnauthorizedError()
    } catch (e) {
      assert.deepEqual(e,
        {
          status: 403,
          title: 'Forbidden',
          message: 'Cannot Access',
          userMessage: 'Client cannot access this resource',
        }
      )
    }
  })

  test('Return HTTP error code 500', () => {
    try {
      throw new InternalServerError()
    } catch (e) {
      assert.deepEqual(e,
        {
          status: 500,
          title: 'Internal Server Error',
          message: 'An error has ocurred',
          userMessage: 'An error has ocurred',
        }
      )
    }
  })
})