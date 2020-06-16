/* eslint-disable */
import request from 'supertest'
import Twit from 'twit'
import app from '../../src/app'
import { Credibility } from '../../src/calculator/models'

jest.mock('twit')

describe('/calculate/twitter/social/:userId endpoint', () => {

  beforeAll(() => {
    Twit.prototype.get = jest.fn((path: string, params?: any) =>new Promise((resolve:any, reject:any) => resolve({
      data: {
        id: 91891658,
        followers_count: 116,
        friends_count: 138,
        created_at: 'Mon Feb 21 01:59:02 +0000 2011',
        verified: false,
      }
    })))
  })

  describe('http 200 requests', () => {
    function testCredibilityWithOkData(
      expectedReturn : Credibility, params: object) {
      return request(app)
        .get('/calculate/twitter/social/91891658')
        .query(params)
        .expect(200)
        .then(response => {
          expect(response.body.credibility).toBeCloseTo(expectedReturn.credibility)
        })
    }

    describe('test ok data', () => {
      const params = {
        maxFollowers: 2000000
      }
      it('returns credibility=22.83754566929134 with', () => {
        return testCredibilityWithOkData({ credibility: 22.83754566929134 }, params)
      })
    })
  })
})
