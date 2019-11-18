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
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                 
                >批量删除</el-button>
                <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search">查询</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="用户名"></el-table-column>
                <el-table-column label="账户余额">
                    <template slot-scope="scope">￥{{scope.row.money}}</template>
                </el-table-column>
                <el-table-column label="头像(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.thumb"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"
                        >{{scope.row.state}}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="date" label="注册时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

    <div class="pagination-container">
      <el-pagination background>
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
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [
                {   id:1,
                    date: '2016-05-02',
                    name: '王小虎',
                    money:85,
                    state:"成功",
                    address: '上海市普陀区金沙江路 1518 弄'

                    }, {
                    id:2,
                    date: '2016-05-04',
                    name: '王小虎',
                    state:"成功",
                    money:85,
                    
                    address: '上海市普陀区金沙江路 1517 弄'
                    }, {
                    id:3,                        
                    date: '2016-05-01',
                    name: '王小虎',
                    state:"成功",
                    
                    money:85,
                    
                    address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                    id:4,                        
                    date: '2016-05-03',
                    name: '王小虎',
                    state:"成功",                    
                    money:85,
                    
                    address: '上海市普陀区金沙江路 1516 弄'
                    },
                    {   id:5,
                    date: '2016-05-02',
                    name: '王小虎',
                    money:85,
                    state:"成功",
                    address: '上海市普陀区金沙江路 1518 弄'

                    }, {
                    id:6,
                    date: '2016-05-04',
                    name: '王小虎',
                    state:"成功",
                    money:85,
                    
                    address: '上海市普陀区金沙江路 1517 弄'
                    }, {
                    id:7,                        
                    date: '2016-05-01',
                    name: '王小虎',
                    state:"成功",
                    
                    money:85,
                    
                    address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                    id:8,                        
                    date: '2016-05-03',
                    name: '王小虎',
                    state:"成功",                    
                    money:85,
                    
                    address: '上海市普陀区金沙江路 1516 弄'
                    },{   id:9,
                    date: '2016-05-02',
                    name: '王小虎',
                    money:85,
                    state:"成功",
                    address: '上海市普陀区金沙江路 1518 弄'

                    }, {
                    id:10,
                    date: '2016-05-04',
                    name: '王小虎',
                    state:"成功",
                    money:85,
                    
                    address: '上海市普陀区金沙江路 1517 弄'
                    }, {
                    id:11,                        
                    date: '2016-05-01',
                    name: '王小虎',
                    state:"成功",
                    
                    money:85,
                    
                    address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                    id:12,                        
                    date: '2016-05-03',
                    name: '王小虎',
                    state:"成功",                    
                    money:85,
                    
                    address: '上海市普陀区金沙江路 1516 弄'
                    }
                
            ],
         
        };
    },
    created() {
    },
    methods: {
  
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
