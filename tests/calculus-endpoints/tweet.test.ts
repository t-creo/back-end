import request from 'supertest'
import app from '../../src/app'
import { Credibility, TwitterUser, TweetCredibilityWeights } from '../../src/calculator/models'
//import { ErrorObjectInterface } from '../../src/errorHandling/errorObjectInterface'

describe('/calculate/tweets/scraped endpoint', () => {
  describe('http 200 requests', () => {
    function testCredibilityWithOkData(
      expectedReturn : Credibility, tweetText: string, tweetCredibilityWeights: TweetCredibilityWeights, twitterUser: TwitterUser) {
      return request(app)
        .get('/calculate/tweets/scraped')
        .query(tweetText)
        .query(tweetCredibilityWeights)
        .query(twitterUser)
        .expect(200)
        .expect(expectedReturn)
    }

    describe('test example data', () => {
      const tweetText : string = 'Hello twitter'
      const tweetCredibilityWeights : TweetCredibilityWeights = {
        weightSpam: 20.34,
        weightBadWords: 20.34,
        weightMisspelling: 20.34,
        weightText: 20.34,
        weightUser: 20.34,
        weightSocial: 20.34
      }
      const twitterUser = {
        name: '',
        verified: false,
        yearJoined: 2010,
        followersCount: 2000,
        friendsCount: 2000
      }
      it('returns credibility=83790.61868983101 with', () => {
        return testCredibilityWithOkData({ credibility: 83790.61868983101 }, tweetText, tweetCredibilityWeights, twitterUser)
      })
    })
  })

  // describe('http 400 requests', () => {
  //   function testCredibilityWithIncorrectData(
  //     expectedReturn : ErrorObjectInterface, params: TwitterUser) {
  //     return request(app)
  //       .get('/calculate/social/scraped')
  //       .query(params)
  //       .expect(400)
  //       .expect(expectedReturn)
  //   }

  //   describe('negative followers, positive followings', () => {
  //     const params = {
  //       name: '',
  //       verified: false,
  //       yearJoined: 2000,
  //       followersCount: -1,
  //       friendsCount: 1
  //     }
  //     it('returns error object interface with message', () => {
  //       return testCredibilityWithIncorrectData({
  //         'status': 400,
  //         'title': 'Bad Request',
  //         'message': 'A validation failed',
  //         'userMessage': 'An error has ocurred',
  //         'errors': [
  //           {
  //             'field': 'followersCount',
  //             'errorMessage': 'followersCount.NON_NEGATIVE',
  //             'userErrorMessage': 'followersCount.NON_NEGATIVE',
  //             'validationCode': 'followersCount.NON_NEGATIVE'
  //           }
  //         ]
  //       }, params)
  //     })
  //   })      
  // })
})
