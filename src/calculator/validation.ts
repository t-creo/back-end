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
  }
}

export function errorMapper(errors: any) : any {
  const error = errors[0]
  throw new HttpError(400, [{
    'field': error.param,
    'errorMessage': error.msg,
    'userErrorMessage': error.msg,
    'validationCode': error.msg
  }])
}