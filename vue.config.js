const fs = require('fs');

module.exports = {
  // configureWebpack: {
  // },
  devServer: {
    port: 80,
    // https: true,
    // https: {
    //   key: fs.readFileSync('/etc/letsencrypt/live/xn--9t4b64x37c.com/privkey.pem'),
    //   cert: fs.readFileSync('/etc/letsencrypt/live/xn--9t4b64x37c.com/cert.pem'),
    //   ca: fs.readFileSync('/etc/letsencrypt/live/xn--9t4b64x37c.com/ca.pem'),
    // },
    host:'0.0.0.0',
    hot: true,
    disableHostCheck: true,
    proxy: { 
     '/api': { 
        target: 'http://127.0.0.1:4000',
        ws: true,
        changeOrigin: true,
      } 
    }
},
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave : false
}
