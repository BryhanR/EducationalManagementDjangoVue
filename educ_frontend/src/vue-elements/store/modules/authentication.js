import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

Vue.use(Vuex)

let authentication = {
  namespaced: true,
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {}
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, user){
      state.status = 'success'
      state.token = token
      state.user = user

      axios.defaults.headers.common['Authorization'] = token
      localStorage.setItem('token', token)
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''

      axios.defaults.headers.common['Authorization'] = null
      localStorage.removeItem('token')
    },
  },
  actions: {
    login({commit}, user){
        return new Promise((resolve, reject) => {
          commit('auth_request')
          var data = new FormData();
          data.append('username', user.username);
          data.append('password', user.password);

          axios.post('http://localhost:8000/auth/logIn', data)
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
    getUsers({commit}, user){
        return new Promise((resolve, reject) => {

          axios.get('http://localhost:8000/auth/users')
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            if (token) {
                resolve(resp)
            } else {
                resolve(resp)
            }

          })
          .catch(err => {
            reject(err)
          })
        })
    },
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
};

export default authentication;