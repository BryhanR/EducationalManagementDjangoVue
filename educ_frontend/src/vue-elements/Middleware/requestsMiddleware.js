import axios from 'axios'
import { Service } from 'axios-middleware';
import store from '../store/store'
import Vue from 'vue'

import vueCookies from 'vue-cookies';
Vue.use(vueCookies)




export default function initRequestMiddleware() {
    const requestsMiddleware = new Service(axios);
    var token = '';
    requestsMiddleware.register({
        onRequest(config) { // called before a request, will add authentication here
            console.log('onRequest');
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.getters['authentication/getToken'];

            return config;
        },
        onSync(promise) {
            console.log('onSync');
            return promise;
        },
        onResponse(response) {
            console.log('onResponse');
            store.dispatch('authentication/updateToken', { token: JSON.parse(response.data).token });
            return response;
        },
        onResponseError(error) {
            console.log('Ha ocurrido un error ', error);
            if (error.response.status === 401) {
                store.dispatch('authentication/logout', { });
            }
        },
    });
}