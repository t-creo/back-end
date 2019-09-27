import request from 'supertest'
import app from '../../src/app'
import { Credibility, TextCredibilityWeights } from '../../src/calculator/models'

interface PlainTextQueryParams extends TextCredibilityWeights {
  text: string
}

describe('/calculate/plain-text endpoint', () => {
  describe('http 200 calls', () => {
    function testCredibilityWithOkData(
      expectedReturn : Credibility, params: PlainTextQueryParams) {
      return request(app)
        .get('/calculate/plain-text')
        .query(params)
        .expect(200)
        .expect(expectedReturn)
    }
    describe('full bad words criteria', () => {
      const params = {
        weightBadWords: 1,
        weightMisspelling: 0,
        weightSpam: 0,
      }
      it('returns credibility=100 with no bad words', () => {
        return testCredibilityWithOkData({ credibility: 100 }, {
          text: 'yes no',
          ...params
        })
      })

      it('returns credibility=50 with 2 words and 1 bad', () => {
        return testCredibilityWithOkData({ credibility: 50 }, {
          text: 'yes hell',
          ...params
        })
      })

      it('returns credibility=0 with 2 words and 2 bad words', () => {
        return testCredibilityWithOkData({ credibility: 0 }, {
          text: 'hell hell',
          ...params
        })
      })

    })
  })
})
