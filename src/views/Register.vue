<template>
  <div>
    <hm-header>注册</hm-header>
    <hm-logo></hm-logo>
    <van-form @submit="register">
      <van-field
        v-model="user.username"
        label="账号"
        placeholder="请输入账号"
        :rules="rules.username"
      />
      <van-field
        v-model="user.nickname"
        label="昵称"
        placeholder="请输入昵称"
        :rules="rules.nickname"
      />
      <van-field
        v-model="user.password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
    <p class="tips">
      已有账号？去
      <router-link to="./login">登录</router-link>
    </p>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      user: {
        username: '',
        nickname: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请填写用户名' }, { pattern: /^\d{5,11}$/, message: '用户名必须是5-11位数字', trigger: 'onChange' }],
        nickname: [{ required: true, message: '请填写昵称' }, { pattern: /^[\u4e00-\u9fa5]{3,8}$/, message: '密码必须是3-8位中文', trigger: 'onChange' }],
        password: [{ required: true, message: '请填写密码' }, { pattern: /^\d{3,8}$/, message: '密码必须是3-8位数字', trigger: 'onChange' }]
      }
    }
  },
  methods: {
    register () {
      this.axios.post('/register', this.user).then((res) => {
        const { statusCode, message } = res.data
        if (statusCode === 200) {
          this.$toast.success(message)
          // this.$router.push(`./login?username=${this.user.username}&password=${this.user.password}`)   方法1是在地址后面传递参数 在login组件里面用this.$route.query 接收

          // this.$router.push({
          //   path: './login',
          //   query: this.user
          // })   方法2 通过对象 传递参数 对象里面是path+地址 和query+参数 通过this.route.query接收
          this.$router.push({
            name: 'login',
            params: this.user
          }) // 方法3 通过对象传递参数 对象里面是路由的name+name值(name值在配置路由的时候和path component一起配置) 和params+参数 通过this.$route.params接收参数
        }
        if (statusCode === 401) {
          this.$toast.fail(message)
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.tips {
  font-size: 16px;
  text-align: right;
  margin: 16px;
  a {
    color: orange;
  }
}
</style>
