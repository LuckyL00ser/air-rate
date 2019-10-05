import Vue from 'vue';
import Router from 'vue-router';
import store from './store/store.js';
import Home from './views/Home.vue';
import About from './views/About.vue';
import PermissionDenied from './views/PermissionDenied.vue';
import UnknownPage from './views/UnknownPage.vue';
import Register from './views/Register.vue';
import UserDashboard from './views/UserDashboard.vue';
import LoginView from './views/LoginView';
import MapView from './views/MapView.vue';

Vue.use(Router);

const router=new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: MapView,
      meta: {
        public: true,
        }
    },
    {
      path: '/map',
      name: 'MapView',
      component: Home,
      meta: {
        public: true,
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        public: false,
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: {
        public: true,
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        public: true,
      }
    },
    {
      path: '/user-dashboard',
      name: 'UserDashboard',
      component: UserDashboard,
      meta: {
        public: false,
      }
    },
    {
      path: '/permissionDenied',
      name: 'denied',
      component: PermissionDenied,
      meta: {
        public: true,
      }
    },
    {
      path: '*',
      name: 'unknownPage',
      component: UnknownPage,
      meta: {
        public: true,
      }
    }
  ],
});
router.beforeEach((to, from, next) => {
   if (to.matched.some(record => !record.meta.public)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.user.status.loggedIn) {
      next({
        path: '/login',
        //query: { redirect: to.fullPath }
      })
    } else {
      next()
    }

  } else {
    next() // make sure to always call next()!
  }
});

export default router;
