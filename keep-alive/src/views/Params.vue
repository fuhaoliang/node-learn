<template>
  <div class="params">
    <h1>{{$route.params.id}}</h1>
    <input type="text" v-model="msg">
    {{ msg }}
  </div>
</template>
<script>
export default {
  name: 'params',
  data () {
    return {
      msg: '11111'
    }
  }
}
</script>
