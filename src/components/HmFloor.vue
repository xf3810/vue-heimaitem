<template>
  <div class="hm-floor">
    <comment :count='count-1' :parent="parent.parent" v-if="parent.parent"></comment>
    <div class="parent">
      <div class="more">
        <div class="more-l">
          <span>{{count}}.</span>
          <span>{{parent.user.nickname}}</span>
          <span class="time">{{parent.create_date | now}}</span>
        </div>
        <div class="more-r" @click='reply'>回复</div>
      </div>
      <div class="more-content">{{parent.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comment',
  props: {
    parent: Object,
    count: Number
  },
  methods: {
    reply () {
      this.$bus.$emit('reply', this.parent.id, this.parent.user.nickname)
    }
  }
}
</script>

<style lang='less' scoped>
.hm-floor {
  .parent {
    height: 88px;
    width: 100%;
    padding: 10px;
    border: 1px solid red;
    margin-top: -1px;
    .more-content {
        margin-top: 20px;
    }
  }
  .more {
    display: flex;
    .more-l {
      flex: 1;
      .time {
        font-size: 14px;
        color: #666;
        margin-left: 10px;
      }
      span {
        font-size: 15px;
      }
    }
    .more-r {
      font-size: 14px;
    }
  }
}
</style>
