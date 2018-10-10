<template>
  <div id="login">
    <el-form :model="ruleForm"
    status-icon :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="ruleForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avater">
        <el-upload
          :on-change="handleChange"
          :class="{disabled:uploadDisabled}"
          :file-list="imagelist"
          action="/api/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :auto-upload="false">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Http from '../../helper/http'
import axios from 'axios'
export default {
  props: ['activeName'],
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
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    let checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    return {
      file: {},
      uploadDisabled: false,
      imagelist: [],
      dialogImageUrl: '',
      dialogVisible: false,
      ruleForm: {
        userName: '',
        password: '',
        checkPass: '',
        age: ''
      },
      rules: {
        userName: [
          { validator: checkName, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleChange (file, fileList) {
      this.uploadDisabled = fileList.length > 0
      this.file = file
      console.info('file', file, fileList);
    },
    handleRemove(file, fileList) {
      document.querySelector('.el-upload__input').value = ''
      this.uploadDisabled = fileList.length > 0
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitForm (formName) {
      this.$refs[formName].validate( async (valid) => {
        if (valid) {
          // this.UserLogin('123123')
          let {userName ,password, age} = this.ruleForm
          let formData = new FormData();
          formData.append('userName', userName);
          formData.append('password', password);
          formData.append('age', age);
          formData.append('file', document.querySelector('.el-upload__input').files[0]);
          // let data =  await Http.userHandle.userRegister({userName, password, age})
          // let data = await Http.userHandle.userRegister(formData, {
          //   'Content-Type': 'multipart/form-data'
          // })
          axios.post('/api/register', formData)
          .then(({data}) => {
            this.$message.info(data.msg);
          })
          .catch(error => {
            this.$message.error(error.message);
          });


          // if (data.success) this.$emit('update:activeName', 'first')
          // this.$message(data.msg)
        } else {
          console.log('error submit!!')
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
<style lang="less">
#login{
  form{
    width: 70%;
    margin: 0 auto;
  }
}
.disabled .el-upload--picture-card {
  display:none !important;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 45px;
    height: 45px;
    line-height: 45px;
    text-align: center;
  }
  .avatar {
    width: 45px;
    height: 45px;
    display: block;
  }
</style>
