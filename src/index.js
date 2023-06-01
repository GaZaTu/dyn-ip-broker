import Koa from "koa"
import koaBody from "koa-body"
import koaLogger from "koa-logger"
import { createHttpServer } from "./http-server.js"
import dynIpRouter from "./dyn-ip-router.js"

const server = new Koa({
  proxy: true,
})

server.use(koaLogger({}))
server.use(koaBody({}))

server.use(dynIpRouter.allowedMethods())
server.use(dynIpRouter.middleware())

const [, listen] = createHttpServer(server.callback())
await listen()
