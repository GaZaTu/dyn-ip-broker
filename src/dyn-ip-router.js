import Router from "@koa/router"
import { ensureAuth } from "./auth.js"

const router = new Router()
export default router

/** @type {Record<string, string>} */
const clients = {}

router.get("/clients", async ctx => {
  await ensureAuth(ctx)

  ctx.type = "json"
  ctx.body = clients
})

router.post("/clients/:id", async ctx => {
  await ensureAuth(ctx)

  clients[ctx.params.id] = ctx.ip

  ctx.status = 204
})

router.get("/clients/:id", async ctx => {
  await ensureAuth(ctx)

  if (!clients[ctx.params.id]) {
    ctx.throw(404)
  }

  ctx.type = "txt"
  ctx.body = clients[ctx.params.id]
})
