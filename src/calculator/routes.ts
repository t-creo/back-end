import express from 'express'
import { textCredibility, userCredibility } from './service'

const calculatorRoutes = express.Router()

calculatorRoutes.get('/plain-text', function(req, res) {
  res.send(textCredibility(req.query.text, {
    weightBadWords: +req.query.weightBadWords,
    weightMisspelling: +req.query.weightMisspelling,
    weightSpam: +req.query.weightSpam
  }))
})

calculatorRoutes.get('/twitter/social/:userId', function(req, res) { 
  res.send(userCredibility(req.params.userId))
})

export default calculatorRoutes