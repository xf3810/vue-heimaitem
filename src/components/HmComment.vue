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
      <div class="right">回复</div>
    </div>
    <hm-floor :parent='comment.parent' v-if='comment.parent'></hm-floor>
    <div class="content">{{comment.content}}</div>
  </div>
</template>

<script>
export default {

  props: {
    comment: Object
  }
}
</script>

<style lang='less' scoped>
.hm-comment {
  padding: 0 20px;
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
      font-size: 16px;
      color: #666;
    }
  }
  .content {
    padding: 10px 20px;
  }

}
</style>
