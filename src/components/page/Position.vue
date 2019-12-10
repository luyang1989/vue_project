<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 职级管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="jobLevelName" placeholder="职级" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="getPositionList()">查询</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                v-loading="listLoading"
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column  type="index"  width="55" label="序号" align="center"></el-table-column>
                <el-table-column prop="jobLevelCod" label="职级编码	" align="center"></el-table-column>
                <el-table-column prop="jobLevelName" label="职级" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                       <a @click="toPostionDetail(scope.row.id)">编辑</a>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="query.currentPage"
                    :page-sizes="[10, 50, 100, 150]"
                    :page-size="query.pagesize"        
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
            query: {
                t_name: '',
                pagesize: 10,
                currentPage:1, //初始页
            },
            totalPage:0,
            listLoading: true,
            jobLevelName:'',
            tableData: [],
            tid:''
        };
    },
    mounted() {
       this.getPositionList()
    },
     created(){
        let tid = localStorage.getItem("tid")
        this.tid = tid
    },  
    activated(){
       this.getPositionList()
    },
    methods: {
        getPositionList(){
            this.listLoading = true
            this.$http({
                url: "/api/person/position/getPositionList", 
                method: "post",
                params: {
                    size:this.query.pagesize,
                    current:this.query.currentPage,
                    jobLevelName:this.jobLevelName,
                    tid:this.tid
                },
                headers: {
                "Content-Type": "application/json"
                }
            }).then(response => {
                let res = response
                if (res.status == 200 && res.data.statusCode==200) {
                    this.tableData = res.data.result.records
                    this.totalPage = res.data.result.total
                    this.listLoading = false
                    // this.$message.success("加载成功")
                } else {
                    this.$message.error(res.data.msg)
                    this.listLoading = false
                }
            })
        },
        // 初始页currentPage、初始每页数据数pagesize
        handleSizeChange: function (size) {
            this.query.pagesize = size;
            this.getPositionList()  
        },
        handleCurrentChange: function(currentPage){
            this.query.currentPage = currentPage;
            this.getPositionList()
        },
        toPostionDetail(id){
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
