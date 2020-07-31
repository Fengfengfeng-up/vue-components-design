<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Form",
  componentName: "Form",
  props: {
    model: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
    },
  },
  methods: {
    validate(cb) {
      console.log("全局校验");
      // 1. 获取校验项
      // 遍历子组件实例的validate方法返回Promise 数组
      // const tasks = this.$children
      //   .filter((item) => item.prop) // 只留下拥有prop属性的formItem
      //   .map((item) => item.validate());

      const tasks = this.fileds.map((item) => item.validate());

      // 判断所有输入项，执行对应的方法
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    },
  },
  created() {
    this.fileds = [];
    this.$on("add-form-item", (item) => {
      this.fileds.push(item);
    });
  },
};
</script>

<style></style>
