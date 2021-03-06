// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
// import VCharts from 'v-charts'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'
// import '../src/styles/common.less'/
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(ElementUI)
// Vue.use(VCharts)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
