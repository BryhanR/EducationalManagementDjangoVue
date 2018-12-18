<template>
    <header>
        <div id="logo">UA</div>
        <nav>
            <ul>
                <router-link tag='li' :to="{ name: 'foo'}">
                    <a>Home</a>
                </router-link>
                <router-link tag='li' :to="{ name: 'bar'}">
                    <a>CuteCat</a>
                </router-link>
                <router-link tag='li' :to="{ name: 'vIndex'}">
                    <a>Outside side</a>
                </router-link>
            </ul>
        </nav>
    </header>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>

</style>
