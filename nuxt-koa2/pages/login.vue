<template>
  <div class="login">
    <h1>注册</h1>
    <div>
      用户名: <input type="text" v-model="userInfo.name"/>
      <br>
      密  码: <input type="password" v-model="userInfo.password">
      <br>
      邮箱 : <input type="email" v-model="userInfo.email">
      <br>
      <button type="button" @click="handleAjax()">提交</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'login',
  data() {
    return {
      userInfo: {
        name: '',
        password: '',
        email: ''
      }
    }
  },
  methods: {
    handleAjax() {
      let userInfo = this.userInfo
      axios.post('/user/login', {
        ...userInfo
      }).then(() => {
        alert('sucess')
      }).catch((err) => {
        console.info('err', err)
      })
    }
  }
}
</script>
