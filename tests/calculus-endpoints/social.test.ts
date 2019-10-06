import request from 'supertest'
import app from '../../src/app'
import { Credibility, TwitterUser } from '../../src/calculator/models'

describe('/calculate/social/scraped endpoint', () => {
  describe('http 200 calls', () => {
    function testCredibilityWithOkData(
      expectedReturn : Credibility, params: TwitterUser) {
      return request(app)
        .get('/calculate/social/scraped')
        .query(params)
        .expect(200)
        .expect(expectedReturn)
    }

    describe('1.200.000 followers, 421 following', () => {
      const params = {
        name: '',
        verified: false,
        yearJoined: 2000,
        followersCount: 1200000,
        friendsCount: 421
      }
      it('returns credibility=30.04999998245834 with', () => {
        return testCredibilityWithOkData({ credibility: 30.04999998245834 }, params)
      })
    })

    // This should be a test when we determine what credibiliy
    // the 0,0 pair should return.
    // describe('zero followers, zero following', () => {
    //   const params = {
    //     name: '',
    //     verified: false,
    //     yearJoined: 2000      
    //   }
    //   it('returns credibility=null', () => {
    //     return testCredibilityWithOkData({ credibility: null }, {
    //       followersCount: 0,
    //       friendsCount: 0,
    //       ...params
    //     })
    //   })
    // })
  })
})
