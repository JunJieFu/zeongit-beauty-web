const path = require("path")
const resolve = (dir) => path.join(__dirname, dir)
module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Zeongit Beauty"
      return args
    })
    config.resolve.alias.set("@", resolve("src"))
  },
  transpileDependencies: ["vuetify"],
  devServer: {
    port: 12181, // 端口
    proxy: {
      "/api": {
        // 目标 API 地址
        target: "http://47.107.181.201:8081/",
        // 如果要代理 websockets
        ws: true,
        secure: false,
        // 将主机标头的原点更改为目标URL
        changeOrigin: true,
        pathRewrite: { "^/api": "/" }
      }
    }
    // proxy: {
    //   "/api": {
    //     // 目标 API 地址
    //     target: "http://beauty.zeongit.cn/",
    //     // 如果要代理 websockets
    //     ws: true,
    //     secure: false,
    //     // 将主机标头的原点更改为目标URL
    //     changeOrigin: true,
    //     pathRewrite: { "^/api": "/api" }
    //   }
    // }
  }
}
