/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/api/': {
      // 要代理的地址
      target: 'http://192.168.2.2:18083/', //公司开发环境
      changeOrigin: true,
      pathRewrite: { '^/api/': '' },
    },
    '/systemfile/': {
      target: 'http://192.168.2.2:8002/systemfile/',
      changeOrigin: true,
      pathRewrite: { '^/systemfile/': '' },
    },
    '/wsUrl/': {
      target: 'ws://192.168.2.2:18083/', //这里是后台ws访问地址
      changeOrigin: true, //允许跨域设置
      ws: true, //websocket代理设置
      pathRewrite: { '^/wsUrl/': '' }, //拦截路径去除
    },
  },
  test: {
    '/api/': {
      target: 'https://proapi.azurewebsites.net',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
