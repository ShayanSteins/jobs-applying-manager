import https from 'https'
import fs from 'fs'
import conf from './assets/config.json'
import Router from './router'

const port = conf.port
const options = {
  key: fs.readFileSync(conf.keyPath),
  cert: fs.readFileSync(conf.certPath),
}

export default class Server {
  private router: Router | null
  private server: https.Server

  constructor() {
    this.router = null
    this.server = https.createServer(options)
    return this
  }

  registerRouter(router: Router): Server {
    this.router = router
    this.server.on('request', (req, res) => {
      this.router?.handle(req, res)
    })
    return this
  }

  start(): void {
    this.server.listen(port, () => {
      console.log(`Server running at port ${port}`)
      console.log(`https://localhost:${port}`)
    })
  }
}
