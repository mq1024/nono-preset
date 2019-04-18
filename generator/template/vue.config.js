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
  productionSourceMap: false, //生产环境不需要sourceMap
  devServer: {
    open: true,
    hot: true
  }
};
