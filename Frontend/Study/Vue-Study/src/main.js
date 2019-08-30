import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/common.css';

import axios from 'axios';
Vue.prototype.$axios = axios;

import VCharts from 'v-charts';
Vue.use(VCharts);

// 测试局部引入
import {testMethod1,testVar,testVar1} from './assets/js/export1.js';
Vue.prototype.$testMethod1 = testMethod1;
Vue.prototype.$testVar = testVar;
Vue.prototype.$testVar1 = testVar1;

// 测试全部引入
import testMethods, {testMethod4,testVar2} from './assets/js/export2.js';
Vue.prototype.$testMethods = testMethods;
Vue.prototype.$testMethod4 = testMethod4;
Vue.prototype.$testVar2 = testVar2;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
