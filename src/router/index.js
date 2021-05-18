import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: () => import('@/views/home/index.vue'),
    },
    {
      path: '/homePage',
      name: 'homePage',
      component: () => import('@/views/home/index.vue'),
    },
    { //数据分析
      path: '/dataAnalysis',
      name: 'dataAnalysis',
      component: () => import('@/views/dataAnalysis/index.vue'),
    },
    { //意见反馈
      name: 'demoPage',
      path: '/demoPage',
      component: () => import('@/views/demoPage')
    },
    { //留言板
      name: 'leavingMessage',
      path: '/leavingMessage',
      component: () => import('@/views/leavingMessage')
    },
  ]
})
