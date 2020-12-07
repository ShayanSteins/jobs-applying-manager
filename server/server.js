const http = require('http')
const fs = require('fs')

const port = 4040
const basePath = '../dist/'

const mimeType = {
  css: 'text/css',
  js: 'application/javascript',
  map: 'application/javascript',
  html: 'text/html'
}

const pistes = []

const server = http.createServer((req, res) => {
  const fileName = req.url === '/' ? 'index.html' : req.url
  const extension = fileName.split('.')[fileName.split('.').length-1]
  const method = req.method

  // console.log(req.method + ' ' + fileName)
  
  if(req.method === 'GET') {
    if (fileName === '/api/pistes') {
      res.statusCode = 200
      res.end(fs.readFileSync('./assets/datas.json'))
    }
    else if (!fs.existsSync(basePath + fileName)) {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/html')
      res.end('File not found... (T_T)')
      return 
    }
    else {
      res.statusCode = 200
      res.setHeader('Content-Type', mimeType[extension])
      res.end(fs.readFileSync(basePath + fileName))
    }
  }
})


server.listen(port, () => {
  console.log(`Server running at port ${port}`)
})