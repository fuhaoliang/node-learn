<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Upload></Upload>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Upload from '@/components/Upload.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    Upload
  }
}
</script>
