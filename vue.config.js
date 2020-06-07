module.exports = {
  devServer: {
    proxy: { 
     '/api': { 
        target: 'http://10.120.73.120',
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
