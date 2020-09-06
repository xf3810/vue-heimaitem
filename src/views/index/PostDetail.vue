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
        <div v-if="!detail.has_follow" class="follow" @click="follow">关注</div>
        <div v-else class="followed" @click="unfollow">已关注</div>
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
      <div class="good" @click="like" :class="{liked: detail.has_like}">
        <span class="iconfont icondianzan"></span>
        <span>{{detail.like_length || 0}}</span>
      </div>
      <div class="share">
        <span class="iconfont iconweixin"></span>
        <span>微信</span>
      </div>
    </div>
    <!-- 评论 -->
    <div class="comment-list">
      <h3>精彩评论</h3>
      <hm-comment v-for='comment in commentList' :key='comment.id' :comment='comment'></hm-comment>
    </div>
    <!-- 底部 -->
    <div class="footer">
      <div class="foot">
        <div class="write">
          <input type="text" placeholder="写跟帖" />
        </div>
        <span class="iconfont iconpinglun-">
          <i>1000</i>
        </span>
        <span class="iconfont iconshoucang"></span>
        <span class="iconfont iconfenxiang"></span>
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
      },
      commentList: []
    }
  },
  created () {
    const id = this.$route.params.id
    this.getArticle(id)

    this.getComment()
  },
  methods: {
    async getComment () {
      const res = await this.axios.get(`/post_comment/${this.$route.params.id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
      }
    },
    async getArticle (id) {
      const res = await this.axios.get(`/post/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.detail = data
      }
    },
    getUrl (url) {
      const div = document.createElement('div')
      div.innerHTML = url
      return div.innerText
    },
    async follow () {
      const token = localStorage.getItem('token')
      if (token) {
        const res = await this.axios.get(
          `/user_follows/${this.detail.user.id}`
        )
        const { statusCode, message } = res.data
        if (statusCode === 200) {
          this.$toast.success(message)
          const id = this.$route.params.id
          this.getArticle(id)
        }
      } else {
        this.$toast('请先登录')
        this.$router.push({
          path: '/login',
          query: {
            back: true
          }
        })
      }
    },
    async unfollow () {
      const token = localStorage.getItem('token')
      if (token) {
        const res = await this.axios.get(
          `/user_unfollow/${this.detail.user.id}`
        )
        const { statusCode, message } = res.data
        if (statusCode === 200) {
          this.$toast.success(message)
          const id = this.$route.params.id
          this.getArticle(id)
        }
      } else {
        this.$toast('请先登录')
        this.$router.push({
          path: '/login',
          query: {
            back: true
          }
        })
      }
    },
    async like () {
      const token = localStorage.getItem('token')
      if (token) {
        const res = await this.axios.get(`/post_like/${this.detail.id}`)
        const { statusCode, message } = res.data
        if (statusCode === 200) {
          this.$toast.success(message)
          const id = this.$route.params.id
          this.getArticle(id)
        }
      } else {
        this.$toast('请先登录')
        this.$router.push({
          path: '/login',
          query: {
            back: true
          }
        })
      }
    }
  }
}
</script>

<style lang='less' scoped>
.detail {
  padding-bottom: 60px;
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
      div.follow {
        width: 75px;
        height: 30px;
        line-height: 30px;
        font-size: 18px;
        border-radius: 15px;
        margin-top: 15px;
        color: #fff;
        background-color: #f00;
      }
      .followed {
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
      margin: 10px 0;
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
    display: flex;
    justify-content: space-around;
    border-bottom: 3px solid #ccc;
    padding: 30px 0 ;
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
  .liked {
    border: 1px solid red;
    color: red;
  }
  .footer {
    padding: 0 10px;
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    input {
      height: 36px;
      border-radius: 18px;
      background-color: #999;
      padding-left: 20px;
      &::placeholder {
        font-size: 14px;
        color: #fff;
      }
    }
    .foot {
      height: 60px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .iconpinglun- {
        position: relative;
        i {
          width: 25px;
          height: 14px;
          line-height: 14px;
          text-align: center;
          border-radius: 7px;
          position: absolute;
          top: 0;
          right: -10px;
          font-size: 10px;
          background-color: #f00;

        }
      }
      .iconfont {
        font-size: 23px;
      }
    }
  }
  .comment-list {
    h3 {
      padding: 20px 0;
      text-align: center;
    }
  }
}
</style>
