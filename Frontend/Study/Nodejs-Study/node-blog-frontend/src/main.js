import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import qs from 'qs';

import './assets/css/bootstrap.min.css';
import './assets/css/common.less';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import axios from 'axios';
axios.defaults.baseURL = '';
// axios.defaults.headers = {
// 	"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
// };
// axios.defaults.paramsSerializer = (params) => {
// 	return qs.stringify(params, {arrayFormat: 'brackets'});
// }
// axios.defaults.transformRequest = [ (params) => {
// 	return qs.stringify(params, {arrayFormat: 'brackets'});
// }];
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
