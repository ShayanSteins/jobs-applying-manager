import Server from './server'
import Router from './router'

try {
  new Server()
    .registerRouter(new Router())
    .start()
} catch (error) {
  console.error(error)
}
