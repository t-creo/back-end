/* eslint-disable */
import request from 'supertest'
import Twit from 'twit'
import app from '../../src/app'
import { Credibility, TwitterUser, TweetCredibilityWeights, Text } from '../../src/calculator/models'

jest.mock('twit')

describe('/twitter/tweets', () => {

  beforeAll(() => {
    Twit.prototype.get = jest.fn((path: string, params?: any) =>new Promise((resolve:any, reject:any) => resolve({
      data: {
        full_text: 'mocked testing text',
        lang: 'en',
        user: {
          id: 25073877,
          name: 'YuniQuintero',
          followers_count: 0,
          friends_count: 0,
          created_at: 'Mon Feb 21 01:59:02 +0000 2011',
          verified: false,
        }
      }
    })))
  })

  describe('http 200 calls', () => {
    function testCredibilityWithOkData(
      expectedReturn : Credibility, tweetId: string, tweetCredibilityWeights: TweetCredibilityWeights, maxFollowers: number) {
      return request(app)
        .get('/calculate/twitter/tweets')
        .query({
          tweetId: tweetId,
          ...tweetCredibilityWeights, maxFollowers
        })
        .expect(200)
        .then(response => {
          expect(response.body.credibility).toBeCloseTo(expectedReturn.credibility)
        })
    }

    describe('test with only text filter', () => {
      const tweetId = '1192230366142255105'
      const tweetCredibilityWeights : TweetCredibilityWeights = {
        weightSpam: 0.2,
        weightBadWords: 0.2,
        weightMisspelling: 0.6,
        weightText: 1,
        weightUser: 0,
        weightSocial: 0,
      }
      const maxFollowers : number = 2000000
      it('returns credibility=80 on full text on twitter api endpoint', () => {
        return testCredibilityWithOkData({ credibility: 80 }, tweetId, tweetCredibilityWeights, maxFollowers)
      })
    })
  })
})
