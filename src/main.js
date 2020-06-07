import Vue from 'vue'
import App from './App.vue'
import { router } from './router/index.js'
import store from './store/index'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueSwal from 'vue-swal'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(VueSwal)

Vue.config.productionTip = false
Vue.prototype.$http = axios;

axios.defaults.baseURL = 'http://15.165.1.160:4000/api';
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Authorization, Content-Type'

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
