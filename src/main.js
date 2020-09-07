import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import '../style/base.css'
import '../fonts/iconfont.css'
import 'vant/lib/index.css'
import 'amfe-flexible'
import './utils/filters'
import './utils/global'
import './utils/request'
import './utils/vant'

Vue.config.productionTip = false
const bus = new Vue()
Vue.prototype.$bus = bus
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
