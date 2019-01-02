import axios from 'axios'
import { Service } from 'axios-middleware';
import store from '../store/store'




export default function initRequestMiddleware() {
    const requestsMiddleware = new Service(axios);
    var token = '';
    requestsMiddleware.register({
        onRequest(config) { // called before a request, will add authentcation here
            console.log('onRequest');
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.getters['authentication/getToken']
            return config;
        },
        onSync(promise) {
            console.log('onSync');
            return promise;
        },
        onRequestError(error) {
            console.log('Ha ocurrido un error ', error);
        },
        onResponse(response) { // will verify if there's an error with the request, and log the user out
            console.log('onResponse');
            store.dispatch('authentication/updateToken', { token: JSON.parse(response.data).token });
            return response;
        }
    });
}