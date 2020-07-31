<template>
  <div>
    <!-- 双向数据绑定：value, @input -->
    <!-- v-bind="$attrs" 自动展开所有的属性集 -->
    <input :value="value" @input="onInput" v-bind="$attrs"/>
  </div>
</template>

<script>
import emitter from "@/utils/emitter"
export default {
  name: 'Input',
  componentName: "Input",
  inheritAttrs: false, // 取消div继承的placeholder
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  mixins: [emitter],
  methods: {
    onInput(e) {
      this.$emit("input", e.target.value); // 将value分发给上一级
      // this.$emit('update:value', e.target.value)

      this.dispatch('FormItem', 'validate',e.target.value)
      // this.$parent.$emit('validate')
    },
  },
};
</script>

<style></style>
