<template>
  <div id="app">
    <Header v-if="showHeader"></Header>
    <router-view></router-view>
  </div>
</template>

<script>

    import Header from './shared/Header'
    import store from './vue-elements/store/store'
    export default {
        name: 'app',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        components: {
            Header
        },
        computed: {
            showHeader: _ => store.getters['authentication/isLoggedIn']
        }
    }
</script>

<style lang="scss">
    @import '../node_modules/bootstrap/scss/bootstrap.scss'; // includes bootstrap functionality
</style>
