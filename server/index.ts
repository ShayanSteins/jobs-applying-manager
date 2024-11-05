import Server from './server.js'
import Router from './router.js'

try {
  new Server()
    .registerRouter(new Router())
    .start()
} catch (error) {
  console.log(error)
}
