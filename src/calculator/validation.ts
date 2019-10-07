import { ValidationError } from 'express-validator'
import HttpError from '../errorHandling/httpError'

const { check } = require('express-validator')

export function validate(method: string) : any {
  switch (method) {
  case 'calculateTextCredibility': {
    return [
      check('text', 'text.REQUIRED').exists(),
      check('text', 'text.NOT_EMPTY').not().isEmpty(),
      check('text', 'text.STRING').isString(),
      check('text', 'text.MAX_SIZE_1000').isLength({ max: 1000 }),
      check('weightSpam', 'weightSpam.REQUIRED').exists(),
      check('weightSpam', 'weightSpam.NUMBER').isFloat(),
      check('weightSpam', 'weightSpam.NOT_IN_RANGE').isFloat({ min: 0, max: 100 }),
      check('weightBadWords', 'weightBadWords.REQUIRED').exists(),
      check('weightBadWords', 'weightBadWords.NUMBER').isFloat(),
      check('weightBadWords', 'weightBadWords.NOT_IN_RANGE').isFloat({min : 0, max : 100}),
      check('weightMisspelling', 'weightMisspelling.REQUIRED').exists(),
      check('weightMisspelling', 'weightMisspelling.NUMBER').isFloat(),
      check('weightMisspelling', 'weightMisspelling.NOT_IN_RANGE').isFloat({min : 0, max : 100}),
    ]
  }
  case 'twitterUserCredibility': {
    return [
      check('id', 'userId.REQUIRED').exists(),
      check('id', 'userId.NUMBER').isInt(),
    ]
  }
  case 'scrapedSocialCredibility': {
    return [
      check('followersCount', 'followersCount.NUMBER').isInt(),
      check('followersCount', 'followersCount.NON_NEGATIVE').isInt({gt: -1}),
      check('followersCount', 'followersCount.REQUIRED').exists(),
      check('friendsCount', 'friendsCount.NUMBER').isInt(),
      check('friendsCount', 'friendsCount.NON_NEGATIVE').isInt({gt: -1}),
      check('friendsCount', 'friendsCount.REQUIRED').exists(),
    ]
  }
  case 'scrapperTwitterUserCredibility': {
    return [
      check('verified', 'verified.REQUIRED').exists(),
      check('verified', 'verified.BOOLEAN').isBoolean(),
      check('yearJoined', 'yearJoined.REQUIRED').exists(),
      check('yearJoined', 'yearJoined.NUMBER').isInt(),
      check('yearJoined', 'yearJoined.NOT_IN_RANGE').isInt({min: 2006, max: 2019})
    ]
  }
  case 'scrapedTweetCredibility': {
    return [
      check('tweetText', 'tweetText.REQUIRED').exists(),
      check('tweetText', 'tweetText.NOT_EMPTY').not().isEmpty(),
      check('weightSpam', 'weightSpam.REQUIRED').exists(),
      check('weightSpam', 'weightSpam.NUMBER').isFloat(),
      check('weightSpam', 'weightSpam.NOT_IN_RANGE').isFloat({ min: 0, max: 100 }),
      check('weightBadWords', 'weightBadWords.REQUIRED').exists(),
      check('weightBadWords', 'weightBadWords.NUMBER').isFloat(),
      check('weightBadWords', 'weightBadWords.NOT_IN_RANGE').isFloat({min : 0, max : 100}),
      check('weightMisspelling', 'weightMisspelling.REQUIRED').exists(),
      check('weightMisspelling', 'weightMisspelling.NUMBER').isFloat(),
      check('weightMisspelling', 'weightMisspelling.NOT_IN_RANGE').isFloat({min : 0, max : 100}),
      check('followersCount', 'followersCount.NUMBER').isInt(),
      check('followersCount', 'followersCount.NON_NEGATIVE').isInt({gt: -1}),
      check('followersCount', 'followersCount.REQUIRED').exists(),
      check('friendsCount', 'friendsCount.NUMBER').isInt(),
      check('friendsCount', 'friendsCount.NON_NEGATIVE').isInt({gt: -1}),
      check('friendsCount', 'friendsCount.REQUIRED').exists(),
      check('verified', 'verified.REQUIRED').exists(),
      check('verified', 'verified.BOOLEAN').isBoolean(),
      check('yearJoined', 'yearJoined.NUMBER').isInt(),
      check('yearJoined', 'yearJoined.NOT_IN_RANGE').isInt({min: 2006})
    ]
  }
  }
}

export function errorMapper(errors: ValidationError[]) : void {
  const mappedErrors = errors.map((error) => {
    return {
      'field': error.param,
      'errorMessage': error.msg,
      'userErrorMessage': error.msg,
      'validationCode': error.msg
    }
  })
  throw new HttpError(400, mappedErrors)
}