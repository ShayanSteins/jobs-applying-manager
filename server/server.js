
const https = require('https')
const fs = require('fs')
const conf = require('./assets/config.json')

const port = conf.port
const options = {
  key: fs.readFileSync(conf.keyPath),
  cert: fs.readFileSync(conf.certPath)
}

/**
 * Serveur Web
 * @property {Router} router : routeur web
 * @property {https.Server} server : serveur HTTPS
 */
class Server {
  constructor () {
    this.router = null
    this.server = https.createServer(options)
    return this
  }

  /**
   * Enregistrement du routeur web
   * @param {Router} Router : routeur web
   */
  registerRouter (router) {
    this.router = router
    this.server.on('request', (req, res) => { this.router.handle(req, res) })
    return this
  }
  
  /**
   * Lancement du serveur web
   */
  start () {
    this.server.listen(port, () => {
      console.log(`Server running at port ${port}`)
    })
  }
}

module.exports = Server
