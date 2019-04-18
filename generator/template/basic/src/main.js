import Vue from 'vue';
import App from './App.vue';
import router from './router';
<% if(options.vuex){ %>
import store from './store'
<% } %>

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
  <% if(options.vuex){ %>
    stroe
  <% } %>
  render: h => h(App)
}).$mount('#app');
