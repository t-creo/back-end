import { config } from 'dotenv'
config()
const port = process.env.PORT

import express from 'express'
const server = express()

server.listen(port)

server.use('/health', (req, res) => {
  res.json({ status: 'UP' })
})
