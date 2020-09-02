<template>
  <div class="index">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <div class="search-icon">
          <span class="iconfont iconsearch"></span>
          <span>搜索新闻</span>
        </div>
      </div>
      <div class="user">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <van-tabs v-model="active" sticky animated swipeable>
      <van-tab :title="item.name" v-for="item in category" :key="item.id">
        <hm-post :post="news" v-for="news in newsList" :key="news.id"></hm-post>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      category: [],
      newsList: [],
      pageIndex: 1,
      pageSize: 25
    }
  },
  async created () {
    const res = await this.axios.get('/category')
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.category = data
      console.log(data)
      this.axios
        .get('/post', {
          params: {
            category: data[0].id,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
          }
        })
        .then((res) => {
          console.log(res)
          this.newsList = res.data.data
        })
    }
  }
}
</script>

<style lang='less' scoped>
.header {
  height: 50px;
  align-items: center;
  display: flex;
  padding: 0 20px;
  color: #fff;
  background-color: #f00;
  .search {
    position: relative;
    height: 100%;
    flex: 1;
    text-align: center;
    .search-icon {
      height: 30px;
      width: 80%;
      border-radius: 15px;
      margin-top: 10px;
      margin-left: 10px;
      background-color: #ddd;
      padding-top: 5px;
      font-size: 14px;
    }
  }
  .logo {
    span {
      font-size: 50px;
    }
  }
  .user {
    span {
      font-size: 20px;
    }
  }
}
</style>
