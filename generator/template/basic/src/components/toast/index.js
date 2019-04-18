import Toast from './_toast.js';

Toast.install = function(Vue, options = {}) {
  Toast.setting(options);
  Vue.prototype.$toast = Toast;
};
export default Toast;
