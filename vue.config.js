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
    port: 12181, // �˿�
    proxy: {
      "/api": {
        // Ŀ�� API ��ַ
        target: "http://47.107.181.201:8081/",
        // ���Ҫ���� websockets
        ws: true,
        secure: false,
        // ��������ͷ��ԭ�����ΪĿ��URL
        changeOrigin: true,
        pathRewrite: { "^/api": "/" }
      }
    }
    // proxy: {
    //   "/api": {
    //     // Ŀ�� API ��ַ
    //     target: "http://beauty.zeongit.cn/",
    //     // ���Ҫ���� websockets
    //     ws: true,
    //     secure: false,
    //     // ��������ͷ��ԭ�����ΪĿ��URL
    //     changeOrigin: true,
    //     pathRewrite: { "^/api": "/api" }
    //   }
    // }
  }
}
