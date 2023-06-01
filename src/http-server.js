import http from "http"
import https from "https"
import config from "config"
import { readFileSync } from "fs"

export const getHost = () => {
  if (process.env.NODE_ENV === "test") {
    return "127.0.0.1"
  }

  if (!config.has("host")) {
    return "127.0.0.1"
  }

  return /** @type {string} */ (config.get("host"))
}

export const getPort = () => {
  if (process.env.NODE_ENV === "test") {
    return 4343
  }

  if (!config.has("port")) {
    return 3434
  }

  return /** @type {number} */ (config.get("port"))
}

const getHttpsConfig = () => {
  if (!config.has("httpsConfig")) {
    return undefined
  }

  /** @type {{ key: string, cert: string, ca: string[] }} */
  const httpsConfigSource = config.get("httpsConfig")
  const httpsConfig = {
    key: readFileSync(httpsConfigSource.key),
    cert: readFileSync(httpsConfigSource.cert),
    ca: httpsConfigSource.ca.map(p => readFileSync(p)),
  }

  return httpsConfig
}

/**
 * @param {(req: http.IncomingMessage, res: http.ServerResponse) => void} callback
 */
export const createHttpServer = (callback) => {
  const server = (() => {
    const httpsConfig = getHttpsConfig()
    if (httpsConfig) {
      return https.createServer(httpsConfig, callback)
    } else {
      return http.createServer(callback)
    }
  })()

  /**
   * @returns {Promise<() => Promise<void>>}
   */
  const listen = () =>
    new Promise(resolve => {
      const host = getHost()
      const port = getPort()

      server.listen(port, host, () => {
        console.log(`listening on http://${host}:${port}`)

        /**
         * @returns {Promise<void>}
         */
        const close = () => {
          console.log(`close ${host}:${port}`)

          return new Promise((resolve, reject) => {
            server.close(err => err ? reject(err) : resolve())
          })
        }

        resolve(close)
      })
    })

  return /** @type {const} */ ([server, listen])
}
