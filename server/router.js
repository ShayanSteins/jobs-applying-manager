const { rejects } = require('assert')
const fs = require('fs')
const https = require('https')
const { resolve } = require('path')
const { clientId, clientSecret } = require('../key.json')
const { createFileIfNotExist } = require('./datasManager')
const basePath = 'dist/'
const servPath = 'server/'

const mimeType = {
  css: 'text/css',
  js: 'application/javascript',
  map: 'application/javascript',
  html: 'text/html',
  json: 'application/json'
}

class Router {
  handle(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`)
    const fileName = url.pathname
    const extension = fileName.split('.')[fileName.split('.').length - 1]

    console.log('File Name = ' + fileName)

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
              datas = JSON.parse(datas.toString())
              res.writeHead(301, { Location: `http://${req.headers.host}/index.html?access-token=${datas.access_token}` })
              res.end()
            })
          }).end(body)
        } else {
          res.statusCode = 403
          res.end('403 - Access denied')
        }
      } else if (fileName === '/api/pistes') {
        this.checkToken(req.headers['access-token'])
          .then(idLogin => {
            createFileIfNotExist(servPath + 'assets/', `datas${idLogin}.json`)
            this.sendFile(res, 'json', servPath, `assets/datas${idLogin}.json`)
          })
          .catch(error => {
            res.statusCode = 403
            res.end('403 - Access denied')
          })

      } else if (!fs.existsSync(basePath + fileName)) {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html')
        res.end('404 - File not found... (T-T)')
      } else {
        this.sendFile(res, extension, basePath, fileName)
      }
    }
  }

  sendFile(res, extension, path, fileName) {
    res.statusCode = 200
    res.setHeader('Content-Type', mimeType[extension])
    res.end(fs.readFileSync(path + fileName))
  }

  checkToken(token) {
    const opt = {
      port: 443,
      method: 'GET',
      hostname: 'api.github.com',
      path: '/user',
      headers: {
        'User-Agent': 'curl/7.22.0',
        Authorization: `token ${token}`
      }
    }

    return new Promise((resolve, reject) => {
      https.request(opt, response => {
        let data = Buffer.alloc(0)

        response.on('data', datas => {
          data = Buffer.concat([data, datas])
        })
        response.on('end', () => {
          data = JSON.parse(data.toString())
          if (data.id !== undefined) resolve(data.id)
          reject('bad token')
        })
      }).end()
    })
  }
}

module.exports = Router
