<template>
  <div class="hm-post">
    <div class="single" v-if="post.cover.length < 3">
      <div class="item">
        <div class="title">
          <p>{{post.title}}</p>
          <div class="author">
            <span class="name">{{post.user.nickname}}</span>
            <span>{{post.comment_length}}跟帖</span>
          </div>
        </div>

        <div class="img">
          <img :src="post.cover.length<=0?null:$url(post.cover[0].url)" />
        </div>
      </div>
    </div>
    <div class="three" v-else>
      <div class="item1">
        <div class="title">
          <p>{{post.title}}</p>
        </div>
        <div class="imgs">
          <img :src="post.cover.length<=0?null:$url(post.cover[0].url)" />
          <img :src="post.cover.length<=0?null:$url(post.cover[1].url)" />
          <img :src="post.cover.length<=0?null:$url(post.cover[2].url)" />
        </div>
        <div class="author">
          <span class="name">{{post.user.nickname}}</span>
          <span>{{post.comment_length}}跟帖</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['post']
}
</script>

<style lang='less' scoped>
.author {
  span {
    font-size: 12px;
    color: #ccc;
    &:first-child {
      margin-right: 10px;
    }
  }
}
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
  }
  .img {
    width: 120px;
    height: 74px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.item1 {
  height: 150px;
  padding: 10px;
  border-bottom: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  .imgs {
    img {
      width: 112px;
      height: 74px;
      margin: 2px;
    }
  }
}
</style>
