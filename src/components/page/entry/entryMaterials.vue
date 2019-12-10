<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 入离职材料管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.handover" placeholder="材料名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearchList()">查询</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                v-loading="listLoading"
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                
                <el-table-column prop="ho_type" label="使用范围" align="center">
                    <template slot-scope="scope">
                        <el-tag  :type="scope.row.hoType==='0'?'success':(scope.row.hoType==='1'?'danger':'')">{{scope.row.hoType==='0'?'入职办理':(scope.row.hoType==='1'?'离职办理':'')}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="hoConter" label="材料名称" align="center"></el-table-column>
                <el-table-column prop="useFlg" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-tag  :type="scope.row.useFlg==='Y'?'success':(scope.row.useFlg==='N'?'danger':'')">{{scope.row.useFlg==='Y'?'停用':(scope.row.useFlg==='N'?'启用':'')}}</el-tag>
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
                handover: '',
                pagesize: 10,
                currentPage:1, //初始页
            },
            tid:"",
            totalPage:0,
            listLoading: true,
            tableData: [],
        };
    },
    mounted() {
       this.getTaDimHandover()
    },
    created(){
        let tid = localStorage.getItem("tid")
        this.tid = tid
    }, 
    activated(){
       this.getTaDimHandover()
    },
    methods: {
        handleSearchList(){
            this.currentPage = 1;
            this.getTaDimHandover();
        },
        getTaDimHandover(){
            this.listLoading = true
            this.$http({
                url: "/api/entry/taDimHandover/getAllHandover", 
                method: "post",
                params: {
                    size:this.query.pagesize,
                    current:this.query.currentPage,
                    name:this.query.handover,
                    tid: this.tid
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
            this.getTaDimHandover()  
        },
        handleCurrentChange: function(currentPage){
            this.query.currentPage = currentPage;
            this.getTaDimHandover()
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
