<template>
  <div class="border2">
    <h3 v-ref="c => setChildrenRef('childrenE', c)">
      E 结点
    </h3>
  </div>
</template>
<script>
export default {
  components: {},
  inject: {
    setChildrenRef: {
      default: () => {}
    }
  }
};
</script>
