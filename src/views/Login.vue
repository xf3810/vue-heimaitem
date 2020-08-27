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
import axios from 'axios'
export default {
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
      axios
        .post('http://localhost:3000/login', {
          username: this.username,
          password: this.password
        })
        .then((res) => {
          const { statusCode, message } = res.data

          if (statusCode === 401) {
            this.$toast.fail('登录失败')
          }
          if (statusCode === 200) {
            this.$toast.success(message)
            this.$router.push('./user')
          }
        })
    }
  }
}
</script>

<style lang='less'>
.tips{
  font-size: 16px;
  text-align: right;
  margin: 16px;
  a{
    color: orange;
  }
}
</style>
