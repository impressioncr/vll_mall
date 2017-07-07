<template>
    <div class="myProfile">
       <yd-navbar title="NavBar" bgcolor="#a69ce4" height="1.2rem">
            <router-link to="/my" slot="left">
                <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
            </router-link>
            <span slot="center" id="center">我的资料</span>
        </yd-navbar>
       <yd-cell-group>
            <yd-cell-item>
                <span slot="left">用户名</span>
                <span slot="right" v-if="show_info">{{username}}</span>
                <span slot="right" v-else ><input type="text" v-model:value="username"></span>
            </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">昵称</span>
                <span slot="right" v-if="show_info">{{nick_name}}</span>
                <span slot="right" v-else><input type="text" v-model:value="nick_name"></span>
            </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">手机号</span>
                <span slot="right" v-if="show_info">{{phone}}</span>
                <span slot="right" v-else><input type="text" v-model:value="phone"></span>
            </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">年龄</span>
                <span slot="right" v-if="show_info">{{age}}</span>
                <span slot="right" v-else><input type="text" v-model:value="age"></span>
            </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">等级</span>
                <span slot="right" v-if="show_info">{{degree}}</span>
                <span slot="right" v-else><input type="text" v-model:value="degree"></span>
            </yd-cell-item>
        </yd-cell-group>
        <yd-button size="large" bgcolor="#C5C2D4" color="#fff" @click.native="update_info" v-if="up_save">编辑</yd-button>
        <yd-button size="large" color="#fff" @click.native="save_info" v-else>保存</yd-button>
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
                <!-- <yd-badge slot="badge" type="danger">2</yd-badge> -->
            </yd-tabbar-item>
        </yd-tabbar>
    </div>
</template>
<script>
    export default {
        data() {
            var user_id = sessionStorage.getItem('mshop')
            setTimeout( ()=> {
                    this.$http.post('mshop/likenum',{user_id:user_id}).then((res) => {
                    this.cart_num = res.data.length
                })
            },1800)
            this.$http.post('mshop/profile',{id:user_id}).then((res) =>{
                this.username = res.data[0].username
                this.nick_name = res.data[0].nick_name
                this.phone = res.data[0].phone
                this.age = res.data[0].age
                this.degree = res.data[0].degree
                this.id = res.data[0].Id
            })
            return {
                user_id:user_id,
                username:'',
                nick_name:'',
                phone:'',
                age:'',
                degree:'',
                in_username:'',
                show_info:true,
                up_save:true,
                id:'',
                cart_num:0
            }
        },
        methods:{
            update_info() {
                this.show_info = !this.show_info
                this.up_save = !this.up_save
            },
            save_info() {
                this.$dialog.confirm({
                    title: '保存！',
                    mes: '请点击确定保存当前信息！',
                    opts: () => {
                        this.show_info = !this.show_info
                        this.up_save = !this.up_save
                        var up_info = {
                            username:this.username,
                            nick_name:this.nick_name,
                            phone:this.phone,
                            age:this.age,
                            degree:this.degree,
                            uid:this.id,
                        }
                        this.$http.post('mshop/upinfo',up_info).then((res) => {
                            this.$dialog.toast({mes: '保存成功', timeout: 1000})
                        })
                    }
                });
            }
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