<template>
  <div class="hm-header">
      <div class="back" @click='back'>
          <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="title"> <slot></slot> </div>
      <div class="block"></div>
  </div>
</template>

<script>
export default {
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang='less'>
.hm-header{
    height: 50px;
    line-height: 50px;
    text-align: center;
    display: flex;
    font-size: 18px;
    border-bottom: 1px solid #ccc;
    .back,
    .block {
        margin: 0 10px;
    }

    .title {
        flex:1;
        font-weight: 700;

    }
}
</style>
