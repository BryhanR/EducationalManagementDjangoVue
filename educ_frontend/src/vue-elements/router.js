import VueRouter from 'vue-router'
import Vue from 'vue'
import store from '../vue-elements/store'
Vue.use(VueRouter)


const Home = { template: '<div>This is Home</div>' }
const Foo = { template: '<div>This is Foo</div>' }
const Bar = { template: '<div>This is Bar {{ $route.params.id }}</div>' }

import login from '../modules/login/login.vue'

let router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        { path: '/', name: 'home', component: Home, meta: { 
            requiresAuth: true
          } },
        { path: '/login', name: 'login', component: login },
        { path: '/foo', name: 'foo', component: Foo },
        { path: '/bar', name: 'bar', component: Bar }
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