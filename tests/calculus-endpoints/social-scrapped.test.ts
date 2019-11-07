import request from 'supertest'
import app from '../../src/app'
import { Credibility, TwitterUser } from '../../src/calculator/models'
import { ErrorObjectInterface } from '../../src/errorHandling/errorObjectInterface'

describe('/calculate/social/scrape endpoint', () => {
  describe('http 200 requests', () => {
    function testCredibilityWithOkData(
      expectedReturn : Credibility, params: TwitterUser) {
      return request(app)
        .get('/calculate/social/scrape')
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
        friendsCount: 421,
        maxFollowers: 2000000
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

  describe('http 400 requests', () => {
    function testCredibilityWithIncorrectData(
      expectedReturn : ErrorObjectInterface, params: TwitterUser) {
      return request(app)
        .get('/calculate/social/scrape')
        .query(params)
        .expect(400)
        .expect(expectedReturn)
    }

    describe('negative followers, positive followings', () => {
      const params = {
        name: '',
        verified: false,
        yearJoined: 2000,
        followersCount: -1,
        friendsCount: 1,
        maxFollowers: 2000000
      }
      it('returns error object interface with message', () => {
        return testCredibilityWithIncorrectData({
          'status': 400,
          'title': 'Bad Request',
          'message': 'A validation failed',
          'userMessage': 'An error has ocurred',
          'errors': [
            {
              'field': 'followersCount',
              'errorMessage': 'followersCount.NON_NEGATIVE',
              'userErrorMessage': 'followersCount.NON_NEGATIVE',
              'validationCode': 'followersCount.NON_NEGATIVE'
            }
          ]
        }, params)
      })
    })      
  })
})
