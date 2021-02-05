
const http = require('http')
const port = 4040

class Server {
  constructor () {
    this.router = null
    this.server = http.createServer()
    return this
  }

  registerRouter (router) {
    this.router = router
    this.server.on('request', (req, res) => { this.router.handle(req, res) })
    return this
  }

  start () {
    this.server.listen(port, () => {
      console.log(`Server running at port ${port}`)
    })
  }
}

module.exports = Server
