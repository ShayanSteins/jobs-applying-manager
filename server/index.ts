import Server from './server.ts'
import Router from './router.ts'

try {
  new Server()
    .registerRouter(new Router())
    .start()
} catch (error) {
  console.error(error)
}
