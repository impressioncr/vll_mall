import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Hello from '@/components/Hello'
import List from '@/components/List'
import My from '@/components/My'
import MyProfile from '@/components/MyProfile'
import Details from '@/components/Details'
import MyFav from '@/components/MyFav'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/hello',
      name:'hello',
      component:Hello
    },
    {
      path:'/list',
      name:'list',
      component:List
      // component:List
    },
    {
      path:'/my',
      name:'my',
      component:My
    },
    {
      path:'/myprofile',
      name:'myprofile',
      component:MyProfile
    },
    {
      path:'/details/:itemId',
      name:'details',
      component:Details
    },
    {
      path:'/myfav',
      name:'myfav',
      component:MyFav
    }
  ]
})
