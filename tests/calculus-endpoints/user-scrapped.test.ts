import request from 'supertest'
import app from '../../src/app'
import { Credibility, TwitterUser } from '../../src/calculator/models'

interface userCredibilityParams extends TwitterUser {
    verified: boolean,
    yearJoined: number
}

describe('/user/scrape endpoint', () => {
  describe('http 200 calls', () => {
    function testCredibilityWithOkData(
      expectedReturn: Credibility, params: userCredibilityParams) {
      return request(app)
        .get('/calculate/user/scrape')
        .query(params)
        .expect(200)
        .expect(expectedReturn)
    }
    describe('verified true, year joined 2006', () => {
      const params = {
        followersCount: 123,
        friendsCount: 12
      }
      it('returns credibility=100', () => {
        return testCredibilityWithOkData({ credibility: 100 }, {
          verified: true,
          yearJoined: 2006,
          ...params
        })
      })
    })
  })
})
