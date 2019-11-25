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





    <el-row>
        <div style="margin-bottom:50px;">
          <el-col :span="3" class="text-center">
            <div class="commonTreeTitle">组织架构</div>
            <el-tree
                :data="data"
                node-key="id"
                default-expand-all
                draggable
                @node-click="nodeClick"
               >
                </el-tree>
          </el-col>
          <el-col :span="21" class="text-center">
            <div>
                <div class="handle-box">
                    <el-input  placeholder="用户名称" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="el-icon-search">查询</el-button>
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
            tableData: [],
            data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
        };
    },
    mounted() {
       this.getDate()
    },
    activated(){
       this.getDate()
    },

    computed: {
   
    },
    methods: {
        toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

        getDate(){
            this.$http({
            url:`/userPerson/person/getAllPerson?size=${this.pagesize}&current=${this.currentPage}`, 
            method: "post",
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => {
              if(res.status==200&res.data.statusCode==200){
                  console.log(res)
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
        userPersonDetail(id){
            //query传参，使用path跳转
            this.$router.push({
                path:'/persondetailInfo',
                query: {
                    id:id||0,
                }
            })
        },
         nodeClick(n, ev,i) {
            console.log('drag start', n, ev,i);
        },
        handleDragEnter(draggingNode, dropNode, ev) {
            console.log('tree drag enter: ', dropNode.label);
        },
        handleDragLeave(draggingNode, dropNode, ev) {
            console.log('tree drag leave: ', dropNode.label);
        },
        handleDragOver(draggingNode, dropNode, ev) {
            console.log('tree drag over: ', dropNode.label);
        },
        handleDragEnd(draggingNode, dropNode, dropType, ev) {
            console.log('tree drag end: ', dropNode && dropNode.label, dropType);
        },
        handleDrop(draggingNode, dropNode, dropType, ev) {
            console.log('tree drop: ', dropNode.label, dropType);
        },
        allowDrop(draggingNode, dropNode, type) {
        if (dropNode.data.label === '二级 3-1') {
          return type !== 'inner';
        } else {
          return true;
        }
      },
      allowDrag(draggingNode) {
        return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
      }
    }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
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
