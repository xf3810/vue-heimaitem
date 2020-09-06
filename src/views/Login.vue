<template>
  <div>
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>
    <van-form @submit="login">
      <van-field
        v-model="username"
        label="账号"
        placeholder="请输入账号"
        :rules="rules.username"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <p class="tips">没有账号？去 <router-link to='./register'>注册</router-link> </p>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  created () {
    console.log(this.$route)
    const { username, password } = this.$route.params
    this.password = password
    this.username = username
  },
  data () {
    return {
      username: '',
      password: '',
      rules: {
        username: [{ required: true, message: '请填写用户名' }, { pattern: /^\d{5,11}$/, message: '用户名必须是5-11位数字', trigger: 'onChange' }],
        password: [{ required: true, message: '请填写密码' }, { pattern: /^\d{3,8}$/, message: '密码必须是3-8位数字', trigger: 'onChange' }]
      }
    }
  },
  methods: {
    // async login () {
    //   const res = await axios.post('http://localhost:3000/login', {
    //     username: this.username,
    //     password: this.password
    //   })
    //   console.log(res)
    // }
    login () {
      this.axios
        .post('/login', {
          username: this.username,
          password: this.password
        })
        .then((res) => {
          const { statusCode, message, data } = res.data
          if (statusCode === 401) {
            this.$toast.fail('登录失败')
          }
          if (statusCode === 200) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('userId', data.user.id)
            this.$toast.success(message)
            if (this.$route.query.back) {
              this.$router.back()
              return
            }
            this.$router.push('./')
          }
        })
    }
  }
}
</script>

<style lang='less' scoped>  // scoped 会给当前组件里面的元素加上 data-v-xxx的属性 设置样式的时候也只会在当前的组件生效

.tips{
  font-size: 16px;
  text-align: right;
  margin: 16px;
  a{
    color: orange;
  }
}
</style>
