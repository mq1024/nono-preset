module.exports = {
  publicPath: './',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/sass/variable.scss";`
      }
    }
  },
  lintOnSave: process.env.NODE_ENV !== 'production', //生产构建时禁用 eslint-loader
  productionSourceMap: false, //生产环境不需要sourceMap
  devServer: {
    open: true,
    hot: true
  }
};
