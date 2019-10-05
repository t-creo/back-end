import request from 'supertest'
import app from '../../src/app'
import { Credibility, TwitterUser } from '../../src/calculator/models'

interface socialCredibilityParams extends TwitterUser {
  followersCount: number,
  friendsCount: number
}

describe('/calculate/social/scraped endpoint', () => {
  describe('http 200 calls', () => {
    function testCredibilityWithOkData(
      expectedReturn : Credibility, params: socialCredibilityParams) {
      return request(app)
        .get('/calculate/social/scraped')
        .query(params)
        .expect(200)
        .expect(expectedReturn)
    }
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

    describe('1.200.000 followers, 421 following', () => {
      const params = {
        name: '',
        verified: false,
        yearJoined: 2000  
      }
      it('returns credibility=30.04999998245834 with', () => {
        return testCredibilityWithOkData({ credibility: 30.04999998245834 }, {
          followersCount: 1200000,
          friendsCount: 421,
          ...params
        })
      })
    })
  })
})
