<template>
  <div class="query">
    <h1>BBBBBB</h1>
    <input type="text" v-model="msg">
    {{ msg }}
  </div>
</template>
<script>
export default {
  name: 'b',
  data () {
    return {
      msg: 'bbbbb'
    }
  },
  beforeRouteLeave (to, from, next) {
    to.meta.keepAlive = true
    next()
  }
}
</script>
