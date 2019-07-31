import Vue from 'vue'
import Router from 'vue-router'
import Index from './router-view/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './router-view/about.vue')
    },
    {
      path: '/echarts',
      name: 'echarts',
      component: () => import('./router-view/echarts.vue')
    },
    {
      path: '/blob_test',
      name: 'blob_test',
      component: () => import('./router-view/blob-test.vue')
    }
  ]
})