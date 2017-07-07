<template>
    <div class="my">
       <yd-navbar title="NavBar" bgcolor="#a69ce4" height="1.2rem">
            <router-link to="/hello" slot="left">
                <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
            </router-link>
            <span slot="center" id="center">个人中心</span>
        </yd-navbar>
        <yd-cell-group>
            <yd-cell-item arrow>
                <yd-icon slot="icon" name="ucenter" color="#F3806D" size=".42rem"></yd-icon>
                <span slot="left">我的资料</span>
                <router-link to="/myprofile" slot="right">查看资料</router-link>
            </yd-cell-item>
            <yd-cell-item arrow>
                <yd-icon slot="icon" name="shopcart" color="#F3806D" size=".42rem"></yd-icon>
                <span slot="left">我的收藏</span>
                <router-link to="/myfav" slot="right">
                    <span >收藏的宝贝</span>
                </router-link>
            </yd-cell-item>
            <yd-cell-item arrow>
                <yd-icon slot="icon" name="shopcart" color="#F3806D" size=".42rem"></yd-icon>
                <span slot="left">我的订单</span>
                <span slot="right">查看订单</span>
            </yd-cell-item>
        </yd-cell-group>
        <!-- <yd-button size="large" type="danger" @click.native="logout">退出登录</yd-button> -->

        <yd-button @click.native="show1 = true" size="large" type="danger">退出</yd-button>
        <yd-actionsheet :items="myItems1" v-model="show1" cancel="取消"></yd-actionsheet>

        <yd-tabbar fixed>
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
    </div>
</template>
<script>
    export default {
        data(){
            setTimeout(()=>{
                this.load_fav_num()
            },2000)
            return{
                user_id:0,
                cart_num:0,
                show1: false,
                myItems1: [
                    {
                        label: '确定',
                        method: () => {
                            sessionStorage.setItem('mshop','')
                            this.$router.push('login')
                            this.$dialog.toast({mes: '退出成功！'});
                        }
                    }
                ]
            }
        },
        methods:{
            load_fav_num(){
                var user_id = sessionStorage.getItem('mshop')
                    this.$http.post('mshop/likenum',{user_id:user_id}).then((res) => {
                    this.cart_num = res.data.length;
                })
            },
        },
        created(){
            this.user_id = sessionStorage.getItem('mshop')
        }
    }
</script>
<style>
    #center{
        font-size:22px;
        font-family:微软雅黑;
        color: #fff;
    }
</style>