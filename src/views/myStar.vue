<template>
  <div class="my-star">
    <hm-header>我的收藏</hm-header>
    <div class="item" v-for='item in starList' :key='item.id'>
      <div class="title">
        <p>{{item.title}}</p>
        <div class="author">
            <span class="name">{{item.user.nickname}}</span>
            <span>{{item.comments.length}}跟帖</span>
        </div>
      </div>
      <div class="img">
        <img :src="$url(item.cover[0].url)" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      starList: []
    }
  },
  methods: {
    async getStar () {
      const res = await this.axios.get('user_star')
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.starList = data
      }
    }
  },
  created () {
    this.getStar()
  }
}
</script>

<style lang='less' scoped>
.item {
  display: flex;
  height: 120px;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #ccc;
  .title {
    flex: 1;
    height: 100%;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .author {
        span {
            font-size: 12px;
            color: #ccc;
            &:first-child {
                margin-right: 10px;
            }
        }
    }
  }
  .img {
      width: 120px;
      height: 74px;
      img{
          width: 100%;
          height: 100%;
            object-fit: cover;
      }
  }
}
</style>
