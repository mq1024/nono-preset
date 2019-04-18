import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/',
      name: 'home',
      meta: {
        back: 'backToApp'
      },
      component: () => import(/* webpackChunkName: "home" */ './views/Home')
    }
  ]
});
