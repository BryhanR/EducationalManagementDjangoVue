import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import router from '../../router'

axios.defaults.xsrfHeaderName = "X-CSRFToken";
//axios.defaults.xsrfCookieName = "XCSRF-TOKEN";


Vue.use(Vuex)



let authentication = {
  namespaced: true,
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {}
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user

      //axios.defaults.headers.common['Authorization'] = 'Token' + token
      //localStorage.setItem('token', token)
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
      axios.defaults.headers.common['Authorization'] = null
      localStorage.removeItem('token')
    },
    updateToken(state, newToken) {
        if(newToken && state.token !== newToken) {
            state.token = newToken;
            localStorage.setItem('token', newToken);
        } else if(!newToken) {
            //this.logout(state);
        }
    }
  },
  actions: {
    login({commit}, user){
        return new Promise((resolve, reject) => {
          commit('auth_request')
          var data = new FormData();
          data.append('username', user.username);
          data.append('password', user.password);

          axios.post('/auth/logIn', data)
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            if (token) {
                commit('auth_success', token, user)
                resolve(resp)
            } else {
                commit('logout')
                reject(resp)
            }

          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
        })
    },
    logout({commit}, user){
        return new Promise((resolve, reject) => {
          axios.post('/auth/logOut')
          .then(resp => {
                commit('logout');
                router.go('/');
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
        })
    },
    getUsers({commit}, user){
        return new Promise((resolve, reject) => {

          axios.get('/auth/users')
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            if (token) {
                resolve(resp)
            }
            reject(resp)
          })
          .catch(err => {
            reject(err)
          })
        })
    },
    updateToken({commit}, newToken) {
        console.log('Updating token')
        if (newToken) {
            commit('updateToken', newToken.token);
        } else {
            commit('logout')
        }

    },
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getToken: state => state.token
  }
};

export default authentication;