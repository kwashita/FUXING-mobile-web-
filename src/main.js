// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'animate.css'
// import $ from 'jquery'
import toTop from './components/toTop'
import bottomGray from './components/bottomGray'
import searchCity from './components/searchCity'
import echarts from 'echarts'
import store from './store/index'
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(VueAwesomeSwiper)
Vue.prototype.$echarts = echarts
// 全局组件
Vue.component('to-top', toTop)
Vue.component('search-city', searchCity)
Vue.component('bottom-gray', bottomGray)
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
