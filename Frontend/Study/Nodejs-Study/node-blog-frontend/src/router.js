import Vue from 'vue';
import Router from 'vue-router';

import FrontPage from './views/FrontPage.vue';
import FrontUserPage from './views/FrontUserPage.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: FrontPage,
      children: [
        {
          path: '',
          name: 'index',
          component: () => import('./views/Index.vue')
        },
        {
          path: 'post/:id',
          name: 'post_detail',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/PostDetail.vue')
        },
      ]
    },
    {
      path: '/user',
      component: FrontUserPage,
      children: [
        {
          path: 'register',
          name: 'user_register',
          component: () => import('./views/UserRegister.vue')
        },
        {
          path: 'login',
          name: 'user_login',
          component: () => import('./views/UserLogin.vue')
        }
      ]
    },
    // 后台管理
    {
      path: '/admin',
      component: () => import('./views/admin/AdminPage.vue'),
      children: [
        {
          path: 'post/add',
          name: 'admin_post_add',
          component: () => import('./views/admin/post/AddEditPost.vue')
        },
        {
          path: 'post/edit/:id',
          name: 'admin_post_edit',
          component: () => import('./views/admin/post/AddEditPost.vue')
        },
        {
          path: 'post/list',
          name: 'admin_post_list',
          component: () => import('./views/admin/post/ListPost.vue')
        }
      ]
    },
  ]
})
