import request from 'supertest'
import app from '../../src/app'

describe('Input Validation', () => {
  
  describe('/GET /calculate/plain-text', () => {
    function testPlainTextCredibility(
      expectedReturn : any, params: any) {
      return request(app)
        .get('/calculate/plain-text')
        .query(params)
        .expect(expectedReturn)
    }

    it('text.REQUIRED', () => {
      return testPlainTextCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'text',
            errorMessage: 'text.REQUIRED',
            userErrorMessage: 'text.REQUIRED',
            validationCode: 'text.REQUIRED' },
          { field: 'text',
            errorMessage: 'text.NOT_EMPTY',
            userErrorMessage: 'text.NOT_EMPTY',
            validationCode: 'text.NOT_EMPTY' },
          { field: 'text',
            errorMessage: 'text.STRING',
            userErrorMessage: 'text.STRING',
            validationCode: 'text.STRING' }]
      }, { weightSpam: 1, weightBadWords: 0, weightMisspelling: 0 })
    })

    it('text.NOT_EMPTY', () => {
      return testPlainTextCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [{
          field: 'text',
          errorMessage: 'text.NOT_EMPTY',
          userErrorMessage: 'text.NOT_EMPTY',
          validationCode: 'text.NOT_EMPTY'
        }]
      }, { text: '', weightSpam: 1, weightBadWords: 0, weightMisspelling: 0 })
    })

    it('weightSpam.REQUIRED', () => {
      return testPlainTextCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'weightSpam',
            errorMessage: 'weightSpam.REQUIRED',
            userErrorMessage: 'weightSpam.REQUIRED',
            validationCode: 'weightSpam.REQUIRED' },
          { field: 'weightSpam',
            errorMessage: 'weightSpam.NUMBER',
            userErrorMessage: 'weightSpam.NUMBER',
            validationCode: 'weightSpam.NUMBER' },
          { field: 'weightSpam',
            errorMessage: 'weightSpam.NOT_IN_RANGE',
            userErrorMessage: 'weightSpam.NOT_IN_RANGE',
            validationCode: 'weightSpam.NOT_IN_RANGE' }]
      }, { text: 'test', weightBadWords: 0, weightMisspelling: 0 })
    })

    it('weightSpam.NUMBER', () => {
      return testPlainTextCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'weightSpam',
            errorMessage: 'weightSpam.NUMBER',
            userErrorMessage: 'weightSpam.NUMBER',
            validationCode: 'weightSpam.NUMBER' },
          { field: 'weightSpam',
            errorMessage: 'weightSpam.NOT_IN_RANGE',
            userErrorMessage: 'weightSpam.NOT_IN_RANGE',
            validationCode: 'weightSpam.NOT_IN_RANGE' } ]
      }, { text: 'test', weightSpam: 'test', weightBadWords: 0, weightMisspelling: 0 })
    })

    it('weightSpam.NOT_IN_RANGE', () => {
      return testPlainTextCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [{
          field: 'weightSpam',
          errorMessage: 'weightSpam.NOT_IN_RANGE',
          userErrorMessage: 'weightSpam.NOT_IN_RANGE',
          validationCode: 'weightSpam.NOT_IN_RANGE'
        }]
      }, { text: 'test', weightSpam: 101, weightBadWords: 0, weightMisspelling: 0 })
    })

    it('weightBadWords.REQUIRED', () => {
      return testPlainTextCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          {field: 'weightBadWords',
            errorMessage: 'weightBadWords.REQUIRED',
            userErrorMessage: 'weightBadWords.REQUIRED',
            validationCode: 'weightBadWords.REQUIRED' },
          { field: 'weightBadWords',
            errorMessage: 'weightBadWords.NUMBER',
            userErrorMessage: 'weightBadWords.NUMBER',
            validationCode: 'weightBadWords.NUMBER' },
          { field: 'weightBadWords',
            errorMessage: 'weightBadWords.NOT_IN_RANGE',
            userErrorMessage: 'weightBadWords.NOT_IN_RANGE',
            validationCode: 'weightBadWords.NOT_IN_RANGE' } ]
      }, { text: 'test', weightSpam: 0, weightMisspelling: 0 })
    })

    it('weightBadWords.NUMBER', () => {
      return testPlainTextCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'weightBadWords',
            errorMessage: 'weightBadWords.NUMBER',
            userErrorMessage: 'weightBadWords.NUMBER',
            validationCode: 'weightBadWords.NUMBER' },
          { field: 'weightBadWords',
            errorMessage: 'weightBadWords.NOT_IN_RANGE',
            userErrorMessage: 'weightBadWords.NOT_IN_RANGE',
            validationCode: 'weightBadWords.NOT_IN_RANGE' } ]
      }, { text: 'test', weightSpam: 0, weightBadWords: 'test', weightMisspelling: 0 })
    })

    it('weightBadWords.NOT_IN_RANGE', () => {
      return testPlainTextCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [{
          field: 'weightBadWords',
          errorMessage: 'weightBadWords.NOT_IN_RANGE',
          userErrorMessage: 'weightBadWords.NOT_IN_RANGE',
          validationCode: 'weightBadWords.NOT_IN_RANGE'
        }]
      }, { text: 'test', weightSpam: 0, weightBadWords: -1, weightMisspelling: 0 })
    })

    it('weightMisspelling.REQUIRED', () => {
      return testPlainTextCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'weightMisspelling',
            errorMessage: 'weightMisspelling.REQUIRED',
            userErrorMessage: 'weightMisspelling.REQUIRED',
            validationCode: 'weightMisspelling.REQUIRED' },
          { field: 'weightMisspelling',
            errorMessage: 'weightMisspelling.NUMBER',
            userErrorMessage: 'weightMisspelling.NUMBER',
            validationCode: 'weightMisspelling.NUMBER' },
          { field: 'weightMisspelling',
            errorMessage: 'weightMisspelling.NOT_IN_RANGE',
            userErrorMessage: 'weightMisspelling.NOT_IN_RANGE',
            validationCode: 'weightMisspelling.NOT_IN_RANGE' } ]
      }, { text: 'test', weightSpam: 0, weightBadWords: 0 })
    })

    it('weightMisspelling.NUMBER', () => {
      return testPlainTextCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'weightMisspelling',
            errorMessage: 'weightMisspelling.NUMBER',
            userErrorMessage: 'weightMisspelling.NUMBER',
            validationCode: 'weightMisspelling.NUMBER' },
          { field: 'weightMisspelling',
            errorMessage: 'weightMisspelling.NOT_IN_RANGE',
            userErrorMessage: 'weightMisspelling.NOT_IN_RANGE',
            validationCode: 'weightMisspelling.NOT_IN_RANGE' }]
      }, { text: 'test', weightSpam: 0, weightBadWords: 3.3, weightMisspelling: 'test' })
    })

    it('weightMisspelling.NOT_IN_RANGE', () => {
      return testPlainTextCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [{
          field: 'weightMisspelling',
          errorMessage: 'weightMisspelling.NOT_IN_RANGE',
          userErrorMessage: 'weightMisspelling.NOT_IN_RANGE',
          validationCode: 'weightMisspelling.NOT_IN_RANGE'
        }]
      }, { text: 'test', weightSpam: 0, weightBadWords: 1, weightMisspelling: -10 })
    })
  })

  describe('/GET /calculate/twitter/user/:id', () => {

    it('id.NUMBER', () => {
      return request(app)
        .get('/calculate/twitter/user/a')
        .expect({
          status: 400,
          title: 'Bad Request',
          message: 'A validation failed',
          userMessage: 'An error has ocurred',
          errors: [{
            field: 'id',
            errorMessage: 'userId.NUMBER',
            userErrorMessage: 'userId.NUMBER',
            validationCode: 'userId.NUMBER'
          }]
        })
    })
  })

  describe('/GET /calculate/user/scrape', () => {
    function testScrapperTwitterUserCredibility(
      expectedReturn : any, params: any) {
      return request(app)
        .get('/calculate/user/scrape')
        .query(params)
        .expect(expectedReturn)
    } 
    
    it('verified.REQUIRED', () => {
      return testScrapperTwitterUserCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'verified',
            errorMessage: 'verified.REQUIRED',
            userErrorMessage: 'verified.REQUIRED',
            validationCode: 'verified.REQUIRED' },
          { field: 'verified',
            errorMessage: 'verified.BOOLEAN',
            userErrorMessage: 'verified.BOOLEAN',
            validationCode: 'verified.BOOLEAN' }]
      }, { accountCreationYear: 2009 })
    })

    it('verified.BOOLEAN', () => {
      return testScrapperTwitterUserCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'verified',
            errorMessage: 'verified.BOOLEAN',
            userErrorMessage: 'verified.BOOLEAN',
            validationCode: 'verified.BOOLEAN' }]
      }, {  verified: 'test', accountCreationYear: 2009 })
    })

    it('accountCreationYear.REQUIRED', () => {
      return testScrapperTwitterUserCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'accountCreationYear',
            errorMessage: 'accountCreationYear.REQUIRED',
            userErrorMessage: 'accountCreationYear.REQUIRED',
            validationCode: 'accountCreationYear.REQUIRED' },
          { field: 'accountCreationYear',
            errorMessage: 'accountCreationYear.NUMBER',
            userErrorMessage: 'accountCreationYear.NUMBER',
            validationCode: 'accountCreationYear.NUMBER' },
          { field: 'accountCreationYear',
            errorMessage: 'accountCreationYear.NOT_IN_RANGE',
            userErrorMessage: 'accountCreationYear.NOT_IN_RANGE',
            validationCode: 'accountCreationYear.NOT_IN_RANGE' }]
      }, { verified: false })
    })

    it('accountCreationYear.NUMBER', () => {
      return testScrapperTwitterUserCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [
          { field: 'accountCreationYear',
            errorMessage: 'accountCreationYear.NUMBER',
            userErrorMessage: 'accountCreationYear.NUMBER',
            validationCode: 'accountCreationYear.NUMBER' },
          { field: 'accountCreationYear',
            errorMessage: 'accountCreationYear.NOT_IN_RANGE',
            userErrorMessage: 'accountCreationYear.NOT_IN_RANGE',
            validationCode: 'accountCreationYear.NOT_IN_RANGE' } ]
      }, { verified: true, accountCreationYear: 'test' })
    })

    it('accountCreationYear.NOT_IN_RANGE', () => {
      return testScrapperTwitterUserCredibility({
        status: 400,
        title: 'Bad Request',
        message: 'A validation failed',
        userMessage: 'An error has ocurred',
        errors: [{
          field: 'accountCreationYear',
          errorMessage: 'accountCreationYear.NOT_IN_RANGE',
          userErrorMessage: 'accountCreationYear.NOT_IN_RANGE',
          validationCode: 'accountCreationYear.NOT_IN_RANGE'
        }]
      }, { verified: true, accountCreationYear: 2020 })
    })
  })
})