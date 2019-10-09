import Vue from 'vue';
import Router from 'vue-router';
import Slug from './Slug.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/slug/',
  routes: [
    {
      path: '/:slug',
      component: Slug,
    },
  ],
});
