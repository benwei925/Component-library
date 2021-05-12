import Vue from 'vue'
import Vuex from 'vuex'
import crumb from './crumb'
import userInfo from './userInfo'
import getters from './getters'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    crumb,
    userInfo
  },
  getters
})
