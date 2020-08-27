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

Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
