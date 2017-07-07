<template>
    <div id="myfav">
        <yd-navbar title="NavBar" bgcolor="#a69ce4" height="1.2rem">
            <router-link to="/my" slot="left">
                <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
            </router-link>
            <span slot="center" id="center">我的收藏</span>
        </yd-navbar>
        <yd-list theme="4" slot="list">
            <yd-list-item v-for="item in list" :key="item.Id">

                <img slot="img" :src="item.img" @click='load_detail' :item="item.Id">
                <span slot="title">{{item.title}}</span>
                <yd-list-other slot="other">
                    <div>
                        <span class="list-price"><em>¥</em>{{item.price}}</span>
                        <span class="list-del-price">¥{{item.market_price}}</span>
                    </div>
                    <div>
                        {{item.place}}
                    </div>
                    <div>
                         <yd-icon :id="item.Id" name="error" color="#F00C0C" size="0.3rem" @click.native="dele_like"></yd-icon>
                    </div>
                </yd-list-other>

            </yd-list-item>
        </yd-list>
    </div>
</template>
<script>
    export default {
        data(){
            this.load_fav()//加载收藏
            return{
                list: [],
                user_id:0,
            }
        },
        methods:{
            load_detail(e){
                let item_id = e.target.getAttribute('item')
                this.$router.push({name:'details', params: { itemId: item_id }})
            },
            dele_like(e){
                var dele_fav = {
                    user_id:sessionStorage.getItem('mshop'),
                    pro_id:e.target.getAttribute('id')
                }
                this.$http.post('mshop/delelike',dele_fav).then(()=>{
                    this.$dialog.toast({mes: '删除收藏成功', timeout: 1000})
                    setTimeout(()=>{this.load_fav()},1600)
                })
            },
            load_fav(){
                this.user_id = sessionStorage.getItem('mshop')
                let user = {uid:this.user_id}
                this.$http.post('mshop/loadfav', user)
                .then(function(res){
                    this.list = res.body
                })
            }
        },
    }
</script>
<style></style>