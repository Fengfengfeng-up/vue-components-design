<template>
  <div class="grand-child2">
    <p><strong>孙子2</strong></p>
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
};
</script>

<style>
.grand-child2 {
  width: 45%;
  height: 180px;
  border: 5px solid rgb(148, 80, 80);
}
</style>
