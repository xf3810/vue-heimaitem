<template>
  <div class="my-comment">
    <hm-header>我的跟帖</hm-header>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
        <div class="list">
          <div class="item" v-for="item in list" :key="item.id">
            <div class="time">{{item.create_date | time('YYYY-MM-DD hh:mm')}}</div>
            <div class="comment" v-if="item.parent">
              <div class="name">回复：{{item.parent.user.nickname}}</div>
              <div class="comment-content">{{item.parent.content}}</div>
            </div>
            <div class="content">{{item.content}}</div>
            <div class="origin">
              <span class="origin-txt">{{item.post.title}}</span>
              <span class="iconfont iconjiantou1"></span>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      pageIndex: 1,
      pageSize: 6
    }
  },
  methods: {
    onLoad () {
      this.pageIndex++
      this.getList()
    },
    onRefresh () {
      setTimeout(() => {
        this.list = []
        this.loading = true
        this.pageIndex = 1
        this.getList()
        this.finished = false
      }, 1000)
    },
    async getList () {
      const res = await this.axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = [...this.list, ...data]
      }
      this.loading = false
      if (data.length < this.pageSize) {
        this.finished = true
      }
      this.refreshing = false
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang='less' scoped>
.item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .comment {
    height: 70px;
    background-color: #ccc;
    margin-top: 20px;
    padding-top: 10px;
    padding-left: 10px;
    .comment-content {
      margin-top: 20px;
    }
  }
  .time {
    color: #ccc;
  }
  .content {
    font-size: 16px;
    margin-top: 10px;
  }
  .origin {
    color: #ccc;
    font-size: 14px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    .origin-txt {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

}
/deep/.van-pull-refresh__head {
    transform: translateY(-60%);
}
</style>
