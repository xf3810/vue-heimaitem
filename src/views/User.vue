<template>
  <header>
    <div class="header">
      <div class="avatar">
        <img :src="base + data.head_img"  alt />
      </div>
      <div class="info">
        <span class="iconfont" :class="data.gender? 'iconxingbienan':'iconxingbienv'"></span>
        <span>{{data.nickname}}</span>
        <p class="time">{{data.create_date | time}}</p>
      </div>
      <div class="arrow">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <nav-item to='follow'>
        <template>我的关注</template>
        <template #content>关注的用户</template>
    </nav-item>
    <nav-item>
        <template>我的跟帖</template>
        <template #content>跟帖/回复</template>
    </nav-item>
    <nav-item>
        <template>我的收藏</template>
        <template #content>文章/视频</template>
    </nav-item>
    <nav-item to='edit'>
        <template>设置</template>
    </nav-item>
  </header>
</template>

<script>
export default {
  data () {
    return {
      data: {}
    }
  },
  computed: {
    base () {
      return this.axios.defaults.baseURL
    }
  },
  created () {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    this.axios.get('/user/' + userId, {
      headers: {
        Authorization: token
      }
    }).then(res => {
      this.data = res.data.data
    })
  }
}
</script>

<style lang='less'>
.header {
  display: flex;
  height: 120px;
  align-items: center;
  border-bottom: 3px solid #666;
  .avatar {
    width: 70px;
    height: 70px;
    border: 1px solid pink;
    border-radius: 50%;
    overflow: hidden;
    margin-left: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    flex: 1;
    padding: 0 10px;
    font-size: 14px;
    .time {
        color: #ccc;
        margin-top: 10px;
    }
    .iconxingbienv{
         color: pink;
        margin-right: 10px;
    }
    .iconxingbienan {
        color: skyblue;
        margin-right: 10px;
    }
  }
  .arrow {
      margin-right: 20px;
  }
}
</style>
