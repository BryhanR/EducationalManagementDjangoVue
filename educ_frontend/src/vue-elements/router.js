import VueRouter from 'vue-router'
import Vue from 'vue'
import store from '../vue-elements/store'
Vue.use(VueRouter)


const Home = { template: '<div>This is Home</div>' }

import login from '../modules/login/login.vue'

let router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        { path: '/', name: 'home', component: Home, meta: { 
            requiresAuth: true
          } },
        { path: '/login', name: 'login', component: login },
    ]
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
      if (store.getters.isLoggedIn) {
        next()
        return
      }
      next('/login') 
    } else {
      next() 
    }
  });

export default router;