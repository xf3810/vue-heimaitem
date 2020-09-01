import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../style/base.css'
import '../fonts/iconfont.css'
import Vant, { Toast } from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import HmHeader from './components/HmHeader.vue'
import HmLogo from './components/HmLogo.vue'
import axios from 'axios'
import NavItem from './components/NavItem.vue'
import moment from 'moment'

Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('nav-item', NavItem)
Vue.filter('time', input => {
  return moment(input).format('YYYY-MM-DD')
})

Vue.prototype.axios = axios
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$base = 'http://localhost:3000'

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  config.headers.Authorization = token
  return config
})

axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const { statusCode, message } = response.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    router.push('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    Toast.fail('用户验证失败')
  }
  return response
})
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
