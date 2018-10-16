<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1 @click='goParams()'>跳转去params111</h1>
    <h1 @click='goQuery()'>跳转去query1234</h1>
  </div>
</template>
<script>
export default{
  name: 'about',
  methods: {
    goParams () {
      this.$router.push({
        name: 'params',
        params: {
          id: '111'
        }
      })
    },
    goQuery () {
      this.$router.push({
        path: '/query',
        query: {
          num: '1234'
        }
      })
    }
  }
}
</script>
