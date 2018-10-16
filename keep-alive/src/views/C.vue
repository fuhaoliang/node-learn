<template>
  <div class="ccccc">
    <h1>ccccccc</h1>
    <input type="text" v-model="msg">
    {{ msg }}
  </div>
</template>
<script>
export default {
  name: 'c',
  data () {
    return {
      msg: 'cccccc'
    }
  },
  beforeRouteLeave (to, from, next) {
    to.meta.keepAlive = false
    next()
  }
}
</script>
