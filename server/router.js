const fs = require('fs')
const https = require('https')
const { createFileIfNotExist, updateContent } = require('./datasManager')
const conf = require('./assets/config.json')
const { clientId, clientSecret } = require(conf.OAuthKeysPath)

// chemin d'accès au dossier de build de parcel
const basePath = conf.basePath

// chemin d'accès au dossier server
const servPath = conf.servPath

// Types MIME
const mimeType = {
  css: 'text/css',
  js: 'application/javascript',
  map: 'application/javascript',
  html: 'text/html',
  json: 'application/json',
  svg: 'image/svg+xml'
}

/**
 * Routeur web
 * @property {String} distPath : chemin d'accès au dossier dist (parcel)
 */
class Router {

  /**
   * Gestionnaire de routes et requêtes HTTPS
   * @param {Request} req : requête à router
   * @param {Response} res : réponse reçue
   */
  handle(req, res) {
    const url = new URL(req.url, `https://${req.headers.host}`)
    const fileName = url.pathname
    const extension = fileName.split('.')[fileName.split('.').length - 1]

    if (req.method === 'GET') {
      if (fileName === '/') { // Redirection vers la connexion GitHub si non authentifié
        res.writeHead(301, { Location: `https://github.com/login/oauth/authorize?client_id=${clientId}` })
        res.end()
      } else if (fileName.match(/^(\/oauth-callback)/) !== null) { // Récupération du code temporaire et demande d'acces_token
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
              res.writeHead(301, { Location: `https://${req.headers.host}/index.html?access-token=${datas.access_token}` })
              res.end()
            })
          }).end(body)
        } else {
          res.statusCode = 403
          res.end('403 - Access denied')
        }
      } else if (fileName === '/api/pistes') { // Récupération des données du fichier utilisateur
        this.checkToken(req.headers['access-token'])
          .then(idLogin => {
            createFileIfNotExist(servPath + 'assets/', `datas${idLogin}.json`)
            this.sendFile(res, 'json', servPath, `assets/datas${idLogin}.json`)
          })
          .catch(error => {
            res.statusCode = 403
            res.end('403 - Access denied')
          })

      } else if (!fs.existsSync(basePath + fileName)) { // Erreur 404
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html')
        res.end('404 - File not found... (T-T)')
      } else { // Cas nominal des fichiers html, js, css, images
        this.sendFile(res, extension, basePath, fileName)
      }
    }
    else {
      if (fileName === '/api/update/pistes') { // Mise à jour des données du fichier utilisateur
        this.checkToken(req.headers['access-token'])
          .then(idLogin => {
            let concatedDatas = Buffer.alloc(0)
            req.on('data', datas => {
              concatedDatas = Buffer.concat([concatedDatas, datas])
            })
            req.on('end', () => {
              updateContent(`${servPath}assets/datas${idLogin}.json`, concatedDatas.toString())
            })
          })
      }
    }
  }

  /**
   * Construit la réponse et l'envoie
   * @param {Response} res : réponse du serveur
   * @param {string} extension : extension du fichier
   * @param {string} path : chemin d'accès au fichier
   * @param {string} fileName : nom du fichier
   */
  sendFile(res, extension, path, fileName) {
    res.statusCode = 200
    res.setHeader('Content-Type', mimeType[extension])
    res.end(fs.readFileSync(path + fileName))
  }

  /**
   * Vérifie que le token de l'utilisateur est toujours valide via une requête HTTPS vers l'OAuth de Github
   * @param {string} token : token d'accès de l'utilisateur
   */
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
        let concatedDatas = Buffer.alloc(0)

        response.on('data', datas => {
          concatedDatas = Buffer.concat([concatedDatas, datas])
        })
        response.on('end', () => {
          concatedDatas = JSON.parse(concatedDatas.toString())
          if (concatedDatas.id !== undefined) resolve(concatedDatas.id)
          reject('bad token')
        })
      }).end()
    })
  }
}

module.exports = Router
