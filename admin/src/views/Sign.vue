<template>
  <div id="sign">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="登录" name="first" ><Login :activeName.sync="activeName"></Login></el-tab-pane>
      <el-tab-pane label="注册" name="second"><Register :activeName.sync="activeName"></Register></el-tab-pane>
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
      let activeName = this.activeName
      console.info('activeName', activeName)
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
