import fs from 'fs'
import https from 'https'
import { IncomingHttpHeaders, IncomingMessage, ServerResponse } from 'http'
import { basePath, OAuthKeysPath } from './assets/config.json'
import { OpportunityRepository } from './opportunity/infra/opportunity.repository'
import { JsonOpportunityDataSource } from './opportunity/infra/opportunity.data-source'
import { GetUserOpportunitiesUseCase } from './opportunity/app/use-case/get-user-opportunities.use-case'
import { UpdateUserOpportunityUseCase } from './opportunity/app/use-case/update-user-opportunity.use-case'
import { DeleteUserOpportunityUseCase } from './opportunity/app/use-case/delete-user-opportunity.use-case'
import { UUID } from './type'
const { clientId, clientSecret } = await import(OAuthKeysPath)

const mimeType = {
  css: 'text/css',
  js: 'application/javascript',
  map: 'application/javascript',
  html: 'text/html',
  json: 'application/json',
  svg: 'image/svg+xml',
}

export default class Router {
  async handle(req: IncomingMessage, res: ServerResponse) {
    try {
      this.isMethodSupported(req.method!, res)
      const url = new URL(req.url!, `https://${req.headers.host}`)
      const fileName = url.pathname
      const extension = fileName.split('.')[fileName.split('.').length - 1]

      if (fileName === '/') {
        // Redirect to github Auth if user is not logged in yet
        this.redirect(res, 301, `https://github.com/login/oauth/authorize?client_id=${clientId}`)
      } else if (fileName.match(/^(\/oauth-callback)/) !== null) {
        // Temporary code recovery and access_token request
        const code = url.searchParams.get('code')
        if (code) {
          this.authentication(code, res, req.headers.host!)
        } else {
          this.sendError(res, 403, '403 - Access denied')
        }
      } else if (fileName.match(/^(\/api\/opportunity)/) !== null) {
        const userId = await this.checkToken(req.headers)
        const opportunityRepository = new OpportunityRepository(
          new JsonOpportunityDataSource(userId)
        )

        if (fileName === '/api/opportunity/all') {
          // Get user file data
          const getUserOpportunitiesUseCase = new GetUserOpportunitiesUseCase(opportunityRepository)
          const opportunities = await getUserOpportunitiesUseCase.execute()
          this.sendData(res, 'json', opportunities)
        } else if (fileName === '/api/opportunity/update') {
          let concatedDatas = Buffer.alloc(0)
          req.on('data', (datas) => {
            concatedDatas = Buffer.concat([concatedDatas, datas])
          })
          req.on('end', async () => {
            const updateUserOpportunityUseCase = new UpdateUserOpportunityUseCase(
              opportunityRepository
            )
            const opportunity = await updateUserOpportunityUseCase.execute({
              opportunity: concatedDatas,
            })
            this.sendData(res, 'json', opportunity)
          })
        } else if (fileName === '/api/opportunity/delete') {
          let concatedDatas = Buffer.alloc(0)
          req.on('data', (datas) => {
            concatedDatas = Buffer.concat([concatedDatas, datas])
          })
          req.on('end', async () => {
            const deleteUserOpportunityUseCase = new DeleteUserOpportunityUseCase(
              opportunityRepository
            )
            const uuids: UUID[] = JSON.parse(concatedDatas.toString())
            const opportunity = await deleteUserOpportunityUseCase.execute({
              uuids,
            })
            this.sendData(res, 'json', opportunity)
          })
        }
      } else if (!fs.existsSync(basePath + fileName)) {
        // 404 ERROR
        this.sendError(res, 404, '404 - File not found... (T-T)')
      } else {
        // Nominal case for html, js, css, images files
        this.sendFile(res, extension, basePath, fileName)
      }
    } catch (error) {
      console.error(error)
      this.sendError(res, res.statusCode, error)
    }
  }

  sendData(res: ServerResponse, extension: string, data: any) {
    res.statusCode = 200
    res.setHeader('Content-Type', mimeType[extension])
    res.end(JSON.stringify(data))
  }

  sendFile(res: ServerResponse, extension: string, path: string, fileName: string) {
    res.statusCode = 200
    res.setHeader('Content-Type', mimeType[extension])
    res.end(fs.readFileSync(path + fileName))
  }

  sendError(res: ServerResponse, statusCode: number, data: string) {
    res.statusCode = statusCode
    res.setHeader('Content-Type', 'text/html')
    res.end(data)
  }  

  redirect(res: ServerResponse, statusCode: number, location: string) {
    res.writeHead(statusCode, {
      Location: location,
    })
    res.end()
  }

  isMethodSupported(method: string, res: ServerResponse): void {
    const supportedMethods = ['POST', 'DELETE', 'GET']

    if (!supportedMethods.includes(method)) {
      this.sendError(
        res,
        405,
        method + ' method is known by the server but is not supported by the target resource.'
      )
    }
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
          this.redirect(res, 301, `https://${host}/index.html?access-token=${datas.access_token}`)
        })
      })
      .end(body)
  }

  checkToken(headers: IncomingHttpHeaders): Promise<number> {
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
