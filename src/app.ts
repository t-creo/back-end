import express from 'express'
import expressWinston from 'express-winston'
import winston from 'winston'
import errorHandler from './errorHandling/errorHandler'
import calculatorRoutes from './calculator/routes'
import config from './config'

const app = express()

/* istanbul ignore next */
if (config.NODE_ENV !== 'test') {
  app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
    meta: false,
    msg: 'HTTP {{req.method}} {{req.url}}',
    colorize: true
  }))
}

app.use('/health', (req, res) => {
  res.json({ status: 'UP' })
})

app.use('/calculate', calculatorRoutes)
app.use(errorHandler)

export default app
