import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'

import store from './vue-elements/store/store'
import router from './vue-elements/router'

Vue.prototype.$http = Axios;

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Token' + token
}


import initRequestMiddleware from './vue-elements/Middleware/requestsMiddleware';

initRequestMiddleware();

new Vue({
    el: '#app',
    delimiters: ['[%', '%]'],
    router,
    store,
    render: h => h(App)
})
