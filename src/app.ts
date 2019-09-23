import express from 'express'
const app = express()

app.use('/health', (req, res) => {
  res.json({ status: 'UP' })
})

export default app
