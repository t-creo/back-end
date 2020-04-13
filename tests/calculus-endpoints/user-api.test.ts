/* eslint-disable */
import request from 'supertest'
import Twit from 'twit'
import app from '../../src/app'
import { Credibility } from '../../src/calculator/models'

jest.mock('twit')

describe('/twitter/user/:id endpoint', () => {

  beforeAll(() => {
    Twit.prototype.get = jest.fn((path: string, params?: any) =>new Promise((resolve:any, reject:any) => resolve({
      data: {
        id: 91891658,
        name: 'Test name',
        followers_count: 116,
        friends_count: 138,
        created_at: 'Mon Feb 21 01:59:02 +0000 2011',
        verified: false,
      }
    })))
  })

  describe('http 200 calls', () => {
    function testCredibilityWithOkData(
      expectedReturn: Credibility) {
      return request(app)
        .get('/calculate/twitter/user/91891658')
        .expect(200)
        .then(response => {
          expect(response.body.credibility).toBeCloseTo(expectedReturn.credibility)
        })
    }
    describe('user 91891658', () => {
      it('returns credibility=30.76923076923077', () => {
        return testCredibilityWithOkData({ credibility: 32.142857142857146 })
      })
    })
  })
})
