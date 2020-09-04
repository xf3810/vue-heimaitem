import Vue from 'vue'
import axios from 'axios'
import { Toast } from 'vant'
import router from '../router/index'
Vue.prototype.axios = axios
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$base = 'http://localhost:3000'
Vue.prototype.$url = function (url) {
  if (url.includes('http')) {
    return url
  } else {
    return 'http://localhost:3000' + url
  }
}

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
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
