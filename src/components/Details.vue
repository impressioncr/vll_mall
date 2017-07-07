<template>
  <div id="details">
    <yd-layout v-for="value in item" :key="value.Id">
        <yd-navbar slot="navbar" title="NavBar" bgcolor="#a69ce4" height="1.2rem">
            <router-link to="/list" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
            <span slot="center" id="item_name">{{value.title}}</span>
            <router-link to="" slot="right">
            </router-link>
        </yd-navbar>
        <div id="items1">
            <div><img :src="value.img" alt=""></div>
            <div id="item_info">
                <span>{{value.title}}</span>
                <div>
                    <span class="list-price"><em>¥</em>{{value.price}}</span>
                    <span class="list-del-price">¥{{value.market_price}}</span>
                    <span>地区:{{value.place}}</span>
                </div>
            </div>
        </div>
        <div>
            <yd-radio-group v-model="radio2" size="20" id='rad_group'>
                <yd-radio val="1" id="radio">X</yd-radio>
                <yd-radio val="2">M</yd-radio>
                <yd-radio val="3">L</yd-radio>
                <yd-radio val="4">XL</yd-radio>
            </yd-radio-group>
        </div>
        <yd-cell-group title="附加选项" style="margin-top:10px">
            <yd-cell-item type="checkbox">
                <span slot="left">加肥款</span>
                <input slot="right" type="checkbox" value="加肥款" v-model="checkedNames"/>
            </yd-cell-item>

            <yd-cell-item type="checkbox">
                <span slot="left">加厚款</span>
                <input slot="right" type="checkbox" value="加厚款" v-model="checkedNames"/>
            </yd-cell-item>

            <yd-cell-item>
                <span slot="left">已选中：</span>
                <span slot="right">{{checkedNames}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">库存数量：</span>
                <span slot="right">{{value.amts}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">数量：</span>
                <yd-spinner slot="right" :max="value.amts" unit="1" v-model="selectNum"></yd-spinner>
            </yd-cell-item>
        </yd-cell-group>
        <yd-button size="large" type="primary" @click.native="add_order">下单</yd-button>
        <div id="slot"></div>
        <yd-tabbar id='tabbar2' fixed>
            <yd-tabbar-item title="首页" link="/hello">
                <yd-icon name="home-outline" slot="icon" size="0.54rem"></yd-icon>
            </yd-tabbar-item>
            <yd-tabbar-item title="购物车" link="#">
                <yd-icon name="shopcart-outline" slot="icon" size="0.54rem"></yd-icon>
                <yd-badge slot="badge" type="danger">{{cart_num}}</yd-badge>
            </yd-tabbar-item>
            <yd-tabbar-item title="个人中心" link="#" active>
                <yd-icon name="ucenter" slot="icon" size="0.54rem"></yd-icon>
            </yd-tabbar-item>
        </yd-tabbar>
    </yd-layout>
  </div>
</template>
<script>
    export default {
        data(){
            var item = {
                item_id : this.$route.params.itemId
            }
            this.$http.post('mshop/details',item).then((res) => {
                window.mydialog  = {
                    msg:this.$dialog,
                    max_num:res.data[0].amts
                } //把this.$dialog方法给window对象mydialog
                this.item = res.data
                this.max_num = res.data[0].amts
            })
            return {
                item_id:item.item_id,
                item:{},
                cart_num:1,
                radio2: 1,
                checkedNames:[],
                selectNum: 0,
                max_num: 0,
            }
        },
        //观察数据的变化
        watch:{
            selectNum : (val,oldVal)=>{
                if(val==mydialog.max_num){
                    mydialog.msg.toast({mes: '库存不足了哦', timeout: 1000})
                }
            }
        },
        methods:{
            add_order(){
                var order_info = {
                    uid:sessionStorage.getItem('mshop'),
                    pro_id:this.item_id,
                    others:this.checkedNames.toString(),//数组转换为字符串
                    amounts:this.selectNum,
                    size:this.radio2,
                    max_num:this.max_num,
                }
                this.$http.post('mshop/order',order_info).then((res) => {
                    this.$dialog.toast({mes:'下单成功!',timeout: 1000})
                })
            }
        },
    }
</script>
<style scoped>
    #item_name{
        width: 240px;
        height: 50px;
        top:20px;
        overflow:hidden;
        position: absolute;
        font-size:20px;
        -webkit-animation: anim1 3s linear infinite;
    }
    #items1{
        padding:5px;
        width: 99%;
        overflow:hidden;
    }
    #item_info span,#item_info div{
        float:left;
        margin:4px;
    }
    #item_info>div{
        position:relative;
    }
    #item_info>span{
        margin-top:14px;
    }
    #item_info>div>span{
        margin-right:20px;
    }
    #item_info>div>span:nth-child(2){
        margin-left:-10px;
        line-height:27px;
    }
    #item_info>div>span:nth-child(1){
        font-size:20px;
    }
    #item_info>div>span:nth-child(3){
        font-size:14px;
        position:absolute;
        right:-100%;
    }
    #rad_group{
        margin-left:-40%;
    }
    #slot{
        height: 50px;
    }
    @-webkit-keyframes anim1{
        0% {top: 20px;opacity: 0.2}
        25% {top: 0px;opacity: 0.8}
        50% {top: -30px;opacity: 1}
        60% {top: -30px ;opacity: 1}
        75% {top: 0px ;opacity: 1}
        90% {top: 0px ;opacity: 1}
        100% {top: 0px ;opacity: 1}
    }

</style>