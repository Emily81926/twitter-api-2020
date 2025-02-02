if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const routes = require('./routes')
const cors = require('cors')

const app = express()
const httpServer = createServer(app)
const PORT = process.env.PORT

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
require('./socket/socket')(Server, httpServer)

app.use(routes)

httpServer.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

module.exports = app