<template>
  <div class="hm-comment">
    <div class="reader">
      <div class="letf">
        <img :src="$url(comment.user.head_img)" alt />
      </div>
      <div class="center">
        <p>{{comment.user.nickname}}</p>
        <span class="time">{{comment.create_date | now}}</span>
      </div>
      <div class="right" @click='reply'>回复</div>
    </div>
    <hm-floor :count='getLength(0, comment)' :parent='comment.parent' v-if='comment.parent'></hm-floor>
    <div class="content">{{comment.content}}</div>
  </div>
</template>

<script>
export default {

  props: {
    comment: Object
  },
  methods: {
    reply () {
      this.$bus.$emit('reply', this.comment.id, this.comment.user.nickname)
    },
    getLength (num, obj) {
      if (obj.parent) {
        return this.getLength(num + 1, obj.parent)
      } else {
        return num
      }
    }
  }
}
</script>

<style lang='less' scoped>
.hm-comment {
  padding: 0 20px;
  &:last-child {
    margin-bottom: 70px;
  }
  border-bottom: 1px solid #ccc;
  .reader {
    padding: 10px 0;
    display: flex;
    .center {
      flex: 1;
      margin-left: 20px;
      font-size: 16px;
      p {
        margin-bottom: 8px;
      }
      .time {
        font-size: 14px;
        color: #666;
      }
    }
    .letf {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      font-size: 14px;
      color: #666;
    }
  }
  .content {
    padding: 10px 20px;
  }

}
</style>
