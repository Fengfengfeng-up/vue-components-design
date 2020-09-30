<template>
  <div>
    <!-- 双向数据绑定：value, @input -->
    <!-- v-bind="$attrs" 自动展开所有的属性集 -->
    <input :value="value" @input="onInput" v-bind="$attrs" />
  </div>
</template>

<script>
import emitter from "@/mixins/emitter";
import { debounce, throttle } from "@/utils/debounce";
export default {
  name: "Input",
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

      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.dispatch("FormItem", "validate");
        // this.$parent.$emit('validate')
      }, 300);
    },
  },
};
</script>

<style></style>
