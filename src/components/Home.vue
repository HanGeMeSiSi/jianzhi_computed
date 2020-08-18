<template>
    <div>
        <div class="big_title_out">{{big_title}}</div>
        <div style="width:960px;margin:0 auto;">
             <div class="big_class_div" style="display:flex;">
                <div style="width:560px;">
                    <section class="el-container">
                        <aside class="el-aside line_height_60" style="width: 120px;">报价类型</aside> 
                        <main class="el-main" style="text-align:left;">
                            <el-radio-group v-model="data_val['baojia_type']">
                                <el-radio-button label="chanping" class="">产品</el-radio-button>
                            </el-radio-group>
                             <el-radio-group v-model="data_val['baojia_type']">
                                <el-radio-button label="muju" class="">模具</el-radio-button>
                            </el-radio-group>
                             <el-radio-group v-model="data_val['baojia_type']">
                                <el-radio-button label="jiagong" class="">加工</el-radio-button>
                            </el-radio-group>
                        </main>
                    </section>
                    <section class="el-container">
                        <aside class="el-aside line_height_60" style="width: 120px;">产品应用</aside> 
                        <main class="el-main" style="text-align:left;">
                            <el-radio-group v-model="data_val['chanping_use']">
                                <el-radio-button label="jiadian" class="">家电</el-radio-button>
                            </el-radio-group>
                            <el-radio-group v-model="data_val['baojia_type']">
                                <el-radio-button label="shuma" class="">数码</el-radio-button>
                            </el-radio-group>
                            <el-radio-group v-model="data_val['baojia_type']">
                                <el-radio-button label="gongyegongju" class="">工业工具</el-radio-button>
                            </el-radio-group>
                            <el-radio-group v-model="data_val['baojia_type']">
                                <el-radio-button label="qita" class="">其他</el-radio-button>
                            </el-radio-group>
                        </main>
                    </section>
                    <section class="el-container">
                        <aside class="el-aside line_height_60" style="width: 120px;">产品名称</aside> 
                        <main class="el-main" style="text-align:left;">
                            <el-input placeholder="请输入产品名称" v-model="data_val['chanping_name']" clearable></el-input>
                        </main>
                    </section>
                    <section class="el-container">
                        <aside class="el-aside line_height_60" style="width: 120px;">开模要求</aside> 
                        <main class="el-main" style="text-align:left;">
                            <el-row>
                                <el-col :span="16">
                                    <div class="grid-content bg-purple">
                                        <el-radio-group v-model="data_val['kaimo_yaoqiu']">
                                            <el-radio-button label="danchu" class="">单出</el-radio-button>
                                        </el-radio-group>
                                        <el-radio-group v-model="data_val['kaimo_yaoqiu']">
                                            <el-radio-button label="gongmo" class="">共模</el-radio-button>
                                        </el-radio-group>
                                        <el-radio-group v-model="data_val['kaimo_yaoqiu']">
                                            <el-radio-button label="duoxiancheng" class="">多工程</el-radio-button>
                                        </el-radio-group>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="grid-content bg-purple-light">
                                         <section class="el-container">
                                            <aside class="el-aside " style="width: 40px;line-height:40px;">套数</aside> 
                                            <main class="el-main" style="text-align:left;padding-top:0;">
                                                <el-input placeholder="套数" v-model="data_val['kaimo_yaoqiu_num']"></el-input>
                                            </main>
                                        </section>
                                    </div>
                                </el-col>
                            </el-row>
                        </main>
                    </section>
                </div>
                <div style="width:400px;display:inline-blick">
                    <el-carousel :interval="4000" type="" height="250px">
                        <el-carousel-item v-for="item in top_img" :key="item">
                            <img :src="item" alt="">
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <div class="content_div">
                <div class="big_class_div" v-for="(item,key) in json_data" :key="key">
                    <div class="big_title">{{item.big_class_name}}</div>
                    <section class="el-container" v-for="(team,index) in item.specific_choose" :key="index">
                        <aside class="el-aside" style="width: 200px;line-height:80px;">{{team.title}}</aside> 
                        <main class="el-main" style="text-align:left;">
                            <el-radio-group v-model="data_val[team.cunchu_name]" v-for="(link,core) in team.choose_item" :key="core">
                                <el-radio-button :label="{value:link.value,item_name:link.item_name}" class="choose_btn">{{link.item_name}}</el-radio-button>
                            </el-radio-group>
                        </main>
                    </section>
                </div>
            </div>
            <!-- <div @click="exportExcel()">daochu</div> -->
            <div style="height:80px;"></div>
            <el-card class="box-card footer_jisuan_div">
                <div style="float:left">
                    <span class="peizhiname">{{price_computed.title_name}}</span>
                    <span class="last_moneny">{{jisuan_all_price()}}</span>
                </div>
                <div style="float:right">
                    <el-button class="my_bottom_btn" type="info" v-for="(item,index) in price_computed.right_btn" :key="index" :style="'color:'+item.color+';background-color:'+item.bg_color">{{item.name}}</el-button>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // 大标题
            big_title:'报格计算器',
            // 客户名称：
            user_name:'',
            // 产品名称:
            product_name:'',
            // 寿命：
            lifetime:'',
            // 材料单价：
            materials:"",
            top_img:[
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597171054287&di=bc9ef511b263f44b3bd2f22c5f809d27&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F5%2F57b57fe8a69b6.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597171092326&di=8ab94e2a9ba01258fd421a67bff8f341&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201105%2F17%2F113554rnu40q7nbgnn3lgq.jpg',
                'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3302399998,3216746631&fm=26&gp=0.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597171113840&di=60a4d7210a6670ada53adbb91f9c0263&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fd%2F580f270356187.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597171128551&di=79bfee360e80124ed9eb633947f9d57f&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201110%2F07%2F082726lghakmgjmgnah9aa.jpg'
            ],
            data_val:{
                kaimo_yaoqiu_num:1
            },
            top_data:[
                {
                    //  选项的标题名字
                    title:'报价类型',
                    // 存储值得名字
                    cunchu_name:'baojia_type',
                    // 选择项
                    choose_item:[
                        {
                            // 选项名字
                            item_name:'产品',
                            // 价格
                            value:1.1,
                            // 数学运算符
                            math_fh:'*',
                        },{
                            // 选项名字
                            item_name:'模具',
                            value:1.5,
                            math_fh:'*',
                        },{
                            // 选项名字
                            item_name:'加工',
                            value:1.2,
                            math_fh:'*'
                        }
                    ],
                },{
                    //  选项的标题名字
                    title:'产品应用',
                    // 存储值得名字
                    cunchu_name:'chanping_use',
                    // 选择项
                    choose_item:[
                        {
                            // 选项名字
                            item_name:'家电',
                            // 价格
                            value:100,
                            // 数学运算符
                            math_fh:'+'
                        },{
                            // 选项名字
                            item_name:'数码',
                            value:120,
                            math_fh:'+'
                        },{
                            // 选项名字
                            item_name:'工业工具',
                            value:46,
                            math_fh:'+'
                        },{
                            // 选项名字
                            item_name:'其他',
                            value:46,
                            math_fh:'+'
                        }
                    ],
                },{
                    //  选项的标题名字
                    title:'产品名称',
                    // 存储值得名字
                    cunchu_name:'chanping_name',
                    // 选择项
                    choose_item:[
                        {
                            // 选项名字
                            item_name:'家电',
                            // 价格
                            value:100,
                            // 数学运算符
                            math_fh:'+'
                        },{
                            // 选项名字
                            item_name:'数码',
                            value:120,
                            math_fh:'+'
                        },{
                            // 选项名字
                            item_name:'工业工具',
                            value:46,
                            math_fh:'+'
                        },{
                            // 选项名字
                            item_name:'其他',
                            value:46,
                            math_fh:'+'
                        }
                    ],
                },
            ],
            json_data:[
                {
                    // 大的分类 代表区域块
                    big_class_name:'弹性云服务器 ECS ',
                    //  具体选项
                    specific_choose:[
                        {
                            //  选项的标题名字
                            title:'区域',
                            // 存储值得名字
                            cunchu_name:'quyu_choose',
                            // 选择项
                            choose_item:[
                                {
                                    // 选项名字
                                    item_name:'华北',
                                    // 价格
                                    value:100
                                },{
                                    // 选项名字
                                    item_name:'西南',
                                    value:120
                                },{
                                    // 选项名字
                                    item_name:'华南',
                                    value:46
                                },
                            ],
                        },{
                            title:'计费模式',
                            cunchu_name:'jifeimoshi_choose',
                            choose_item:[
                                {
                                    item_name:'你好',
                                    value:100
                                },{
                                    item_name:'西南',
                                    value:120
                                },{
                                    item_name:'华南',
                                    value:46
                                },
                            ],
                        },
                    ],

                },
                 {
                    // 大的分类 代表区域块
                    big_class_name:'弹性云服务器 ECS ',
                    //  具体选项
                    specific_choose:[
                        {
                            //  选项的标题名字
                            title:'区域',
                            // 存储值得名字
                            cunchu_name:'quyu_choose2',
                            // 选择项
                            choose_item:[
                                {
                                    // 选项名字
                                    item_name:'华北',
                                    // 价格
                                    value:100
                                },{
                                    // 选项名字
                                    item_name:'西南',
                                    value:120
                                },{
                                    // 选项名字
                                    item_name:'华南',
                                    value:46
                                },
                            ],
                        },{
                            title:'计费模式',
                            cunchu_name:'jifeimoshi_choose2',
                            choose_item:[
                                {
                                    item_name:'你好',
                                    value:100
                                },{
                                    item_name:'西南',
                                    value:120
                                },{
                                    item_name:'华南',
                                    value:46
                                },
                            ],
                        },
                    ],

                },
                 {
                    // 大的分类 代表区域块
                    big_class_name:'弹性云服务器 ECS ',
                    //  具体选项
                    specific_choose:[
                        {
                            //  选项的标题名字
                            title:'区域',
                            // 存储值得名字
                            cunchu_name:'quyu_choose3',
                            // 选择项
                            choose_item:[
                                {
                                    // 选项名字
                                    item_name:'华北',
                                    // 价格
                                    value:100
                                },{
                                    // 选项名字
                                    item_name:'西南',
                                    value:120
                                },{
                                    // 选项名字
                                    item_name:'华南',
                                    value:46
                                },
                            ],
                        },{
                            title:'计费模式',
                            cunchu_name:'jifeimoshi_choose3',
                            choose_item:[
                                {
                                    item_name:'你好',
                                    value:100
                                },{
                                    item_name:'西南',
                                    value:120
                                },{
                                    item_name:'华南',
                                    value:46
                                },
                            ],
                        },
                    ],

                },
            ],
            price_computed:{
                title_name:'配置费用',
                right_btn:[
                    {
                        name:'去购买',
                        bg_color:'#fff',
                        color:'#c7000b',
                    },
                    {
                        name:'加入购物车',
                        bg_color:'#c7000b',
                        color:"#fff",
                    }
                ]
            },
            imgList:[]
        }
    },
    methods:{
        jisuan_all_price(){return '￥0';
            // console.log(this.data_val);
            let all_value = 0;
            for (let item in this.data_val){
                all_value += this.data_val[item].value;
            }
            return '￥'+all_value;
        },
        // 导出表格
        exportExcel() {
            require.ensure([], () => {
                const { export_json_to_excel } = require("../vendor/Export2Excel");

                const tHeader = ["序号", "日期", "图片地址"];// 上面设置Excel的表格第一行的标题
            
                const filterVal = ["id", "time", "img"]; // 上面的index、nickName、name是tableData里对象的属性
                
                const list = this.imgList;              //把data里的tableData存到list

                const data = this.formatJson(filterVal, list);
                
                export_json_to_excel(tHeader, data, "列表excel");   //标题，数据，文件名
            });
        },

        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]));
        },
    },
    created(){
    },
    mounted(){
        let data_val = {};
        data_val.kaimo_yaoqiu_num=1;
        for (let i =0;i<this.json_data.length;i++){
            let json_data_item = this.json_data[i];
            for(let j = 0;j<json_data_item.specific_choose.length;j++){
                console.log(j);
                let _data= json_data_item.specific_choose[j];
                console.log(_data.choose_item[0].item_name);
                let cunchu_name = _data.cunchu_name;
                data_val[cunchu_name]={};
                data_val[cunchu_name]['item_name'] = _data.choose_item[0]['item_name'];
                data_val[cunchu_name]['value'] = _data.choose_item[0]['value'];
            }
        }
        this.data_val = data_val;
    },
    updated(){},
    destroyed(){},
}
</script>
<style lang="css" scoped>
    .d_flex{display: flex;}
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .footer_jisuan_div{
        position: fixed;
        z-index: 999;
        bottom: 0;
        width: 960px;
        height: 80px;
    }
    .last_moneny{font-size: 20px;color: #c7000d;}
    .choose_btn:not(:first-child){
        border-left:1px solid #DCDFE6;
    }
    .choose_btn{
        margin: 5px 10px;
    }
    .big_title{
        font-size: 18px;
        height: 30px;
        line-height: 30px;
        text-align: left;
        font-weight: 700;
    }
    .big_class_div{
        padding: 10px;
        box-shadow:  0 2px 5px rgba(100, 100, 100, 0.3)
    }
    .my_bottom_btn{
        transition: all 0.2s linear;
    }
    .my_bottom_btn:hover{
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3) !important;
    }
    .big_title_out{
        font-size: 20px;
        text-align: center;
        font-weight: 700;
        margin-bottom: 10px;
    }
    .height_60{height: 60px;}
    .line_height_60{line-height: 60px;}
    .padding_10{padding: 10px;}
    .el-main{padding: 10px;}
</style>