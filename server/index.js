const Server = require('./server')
const Router = require('./router')

try {
  new Server()
    .registerRouter(new Router())
    .start()
} catch (error) {
  console.log(error)
}
