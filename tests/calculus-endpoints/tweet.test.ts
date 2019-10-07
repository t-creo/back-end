import request from 'supertest'
import app from '../../src/app'
import { Credibility, TwitterUser, TweetCredibilityWeights } from '../../src/calculator/models'

describe('/calculate/tweets/scraped endpoint', () => {
  describe('http 200 requests', () => {
    function testCredibilityWithOkData(
      expectedReturn : Credibility, tweetText: string, tweetCredibilityWeights: TweetCredibilityWeights, twitterUser: TwitterUser) {
      return request(app)
        .get('/calculate/tweets/scraped')
        .query({tweetText, ...tweetCredibilityWeights, ...twitterUser})
        .expect(200)
        .expect(expectedReturn)
    }

    describe('test with only text filter', () => {
      const tweetCredibilityWeights : TweetCredibilityWeights = {
        weightSpam: 0.2,
        weightBadWords: 0.2,
        weightMisspelling: 0.6,
        weightText: 1,
        weightUser: 0,
        weightSocial: 0
      }
      const twitterUser : TwitterUser = {
        name: '',
        verified: false,
        yearJoined: 2010,
        followersCount: 2000,
        friendsCount: 2000
      }
      it('returns credibility=65 on full text on twitter scrape endpoint', () => {
        return testCredibilityWithOkData({ credibility: 65 },
          'WATTUPP ok sir fine', tweetCredibilityWeights, twitterUser)
      })
      it('returns credibility=0 on full text on twitter scrape endpoint', () => {
        return testCredibilityWithOkData({ credibility: 0 },
          'idiot stupid', tweetCredibilityWeights, twitterUser)
      })
      it('returns credibility=100 on full text on twitter scrape endpoint', () => {
        return testCredibilityWithOkData({ credibility: 100 },
          'everything good here ok sir fine', tweetCredibilityWeights, twitterUser)
      })
    })

    describe('test with only user cred filter', () => {
      const tweetText: string = 'WATTUPPP ok sir fine'
      const tweetCredibilityWeights: TweetCredibilityWeights = {
        weightSpam: 0.2,
        weightBadWords: 0.2,
        weightMisspelling: 0.6,
        weightText: 0,
        weightUser: 1,
        weightSocial: 0
      }
      const twitterUser : TwitterUser = {
        name: '',
        verified: true,
        yearJoined: 2006,
        friendsCount: 2000,
        followersCount: 2000
      }
      it('returns credibility=0 on full user on twitter scrape endpoint', () => {
        // The user is not verified and their account was created this year
        return testCredibilityWithOkData({ credibility: 0 },
          tweetText, tweetCredibilityWeights, {
            ...twitterUser,
            yearJoined: new Date().getFullYear(),
            verified: false
          })
      })
      it('returns credibility=100 on full user on twitter scrape endpoint', () => {
        // The user is verified and their account was created the
        // same year that twitter was created
        return testCredibilityWithOkData({ credibility: 100 },
          tweetText, tweetCredibilityWeights, twitterUser)
      })
      it('returns credibility=50 with verified and new account on full user on twitter scrape endpoint', () => {
        // The user is verified and their creation year was the current one
        return testCredibilityWithOkData({ credibility: 50 },
          tweetText, tweetCredibilityWeights, {
            ...twitterUser,
            yearJoined: new Date().getFullYear()
          })
      })
      it('returns credibility=50 with unverified and old account on full user on twitter scrape endpoint', () => {
        // The user is not verified and their creation year was the same
        // as twitter creation
        return testCredibilityWithOkData({ credibility: 50 },
          tweetText, tweetCredibilityWeights, {
            ...twitterUser,
            verified: false,
          })
      })
    })
  })
})
