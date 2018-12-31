<template>
    <div class="login">
        <div class="main">
            <div class="container">
                <center>
                    <div class="middle">
                        <div id="login">
                            <form @submit.prevent="login">
                                <fieldset class="clearfix">
                                    <p>
                                        <span class="fa fa-user"></span>
                                        <input v-model="email" type="email" placeholder="Username" required>
                                    </p>
                                    <p>
                                        <span class="fa fa-lock"></span>
                                        <input v-model="password" type="password" placeholder="Password" required>
                                    </p>
                                    <div>
                                        <span style="width:48%; text-align:left;  display: inline-block;">
                                            <a class="small-text" href="#">Forgot password?</a>
                                        </span>
                                        <span style="width:50%; text-align:right;  display: inline-block;">
                                        <button type="submit">Login</button>
                                        </span>
                                    </div>
                                </fieldset>
                                <div class="clearfix"></div>
                            </form>
                            <div class="clearfix"></div>
                        </div> <!-- end login -->
                        <div class="logo">LOGO
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </center>
            </div>
        </div>
    </div>
</template>

<script src='../js/login.js'>
</script>

<style lang="scss">
@import "../styles/main.scss"
</style>
