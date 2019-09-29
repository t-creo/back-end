import express from 'express'
import { textCredibility, twitterUserCredibility } from './service'

const calculatorRoutes = express.Router()

calculatorRoutes.get('/plain-text', function(req, res) {
  res.send(textCredibility(req.query.text, {
    weightBadWords: +req.query.weightBadWords,
    weightMisspelling: +req.query.weightMisspelling,
    weightSpam: +req.query.weightSpam
  }))
})

calculatorRoutes.get('/twitter/user/:id', function(req, res, next) { 
  twitterUserCredibility(req.params.id)
    .then(response => {
      res.send(response)
      next()
    })
})

export default calculatorRoutes