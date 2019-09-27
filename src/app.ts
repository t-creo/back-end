import express from 'express'
import calculatorRoutes from './calculator/routes'
const app = express()

app.use('/health', (req, res) => {
  res.json({ status: 'UP' })
})

app.use('/calculate/pl')
export default app
