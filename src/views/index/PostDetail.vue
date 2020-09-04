<template>
  <div class="detail">
    <div class="header">
      <div class="de-left" @click="$router.back()">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="de-logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="de-follow">
        <div>关注</div>
      </div>
    </div>
    <div class="content">
      <div class="title">
        <h3>{{detail.title}}</h3>
      </div>
      <div class="author">
        <span>{{detail.user.nickname}}</span>
        <span>{{detail.create_date | time}}</span>
      </div>
      <div class="video" v-if="detail.type===2">
        <video :src="getUrl(detail.content)" controls autoplay muted></video>
      </div>
      <div class="main" v-html="detail.content" v-else></div>
    </div>
    <div class="btns">
      <div class="good">
        <span class="iconfont icondianzan"></span>
        <span>112</span>
      </div>
      <div class="share">
        <span class="iconfont iconweixin"></span>
        <span>微信</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      detail: {
        user: {}
      }
    }
  },
  created () {
    const id = this.$route.params.id
    console.log(this.$route.params)
    this.getArticle(id)
  },
  methods: {
    async getArticle (id) {
      const res = await this.axios.get(`/post/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.detail = data
        console.log(data)
      }
    },
    getUrl (url) {
      const div = document.createElement('div')
      div.innerHTML = url
      return div.innerText
    }
  }
}
</script>

<style lang='less' scoped>
.header {
  overflow: hidden;
  height: 60px;
  line-height: 60px;
  text-align: center;
  padding: 0 15px;
  border-bottom: 1px solid #ccc;
  .de-left {
    float: left;
    line-height: 58px;
  }
  .de-logo {
    float: left;
    margin-left: 10px;
    span {
      font-size: 60px;
    }
  }
  .de-follow {
    float: right;
    div {
      width: 75px;
      height: 30px;
      line-height: 30px;
      font-size: 18px;
      border-radius: 15px;
      margin-top: 15px;
      border: 1px solid #ccc;
    }
  }
}
.content {
  padding: 20px;
  .author {
    span {
      color: #868686;
      font-size: 16px;
    }
  }
  .main {
    font-size: 18px;
    /deep/ img {
      width: 100% !important;
    }
  }
  .video {
    video {
      width: 100%;
    }
  }
}
.btns {
    margin-top: 20px;
  display: flex;
  justify-content: space-around;
  .good,
  .share {
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 15px;
    border: 1px solid #ccc;
    .iconweixin {
        color: lime;
    }
    span {
      font-size: 18px;
      &:first-child {
          margin-right: 5px;
      }
    }
  }
}
</style>
