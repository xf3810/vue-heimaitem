<template>
  <div class="index">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search" @click='$router.push(`/search`)'>
        <div class="search-icon">
          <span class="iconfont iconsearch"></span>
          <span>搜索新闻</span>
        </div>
      </div>
      <div class="user" @click="$router.push('/user')">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
        <div class="more-stick">
          <van-sticky>
            <div class="more" @click="$router.push('/manage')">
              <span class="iconfont iconlianjie"></span>
            </div>
          </van-sticky>
        </div>
        <van-tabs v-model="active" sticky animated swipeable>
          <van-tab :title="item.name" v-for="item in category" :key="item.id">
            <hm-post :post="news" v-for="news in newsList" :key="news.id" @click='postDetail(news.id)'></hm-post>
          </van-tab>
        </van-tabs>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      active: 0,
      category: [],
      newsList: [],
      pageIndex: 1,
      pageSize: 5,
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  created () {
    const delList = JSON.parse(localStorage.getItem('delList'))
    if (delList) {
      this.category = delList
      this.getNews(this.category[this.active].id)
      return
    }
    this.getcategory()
  },
  methods: {
    async getcategory () {
      const res = await this.axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.category = data
        this.getNews(this.category[this.active].id)
      }
    },
    async getNews (id) {
      const res = await this.axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data

      if (statusCode === 200) {
        this.newsList = [...this.newsList, ...data]
        this.loading = false
        this.refreshing = false
        this.finished = false
      }
      if (data.length < this.pageSize) {
        this.finished = true
      }
    },
    onLoad () {
      setTimeout(() => {
        this.pageIndex++
        this.getNews(this.category[this.active].id)
      }, 1000)
    },
    postDetail (id) {
      this.$router.push('/detail/' + id)
    },
    async onRefresh () {
      this.pageIndex = 1
      this.newsList = []
      this.loading = true
      await this.getNews(this.category[this.active].id)
    }

  },
  watch: {
    active (val) {
      this.pageIndex = 1
      this.newsList = []
      this.loading = true
      this.getNews(this.category[val].id)
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
/deep/.van-tabs__nav {
  background-color: #eee;
  width: 86%;
}
.more {
  background-color: #eee;
  position: absolute;
  top: 0;
  right: 0;
  width: 14%;
  height: 44px;
  line-height: 44px;
  text-align: center;
  z-index: 1000;
  span {
    color: red;
  }
}
/deep/ .more-stick .van-sticky--fixed {
  z-index: 999;
}
</style>
