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
                <div>
                    <div>
                        <div v-if="top_img.length>0" class="" style="display:inline-block;width:380px;">
                        <img :src="top_img" alt="" style="width:100%">
                        </div>
                        <div v-if="top_img.length<=0" style="width:380px;">
                            <img src="../../static/default.jpg" alt="" style="width:100%">
                        </div>
                    </div>
                    <el-button @click="click_input_upload" type="success" style="float:right;margin:10px 10px 0 0;" size="mini">上传产品图</el-button>
                </div>
                <input type="file" accept="image/*" style="display:none;" id="shangchuan_img" @change="upload_img" value="上传图片">
            </div>
            <div class="content_div">
                <div class="big_class_div" v-for="n in Number(kaimo_yaoqiu_num)">
                    <section class="el-container" v-if="isshow_cp_caizhi">
                        <aside class="el-aside line_height_60" style="width: 100px;">产品材质</aside>
                        <main class="el-main" style="text-align:left;">
                            <el-input type="text" v-model="data_val[n-1]['chanping_caizhi']"  style="width:130px;"/>
                            <div style="display:inline-block;margin-left:30px;">
                                <span>产品单重(G)</span>
                                <el-input class="input_ele_number" type="number" v-model="data_val[n-1]['chanping_danzhong']" @input="cailiao_price_jisuan(n-1)" style="width:80px;"/>
                                <span>模出数</span>
                                <el-input class="input_ele_number" type="number" v-model="data_val[n-1]['muchu_shu']" @input="muren_price_jisuan(n-1)" style="width:80px;"/>
                                <span>水口重</span>
                                <el-input class="input_ele_number" type="number" v-model="data_val[n-1]['shuikou_zhong']" @input="cailiao_price_jisuan(n-1)" style="width:80px;"/>
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
                                    <el-input type="text" class="input_dis_ele_color_000 input_ele_number" v-model="data_val[n-1]['mujia_price']" placeholder="" disabled="disabled" style="width:100px;"/>
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
                                    <el-input type="text" class="input_dis_ele_color_000 input_ele_number" v-model="data_val[n-1]['shimu_price']" placeholder="" disabled="disabled" style="width:100px;color:#000;"/>
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
                                <div style="display:inline-block;float:right;padding:10px 0;">
                                    <span>模仁费用</span>
                                    <el-input type="text" class="input_dis_ele_color_000 input_ele_number" v-model="data_val[n-1]['muren_price']" placeholder="" disabled="disabled" style="width:100px;"/>
                                </div>
                            </main>
                        </section>
                        <div style="text-align:right;margin-right:10px">
                            <span>模具参考报价</span>
                            <el-input type="text" class="input_dis_ele_color_000 input_ele_number" v-model="data_val[n-1]['muju_cankao_price']" placeholder="" disabled="disabled" style="width:150px;"/>
                        </div>
                    </div>
                    <div v-if="isshow_lanwei">
                        <section class="el-container">
                            <aside class="el-aside line_height_60" style="width: 100px;">机台吨位</aside>
                            <main class="el-main" style="text-align:left;">
                                <el-radio-group v-model="data_val[n-1]['jitai_dunwei']" @change="jiagong_price_jisuan(n-1)">
                                    <el-radio-button label="40" class="">60T</el-radio-button>
                                </el-radio-group>
                                <el-radio-group v-model="data_val[n-1]['jitai_dunwei']" @change="jiagong_price_jisuan(n-1)">
                                    <el-radio-button label="50" class="">90T</el-radio-button>
                                </el-radio-group>
                                <el-radio-group v-model="data_val[n-1]['jitai_dunwei']" @change="jiagong_price_jisuan(n-1)">
                                    <el-radio-button label="55" class="">130T</el-radio-button>
                                </el-radio-group>
                                <el-radio-group v-model="data_val[n-1]['jitai_dunwei']" @change="jiagong_price_jisuan(n-1)">
                                    <el-radio-button label="60" class="">160T</el-radio-button>
                                </el-radio-group>
                                <el-radio-group v-model="data_val[n-1]['jitai_dunwei']" @change="jiagong_price_jisuan(n-1)">
                                    <el-radio-button label="70" class="">200T</el-radio-button>
                                </el-radio-group>
                                <el-radio-group v-model="data_val[n-1]['jitai_dunwei']" @change="jiagong_price_jisuan(n-1)">
                                    <el-radio-button label="80" class="">260T</el-radio-button>
                                </el-radio-group>
                                <el-radio-group v-model="data_val[n-1]['jitai_dunwei']" @change="jiagong_price_jisuan(n-1)">
                                    <el-radio-button label="90" class="">330T</el-radio-button>
                                </el-radio-group>
                                <el-radio-group v-model="data_val[n-1]['jitai_dunwei']" @change="jiagong_price_jisuan(n-1)">
                                    <el-radio-button label="140" class="">450T</el-radio-button>
                                </el-radio-group>
                                <div style="display:inline-block;float:right;">
                                    <span>材料费用</span>
                                    <el-input type="text" disabled="disabled" class="input_dis_ele_color_000 input_ele_number" v-model="data_val[n-1]['cailiao_price']" placeholder="" style="width:100px;"/>
                                </div>
                            </main>
                        </section>
                        <section class="el-container">
                            <aside class="el-aside line_height_60" style="width: 100px;">作业人数</aside>
                            <main class="el-main" style="text-align:left;">
                                 <el-input class="input_ele_number input_ele_left_p_0" style="font-size:14px;width:80px;margin:0 5px 0 0px;" value="1" type="number" v-model="data_val[n-1]['zuoye_people_num']" @input="jiagong_price_jisuan(n-1)"></el-input>
                                <div style="display:inline-block;margin-left:5px;">
                                    <span>成型周期</span>
                                    <el-input class="input_ele_number" type="number" v-model="data_val[n-1]['chengxing_zhouqi']"  style="width:70px;" @input="jiagong_price_jisuan(n-1)"/>
                                    秒
                                </div>
                                <div style="display:inline-block;margin-left:10px;">
                                    <span>材料名称</span>
                                    <el-select v-model="data_val[n-1]['cailiao_name']" placeholder="请选择" @change="cailiao_price_jisuan(n-1)" style="width:80px;">
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
                                    <el-input type="text" disabled="disabled" class="input_dis_ele_color_000 input_ele_number" v-model="data_val[n-1]['jiagong_price']" placeholder="" style="width:100px;"/>
                                </div>
                            </main>
                        </section>
                        <section class="el-container">
                            <aside class="el-aside line_height_60" style="width: 100px;">包装要求</aside>
                            <main class="el-main" style="text-align:left;">
                                <el-radio-group @change="qita_price_jisuan(n-1)" v-model="data_val[n-1]['baozhuang_yaoqiu']">
                                    <el-radio-button label="0.05" class="">纸箱</el-radio-button>
                                </el-radio-group>
                                <el-radio-group @change="qita_price_jisuan(n-1)" v-model="data_val[n-1]['baozhuang_yaoqiu']">
                                    <el-radio-button label="0.06" class="">吸塑</el-radio-button>
                                </el-radio-group>
                                <el-radio-group @change="qita_price_jisuan(n-1)" v-model="data_val[n-1]['baozhuang_yaoqiu']">
                                    <el-radio-button label="0.07" class="">其它</el-radio-button>
                                </el-radio-group>
                                <div style="display:inline-block;margin-left:15px;">
                                    工序
                                    <el-checkbox-group style="display:inline-block;margin-left:10px" @change="qita_price_jisuan(n-1)" v-model="data_val[n-1]['gongxu']" size="">
                                        <el-checkbox size="small" style="margin-right:0;" border label="0.3" class="" key="印刷">印刷</el-checkbox>
                                        <el-checkbox size="small" style="margin-right:0;" border label="0.6" class="" key="电镀">电镀</el-checkbox>
                                        <el-checkbox size="small" style="margin-right:0;" border label="0.4" class="" key="喷漆">喷漆</el-checkbox>
                                        <el-checkbox size="small" style="margin-right:0;" border label="0.30" class="" key="组装">组装</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                                <div style="display:inline-block;float:right;">
                                    <span>其它费用</span>
                                    <el-input type="text" class="input_dis_ele_color_000 input_ele_number" disabled="disabled" v-model="data_val[n-1]['qita_price']" placeholder="" style="width:100px;"/>
                                </div>
                            </main>
                        </section>
                        <div style="text-align:right;margin-right:10px">
                            <span>产品参考报价</span>
                            <el-input type="text" class="input_dis_ele_color_000 input_ele_number" v-model="data_val[n-1]['chanping_cankao_price']" placeholder="" disabled="disabled" style="width:150px;"/>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div @click="exportExcel()">daochu</div> -->
            
            <el-card class="box-card footer_jisuan_div">
                <div style="float:left">
                    <!-- last_moneny -->
                    <span class="peizhiname">{{price_computed.title_name}}</span>
                    <span class="last_moneny">{{danhao}}</span>
                    <span class="" style="font-size:14px;color:#999">（以上报价不含税，税率13%）</span>
                </div>
                <div style="float:right">
                    <el-button type="primary" @click="dialogVisible = true">修改公司信息</el-button>
                    <el-button class="my_bottom_btn" type="info" v-for="(item,index) in price_computed.right_btn" :key="index" :style="'color:'+item.color+';background-color:'+item.bg_color" @click="jisuan_all_price">{{item.name}}</el-button>
                </div>
            </el-card>
        </div>
        <el-dialog
            title="公司信息编辑"
            :visible.sync="dialogVisible"
            width="500px"
            :before-close="handleClose">
            <div>
                <section class="el-container">
                    <aside class="el-aside line_height_60" style="width: 100px;">公司名字：</aside>
                    <main class="el-main" style="text-align:left;">
                        <el-input v-model="gongsi_xingxi['name']"></el-input>
                    </main>
                </section>
                <section class="el-container">
                    <aside class="el-aside line_height_60" style="width: 100px;">联系人：</aside>
                    <main class="el-main" style="text-align:left;">
                        <el-input v-model="gongsi_xingxi['people']"></el-input>
                    </main>
                </section>
                <section class="el-container">
                    <aside class="el-aside line_height_60" style="width: 100px;">联系电话：</aside>
                    <main class="el-main" style="text-align:left;">
                        <el-input v-model="gongsi_xingxi['phone']"></el-input>
                    </main>
                </section>
                 <section class="el-container">
                    <aside class="el-aside line_height_60" style="width: 100px;">联系地址：</aside>
                    <main class="el-main" style="text-align:left;">
                        <el-input v-model="gongsi_xingxi['dizhi']"></el-input>
                    </main>
                </section>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
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
            // 公司信息弹出层显示隐藏开关
            dialogVisible:false,
            // 公司信息
            gongsi_xingxi:{},
            // 大标题
            big_title:'个性化定制',
            // 客户名称：
            user_name:'',
            // 产品名称:
            product_name:'',
            // 单号
            danhao:"",
            // 寿命：
            lifetime:'',
            // 材料单价：
            materials:"",
            // 开模套数
            kaimo_yaoqiu_num:1,
            //头部的选择值
            head_val:{},
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
            top_img:'',
            data_val:[],
            json_data:[],
            price_computed:{
                title_name:'单号：',
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
            imgList:[],
            MathUtils : {
                roundToPrecision: function(subject, precision) {
                    return +((+subject).toFixed(precision));
                }
            },
        }
    },
    methods:{
        click_input_upload(e){
            document.getElementById('shangchuan_img').click();
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        // 打印
        doPrint() {    
            // let bdhtml=window.document.body.innerHTML;    
            // let sprnstr="<!--startprint-->";    
            // let eprnstr="<!--endprint-->";    
            // let prnhtml=bdhtml.substr(bdhtml.indexOf(sprnstr)+17);    
            // prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr));    
            // window.document.body.innerHTML=prnhtml; 
            setTimeout(()=>{
                window.print();    
            },200)
        },
        upload_img(e){
            let that = this;
             function changepic(e) {

                var reads= new FileReader();

                let f=e.files[0];

                reads.readAsDataURL(f);
                
                reads.onload=function (e) {

                   that.top_img=this.result;
                };
            }
            changepic(e.target);
            console.log(e.target.files[0])
        },
        jisuan_all_price(){
            if(
                !this.gongsi_xingxi['name'] || 
                this.gongsi_xingxi['name']=='' || 
                !this.gongsi_xingxi['people'] ||
                this.gongsi_xingxi['people']=="" || 
                !this.gongsi_xingxi['phone'] || 
                this.gongsi_xingxi['phone']=='' || 
                !this.gongsi_xingxi['dizhi'] || 
                this.gongsi_xingxi['dizhi']==''
            ){
                this.$alert('请先完善公司信息！','提示',{
                    confirmButtonText: '确定',
                    callback: ()=>{
                        this.dialogVisible = true;
                    }
                });
                return
            }
            function xiaoyu_ten(num){
                if(num<10){
                    return '0'+ num 
                }else{
                    return num
                }
            }
            let str = 'WINK'
            let date = new Date();
            let year = date.getFullYear();
            let yue = date.getMonth()+1;
            yue = xiaoyu_ten(yue);
            let ri = date.getDate();
            ri = xiaoyu_ten(ri);
            let xiaoshi = date.getHours();
            xiaoshi = xiaoyu_ten(xiaoshi);
            let fen = date.getMinutes();
            fen = xiaoyu_ten(fen);
            let miao = date.getSeconds();
            miao = xiaoyu_ten(miao);
            let suiji = Math.floor(Math.random()*500);
            if(suiji<1000 && suiji >=100){
                suiji = '0' + suiji;
            }else if(suiji<100 && suiji>=10){
                suiji = '00' +suiji;
            }else if(suiji<10 && suiji>=0){
                suiji = '000' + suiji;
            }
            str += year + '' +
                    yue + '' +
                    ri + '' +
                    xiaoshi + '' +
                    fen + '' +
                    miao + '' +
                    suiji 

            this.danhao = str;
            
            console.log(JSON.stringify(this.head_val))
            console.log(JSON.stringify(this.kaimo_yaoqiu_num))
            console.log(JSON.stringify(this.data_val))
            console.log(JSON.stringify(this.top_img))
            console.log(JSON.stringify(this.isshow_mingxi))
            console.log(JSON.stringify(this.isshow_lanwei))
            console.log(JSON.stringify(this.danhao))

            // this.doPrint()
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
        // 材料费用计算
        cailiao_price_jisuan(index){
            let data = this.data_val[index];
            let chanping_danzhong = data['chanping_danzhong'];
            let muchu_shu = data['muchu_shu'];
            let shuikou_zhong = data['shuikou_zhong'];
            let cailiao_one_price = data['cailiao_name'];
            if(
                !chanping_danzhong ||
                !muchu_shu ||
                !shuikou_zhong ||
                !cailiao_one_price
            )return
            let last_value = (chanping_danzhong + shuikou_zhong/muchu_shu)*1.05*cailiao_one_price
            this.data_val[index]['cailiao_price'] = this.baoliu_xiaoshu(last_value);
        },
        //加工费用计算
        jiagong_price_jisuan(index){
            let data = this.data_val[index];
            let jitai_dunwei = data['jitai_dunwei'];
            let zuoye_people_num = data['zuoye_people_num'];
            let chengxing_zhouqi = data['chengxing_zhouqi'];
            let muchu_shu = data['muchu_shu'];
            if(
                !jitai_dunwei ||
                !zuoye_people_num ||
                !chengxing_zhouqi ||
                !muchu_shu
            )return
            jitai_dunwei = Number(jitai_dunwei);
            let last_value = (jitai_dunwei+zuoye_people_num*25) / (3600/chengxing_zhouqi*muchu_shu)*1.2;
            this.data_val[index]['jiagong_price'] = this.baoliu_xiaoshu(last_value);
        },
        // 其他费用计算
        qita_price_jisuan(index){
            let data = this.data_val[index];
            let jiagong_price = data['jiagong_price'];
            let baozhuang_yaoqiu = data['baozhuang_yaoqiu'];
            if(
                !jiagong_price ||
                !baozhuang_yaoqiu
            )return
            let gongxu = data['gongxu'];
            let gongxu_val = 0;
            gongxu.map((e)=>{gongxu_val = this.MathUtils.roundToPrecision(Number(e) + gongxu_val,1) });
            let last_value = jiagong_price * baozhuang_yaoqiu + gongxu_val;
            this.data_val[index]['qita_price'] = this.baoliu_xiaoshu(last_value);
        },
        // 产品参考报价计算
        chanping_cankao_price_jisuan(index){
            let data = this.data_val[index];
            let cailiao_price = data['cailiao_price'];
            let jiagong_price = data['jiagong_price'];
            let qita_price = data['qita_price'];
            if(
                !cailiao_price ||
                !jiagong_price ||
                !qita_price
            )return
            let last_value = cailiao_price + jiagong_price + qita_price;
            this.data_val[index]['chanping_cankao_price'] = this.baoliu_xiaoshu(last_value);
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
                !jiaokou_type
            )return
            let last_value = ((muren_price+mujia_price)/0.25*chanping_use*muji_gongqi*waiguan_yaoqiu*muju_shouming) + shimu_price + reliudao_price;
            // console.log(last_value);
            //  保留百位
            data['muju_cankao_price'] = Math.round(last_value/100)*100;
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
            return Math.round(last_value*10000)/10000;
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
        this.data_val.push({gongxu:[]});
        setInterval(()=>{
            for(let i =0;i<this.data_val.length;i++){
                this.muju_cankao_price_jisuan(i);
                this.chanping_cankao_price_jisuan(i);
            }
        },1000)
    },
    mounted(){
        let shangchuan_img = document.getElementById(shangchuan_img);
        console.log(shangchuan_img);

        // shangchuan_img.onchange= (e)=>{
        //     console.log(e);
        // }
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
                        this.data_val.push({gongxu:[]});
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
        margin-top: 5px;
        height: 80px;
    }
    .last_moneny{font-size: 16px;color: #c7000d;}
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
    .input_ele_left_p_0 input{padding-left: 0;}
</style>
