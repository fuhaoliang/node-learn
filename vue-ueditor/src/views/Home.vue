<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <editor></editor>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Editor from '@/components/Editor.vue'
export default {
  name: 'home',
  components: {
    HelloWorld,
    Editor
  }
}
</script>
