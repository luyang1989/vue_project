<template>
 <div>
<el-form ref="form" :model="form"  label-width="80px" class="personmsg">
    <!-- 用户头像 -->
    <div class="user-avator">
    <img src="~@/assets/img/img.jpg" />
    </div>
  <el-form-item label="姓名">
    <el-col :span="6">
        <el-input v-model="form.name" label-width="180px"></el-input>
    </el-col>
  </el-form-item>
  <el-form-item label="手机">
    <el-col :span="12">
        <el-input v-model="form.phone" label-width="180px"></el-input>
    </el-col>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onSubmit">编辑</el-button>
    <el-button>保存</el-button>
  </el-form-item>
</el-form>
 </div>
</template>

<script>
 export default {
   data () {
     return {
 form: {
          name: '',
          phone:'',
       
        }
     }
   },
   components: {

   },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
 }
</script>
 <style lang="css" scoped>
    .personmsg{
        width:50%;
        margin: 100px auto;
        padding: 80px 30px 150px 30px;
        background:white;
    }
     .user-avator{
         text-align: center;
         margin-bottom: 50px;
    }
    .user-avator img{
        width: 120px;
        height:  120px;
        border-radius: 50%;
        text-align: center;
    }
</style>
