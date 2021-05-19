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
    { //组件库
      name: 'demoPage',
      path: '/demoPage',
      component: () => import('@/views/demoPage')
    },
    { //todolist
      name: 'todolist',
      path: '/todolist',
      component: () => import('@/views/todolist')
    },
  ]
})
