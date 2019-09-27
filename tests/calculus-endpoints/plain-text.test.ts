import request from 'supertest'
import app from '../../src/app'
import { Credibility } from '../../src/calculator/models'

describe('/calculate/plain-text endpoint', () => {
  test('returns http status code 200 on valid input', () => {
    const expectedReturn : Credibility = {
      credibility: 1
    }
    return request(app)
      .get('/calculate/plain-text')
      .expect(200)
      .expect(expectedReturn)
  })
})
