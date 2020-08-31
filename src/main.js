import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../style/base.css'
import '../fonts/iconfont.css'
import Vant from 'vant'
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

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
