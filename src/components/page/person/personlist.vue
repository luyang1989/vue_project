<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 租户管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row>
                <div style="margin-bottom:50px;">
                <el-col :span="3" class="text-center">
                    <div class="commonTreeTitle">组织管理</div>
                    <!-- :load="loadNode" -->
                    <el-tree :props="props"
                    :data="data2"
                    @node-click="handleNodeClick"
                    >
                    </el-tree>
                </el-col>
                <el-col :span="21" class="text-center">
                    <div>
                        <div class="handle-box">
                        <el-form  :model="listQuery" :inline="true"  size="small" >
                            <el-form-item label="">
                                <el-input  placeholder="  用户名称  " v-model="listQuery.userPersonName" class="handle-input mr10"></el-input>
                            </el-form-item>
                        </el-form>
                        <el-button type="primary" icon="el-icon-search" @click="handleSearchList()">查询</el-button>
                        </div>
                        <el-table
                            :data="tableData"
                            border
                            class="table"
                            ref="multipleTable"
                            header-cell-class-name="table-header"
                            @selection-change="handleSelectionChange"
                        >
                            <el-table-column
                            type="selection"
                            align="center" 
                            width="55">
                            </el-table-column>
                            <el-table-column  prop="" width="55" type="index"  align="center" label="序号"></el-table-column>
                            <el-table-column  prop="workCode"  align="center" label="员工编号"></el-table-column>
                            <el-table-column  prop="userName" align="center"  label="用户名">
                                <template slot-scope="scope">
                                <a @click="userPersonDetail(scope.row.id)">{{scope.row.userName}}</a>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="begintime"  align="center" label="开始时间"></el-table-column>
                            <el-table-column  prop="email"  align="center"  label="邮箱"></el-table-column>
                            <el-table-column  prop="enName"  align="center"  label="英文名"></el-table-column>
                        </el-table>
                        <div class="pagination-container">
                            <!-- page-size每页显示条目个数
                            current-change当前页
                            size-change	每页条数
                            current-page 当前页数 -->
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[10, 50, 100, 150]"
                                :page-size="pagesize"        
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="totalPage">   
                            </el-pagination>
                        </div>
                    </div>
                </el-col>
                
                </div>
            </el-row>         
        </div>
    </div>
</template>

<script>
import { fetchData } from '@/api/index';

export default {
    name: 'basetable',
    data() {
        return {
            totalPage:0,
            currentPage:1, //初始页
            pagesize:10,   //每页的数据
            orgId:'',
            listQuery:{
                userPersonName:""
            },
            tid:"",
            tableData: [],
            props: {
                label: 'orgName',
                children: 'zones',
                isLeaf: 'leaf',
            },
            data2:[],
            defaultProps: {
            children: 'children',
            label: 'orgName'
            }
        };
    },
    mounted() {
       this.getOrg()
    },
    created(){
        let tid = localStorage.getItem("tid")
        this.tid = tid
    },  
    activated(){
        this.getOrg()
    },
    computed: {
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleNodeClick(data,node,mi) {
            this.$http({
                url:"/api/person/person/getAllPerson", 
                method: "post",
                params:{
                    size:this.pagesize,
                    current:this.currentPage,
                    name:this.listQuery.userPersonName,
                    tid: this.tid,
                    orgId:data.id
                },
                headers: {
                "Content-Type": "application/json"
                }
          }).then(res => {
              if(res.status==200&res.data.statusCode==200){
                  
              }else{
                   this.$message.error(res.data.msg)    
              }
          })
      },
      getOrg(){
        this.$http({
        url:"/api/person/org/getOrg", 
        method: "post",
        params:{
            tid:this.tid,
            parentId:""
        },
        headers: {
            "Content-Type": "application/json"
        }
        }).then(res => {
            if(res.status==200&res.data.statusCode==200){
            this.data2 = res.data.result
            // this.orgId = this.data2[0].id
            res.data.result.map((item,i)=>{
                this.getOrgChild(item.id,this.tid,i)
                this.orgId = item.id 
            })
            this.getDate(this.orgId)        
            }else{
                this.$message.error(res.data.msg)
            }
        }).catch((error)=>{
            console.log(error)
        })
      },
      getOrgChild(parentId,tid,i){
        this.$http({
        url:"/api/person/org/getOrg", 
        method: "post",
        params:{
            tid,
            parentId
        },
        headers: {
            "Content-Type": "application/json"
        }
        }).then(res => {
            if(res.status==200&res.data.statusCode==200){
                this.$set(this.data2[i],'zones', res.data.result || [])
            }else{
                this.$message.error(res.data.msg)
            }
        }).catch((error)=>{
            console.log(error)
        })
      },
      getDate(orgId){
            this.$http({
            url:"/api/person/person/getAllPerson", 
            method: "post",
            params:{
                size:this.pagesize,
                current:this.currentPage,
                name:this.listQuery.userPersonName,
                tid: this.tid,
                orgId
            },
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => {
              if(res.status==200&res.data.statusCode==200){
                    this.tableData = res.data.result.records
                    this.totalPage = res.data.result.total
              }else{
                   this.$message.error(res.data.msg)    
              }
          })
      },

      handleSearchList(){
            this.currentPage = 1;
            this.getDate(this.orgId);
      },
        // 初始页currentPage、初始每页数据数pagesize
        handleSizeChange: function (size) {
            this.pagesize = size;
            this.getDate()  
        },
        handleCurrentChange: function(currentPage){
            this.currentPage = currentPage;
            this.getDate()
        },
        userPersonDetail(id){
            //query传参，使用path跳转
            this.$router.push({
                path:'/persondetailInfo',
                query: {
                    id:id||0,
                }
            })
        },
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}
.el-form--inline .el-form-item{
    margin: 0;
    padding: 0;
}
a{
   color: rgb(32, 160, 255);
}
.commonTreeTitle{
    height: 32px;
    line-height: 32px;
    width: 120px;
    margin-bottom: 20px;
    font-size: 15px;    
    text-align: center;
    background: aliceblue;
}
a:hover{
 cursor: pointer;
}
.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
