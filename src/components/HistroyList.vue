<template>
    <div>
        <div style="font-size:18px;">记录列表</div>
        <div class="chaxun_div" style="width:960px;margin:0 auto;padding-top:20px;">
            <el-input placeholder="请输入单号查询内容" style="width:300px;float:right;" v-model="input3" class="input-with-select">
                <el-button @click="select_data('danhao')" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <!-- <el-date-picker
            style="float:left;"
            v-model="shijian"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker> -->
            <el-table
                :data="tableData"
                style="width: 100%;margin-top:20px;">
                <el-table-column
                label="单号"
                width="200">
                <template slot-scope="scope">
                    <span>{{scope.row.danhao}}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="姓名"
                width="100">
                <template slot-scope="scope">
                   <span>{{scope.row.gongsi_people}}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="公司"
                width="150">
                <template slot-scope="scope">
                   <span>{{scope.row.gongsi_name}}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="电话"
                width="100">
                <template slot-scope="scope">
                   <span>{{scope.row.gongsi_phone}}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="地址"
                width="180">
                <template slot-scope="scope">
                   <span>{{scope.row.gongsi_dizhi}}</span>
                </template>
                </el-table-column>
                <!-- <el-table-column
                label="日期"
                width="100">
                <template slot-scope="scope">
                   <span>{{scope.row.add_time}}</span>
                </template>
                </el-table-column> -->
                <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    <el-button
                    size="mini"
                    type="success"
                    @click="show_xiangqing(scope.$index, scope.row)">查看详情</el-button>
                </template>
                </el-table-column>
            </el-table>
            <!-- <el-pagination
                style="margin-top:20px;"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[25, 50, 100, 200]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page_num">
            </el-pagination> -->
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            shijian:'',
            input3:'',
            tableData: [],
            currentPage:'',
            page_num:0
        }
    },
    created(){
        // this.tableData = [{
        //     id:1,
        //     add_time:'1599580800',
        //     danhao:'WINK20202020220',
        //     gongsi_people:'张三',
        //     gongsi_name:'深圳xxx科技有限公司',
        //     gongsi_phone:'0755-5656556',
        //     gongsi_dizhi:'dalskdhnkasjn;dlasjd s',
        // }]
        this.select_data();
    },
    updated(){
    },
    methods: {
        jump_xiangqing(id){
            if(!id){
               this.$message({
                    showClose: true,
                    message: 'id不存在',
                    type: 'error'
                });
                return
            }
            this.$router.push({path:'/show_histroy',query: {
                id:id
            }})
        },
        del_data(id){
            if(!id){
               this.$message({
                    showClose: true,
                    message: 'id不存在',
                    type: 'error'
                });
                return
            }
            this.$jq.ajax({
                type:'post',
                url:'http://58.56.132.222:22020/index.php/?action=del',
                dataType:'json',
                data:{
                    id
                },
                success:res=>{
                    if(res.code==1){
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error'
                        });
                    }
                },
                catch:err=>{
                    console.log(err);
                }
            })
        },
        select_data(danhao){
            let url = '';
            if(danhao =='danhao' && this.input3.trim()){
                url= 'http://58.56.132.222:22020/index.php/?action=select'
                let data = {
                    where:{
                        danhao:this.input3.trim()
                    }
                }
                this.$jq.ajax({
                    type:'post',
                    url,
                    data,
                    dataType:'json',
                    success:res=>{
                        if(res.code==1){
                            let data = res.data;
                            this.tableData = data;
                        }else{
                            this.$message({
                                showClose: true,
                                message: '查询不到内容',
                                type: 'error'
                            });
                        }
                    },
                    catch:err=>{
                        console.error(err);
                    }
                })
                return
            }else{
                url= 'http://58.56.132.222:22020/index.php/?action=select';
                this.$jq.ajax({
                    type:'post',
                    url,
                    dataType:'json',
                    success:res=>{
                        if(res.code==1){
                            let data = res.data;
                            this.tableData = data;
                        }else{
                            this.$message({
                                showClose: true,
                                message: '查询不到内容',
                                type: 'error'
                            });
                        }
                    },
                    catch:err=>{
                        console.error(err);
                    }
                })
            }
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        handleDelete(index, row) {
            let id = this.tableData[index].id;
            this.tableData.splice(index,1);
            this.del_data(id);
        },
        show_xiangqing(index,row){
            let id = this.tableData[index].id;
            this.jump_xiangqing(id);
        }
    },

}
</script>
<style lang="css" scoped>
    
</style>