/**
 * @param {{ query: import("querystring").ParsedUrlQuery }} ctx
 * @param {(q: import("querystring").ParsedUrlQuery) => unknown} func
 */
export const qString = (ctx, func) => {
  const r = func(ctx.query)
  if (r === undefined) {
    return undefined
  }

  return String(r)
}

/**
 * @param {{ query: import("querystring").ParsedUrlQuery }} ctx
 * @param {(q: import("querystring").ParsedUrlQuery) => unknown} func
 */
export const qNumber = (ctx, func) => {
  const r = func(ctx.query)
  if (r === undefined) {
    return undefined
  }

  return Number(r)
}

/**
 * @param {{ query: import("querystring").ParsedUrlQuery }} ctx
 * @param {(q: import("querystring").ParsedUrlQuery) => unknown} func
 */
export const qBoolean = (ctx, func) => {
  const r = func(ctx.query)
  if (r === undefined) {
    return undefined
  }

  return String(r) === "true"
}

/**
 * @param {{ query: import("querystring").ParsedUrlQuery }} ctx
 * @param {(q: import("querystring").ParsedUrlQuery) => unknown} func
 */
export const qArray = (ctx, func) => {
  const r = func(ctx.query)
  if (r === undefined) {
    return undefined
  }

  return String(r)
    .replace("[", "")
    .replace("]", "")
    .split(",")
}

/**
 * @param {{ query: import("querystring").ParsedUrlQuery }} ctx
 * @param {(q: import("querystring").ParsedUrlQuery) => unknown} func
 */
export const qJson = (ctx, func) => {
  const r = func(ctx.query)
  if (r === undefined) {
    return undefined
  }

  return JSON.parse(String(r))
}
