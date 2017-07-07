// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.px.css'
import 'animate.css/animate.css'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(YDUI)


router.beforeEach(({path},from,next) =>{
    let login = sessionStorage.getItem('mshop') || ''
    if(!login && path !=='/login'){
        return next({
            path:'/login'
        })
    }
    next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
})
