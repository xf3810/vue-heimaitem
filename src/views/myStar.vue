<template>

  <div class="my-star">
    <hm-header>我的收藏</hm-header>
    <hm-post v-for='item in starList' :key='item.id' :post='item' @click='$router.push(`/detail/${item.id}`)'></hm-post>
  </div>
</template>

<script>
export default {
  data () {
    return {
      starList: []
    }
  },
  methods: {
    async getStar () {
      const res = await this.axios.get('user_star')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.starList = data
      }
    }
  },
  created () {
    this.getStar()
  }
}
</script>

<style lang='less' scoped>
</style>
