<template>
  <div class="search">
    <div class="header">
      <div class="left" @click="back">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <span class="iconfont iconsearch"></span>
        <input type="search" placeholder="请输入关键词" v-model="key" @input="recommend" />
      </div>
      <div class="right" @click="search">搜索</div>
    </div>
    <div v-if="!recommendList.length">
      <div class="main" v-if="!article.length">
        <div class="history">
          <h3>历史记录</h3>
          <div
            class="item one-txt"
            v-for="item in history"
            :key="item"
            @click="Gosearch(item)"
          >{{item}}</div>
        </div>
        <div class="hot clearfix">
          <h3>热门搜索</h3>
          <div class="item" v-for="item in hot" :key="item" @click="Gosearch(item)">{{item}}</div>
        </div>
      </div>
      <div class="result" v-else>
        <hm-post
          v-for="item in article"
          :key="item.id"
          :post="item"
          @click="$router.push(`/detail/${item.id}`)"
        ></hm-post>
      </div>
    </div>
    <div class="recommend" v-else>
      <div
        class="recommentItem clearfix"
        v-for="item in recommendList"
        :key="item.id"
        @click="Gosearch(item.title)"
      >
        <div class="one-txt">{{item.title}}</div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      key: '',
      history: [],
      article: [],
      hot: ['关晓彤', '华为', '情火', '爱你'],
      recommendList: []
    }
  },
  created () {
    this.history = JSON.parse(localStorage.getItem('history')) || []
  },
  methods: {
    recommend: _.debounce(async function () {
      if (!this.key) {
        return
      }
      const res = await this.axios.get('/post_search_recommend', {
        params: {
          keyword: this.key
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        console.log(data)
        this.recommendList = data
      }
    }, 800),
    back () {
      if (this.key) {
        this.recommendList = []
        this.article = []
        this.key = ''
        return
      } else if (this.article.length === 0) {
        return this.$router.back()
      }
      this.article = []
    },
    async Gosearch (item1) {
      const res = await this.axios.get('/post_search', {
        params: {
          keyword: item1
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.article = data
        this.recommendList = []
        this.history = this.history.filter((item) => item !== item1)
        this.history.unshift(item1)
        localStorage.setItem('history', JSON.stringify(this.history))
      }
    },
    async search () {
      if (!this.key) {
        return this.$toast('请输入关键词')
      }
      const res = await this.axios.get('/post_search', {
        params: {
          keyword: this.key
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.article = data
        this.history = this.history.filter((item) => item !== this.key)
        this.history.unshift(this.key)
        localStorage.setItem('history', JSON.stringify(this.history))
      }
    }
  }
}
</script>

<style lang='less' scoped>
.search {
  .header {
    width: 100%;
    height: 50px;
    padding: 0 20px;
    align-items: center;
    display: flex;
    .center {
      position: relative;
      flex: 1;
      margin-left: 10px;
      .iconsearch {
        position: absolute;
        top: 5px;
        left: 32px;
        font-size: 20px;
      }
      input {
        width: 260px;
        height: 30px;
        padding-left: 52px;
        border-radius: 19px;
        border: 1px solid #ccc;
        font-size: 16px;
      }
    }
    .right {
      font-size: 14px;
    }
  }
  .history {
    border-bottom: 1px solid #ccc;
    overflow: hidden;
    padding: 20px;
    h3 {
      font-size: 18px;
    }
    .item {
      float: left;
      width: 58px;
      height: 25px;
      font-size: 15px;
      margin: 8px;
    }
  }
  .hot {
    padding: 20px;
    h3 {
      font-size: 18px;
    }
    .item {
      float: left;
      font-size: 15px;
      margin: 10px;
    }
  }
  .recommend {
    .recommentItem {
      width: 100%;
      padding: 20px;
      border-bottom: 1px solid #ccc;
      font-size: 16px;
      span {
        float: right;
      }
      div {
        float: left;
        width: 90%;
      }
    }
  }
}
</style>
