<template>
  <section class="container">
    <img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
  </section>
</template>
<script>
  import { baseURL } from '../utils/node.env.js'
  export default{
    name: 'index',
    mounted() {
      console.info('baseURL==>', baseURL)
    }
  }
</script>
<style scoped>
.title
{
  margin: 50px 0;
}
</style>
