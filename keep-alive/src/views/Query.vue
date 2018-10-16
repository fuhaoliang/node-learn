<template>
  <div class="query">
    <h1>{{$route.query.num}}</h1>
    <input type="text" v-model="msg">
    {{ msg }}
  </div>
</template>
<script>
export default {
  name: 'query',
  data () {
    return {
      msg: '11111'
    }
  }
}
</script>
