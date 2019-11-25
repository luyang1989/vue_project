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
            <div class="handle-box">
                <el-input v-model="query.t_name" placeholder="租户名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search">查询</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                v-loading="listLoading"
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="tid" label="租户编码" align="center"></el-table-column>
                <el-table-column prop="tname" label="租户名称" align="center"></el-table-column>
                <el-table-column prop="c_time" label="创建时间" align="center"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <!-- {{scope.row.status==="U"?scope.row.status="启用":(scope.row.status==="D"?scope.row.status="停用":"")}} -->
                        <el-tag  :type="scope.row.status==='U'?'success':(scope.row.status==='D'?'danger':'')">{{scope.row.status==='U'?'启用':(scope.row.status==='D'?'停用':'')}}</el-tag>
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
            tableData: [],
        };
    },
    mounted() {
       this.getTidList()
    },
    activated(){
       this.getTidList()
    },
    methods: {
        getTidList(){
            this.listLoading = true
            this.$http({
                url: "/api/person/tenant/getTidList", 
                method: "post",
                params: {
                    size:this.query.pagesize,
                    current:this.query.currentPage
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
            this.getTidList()  
        },
        handleCurrentChange: function(currentPage){
            this.query.currentPage = currentPage;
            this.getTidList()
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
