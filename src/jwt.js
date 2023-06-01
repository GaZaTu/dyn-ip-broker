import jwt from "jsonwebtoken"
import config from "config"

const getJWTSecret = () => {
  if (!config.has("jwtSecret") && (process.env.NODE_ENV !== "production")) {
    return "TEST"
  }

  return /** @type {string} */ (config.get("jwtSecret"))
}

/**
 * @template P
 * @param {string} token
 * @returns {Promise<P>}
 */
export const verifyJwt = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, getJWTSecret(), (err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
}

/**
 * @template P
 * @param {P} payload
 * @returns {Promise<string>}
 */
export const signJwt = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, getJWTSecret(), (err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
}
