import Vue from 'vue'
import Router from 'vue-router'
import Index from './router-view/index.vue';
import EmptyPage from './router-view/EmptyPage.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/about',
      name: 'about',
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
    },
    {
      path: '/array_order',
      name: 'array_order',
      component: () => import('./router-view/ArrayOrder.vue')
    },
    {
      path: '/scroll_load',
      name: 'scroll_load',
      component: () => import('./router-view/ScrollLoad.vue')
    },
    {
      path: '/multi_check',
      component: EmptyPage,
      children: [
        {
          path: '',
          name: 'multi_check',
          component: () => import('./router-view/MultiCheck.vue')
        }
      ]
    },
    {
      path: '/slot_test',
      name: 'slot_test',
      component: () => import('./router-view/SlotTest.vue')
    },
    {
      path: '/keep_alive',
      component: EmptyPage,
      meta: {
        keepAlive: false
      },
      children: [
        {
          path: '',
          name: 'keep_alive',
          component: () => import('./router-view/KeepAlive.vue')
        }
      ]
    },
    {
      path: '/vue_video_player',
      name: 'vue_video_player',
      component: () => import('./router-view/VueVideoPlayer.vue')
    }
  ]
})
