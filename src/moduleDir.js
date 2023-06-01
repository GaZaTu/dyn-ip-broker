import { dirname, resolve } from "node:path"

/**
 * @param {string} importMetaUrl
 */
const moduleDir = (importMetaUrl) => {
  let __dirname = dirname(new URL(importMetaUrl).pathname)
  if (__dirname[0] === "/" && __dirname[2] === ":") {
    __dirname = __dirname.slice(1)
  }
  return __dirname
}

export default moduleDir

export const projectDir = resolve(`${moduleDir(import.meta.url)}/../..`)
/**
 * @param {string} importMetaUrl
 */
export const modulePath = (importMetaUrl) => {
  let __dirname = new URL(importMetaUrl).pathname
  if (__dirname[0] === "/" && __dirname[2] === ":") {
    __dirname = __dirname.slice(1)
  }
  return __dirname
}
