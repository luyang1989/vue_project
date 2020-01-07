<template>
 <div>
<el-form label-width="100px" :model="personlist" :rules="rules"
                         ref="insurance">
    <el-row>
        <el-col :span="8" :offset="2">
            <el-form-item label="员工编号">
                <el-input v-model="personlist.workCode"/>
            </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
            <el-form-item label="入职日期">
                <el-date-picker type="date" v-model="personlist.begindate"
                                style="width: 100%;" />
            </el-form-item>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="8" :offset="2">
            <el-form-item label="员工名称">
                <el-input v-model="personlist.userName"/>
            </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
            <el-form-item label="个人邮箱">
                <el-input v-model="personlist.email"/>
            </el-form-item>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="8" :offset="2">
            <el-form-item label="工作状态" >
                        <el-select v-model="personlist.workStatus" placeholder="请选择" style="width: 100%;">
                            <el-option :value="0" label="离职"  ></el-option>
                            <el-option :value="1" label="在职" ></el-option>
                        </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
            <el-form-item label="证件号码">
                <el-input v-model="personlist.idCard"/>
            </el-form-item>
        </el-col>
    </el-row>
    <!--<el-row>
        <el-col :span="8" :offset="2">
            <el-form-item label="工作状态" prop="employeeId">
                <el-input v-model="personlist.work_status" :disabled="true"/>
            </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
            <el-form-item label="证件号码">
                <el-date-picker type="date" v-model="personlist.id_card"
                                style="width: 100%;" :disabled="true"/>
            </el-form-item>
        </el-col>
    </el-row>-->
    <el-row style="text-align:center;"> 
            <a @click="userPersonDel()"><el-tag>保存</el-tag></a>
             <a @click="userPersonDel()"><el-tag>返回</el-tag></a>
        
    </el-row>


</el-form>







  
 </div>
</template>

<script>
 export default {
   data () {
     return {
         personlist: [],
     }
   },
   components: {

   },
    created(){
     this.info()
  },
  methods:{
      info(){
         var id  =  this.$route.query.id || 0
        this.$http({
            url:"/api/person/person/getPersonDetail", 
            method: "post",
            params:{
                id:id
            },
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => {
              this.personlist = res.data.result;
          }) 
      },
    userPersonDel(){
        //query传参，使用path跳转
        this.$router.push({
            path:'/personlist'
        })
    }

  }
 }
</script>

<style scoped>
.conent{
    width: 50%;
    background: white;
    margin: 0 auto; 
    text-align: center;
}
.conent li{
    display: flex;
    align-content: center;
    border-bottom: 1px solid #eee;
}
.conent li div{
    width: 50%;
    height: 50px; 
    line-height: 50px;
}
.conent li div:nth-child(1){
    border-right: 1px solid #eee;
}
</style>
