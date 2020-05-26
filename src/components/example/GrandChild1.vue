<template>
  <div class="grand-child1">
    <p><strong>孙子1</strong></p>
    <p>爷爷送的礼物：{{gift.toy}}，爷爷说：{{gift.trip()}}</p>
  </div>
</template>

<script>
export default {
  inject: {
    gift: {
      type: Object,
    },
  },
  mounted() {
    console.log(this.gift);
  }
};
</script>

<style>
.grand-child1 {
  width: 45%;
  height: 150px;
  border: 5px solid rgb(148, 80, 80);
}
</style>
