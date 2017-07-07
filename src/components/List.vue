<template>
  <div>
    <yd-navbar title="NavBar" bgcolor="#a69ce4" height="1.2rem" fixed>
        <router-link to="/hello" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
        <img slot="center" src="/static/logo.png"/>
        <router-link to="" slot="right" @click.native="listTab">
            <img src="/static/png/2017-06-27_120043.png" v-if='list_icon' alt="" width="30px">
            <img src="/static/png/2017-06-27_120119.png" v-else alt="" width="30px">
        </router-link>
    </yd-navbar>
    <yd-infinitescroll :on-infinite="loadList" ref="infinitescrollDemo" id="list">
        <yd-list :theme="theme" slot="list">
            <yd-list-item v-for="item in list" :key="item.Id">

                <img slot="img" :src="item.img" @click='load_detail' :item="item.Id">
                <span slot="title">{{item.title}}</span>
                <yd-list-other slot="other">
                    <div>
                        <span class="list-price"><em>¥</em>{{item.price}}</span>
                        <span class="list-del-price">¥{{item.market_price}}</span>
                    </div>
                    <div><yd-icon :id="item.Id" name="like-outline" color="#F00C0C" size="0.3rem" @click.native="add_like"></yd-icon>{{item.place}}</div>
                </yd-list-other>

            </yd-list-item>
        </yd-list>
       <span slot="doneTip">没有更多宝贝了~~</span>
        <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
    </yd-infinitescroll>

    <yd-tabbar id="tabbar" fixed>
        <yd-tabbar-item title="首页" link="/hello">
            <yd-icon name="home-outline" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="购物车" link="/myfav">
            <yd-icon name="shopcart-outline" slot="icon" size="0.54rem"></yd-icon>
            <yd-badge slot="badge" type="danger">{{cart_num}}</yd-badge>
        </yd-tabbar-item>
        <yd-tabbar-item title="个人中心" link="/my" active>
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
            return {
                lastId: 0,
                pageSize:10,
                list: [],
                _lastId:0,
                list_icon:true,
                theme:1,
                cart_num:0
            }
        },
        methods:{
            loadList() {// 下拉加载列表
                this.$http.post('mshop/listItem', {
                        lastId: this._lastId + this.lastId,
                        pageSize: this.pageSize
                    }
                ).then(function (response) {
                    const _list = response.body
                    this.lastId += this.pageSize
                    this.list = [...this.list, ..._list];
                    if (_list.length < this.pageSize || this.page == 3) {
                        this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
                        return;
                    }
                    this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
                });
            },
            listTab() {  //改变显示方式
                this.list_icon && (this.theme = 4) || (this.theme = 1) //短路运算符
                this.list_icon = !this.list_icon
            },
            add_like(e) {
                var new_fav = {
                    user_id:sessionStorage.getItem('mshop'),
                    pro_id:e.target.getAttribute('id')
                }
                if(e.target.getAttribute('class')=='icon-like-outline'){
                    e.target.setAttribute('class','icon-like')
                    this.$http.post('mshop/addlike',new_fav).then((res) => {
                        if(res.data.err=='重复'){
                            this.$dialog.toast({mes: '添加过了哦', timeout: 1000});
                        }
                    })
                }else{
                    e.target.setAttribute('class','icon-like-outline')
                    this.$http.post('mshop/delelike',new_fav)
                }
                setTimeout(()=>{
                    this.load_fav_num()
                },2000)
            },
            load_fav_num(){
                var user_id = sessionStorage.getItem('mshop')
                    this.$http.post('mshop/likenum',{user_id:user_id}).then((res) => {
                    this.cart_num = res.data.length;
                })
            },
            load_detail(e){
                let item_id = e.target.getAttribute('item')
                this.$router.push({name:'details', params: { itemId: item_id }})
            }
        },
        created () {
            this.$http.post('mshop/listItem', {
                lastId: 0,
                pageSize: this.pageSize
            }).then(function(res){
                this.list = res.body
                this._lastId = res.body[9].Id
            })
        }
    }
</script>
<style>
    #tabbar{
        z-index:30;
    }
    #list{
        margin-top:1.15rem;
        margin-bottom:1.1rem;
    }
</style>