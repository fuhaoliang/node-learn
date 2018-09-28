<template>
  <div id="login">
    <el-form :model="ruleForm"
    status-icon :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="ruleForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Http from '../../helper/http'
export default {
  data () {
    let checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
      callback()
    }
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { validator: checkName, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState([])
  },
  methods: {
    ...mapActions(['UserLogin']),
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let {userName ,password} = this.ruleForm
          console.info(userName)
          let data = await Http.userHandle.userLogin({userName, password})
          if(data.success){
            this.UserLogin(data.token)
            this.$message({
              type: 'success',
              message: data.msg
            })
          } else {
            console.info('data!!!!', data)
            if (data.code === -10001) return
            this.$message({
              type: 'info',
              message: data.msg
            })
          }
        } else {
          this.$message({
            type: 'info',
            message: 'error submit!!'
          })
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
#login{
  form{
    width: 70%;
    margin: 0 auto;
  }
}
</style>
