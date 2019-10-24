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
      check('WEIGHT_TEXT_CRED_SUM_NOT_1', 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1')
        .custom((val: string, obj: any) => 
          Math.abs(parseFloat(obj.req.query.weightSpam) + parseFloat(obj.req.query.weightBadWords) + parseFloat(obj.req.query.weightMisspelling) - 1) < Number.EPSILON),
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
      check('yearJoined', 'yearJoined.NOT_IN_RANGE').isInt({min: 2006}),
      check('WEIGHT_TEXT_CRED_SUM_NOT_1', 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1')
        .custom((val: string, obj: any) => 
          Math.abs(parseFloat(obj.req.query.weightSpam) + parseFloat(obj.req.query.weightBadWords) + parseFloat(obj.req.query.weightMisspelling) - 1) < Number.EPSILON),
      check('WEIGHT_TWEET_CRED_SUM_NOT_1', 'customValidation.WEIGHT_TWEET_CRED_NOT_EQUALS_TO_1')
        .custom((val: string, obj: any) => 
          Math.abs(parseFloat(obj.req.query.weightText) + parseFloat(obj.req.query.weightUser) + parseFloat(obj.req.query.weightSocial) - 1) < Number.EPSILON),
    ]
  }
  case 'socialCredibility': {
    return [
      check('userId', 'userId.REQUIRED').exists(),
      check('userId', 'userId.NUMBER').isInt(),
      check('maxFollowers', 'maxFollowers.NUMBER').isInt(),
      check('maxFollowers', 'maxFollowers.POSITIVE').isInt({gt: -1})
    ]
  }
  case 'socialCredibilityFF': {
    return [
      check('userId', 'userId.REQUIRED').exists(),
      check('userId', 'userId.NUMBER').isInt()
    ]
  }
  case 'tweetCredibility': {
    return [
      check('tweetId', 'tweetId.REQUIRED').exists(),
      check('weightSpam', 'weightSpam.REQUIRED').exists(),
      check('weightSpam', 'weightSpam.NUMBER').isFloat(),
      check('weightSpam', 'weightSpam.NOT_IN_RANGE').isFloat({ min: 0, max: 100 }),
      check('weightBadWords', 'weightBadWords.REQUIRED').exists(),
      check('weightBadWords', 'weightBadWords.NUMBER').isFloat(),
      check('weightBadWords', 'weightBadWords.NOT_IN_RANGE').isFloat({min : 0, max : 100}),
      check('weightMisspelling', 'weightMisspelling.REQUIRED').exists(),
      check('weightMisspelling', 'weightMisspelling.NUMBER').isFloat(),
      check('weightMisspelling', 'weightMisspelling.NOT_IN_RANGE').isFloat({min : 0, max : 100}),
      check('weightText', 'weightText.REQUIRED').exists(),
      check('weightText', 'weightText.NUMBER').isFloat(),
      check('weightText', 'weightText.NOT_IN_RANGE').isFloat({ min: 0, max: 100 }),
      check('weightUser', 'weightUser.REQUIRED').exists(),
      check('weightUser', 'weightUser.NUMBER').isFloat(),
      check('weightUser', 'weightUser.NOT_IN_RANGE').isFloat({min : 0, max : 100}),
      check('weightSocial', 'weightSocial.REQUIRED').exists(),
      check('weightSocial', 'weightSocial.NUMBER').isFloat(),
      check('weightSocial', 'weightSocial.NOT_IN_RANGE').isFloat({min : 0, max : 100}),
      check('maxFollowers', 'maxFollowers.NUMBER').isInt(),
      check('maxFollowers', 'maxFollowers.POSITIVE').isInt({gt: -1}),
      check('WEIGHT_TEXT_CRED_SUM_NOT_1', 'customValidation.WEIGHT_TEXT_CRED_NOT_EQUALS_TO_1')
        .custom((val: string, obj: any) => 
          Math.abs(parseFloat(obj.req.query.weightSpam) + parseFloat(obj.req.query.weightBadWords) + parseFloat(obj.req.query.weightMisspelling) - 1) < Number.EPSILON),
      check('WEIGHT_TWEET_CRED_SUM_NOT_1', 'customValidation.WEIGHT_TWEET_CRED_NOT_EQUALS_TO_1')
        .custom((val: string, obj: any) => 
          Math.abs(parseFloat(obj.req.query.weightText) + parseFloat(obj.req.query.weightUser) + parseFloat(obj.req.query.weightSocial) - 1) < Number.EPSILON),
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