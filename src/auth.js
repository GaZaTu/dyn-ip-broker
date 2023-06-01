import { verifyJwt } from "./jwt.js"

/**
 * @param {import("koa").ParameterizedContext<import("koa").DefaultState, import("koa").DefaultContext, any>} ctx
 */
export const ensureAuth = async (ctx) => {
  const throw401 = () => {
    ctx.throw(401, new Error("You need to be logged in to access this resource."))
  }

  const authHeader = ctx.get("authorization")
  if (!authHeader) {
    throw401()
  }

  const authToken = authHeader.replace("Bearer", "").trim()

  try {
    await verifyJwt(authToken)
  } catch {
    throw401()
  }
}
