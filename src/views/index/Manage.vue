<template>
  <div class="manage">
      <hm-header>栏目管理</hm-header>
      <div class="del">
          <p>点击删除以下频道 至少保留4项</p>
          <div class="item" v-for='item in delList' :key='item.id' @click='del(item.id)'>{{item.name}}</div>
      </div>
      <div class="add">
          <p>点击添加以下频道</p>
          <div class="item" v-for='i in addList' :key='i.id' @click='add(i.id)'>{{i.name}}</div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      delList: [],
      addList: []
    }
  },
  async created () {
    const delList = JSON.parse(localStorage.getItem('delList'))
    const addList = JSON.parse(localStorage.getItem('addList'))
    if (delList) {
      this.delList = delList
      this.addList = addList
      return
    }
    const res = await this.axios.get('/category')
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.delList = data
    }
  },
  methods: {
    del (id) {
      if (this.delList.length < 5) return
      const index = this.delList.findIndex(item => item.id === id)
      this.addList.push(this.delList[index])
      this.delList.splice(index, 1)
      localStorage.setItem('delList', JSON.stringify(this.delList))
      localStorage.setItem('addList', JSON.stringify(this.addList))
    },
    add (id) {
      const index = this.addList.findIndex(item => item.id === id)
      this.delList.push(this.addList[index])
      this.addList.splice(index, 1)
      localStorage.setItem('delList', JSON.stringify(this.delList))
      localStorage.setItem('addList', JSON.stringify(this.addList))
    }
  }

}
</script>

<style lang='less' scoped>
.del,
.add {
    overflow: hidden;
    padding: 10px;
    p {
        font-size: 12px;
    }
    .item {
        margin: 5px 5px 5px 0;
        float: left;
        font-size: 16px;
        width: 50px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border: 1px solid #ccc;
    }
}
</style>
