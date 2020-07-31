<template>
  <div class="grand-child1">
    <div><strong>孙子1</strong></div>
    <div>爷爷送的礼物：{{gift.toy}}，爷爷说：{{gift.trip()}}</div>
    <GrandGrandChild1></GrandGrandChild1>
  </div>
</template>

<script>
import GrandGrandChild1 from './GrandGrandChild1'
export default {
  inject: {
    gift: {
      type: Object,
    },
  },
  components: {
    GrandGrandChild1
  },
  mounted() {
    console.log(this.gift);
  }
};
</script>

<style>
.grand-child1 {
  width: 45%;
  height: 180px;
  border: 5px solid rgb(148, 80, 80);
}
</style>
