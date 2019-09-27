import express from 'express'
import { textCredibility } from './service'

const calculatorRoutes = express.Router()

calculatorRoutes.get('/plain-text', function(req, res) {
  res.send(textCredibility('', {
    weightBadWords: 0.2,
    weightMisspelling: 0.2,
    weightSpam: 0.6
  }))
})

export default calculatorRoutes
