const fs = require('fs')
const https = require('https')
const { clientId, clientSecret } = require('../key.json')
const basePath = 'dist/'

const mimeType = {
  css: 'text/css',
  js: 'application/javascript',
  map: 'application/javascript',
  html: 'text/html'
}

class Router {
  handle(req, res) {
    const fileName = req.url
    const extension = fileName.split('.')[fileName.split('.').length - 1]
    const url = new URL(req.url, `http://${req.headers.host}`)

    console.log(fileName)

    if (req.method === 'GET') {
      if (fileName === '/') {
        res.writeHead(301, { Location: `https://github.com/login/oauth/authorize?client_id=${clientId}` })
        res.end()
      } else if (fileName.match(/^(\/oauth-callback)/) !== null) {
        if (url.searchParams.get('code')) {
          const body = JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code: url.searchParams.get('code')
          })
          const opt = {
            port: 443,
            method: 'POST',
            hostname: 'github.com',
            path: '/login/oauth/access_token',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': body.length,
              Accept: 'application/json'
            }
          }

          https.request(opt, response => {
            response.on('data', datas => {
              res.setHeader('access_token', datas.toString())
              this.sendFile(res, 'html', 'index.html')
            })
          }).end(body)
        } else {
          res.statusCode = 403
          res.end('403 - Login failed')
        }
      } else if (fileName === '/api/pistes') {
        res.statusCode = 200
        res.end(fs.readFileSync('./assets/datas.json'))
      } else if (!fs.existsSync(basePath + fileName)) {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html')
        res.end('404 - File not found... (T-T)')
      } else {
        this.sendFile(res, extension, fileName)
      }
    }
  }

  sendFile (res, extension, fileName) {
    res.statusCode = 200
    res.setHeader('Content-Type', mimeType[extension])
    res.end(fs.readFileSync(basePath + fileName))
  }

}

module.exports = Router
