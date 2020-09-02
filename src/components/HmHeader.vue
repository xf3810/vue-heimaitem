<template>
<div>
  <div class="top"></div>
  <div class="hm-header">
      <div class="back" @click='back'>
          <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="title"> <slot></slot> </div>
      <div class="block"></div>
  </div>
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

<style lang='less' scoped>
.top {
  height: 50px;
  width: 100%;
}
.hm-header{
  background-color: #fff;
    position: fixed;
    z-index: 999;
    top: 0;
    height: 50px;
    width: 100%;
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
