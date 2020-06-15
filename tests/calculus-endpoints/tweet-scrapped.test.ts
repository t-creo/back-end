import request from 'supertest'
import app from '../../src/app'
import { Credibility, TwitterUser, TweetCredibilityWeights, Text } from '../../src/calculator/models'

describe('/calculate/tweets/scraped endpoint', () => {
  describe('http 200 requests', () => {
    function testCredibilityWithOkData(
      expectedReturn : Credibility, tweetText: Text, tweetCredibilityWeights: TweetCredibilityWeights, twitterUser: TwitterUser, maxFollowers: number) {
      return request(app)
        .get('/calculate/tweets/scraped')
        .query({
          tweetText: tweetText.text,
          lang: tweetText.lang,
          ...tweetCredibilityWeights, ...twitterUser, maxFollowers
        })
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
        weightSocial: 0,
      }
      const twitterUser : TwitterUser = {
        verified: false,
        yearJoined: 2010,
        followersCount: 2000,
        friendsCount: 2000,
      }
      const maxFollowers : number = 2000000
      it('returns credibility=65 on full text on twitter scrape endpoint', () => {
        return testCredibilityWithOkData({ credibility: 50 }, {
          text: 'WATTUPP ok sir fine',
          lang: 'en'
        }, tweetCredibilityWeights, twitterUser, maxFollowers)
      })
      it('returns credibility=100 on full text on twitter scrape endpoint', () => {
        return testCredibilityWithOkData({ credibility: 100 }, {
          text: 'everything good here sir fine',
          lang: 'en'
        }, tweetCredibilityWeights, twitterUser, maxFollowers)
      })
    })

    describe('test with only user cred filter', () => {
      const tweetText: Text = {
        text: 'WATTUPPP ok sir fine',
        lang: 'en'
      }
      const tweetCredibilityWeights: TweetCredibilityWeights = {
        weightSpam: 0.2,
        weightBadWords: 0.2,
        weightMisspelling: 0.6,
        weightText: 0,
        weightUser: 1,
        weightSocial: 0
      }
      const twitterUser : TwitterUser = {
        verified: true,
        yearJoined: 2006,
        friendsCount: 2000,
        followersCount: 2000
      }
      const maxFollowers : number = 2000000
      it('returns credibility=0 on full user on twitter scrape endpoint', () => {
        // The user is not verified and their account was created this year
        return testCredibilityWithOkData({ credibility: 0 },
          tweetText, tweetCredibilityWeights, {
            ...twitterUser,
            yearJoined: new Date().getFullYear(),
            verified: false
          },
          maxFollowers)
      })
      it('returns credibility=100 on full user on twitter scrape endpoint', () => {
        // The user is verified and their account was created the
        // same year that twitter was created
        return testCredibilityWithOkData({ credibility: 100 },
          tweetText, tweetCredibilityWeights, twitterUser, maxFollowers)
      })
      it('returns credibility=50 with verified and new account on full user on twitter scrape endpoint', () => {
        // The user is verified and their creation year was the current one
        return testCredibilityWithOkData({ credibility: 50 },
          tweetText, tweetCredibilityWeights, {
            ...twitterUser,
            yearJoined: new Date().getFullYear()
          },
          maxFollowers)
      })
      it('returns credibility=50 with unverified and old account on full user on twitter scrape endpoint', () => {
        // The user is not verified and their creation year was the same
        // as twitter creation
        return testCredibilityWithOkData({ credibility: 50 },
          tweetText, tweetCredibilityWeights, {
            ...twitterUser,
            verified: false,
          },
          maxFollowers)
      })
    })

    describe('test with only social user cred filter', () => {
      const tweetText: Text = {
        text: 'WATTUPPP ok sir fine',
        lang: 'en'
      }
      const tweetCredibilityWeights: TweetCredibilityWeights = {
        weightSpam: 0.2,
        weightBadWords: 0.2,
        weightMisspelling: 0.6,
        weightText: 0,
        weightUser: 0,
        weightSocial: 1
      }
      const twitterUser : TwitterUser = {
        verified: true,
        yearJoined: 2006,
        friendsCount: 2000,
        followersCount: 2000
      }
      const maxFollowers : number = 2000000
      it('returns credibility=0 with 1 following and 0 followers on social user on twitter scrape endpoint', () => {
        // The user is not verified and their account was created this year
        return testCredibilityWithOkData({ credibility: 0 },
          tweetText, tweetCredibilityWeights, {
            ...twitterUser,
            followersCount: 0,
            friendsCount: 1
          },
          maxFollowers)
      })
      it('returns credibility=100 with 0 following and 2000000 followers on social user on twitter scrape endpoint', () => {
        // The user is verified and their account was created the
        // same year that twitter was created
        return testCredibilityWithOkData({ credibility: 100 },
          tweetText, tweetCredibilityWeights, {
            ...twitterUser,
            followersCount: 2000000,
            friendsCount: 0,
          },
          maxFollowers)
      })
      it('returns credibility=75 with 2000000 following and 2000000 followers on social user on twitter scrape endpoint', () => {
        // The user is verified and their creation year was the current one
        return testCredibilityWithOkData({ credibility: 75 },
          tweetText, tweetCredibilityWeights, {
            ...twitterUser,
            friendsCount: 2000000,
            followersCount: 2000000
          },
          maxFollowers)
      })
    })
  })
})
