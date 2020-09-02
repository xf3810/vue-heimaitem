<template>
<div class="follow">
    <hm-header>我的关注</hm-header>
    <div class="items" v-for='item in news' :key ='item.id'>
        <div class="item-left">
            <img :src="$base + item.head_img" alt="">
        </div>
        <div class="item-center">
            <p>{{item.nickname}}</p>
            <span>{{item.create_date | time}}</span>
        </div>
        <div class="item-right">
            <van-button type="primary" size="small" round @click='cancelFollow(item.id)'>取消关注</van-button>
        </div>
    </div>
</div>
</template>

<script>
export default {
  created () {
    this.getNews()
  },
  data () {
    return {
      news: []
    }
  },
  methods: {
    cancelFollow (id) {
      this.$dialog.confirm({
        title: '温馨提示',
        message: '你确定要取消关注该用户吗'
      })
        .then(async () => {
          // on confirm
          const res = await this.axios.get('/user_unfollow/' + id)
          console.log(res)
          if (res.data.statusCode === 200) {
            this.getNews()
          }
        })
        .catch(() => {
          // on cancel
        })
    },
    async getNews () {
      const res = await this.axios.get('/user_follows')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.news = data
      }
    }
  }

}
</script>

<style lang='less'>
.items {
    display: flex;
     align-items: center;
     height: 60px;
     padding: 0 20px;
     border-bottom: 1px solid #ccc;
    .item-left {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;

        }

    }
    .item-center {
        flex: 1;
        margin-left: 15px;
    }
}
</style>
