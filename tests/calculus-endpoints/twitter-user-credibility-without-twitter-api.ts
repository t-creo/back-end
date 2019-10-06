import request from 'supertest'
import app from '../../src/app'
import { Credibility, TwitterUser } from '../../src/calculator/models'

interface userCredibilityParams extends TwitterUser {
    verified: boolean,
    yearJoined: number
}

describe('/calculate/user/scrape/:verified/:accountCreationYear endpoint', () => {
  describe('http 200 calls', () => {
    function testCredibilityWithOkData(
      expectedReturn: Credibility, params: userCredibilityParams) {
      return request(app)
        .get('/calculate/social/scraped')
        .query(params)
        .expect(200)
        .expect(expectedReturn)
    }
    describe('verified true, year joined 2006', () => {
      const params = {
        name: '',
        followersCount: 0,
        friendsCount: 0
      }
      it('returns credibility=51', () => {
        return testCredibilityWithOkData({ credibility: 51 }, {
          verified: true,
          yearJoined: 2006,
          ...params
        })
      })
    })
  })
})
