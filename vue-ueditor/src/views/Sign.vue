<template>
  <div id="sign">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="登录" name="first"><Login></Login></el-tab-pane>
      <el-tab-pane label="注册" name="second"><Register></Register></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  components: {
    Login,
    Register
  },
  methods: {
    handleClick (tab, event) {
    }
  }
}
</script>
<style lang="less">
  #sign{
    .el-tabs__nav-scroll{
      display: flex;
      justify-content: center;
    }
  }
</style>
