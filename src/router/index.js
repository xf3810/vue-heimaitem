import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import Edit from '../views/Edit.vue'
import Follow from '../views/Follow.vue'
import Comment from '../views/myComment.vue'
import Star from '../views/myStar.vue'
import Index from '../views/index/Index.vue'
import Manage from '../views/index/Manage.vue'
import PostDetail from '../views/index/PostDetail.vue'

Vue.use(VueRouter)

const routes = [{ path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' },
  { path: '/user-edit', component: Edit, name: 'user-edit' },
  { path: '/follow', component: Follow, name: 'follow' },
  { path: '/comment', component: Comment, name: 'comment' },
  { path: '/star', component: Star, name: 'star' },
  { path: '/', component: Index, name: 'index' },
  { path: '/detail/:id', component: PostDetail, name: 'detail' },
  { path: '/manage', component: Manage, name: 'manage' }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  // if (to.name === 'user') {
  //   if (token) {
  //     next()
  //   } else {
  //     this.$router.push('/login')
  //   }
  // } else {
  //   next()
  // }
  const paths = ['user', 'user-edit', 'follow', 'comment', 'star']
  if (!paths.includes(to.name) || token) {
    next()
  } else {
    router.push('/login')
  }
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
