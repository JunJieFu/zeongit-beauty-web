/**
 * 这个文件没意义，主要是配置webstorm
 * @type {path.PlatformPath | path}
 */
const path = require("path")
const resolve = (dir) => path.join(__dirname, dir)
module.exports = {
  resolve: {
    alias: {
      "@": resolve("src")
    }
  }
}
