import express from 'express'
import { textCredibility, userInfoTest } from './service'

const calculatorRoutes = express.Router()
const testRoutes = express.Router()

calculatorRoutes.get('/plain-text', function(req, res) {
  res.send(textCredibility(req.query.text, {
    weightBadWords: +req.query.weightBadWords,
    weightMisspelling: +req.query.weightMisspelling,
    weightSpam: +req.query.weightSpam
  }))
})

calculatorRoutes.get('/twitter/social/:userId', function(req, res) { 
  res.send(userInfoTest(req.params.userId))
})

export default calculatorRoutes