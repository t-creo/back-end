import express from 'express'
import { calculateTextCredibility, socialCredibility, twitterUserCredibility, calculateTweetCredibility, scrapperTwitterUserCredibility, scrapedSocialCredibility, scrapedtweetCredibility} from './service'
import { validationResult } from 'express-validator'
import { validate, errorMapper } from './validation'
import { asyncWrap } from '../utils'

const calculatorRoutes = express.Router()

calculatorRoutes.get('/plain-text', validate('calculateTextCredibility'), function(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    errorMapper(errors.array())
  }
  res.json(calculateTextCredibility({
    text: req.query.text,
    lang: req.query.lang
  }, {
    weightBadWords: +req.query.weightBadWords,
    weightMisspelling: +req.query.weightMisspelling,
    weightSpam: +req.query.weightSpam
  }))
})

calculatorRoutes.get('/twitter/user/:id', validate('twitterUserCredibility'), asyncWrap(async function(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    errorMapper(errors.array())
  }
  res.json(await twitterUserCredibility(req.params.id))
}))

calculatorRoutes.get('/user/scrape', validate('scrapperTwitterUserCredibility'), function(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    errorMapper(errors.array())
  }
  const userCredibility = scrapperTwitterUserCredibility(req.query.verified === 'true', Number(req.query.yearJoined))
  res.send(userCredibility)
})

calculatorRoutes.get('/twitter/social/:userId', validate('socialCredibility'), asyncWrap(async function(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    errorMapper(errors.array())
  }
  const socialCredibilityVal = await socialCredibility(req.params.userId, +req.query.maxFollowers)
  res.send(socialCredibilityVal)
}))

calculatorRoutes.get('/twitter/tweets', validate('tweetCredibility'), asyncWrap(async function(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    errorMapper(errors.array())
  }
  res.json(await calculateTweetCredibility(req.query.tweetId, {
    weightBadWords: +req.query.weightBadWords,
    weightMisspelling: +req.query.weightMisspelling,
    weightSpam: +req.query.weightSpam,
    weightSocial: +req.query.weightSocial,
    weightText: +req.query.weightText,
    weightUser: +req.query.weightUser },
  +req.query.maxFollowers))
}))

calculatorRoutes.get('/social/scrape', validate('scrapedSocialCredibility'), function(req, res){
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    errorMapper(errors.array())
  }
  res.send(scrapedSocialCredibility(+req.query.followersCount, +req.query.friendsCount, +req.query.maxFollowers))
})

calculatorRoutes.get('/tweets/scraped', validate('scrapedTweetCredibility'), function(req, res){
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    errorMapper(errors.array())
  }
  res.json(scrapedtweetCredibility({
    text: req.query.tweetText,
    lang: req.query.lang
  }, {
    weightSpam: +req.query.weightSpam,
    weightBadWords: +req.query.weightBadWords,
    weightMisspelling: +req.query.weightMisspelling,
    weightText: +req.query.weightText,
    weightUser: +req.query.weightUser,
    weightSocial: +req.query.weightSocial,
  },
  {
    verified: req.query.verified === 'true',
    yearJoined: +req.query.yearJoined,
    followersCount: +req.query.followersCount,
    friendsCount: +req.query.friendsCount
  }, +req.query.maxFollowers))
})

export default calculatorRoutes
