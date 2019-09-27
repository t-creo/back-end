import request from 'supertest'
import app from '../../src/app'
import { Credibility, TextCredibilityWeights } from '../../src/calculator/models'

interface PlainTextQueryParams extends TextCredibilityWeights {
  text: string
}

describe('/calculate/plain-text endpoint', () => {
  describe('http 200 calls', () => {
    describe('full bad criteria', () => {
      function testCredibilityWithOkData(
        expectedReturn : Credibility,textToAnalyze: string) {
        const textCredibilityWeights : PlainTextQueryParams = {
          weightBadWords: 1,
          weightMisspelling: 0,
          weightSpam: 0,
          text: textToAnalyze
        }
        return request(app)
          .get('/calculate/plain-text')
          .query(textCredibilityWeights)
          .expect(200)
          .expect(expectedReturn)

      }
      it('returns credibility=100 on full bad words filtering with no bad words', () => {
        return testCredibilityWithOkData({ credibility: 100 }, 'yes no')
      })

      it('returns credibility=50 with 2 words and 1 bad', () => {
        return testCredibilityWithOkData({ credibility: 50 }, 'yes hell')
      })

      it('returns credibility=0 with 2 words and 2 bad words', () => {
        return testCredibilityWithOkData({ credibility: 0 }, 'hell hell')
      })

    })
  })
})
