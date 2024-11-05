import https from 'https'
import fs from 'fs'
import { createFileIfNotExist, updateContent } from './datasManager'
import conf from './assets/config.json'
import { IncomingHttpHeaders, IncomingMessage, ServerResponse } from 'http'
const { clientId, clientSecret } = await import(conf.OAuthKeysPath)

const basePath: string = conf.basePath // path to parcel build folder
const servPath: string = conf.servPath // path to server folder

const mimeType = {
  css: 'text/css',
  js: 'application/javascript',
  map: 'application/javascript',
  html: 'text/html',
  json: 'application/json',
  svg: 'image/svg+xml',
}

export default class Router {
  handle(req: IncomingMessage, res: ServerResponse) {
    const url = new URL(req.url!, `https://${req.headers.host}`)
    const fileName = url.pathname
    const extension = fileName.split('.')[fileName.split('.').length - 1]

    if (req.method === 'GET') {
      if (fileName === '/') {
        // Redirect to github Auth if user is not logged in yet
        this.redirect(
          res,
          301,
          `https://github.com/login/oauth/authorize?client_id=${clientId}`
        )
      } else if (fileName.match(/^(\/oauth-callback)/) !== null) {
        // Temporary code recovery and access_token request
        const code = url.searchParams.get('code')
        if (code) {
          this.authentication(code, res, req.headers.host!)
        } else {
          res.statusCode = 403
          res.end('403 - Access denied')
        }
      } else if (fileName === '/api/opportunities') {
        // Get user file data
        this.checkToken(req.headers)
          .then((loginId) => {
            createFileIfNotExist(servPath + 'assets/', `datas${loginId}.json`)
            this.sendFile(res, 'json', servPath, `assets/datas${loginId}.json`)
          })
          .catch((error) => {
            console.error(error)
            res.statusCode = 403
            res.end('403 - Access denied')
          })
      } else if (!fs.existsSync(basePath + fileName)) {
        // 404 ERROR
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html')
        res.end('404 - File not found... (T-T)')
      } else {
        // Nominal case for html, js, css, images files
        this.sendFile(res, extension, basePath, fileName)
      }
    } else {
      if (fileName === '/api/update/pistes') {
        // Update user file data
        this.checkToken(req.headers).then((idLogin) => {
          let concatedDatas = Buffer.alloc(0)
          req.on('data', (datas) => {
            concatedDatas = Buffer.concat([concatedDatas, datas])
          })
          req.on('end', () => {
            updateContent(
              `${servPath}assets/datas${idLogin}.json`,
              concatedDatas.toString()
            )
          })
        })
      }
    }
  }

  sendFile(
    res: ServerResponse,
    extension: string,
    path: string,
    fileName: string
  ) {
    res.statusCode = 200
    res.setHeader('Content-Type', mimeType[extension])
    res.end(fs.readFileSync(path + fileName))
  }

  redirect(res: ServerResponse, statusCode: number, location: string) {
    res.writeHead(statusCode, {
      Location: location,
    })
    res.end()
  }

  authentication(code: string, res: ServerResponse, host: string) {
    const body = JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    })
    const opt = {
      port: 443,
      method: 'POST',
      hostname: 'github.com',
      path: '/login/oauth/access_token',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': body.length,
        Accept: 'application/json',
      },
    }

    https
      .request(opt, (response) => {
        response.on('data', (datas) => {
          datas = JSON.parse(datas.toString())
          this.redirect(
            res,
            301,
            `https://${host}/index.html?access-token=${datas.access_token}`
          )
        })
      })
      .end(body)
  }

  checkToken(headers: IncomingHttpHeaders) {
    const opt = {
      port: 443,
      method: 'GET',
      hostname: 'api.github.com',
      path: '/user',
      headers: {
        'User-Agent': 'curl/7.22.0',
        Authorization: `token ${headers['access-token']}`,
      },
    }

    return new Promise((resolve, reject) => {
      https
        .request(opt, (response) => {
          let concatedDatas = Buffer.alloc(0)

          response.on('data', (datas) => {
            concatedDatas = Buffer.concat([concatedDatas, datas])
          })
          response.on('end', () => {
            const result: { id: number } = JSON.parse(concatedDatas.toString())
            if (result.id !== undefined) resolve(result.id)
            reject('bad token')
          })
        })
        .end()
    })
  }
}
