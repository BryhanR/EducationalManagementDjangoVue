import VueRouter from 'vue-router'
import Vue from 'vue'
import store from '../vue-elements/store/store'
Vue.use(VueRouter)

import login from '../modules/login/components/login.vue'
import dashboard from '../modules/homescreen/components/homescreen.vue'

let router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '/',
            name: 'root',
            redirect: 'dashboard'
        },
        { path: '/login', name: 'login', component: login },
        { path: '/dashboard', name: 'dashboard', component: dashboard, meta: { requiresAuth: true } },
    ]
});

router.beforeEach((to, from, next) => {

    if(to.matched.some(record => record.meta.requiresAuth)) {
      if (store.getters['authentication/isLoggedIn']) {
        next()
        return
      }
      next('/login') 
    } else {
      next()
    }
  });

export default router;