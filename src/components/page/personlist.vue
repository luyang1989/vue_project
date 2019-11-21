<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 查询接口
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column  prop="userName" label="用户名"></el-table-column>
                <el-table-column  prop="begintime" label="开始时间"></el-table-column>
                <el-table-column  prop="email" label="邮箱"></el-table-column>
                <el-table-column  prop="enName" label="英文名"></el-table-column>
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
            tableData: []
        };
    },
    created() {
       this.getDate()
    },
    activated(){
       this.getDate()
    },
    computed: {
   
    },
    methods: {
        getDate(){
            this.$http({
            url:`/userPerson/person/getAllPerson?size=${this.pagesize}&current=${this.currentPage}`, 
            method: "post",
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => {
              console.log(res)
              if(res.status==200&res.data.statusCode==200){
                    this.tableData = res.data.result.records
                    this.totalPage = res.data.result.total
              }else{
                   this.$message.error(res.data.msg)
              }
          })    
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
    }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
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
