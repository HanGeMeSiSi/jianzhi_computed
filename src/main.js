// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import qs from 'qs'
import jquery from 'jquery'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Blob from '@/vendor/Blob';
import Export2Excel from '@/vendor/Export2Excel';

Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.prototype.$jq = jquery;
Vue.config.productionTip = false
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
