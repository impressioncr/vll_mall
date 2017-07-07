<template>
  <div class="hello">
    <yd-navbar title="NavBar" bgcolor="#a69ce4" height="1.2rem">
        <div slot="left" @click="showMenu">
          <yd-icon name="type" size=".6rem" color="#FF685D"></yd-icon>
        </div>
        <img slot="center" src="/static/logo.png"/>
    </yd-navbar>
    <div id="menu" v-if='menu' class="animated zoomInDown">
      <p><router-link to="/hello">主页</router-link></p>
      <p><router-link to="/list">商城</router-link></p>
      <p><router-link to="/my">个人中心</router-link></p>
    </div>
    <yd-slider autoplay="3000">
      <yd-slider-item v-for="item in pics" :key="item.id">
        <a href="javascipt:void(0)">
            <img :src="item.src">
        </a>
      </yd-slider-item>
    </yd-slider>
    <yd-grids-group :rows="2">
        <yd-grids-item link="/list">
          <yd-icon slot="icon" name="shopcart" color="#FF685D"></yd-icon>
          <span slot="text">商城</span>
        </yd-grids-item>
        <yd-grids-item link="/my">
          <yd-icon slot="icon" name="ucenter" color="#FF685D"></yd-icon>
          <span slot="text">个人中心</span>
        </yd-grids-item>
        <yd-grids-item>
          <yd-icon slot="icon" name="warn-outline"></yd-icon>
          <span slot="text">敬请期待</span>
        </yd-grids-item>
        <yd-grids-item>
          <yd-icon slot="icon" name="warn-outline"></yd-icon>
          <span slot="text">敬请期待</span>
        </yd-grids-item>
    </yd-grids-group>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      menu:false,
      pics:[]
    }
  },
  methods:{
    showMenu(){
      this.menu = !this.menu
    }
  },
  created () {
    this.$http.get('/mshop/slide').then(function(res){
      this.pics = res.data
    })
  }
}
</script>


<style scoped>
  #menu{
    position: absolute;
    top:1.2rem;
    background:#73B3ED;
    width: 30%;
    height: 20%;
    z-index:3;
    padding-top: 20px;
  }
  #menu>p{
    height:38px;
    font-size:16px;
    color:#fff;
  }
</style>
