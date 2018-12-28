export default {
        data() {
            return {
                email : "",
                password : ""
            }
        },
        methods: {
            login: function () {
                let username = this.email
                let password = this.password
                let self = this;
                this.$store.dispatch('authentication/login', { username, password })
            .then(() =>
            {
                console.log('logged in successfully');
                 this.$router.push({ path: '/' })
             })
            .catch(err => console.log(err))
            },
        }
  }