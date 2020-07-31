<template>
  <div class="grand-grand-child1">
    <strong>祖孙</strong><br>
    <span style="font-size:13px">我也收到祖父的礼物：{{gift.toy}}</span>
    <button @click="callAncestor" style="font-size:13px">给祖父打电话</button>
  </div>
</template>

<script>
export default {
  inject: {
    gift: {
      type: Object
    }
  },
  methods: {
    callAncestor() {
      // 触发祖先事件
      this.$parent.$parent.$parent.callGrandGrandChild1()
      
    }
  }
}
</script>

<style>
.grand-grand-child1 {
  width: 90%;
  margin: 5px auto;
  height: 80px;
  border: 3px solid #000;
}
</style>