<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" exact>Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/sign">Login</router-link>
      <img class="userAvatar" :src="userInfo.userAvatar">
      <el-button type="danger" icon="el-icon-delete" circle class="loginout" @click="UserLoginOut()"></el-button>
    </div>
    <router-view/>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapActions(['UserLoginOut'])
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-active {
      color: #42b983;
    }
  }
}
.loginout{
  position: fixed;
  right: 20px;
}
.userAvatar{
  position: absolute;
  right: 70px;
  top: 22px;
  width: 40px;
  height: 40px;
}
</style>
