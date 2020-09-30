const path = require('path');
const CracoLessPlugin = require('craco-less');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve('src')
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  devServer: {
    port: 3000, // 端口配置
    proxy: {
        '/api': {
            target: 'http://abc.com',
            ws: false, // websocket
            changeOrigin: true, //是否跨域
            secure: false,  // 如果是https接口，需要配置这个参数
            pathRewrite: {
                '^/api': ''
            }
        }
    }
  }
};
