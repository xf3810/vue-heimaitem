import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'

Vue.use(VueRouter)

const routes = [{ path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' }]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to)
  console.log(from)
  const token = localStorage.getItem('token')
  if (to.name === 'user') {
    if (token) {
      next()
    } else {
      this.$router.push('/login')
    }
  } else {
    next()
  }
})
export default router
