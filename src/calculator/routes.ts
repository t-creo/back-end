import express from 'express'
import { calculateTextCredibility, socialCredibility, twitterUserCredibility, calculateTweetCredibility, scrapperTwitterUserCredibility, scrapedSocialCredibility, scrapedtweetCredibility} from './service'
import { validationResult } from 'express-validator'
import { validate, errorMapper } from './validation'

const calculatorRoutes = express.Router()

calculatorRoutes.get('/plain-text', validate('calculateTextCredibility'), function(req: any, res: any) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    errorMapper(errors.array())
  }
  res.send(calculateTextCredibility(req.query.text, {
    weightBadWords: +req.query.weightBadWords,
    weightMisspelling: +req.query.weightMisspelling,
    weightSpam: +req.query.weightSpam
  }))
})

calculatorRoutes.get('/twitter/user/:id', validate('twitterUserCredibility'), function(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    errorMapper(errors.array())
  }
  twitterUserCredibility(req.params.id)
    .then(response => {
      res.send(response)
      next()
    })
})

calculatorRoutes.get('/user/scrape', validate('scrapperTwitterUserCredibility'), function(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    errorMapper(errors.array())
  }
  const userCredibility = scrapperTwitterUserCredibility(req.query.verified === 'true', Number(req.query.yearJoined))
  res.send(userCredibility)
})

calculatorRoutes.get('/twitter/social/:userId', async function(req, res) {
  const socialCredibilityVal = await socialCredibility(req.params.userId)
  res.send(socialCredibilityVal)
})

calculatorRoutes.get('/twitter/tweets', function(req, res, next) {
  calculateTweetCredibility(req.query.tweetId, {
    weightBadWords: +req.query.weightBadWords,
    weightMisspelling: +req.query.weightMisspelling,
    weightSpam: +req.query.weightSpam,
    weightSocial: +req.query.weightSocial,
    weightText: +req.query.weightText,
    weightUser: +req.query.weightUser
  })
    .then(response => {
      res.send(response)
      next()
    })
})

calculatorRoutes.get('/social/scrape', validate('scrapedSocialCredibility'), function(req, res){
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    errorMapper(errors.array())
  }
  res.send(scrapedSocialCredibility(req.query.followersCount, req.query.friendsCount))
})

calculatorRoutes.get('/tweets/scraped', validate('scrapedTweetCredibility'), function(req, res){
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    errorMapper(errors.array())
  }
  res.send(scrapedtweetCredibility(req.query.tweetText, {
    weightSpam: +req.query.weightSpam,
    weightBadWords: +req.query.weightBadWords,
    weightMisspelling: +req.query.weightMisspelling,
    weightText: +req.query.weightText,
    weightUser: +req.query.weightUser,
    weightSocial: +req.query.weightSocial,
  },
  {
    name: '',
    verified: req.query.verified === 'true',
    yearJoined: +req.query.yearJoined,
    followersCount: +req.query.followersCount,
    friendsCount: +req.query.friendsCount
  }
  ))
})

export default calculatorRoutes
