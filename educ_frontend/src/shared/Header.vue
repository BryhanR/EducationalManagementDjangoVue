<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" @click.prevent="getUsers">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Features</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Pricing</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" @click.prevent="logOut" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown link
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
    </ul>
  </div>
</nav>
    </div>
</template>

<script>
    export default {
        name: "Header",
        methods: {
            getUsers: function () {
                let username = this.email
                let password = this.password
                let self = this;
                this.$store.dispatch('authentication/getUsers', { })
                .then((resp) =>
                {
                    console.log('Users Received successfully', resp);
                 })
                .catch(err => console.log(err))
            },
            logOut: function () {
                let self = this;
                this.$store.dispatch('authentication/logout', { })
                .then((resp) =>
                {
                    console.log('Users Received successfully', resp);
                 })
                .catch(err => console.log(err))
        }
        }
    }
</script>

<style scoped>

</style>
