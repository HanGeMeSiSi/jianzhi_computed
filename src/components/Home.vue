<template>
    <div>
        <div class="big_title_out">{{big_title}}</div>
        <div style="width:960px;margin:0 auto;">
             <div class="big_class_div" style="display:flex;">
                <div style="width:560px;">
                    <section class="el-container">
                        <aside class="el-aside line_height_60" style="width: 100px;">报价类型</aside>
                        <main class="el-main" style="text-align:left;">
                            <el-radio-group v-model="head_val['baojia_type']">
                                <el-radio-button label="chanping" class="">产品</el-radio-button>
                            </el-radio-group>
                             <el-radio-group v-model="head_val['baojia_type']">
                                <el-radio-button label="muju" class="">模具</el-radio-button>
                            </el-radio-group>
                             <el-radio-group v-model="head_val['baojia_type']">
                                <el-radio-button label="jiagong" class="">加工</el-radio-button>
                            </el-radio-group>
                        </main>
                    </section>
                    <section class="el-container">
                        <aside class="el-aside line_height_60" style="width: 100px;">产品应用</aside>
                        <main class="el-main" style="text-align:left;">
                            <el-radio-group v-model="head_val['chanping_use']">
                                <el-radio-button label="1.0" class="">家电</el-radio-button>
                            </el-radio-group>
                            <el-radio-group v-model="head_val['chanping_use']">
                                <el-radio-button label="1.1" class="">数码</el-radio-button>
                            </el-radio-group>
                            <el-radio-group v-model="head_val['chanping_use']">
                                <el-radio-button label="0.95" class="">工业工具</el-radio-button>
                            </el-radio-group>
                            <el-radio-group v-model="head_val['chanping_use']">
                                <el-radio-button label="1.05" class="">其他</el-radio-button>
                            </el-radio-group>
                        </main>
                    </section>
                    <section class="el-container">
                        <aside class="el-aside line_height_60" style="width: 100px;">产品名称</aside>
                        <main class="el-main" style="text-align:left;">
                            <el-input placeholder="请输入产品名称" v-model="head_val['chanping_name']" clearable></el-input>
                        </main>
                    </section>
                    <section class="el-container">
                        <aside class="el-aside line_height_60" style="width: 100px;">开模要求</aside>
                        <main class="el-main" style="text-align:left;">
                            <el-row>
                                <el-col :span="16">
                                    <div class="grid-content bg-purple">
                                        <el-radio-group v-model="head_val['kaimo_yaoqiu']">
                                            <el-radio-button label="danchu" class="">单出</el-radio-button>
                                        </el-radio-group>
                                        <el-radio-group v-model="head_val['kaimo_yaoqiu']">
                                            <el-radio-button label="gongmo" class="">共模</el-radio-button>
                                        </el-radio-group>
                                        <el-radio-group v-model="head_val['kaimo_yaoqiu']">
                                            <el-radio-button label="duoxiancheng" class="">多工程</el-radio-button>
                                        </el-radio-group>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="grid-content bg-purple-light">
                                         <section class="el-container">
                                            <aside class="el-aside " style="width: 40px;line-height:40px;">套数</aside>
                                            <main class="el-main" style="text-align:left;padding-top:0;">
                                                <el-input placeholder="套数" v-model="kaimo_yaoqiu_num" class="taoshu input_ele_number" type="number"></el-input>
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
                <div class="big_class_div" v-for="n in Number(kaimo_yaoqiu_num)">
                    <section class="el-container" v-if="isshow_cp_caizhi">
                        <aside class="el-aside line_height_60" style="width: 100px;">产品材质</aside>
                        <main class="el-main" style="text-align:left;">
                            <el-input type="text" v-model="data_val[n-1]['chanping_caizhi']"  style="width:130px;"/>
                            <div style="display:inline-block;margin-left:30px;">
                                <span>产品单重(G)</span>
                                <el-input type="text" v-model="data_val[n-1]['chanping_danzhong']"  style="width:80px;"/>
                                <span>模出数</span>
                                <el-input class="input_ele_number" type="number" v-model="data_val[n-1]['muchu_shu']" @input="muren_price_jisuan(n-1)" style="width:80px;"/>
                                <span>水口重</span>
                                <el-input type="" v-model="data_val[n-1]['shuikou_zhong']"  style="width:80px;"/>
                            </div>
                        </main>
                    </section>
                    <div v-if="isshow_mingxi">
                        <section class="el-container">
                            <aside class="el-aside line_height_60" style="width: 100px;">外观要求</aside>
                            <main class="el-main" style="text-align:left;">
                                <el-radio-group v-model="data_val[n-1]['waiguan_yaoqiu']">
                                    <el-radio-button label="1.05" class="">镜面</el-radio-button>
                                </el-radio-group>
                                <el-radio-group v-model="data_val[n-1]['waiguan_yaoqiu']">
                                    <el-radio-button label="1.02" class="">纹面</el-radio-button>
                                </el-radio-group>
                                <el-radio-group v-model="data_val[n-1]['waiguan_yaoqiu']">
                                    <el-radio-button label="1.0" class="">内部件</el-radio-button>
                                </el-radio-group>
                                <div style="display:inline-block;float:right;">
                                    <span>模具工期</span>
                                    <el-input class="input_ele_number" type="number" v-model="data_val[n-1]['muju_gongqi']" placeholder="请输入(天)" style="width:100px;"/>
                                </div>
                            </main>
                        </section>
                        <section class="el-container">
                            <aside class="el-aside line_height_60" style="width: 100px;">模具寿命</aside>
                            <main class="el-main" style="text-align:left;">
                                <el-radio-group v-model="data_val[n-1]['muju_shouming']">
                                    <el-radio-button label="0.80" class="">10万</el-radio-button>
                                </el-radio-group>
                                <el-radio-group v-model="data_val[n-1]['muju_shouming']">
                                    <el-radio-button label="0.85" class="">20万</el-radio-button>
                                </el-radio-group>
                                <el-radio-group v-model="data_val[n-1]['muju_shouming']">
                                    <el-radio-button label="0.9" class="">30万</el-radio-button>
                                </el-radio-group>
                                <el-radio-group v-model="data_val[n-1]['muju_shouming']">
                                    <el-radio-button label="0.95" class="">40万</el-radio-button>
                                </el-radio-group>
                                <el-radio-group v-model="data_val[n-1]['muju_shouming']">
                                    <el-radio-button label="1.0" class="">50万</el-radio-button>
                                </el-radio-group>
                                <el-radio-group v-model="data_val[n-1]['muju_shouming']">
                                    <el-radio-button label="1.05" class="">100万</el-radio-button>
                                </el-radio-group>
                                <el-radio-group v-model="data_val[n-1]['muju_shouming']">
                                    <el-radio-button label="1.1" class="">100万以上</el-radio-button>
                                </el-radio-group>
                                 <div style="display:inline-block;float:right;">
                                    <span>模具参考报价</span>
                                    <el-input type="text" class="input_dis_ele_color_000" v-model="data_val[n-1]['muju_cankao_price']" placeholder="" disabled="disabled" style="width:100px;"/>
                                </div>
                            </main>
                        </section>
                        <section class="el-container">
                            <aside class="el-aside line_height_60" style="width: 120px;text-align:right;">产品尺寸(mm)</aside>
                            <main class="el-main" style="text-align:left;">
                                <el-input type="text" v-model="data_val[n-1]['chanping_chicun']"  style="width:120px;"/>
                                <div style="display:inline-block;margin-left:50px;font-size:0;">
                                    <span style="font-size:16px;">模架尺寸</span>
                                    <el-input style="font-size:14px;width:100px;margin:0 5px 0 15px;" placeholder="L" type="number" class="input_ele_number" v-model="data_val[n-1]['mujia_chicun_one']" @input="mujia_price_jisuan(n-1)"></el-input>
                                    <span style="font-size:14px;">X</span>
                                    <el-input style="font-size:14px;width:100px;margin:0 5px;" placeholder="W" type="number" class="input_ele_number" v-model="data_val[n-1]['mujia_chicun_two']" @input="mujia_price_jisuan(n-1)"></el-input>
                                    <span style="font-size:14px;">X</span>
                                    <el-input style="font-size:14px;width:100px;margin:0 5px;" placeholder="H" type="number" class="input_ele_number" v-model="data_val[n-1]['mujia_chicun_three']" @input="mujia_price_jisuan(n-1)"></el-input>
                                </div>
                                <div style="display:inline-block;float:right;">
                                    <span>模架费用</span>
                                    <el-input type="text" class="input_dis_ele_color_000" v-model="data_val[n-1]['mujia_price']" placeholder="" disabled="disabled" style="width:100px;"/>
                                </div>
                            </main>
                        </section>
                        <section class="el-container">
                            <aside class="el-aside line_height_60" style="width: 100px;">胶口方式</aside>
                            <main class="el-main" style="text-align:left;">
                                <el-radio-group v-model="data_val[n-1]['jiaokou_type']">
                                    <el-radio-button label="reliudao" class="">热流道</el-radio-button>
                                </el-radio-group>
                                <el-radio-group v-model="data_val[n-1]['jiaokou_type']">
                                    <el-radio-button label="lengliudao" class="">冷流道</el-radio-button>
                                </el-radio-group>
                                <div style="display:inline-block;float:right;">
                                    <span>试模费用</span>
                                    <el-input type="text" class="input_dis_ele_color_000" v-model="data_val[n-1]['shimu_price']" placeholder="" disabled="disabled" style="width:100px;color:#000;"/>
                                </div>
                            </main>
                        </section>
                        <section class="el-container">
                            <aside class="el-aside line_height_60" style="width: 100px;">模仁材质</aside>
                            <main class="el-main" style="text-align:left;">
                                <div style="display:inline-block;">
                                    <el-radio-group @change="muren_price_jisuan(n-1,2)" v-model="data_val[n-1]['muren_caizhi']">
                                        <el-radio-button label="30" class="">预硬钢</el-radio-button>
                                    </el-radio-group>
                                    <el-radio-group @change="muren_price_jisuan(n-1,2)" v-model="data_val[n-1]['muren_caizhi']">
                                        <el-radio-button label="50" class="">淬火钢</el-radio-button>
                                    </el-radio-group>
                                </div>
                                <div style="display:inline-block;font-size:0;margin-left:18px;">
                                    <span style="font-size:16px;">模仁尺寸</span>
                                    <el-input style="font-size:14px;width:100px;margin:0 5px 0 15px;" placeholder="L" type="number" class="input_ele_number" v-model="data_val[n-1]['muren_chicun_one']" @input="muren_price_jisuan(n-1)"></el-input>
                                    <span style="font-size:14px;">X</span>
                                    <el-input style="font-size:14px;width:100px;margin:0 5px;" placeholder="W" type="number" class="input_ele_number" v-model="data_val[n-1]['muren_chicun_two']" @input="muren_price_jisuan(n-1)"></el-input>
                                    <span style="font-size:14px;">X</span>
                                    <el-input style="font-size:14px;width:100px;margin:0 5px;" placeholder="H" type="number" class="input_ele_number" v-model="data_val[n-1]['muren_chicun_three']" @input="muren_price_jisuan(n-1)"></el-input>
                                </div>
                                <div style="display:inline-block;float:right;">
                                    <span>模仁费用</span>
                                    <el-input type="text" class="input_dis_ele_color_000" v-model="data_val[n-1]['muren_price']" placeholder="" disabled="disabled" style="width:100px;"/>
                                </div>
                            </main>
                        </section>
                    </div>
                    <div v-if="isshow_lanwei">
                        <section class="el-container">
                            <aside class="el-aside line_height_60" style="width: 100px;">机台吨位</aside>
                            <main class="el-main" style="text-align:left;">
                                <el-radio-group v-model="data_val[n-1]['jitai_dunwei']">
                                    <el-radio-button label="60" class="">60T</el-radio-button>
                                </el-radio-group>
                                <el-radio-group v-model="data_val[n-1]['jitai_dunwei']">
                                    <el-radio-button label="90" class="">90T</el-radio-button>
                                </el-radio-group>
                                <el-radio-group v-model="data_val[n-1]['jitai_dunwei']">
                                    <el-radio-button label="130" class="">130T</el-radio-button>
                                </el-radio-group>
                                <el-radio-group v-model="data_val[n-1]['jitai_dunwei']">
                                    <el-radio-button label="160" class="">160T</el-radio-button>
                                </el-radio-group>
                                <el-radio-group v-model="data_val[n-1]['jitai_dunwei']">
                                    <el-radio-button label="200" class="">200T</el-radio-button>
                                </el-radio-group>
                                <el-radio-group v-model="data_val[n-1]['jitai_dunwei']">
                                    <el-radio-button label="260" class="">260T</el-radio-button>
                                </el-radio-group>
                                <el-radio-group v-model="data_val[n-1]['jitai_dunwei']">
                                    <el-radio-button label="330" class="">330T</el-radio-button>
                                </el-radio-group>
                                <el-radio-group v-model="data_val[n-1]['jitai_dunwei']">
                                    <el-radio-button label="450" class="">450T</el-radio-button>
                                </el-radio-group>
                                <div style="display:inline-block;float:right;">
                                    <span>材料费用</span>
                                    <el-input type="text" disabled="disabled" class="input_dis_ele_color_000" v-model="data_val[n-1]['cailiao_price']" placeholder="" style="width:100px;"/>
                                </div>
                            </main>
                        </section>
                        <section class="el-container">
                            <aside class="el-aside line_height_60" style="width: 100px;">作业人数</aside>
                            <main class="el-main" style="text-align:left;">
                                 <el-input class="input_ele_number" style="font-size:14px;width:60px;margin:0 5px 0 0px;" value="1" type="number" v-model="data_val[n-1]['zuoye_people_num']"></el-input>
                                <div style="display:inline-block;margin-left:10px;">
                                    <span>成型周期</span>
                                    <el-input class="input_ele_number" type="number" v-model="data_val[n-1]['chengxing_zhouqi']"  style="width:70px;"/>
                                    秒
                                </div>
                                <div style="display:inline-block;margin-left:10px;">
                                    <span>材料名称</span>
                                    <el-select v-model="data_val[n-1]['cailiao_name']" placeholder="请选择" style="width:80px;">
                                        <el-option
                                        v-for="item in cailiaomingcheng_list"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div style="display:inline-block;margin-left:10px;">
                                    <span>材料单价</span>
                                    <el-input class="" type="text" disabled="disabled" :value="data_val[n-1]['cailiao_name'] ? data_val[n-1]['cailiao_name'] : 0 " style="width:80px;"/>
                                    元/KG
                                </div>
                                <div style="display:inline-block;float:right;">
                                    <span>加工费用</span>
                                    <el-input type="text" disabled="disabled" class="input_dis_ele_color_000" v-model="data_val[n-1]['jiagong_price']" placeholder="" style="width:100px;"/>
                                </div>
                            </main>
                        </section>
                        <section class="el-container">
                            <aside class="el-aside line_height_60" style="width: 100px;">包装要求</aside>
                            <main class="el-main" style="text-align:left;">
                                <el-checkbox-group  style="display:inline-block" v-model="data_val[n-1]['baozhuang_yaoqiu']" size="">
                                    <el-checkbox-button label="1" class="" key="纸箱">纸箱</el-checkbox-button>
                                    <el-checkbox-button label="2" class="" key="吸塑">吸塑</el-checkbox-button>
                                    <el-checkbox-button label="3" class="" key="印刷">印刷</el-checkbox-button>
                                    <el-checkbox-button label="4" class="" key="电镀">电镀</el-checkbox-button>
                                    <el-checkbox-button label="5" class="" key="喷漆">喷漆</el-checkbox-button>
                                    <el-checkbox-button label="6" class="" key="组装">组装</el-checkbox-button>
                                    <el-checkbox-button label="7" class="" key="其它">其它</el-checkbox-button>
                                </el-checkbox-group>
                                <div style="display:inline-block;float:right;">
                                    <span>其它费用</span>
                                    <el-input type="text" class="input_dis_ele_color_000" disabled="disabled" v-model="data_val[n-1]['qita_price']" placeholder="" style="width:100px;"/>
                                </div>
                            </main>
                        </section>
                    </div>
                </div>
            </div>
            <!-- <div @click="exportExcel()">daochu</div> -->
            <div style="height:80px;"></div>
            <el-card class="box-card footer_jisuan_div">
                <div style="float:left">
                    <span class="peizhiname">{{price_computed.title_name}}</span>
                    <span class="last_moneny"></span>
                    <!-- {{jisuan_all_price()}} -->
                </div>
                <div style="float:right">
                    <el-button class="my_bottom_btn" type="info" v-for="(item,index) in price_computed.right_btn" :key="index" :style="'color:'+item.color+';background-color:'+item.bg_color" @click="jisuan_all_price">{{item.name}}</el-button>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            cities:[
                '纸箱',
                '吸塑',
                '印刷',
                '电镀',
                '喷漆',
                '组装',
                '其它',
            ],
            // 大标题
            big_title:'报价计算器',
            // 客户名称：
            user_name:'',
            // 产品名称:
            product_name:'',
            // 寿命：
            lifetime:'',
            // 材料单价：
            materials:"",
            // 开模套数
            kaimo_yaoqiu_num:1,
            //头部的选择值
            head_val:[],
            // 是否显示附属栏位
            isshow_lanwei:false,
            // 是否显示明细
            isshow_mingxi:false,
            // 材料名称
            cailiaomingcheng_list:[{
                value: '50',
                label: 'ABS'
            },{
                value: '20',
                label: 'PC'
            },{
                value: '30',
                label: 'PP'
            },],
            // 是否显示产品材质
            isshow_cp_caizhi:true,
            top_img:[
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597171054287&di=bc9ef511b263f44b3bd2f22c5f809d27&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F5%2F57b57fe8a69b6.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597171092326&di=8ab94e2a9ba01258fd421a67bff8f341&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201105%2F17%2F113554rnu40q7nbgnn3lgq.jpg',
                'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3302399998,3216746631&fm=26&gp=0.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597171113840&di=60a4d7210a6670ada53adbb91f9c0263&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fd%2F580f270356187.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597171128551&di=79bfee360e80124ed9eb633947f9d57f&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201110%2F07%2F082726lghakmgjmgnah9aa.jpg'
            ],
            data_val:[],
            json_data:[],
            price_computed:{
                title_name:'产品参考报价',
                right_btn:[
                    // {
                    //     name:'去购买',
                    //     bg_color:'#fff',
                    //     color:'#c7000b',
                    // },
                    {
                        name:'加入清单',
                        bg_color:'#c7000b',
                        color:"#fff",
                    }
                ]
            },
            imgList:[]
        }
    },
    methods:{
        jisuan_all_price(){
            console.log(this.head_val);
            console.log(this.data_val);
            return
            return '￥0';
            // console.log(this.data_val);
            let all_value = 0;
            for (let item in this.data_val){
                all_value += this.data_val[item].value;
            }
            return '￥'+all_value;
        },
        // 计算模架费用
        mujia_price_jisuan(index){
            let data = this.data_val[index];
            let one = data['mujia_chicun_one'];
            let two = data['mujia_chicun_two'];
            let three = data['mujia_chicun_three'];
            if(!one || !two || !three){return}
            let last_value = one*0.785*two*0.00001*three*10;
            this.data_val[index]['mujia_price'] = this.baoliu_xiaoshu(last_value);
            // return last_value
        },
        // 计算模仁费用
        muren_price_jisuan(index,type=1){
            let data = this.data_val[index];
            let one = data['muren_chicun_one'];
            let two = data['muren_chicun_two'];
            let three = data['muren_chicun_three'];
            let caizhi = data['muren_caizhi'];
            let muchu_shu = data['muchu_shu'];
            
            if(type==2){
                if(caizhi == 30){
                    data['shimu_price']=1000;
                }else if(caizhi ==50){
                    data['shimu_price']=2000
                }
                if(!one || !two || !three || !caizhi || !muchu_shu){
                    data['muren_price'] =0;
                }else{
                    let last_value = one*two*three*0.785*0.00001*caizhi*muchu_shu;
                    data['muren_price'] = this.baoliu_xiaoshu(last_value);
                }
                this.$set(this.data_val,index,data)
            }else{
                if(!one || !two || !three || !caizhi || !muchu_shu){return}
                let last_value = one*two*three*0.785*0.00001*caizhi*muchu_shu;
                this.data_val[index]['muren_price'] = this.baoliu_xiaoshu(last_value);
            }

        },
        // 模具参考报价计算
        muju_cankao_price_jisuan(index){
            let data = this.data_val[index];
            let muren_price = data['muren_price'];
            let mujia_price = data['mujia_price'];
            let chanping_use = this.head_val['chanping_use'];
            let muji_gongqi = this.muju_gongqi_xishu(data['muju_gongqi']);
            let waiguan_yaoqiu = data['waiguan_yaoqiu'];
            let muju_shouming = data['muju_shouming'];
            let shimu_price = data['shimu_price'];
            let jiaokou_type = data['jiaokou_type'];
            let muchu_shu = data['muchu_shu'];
            let reliudao_price = (jiaokou_type == 'reliudao'? 5000*muchu_shu : 0);
            if(
                !muren_price || 
                !mujia_price || 
                !chanping_use || 
                !muji_gongqi || 
                !waiguan_yaoqiu || 
                !muju_shouming || 
                !shimu_price || 
                !jiaokou_type || 
                !muchu_shu || 
                !reliudao_price
            )return
            let last_value = ((muren_price+mujia_price)/0.25*chanping_use*muji_gongqi*waiguan_yaoqiu*muju_shouming) + shimu_price + reliudao_price;
            console.log(last_value);
            data['muju_cankao_price'] = this.baoliu_xiaoshu(last_value);
            this.$set(this.data_val,index,data);
        },
        // 模具工期系数计算
        muju_gongqi_xishu(num){
            if(num<15){
                return 1.3
            }else if(num<=20 && num>=15){
                return  1.25
            }else if(num<=25 && num>=21){
                return  1.2
            }else if(num<=30 && num>=26){
                return  1.1
            }else{
                return 1.0
            }
        },
        // 保留小数点
        baoliu_xiaoshu(last_value){
            return Math.round(last_value*100)/100;
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
        this.data_val.push({baozhuang_yaoqiu:[]});
        setInterval(()=>{
            for(let i =0;i<this.data_val.length;i++){
                this.muju_cankao_price_jisuan(i)
            }
        },1000)
    },
    mounted(){
    },
    updated(){
        let baojia_type = this.head_val.baojia_type;
        if(baojia_type && baojia_type=='chanping'){
            this.isshow_lanwei = true;
            this.isshow_mingxi = true;
        }else if(baojia_type && baojia_type=='muju'){
            this.isshow_mingxi = true;
            this.isshow_lanwei = false;
        }else if(baojia_type && baojia_type=='jiagong'){
            this.isshow_mingxi = false;
            this.isshow_lanwei = true;
        }
    },
    watch:{
        kaimo_yaoqiu_num: {
            handler: function() {
                if(this.kaimo_yaoqiu_num>0){
                    this.data_val=[];
                    for(let i = 0;i<this.kaimo_yaoqiu_num;i++){
                        this.data_val.push({baozhuang_yaoqiu:[]});
                    }
                }
            }
        }
    },
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
<style lang="css">
    .input_ele_number input{padding-right: 0;}
    .input_dis_ele_color_000.el-input.is-disabled .el-input__inner{color: #000;}
</style>
