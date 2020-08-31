<template>
  <div class="nav-item" @click='clickfn'>
      <div class="title"><slot></slot></div>
      <div class="content"><slot name='centent'></slot></div>
      <div class="iconfont iconjiantou1"></div>
  </div>
</template>

<script>
export default {
  methods: {
    clickfn () {
      console.log(this.to)
      this.$router.push('./' + this.to)
    }
  },
  props: {
    to: String
  }

}
</script>

<style lang='less'>
.nav-item {
    display: flex;
    height: 50px;
    align-items: center;
    margin-left: 20px;
    border-bottom: 1px solid #ccc;
    .content {
        flex: 1;
        text-align: right;
        color: #666;
    }
    .iconjiantou1 {
        margin-right: 20px;
    }
}
</style>
