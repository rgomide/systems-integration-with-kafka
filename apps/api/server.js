const app = require('./app')
const { createServer } = require('node:http')

const { initializeSocket, getIo } = require('./src/services/socket/setup')

const server = createServer(app)
const io = initializeSocket(server)

server.listen(3000, () => {
  console.log('Application listening on port 3000')
})

module.exports = {
  getIo: () => io
}
