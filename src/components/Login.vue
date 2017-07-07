<template>
  <div class='login'>
    <yd-tab>
        <yd-tab-panel label="登录" :active="tabSlide">
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left">用户名：</span>
                    <yd-input slot="right" required v-model="username" max="20" placeholder="请输入用户名"></yd-input>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">密码：</span>
                    <yd-input slot="right" type="password" v-model="password" placeholder="请输入密码"></yd-input>
                </yd-cell-item>
            </yd-cell-group>
            <yd-button @click.native="confirm_log" size="large" type="primary" class="confirm">确定</yd-button>
            <yd-button size="large" type="danger" @click.native="forget_pass = true">忘记密码</yd-button>
        </yd-tab-panel>
        <yd-tab-panel label="注册">
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left">用户名：</span>
                    <yd-input slot="right" required v-model="username1" max="20" placeholder="请输入用户名"></yd-input>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">密码：</span>
                    <yd-input slot="right" type="password" v-model="password2" placeholder="请输入密码"></yd-input>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">确认密码：</span>
                    <yd-input slot="right" type="password" v-model="password3" placeholder="请输入密码"></yd-input>
                </yd-cell-item>
            </yd-cell-group>
            <yd-button @click.native="confirm_reg" size="large" type="primary">确定</yd-button>
        </yd-tab-panel>
    </yd-tab>
    <yd-popup v-model="forget_pass" position="bottom" height="60%">
        <yd-button type="warning" style="margin: 30px;" @click.native="forget_pass = false">关闭</yd-button>
        <yd-cell-group>
        <yd-cell-item>
            <yd-icon slot="icon" name="phone3" size=".45rem"></yd-icon>
            <input type="text" slot="right" placeholder="请输入手机号码">

            <yd-sendcode slot="right"
                v-model="start1"
                @click.native="sendCode1"
                type="warning"
            ></yd-sendcode>

        </yd-cell-item>
    </yd-cell-group>
    </yd-popup>
  </div>
</template>
<script>
    export default {
        name:'login',
        data() {
            return {
                username: '',
                password: '',
                username1:'',
                password2:'',
                password3:'',
                regname:'^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$',
                forget_pass:false,
                tabSlide:true,
                start1: false
            }
        },
        methods:{
            confirm_reg() {
                var user = {
                    username:this.username1,
                    password:this.password2
                }
                if(this.password2!=this.password3){
                    this.$dialog.toast({
                        mes: '两次密码输入不一致',
                        timeout: 1500,
                        icon: 'error'
                    })
                }
                this.$http.post('mshop/reg',user).then(function(res){
                    if(res.data.err){
                        this.$dialog.toast({
                            mes: res.data.err,
                            timeout:1500,
                            icon:'error'
                        })
                        return
                    }
                    this.tabSlide = !this.tabSlide
                    this.$dialog.toast({
                        mes:'注册成功,请登录',
                        timeout:1500,
                        icon:'success'
                    })
                })
            },
            confirm_log() {
                var user = {
                    username:this.username,
                    password:this.password
                }
                this.$http.post('mshop/log',user).then(function(res){
                    if(res.data.msg==true){
                        this.$dialog.toast({
                            mes:'登陆成功',
                            timeout:1400,
                            icon:'success'
                        })
                        var user_id = res.data.id
                        console.log(user_id);
                        sessionStorage.setItem('mshop',user_id)
                        setTimeout(() => {
                            this.$router.push('/hello')
                        },1400)
                        return
                    }
                    this.$dialog.toast({
                        mes:res.data.msg,
                        timeout:1400,
                        icon:'error'
                    })
                })
            },
            sendCode1() {
                this.$dialog.loading.open('发送中...');
                setTimeout(() => {

                    this.start = true;
                    this.$dialog.loading.close();

                    this.$dialog.toast({
                        mes: '已发送',
                        icon: 'success',
                        timeout: 1500
                    });

                }, 1000);
            }
        }
    }
</script>
<style>
    .login{
        width: 90%;
        top:50%;
        margin:0 5%;
        position: absolute;
        margin-top:-134px;
    }
    .login .tab-nav>li>a{
        font-size:20px;
    }
    .login ul.tab-nav{
        height: 50px;
    }
</style>