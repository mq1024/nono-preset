import Vue from 'vue';
import App from './App.vue';
import router from './router';

import mzView from './components/mz-view/view.vue';
import Modal from './components/modal/index';
import directives from './directives.js';

Vue.component('mzView', mzView);
Vue.use(directives);
Vue.use(Modal, {
  dynamic: true,
  injectModalsContainer: true
});
Vue.config.productionTip = process.env.NODE_ENV === 'production';

new Vue({
  router,

  render: h => h(App)
}).$mount('#app');
