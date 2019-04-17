import Loading from './_loading.js';
Loading.install = function(Vue, options = {}) {
  Loading.init(options);
  Vue.prototype.$loading = Loading;
};
export default Loading;
