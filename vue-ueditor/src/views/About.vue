<template>
  <div class="about">
    <h1>This is an about page</h1>
     <el-table :data="data" style="width: 100%" max-height="400">
      <el-table-column
        fixed
        prop="userName"
        label="用户名"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        align="center">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="日期"
        align="center">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, data)"
            type="text"
            size="small">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import Http from '../../helper/http.js'
  export default {
    name: 'about',
    data () {
      return {
        data: []
      }
    },
    created () {
      Http.userHandle.getUser().then(e => {
        let data = e.data
        this.data = data
        console.info(data)
      })
    },
    mounted () {
      
    },
    methods: {
      async deleteRow (index, rows) {
        // Http.userHandle.delUser({id: rows[index]._id}).then(data => {
        //   console.info('data1111', data)
        //   rows.splice(index, 1);
        // }).catch(err => {
        //   console.info('err1111', err);
        // })
        let data = await Http.userHandle.delUser({id: rows[index]._id})
        console.info('data', data)
        if (data.success){
          rows.splice(index, 1);
        } else {
          console.info('err1111--await', data)
        }
      }
    },
  }
</script>
