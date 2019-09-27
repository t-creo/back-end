import ErrorHandler from '../../src/errorHandling/errorHandler'

var assert = require('assert')

describe('Error Handler', () => {
  
  test('Return HTTP error code 400', () => {
    assert.deepEqual(ErrorHandler('400'),
      {
        status      : 400,
        title       : 'Bad Request',
        message     : 'A validation failed',
        userMessage : 'An error has ocurred',
      }
    )
  })

  test('Return HTTP error code 401', () => {
    assert.deepEqual(ErrorHandler('401'),
      {
        status      : 401,
        title       : 'Unauthorized',
        message     : 'Not authenticated',
        userMessage : 'Client needs to authenticate',
      }
    )
  })

  test('Return HTTP error code 403', () => {
    assert.deepEqual(ErrorHandler('403'),
      {
        status      : 403,
        title       : 'Forbidden',
        message     : 'Cannot Access',
        userMessage : 'Client cannot access this resource',
      }
    )
  })

  test('Return HTTP error code 500', () => {
    assert.deepEqual(ErrorHandler('500'),
      {
        status      : 500,
        title       : 'Internal Server Error',
        message     : 'An error has ocurred',
        userMessage : 'An error has ocurred',
      }
    )
  })

  test('Request invalid code', () => {
    assert.deepEqual(ErrorHandler('999'),
      {
        status      : -1,
        title       : 'Invalid Error Code',
        message     : 'Invalid error code',
        userMessage : 'Invalid error code',
      }
    )
  })
})