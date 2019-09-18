const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT

const express = require("express");
const server = express();

server.listen(port);

server.use('/health', (req, res) => {
  res.json({ status: 'UP' });
});
