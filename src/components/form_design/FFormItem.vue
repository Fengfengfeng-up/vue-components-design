<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <!-- 错误信息 -->
    <p v-if="error">{{ error }}</p>
    <!-- <p>{{form.rules.username}}</p> -->
  </div>
</template>

<script>
import Schema from "async-validator";
import emitter from "@/mixins/emitter";
export default {
  name: "FormItem",
  componentName: "FormItem",
  inject: ["form"],
  props: {
    label: {
      type: String,
      default: "",
    },
    prop: {
      type: String,
    },
  },
  mixins: [emitter],
  data() {
    return {
      error: "",
    };
  },
  methods: {
    validate() {
      // 1.获取数值和规则
      const value = this.form.model[this.prop];
      const rule = this.form.rules[this.prop];

      // 2.创建校验规则
      const schema = new Schema({ [this.prop]: rule }); // [this.prop] 动态属性

      // 校验返回 Promise
      return schema.validate({ [this.prop]: value }, (errors) => {
        this.error = errors ? errors[0].message : "";
      });
    },
  },

  mounted() {
    this.$on("validate", () => this.validate());

    if (this.prop) {
      this.dispatch("Form", "add-form-item", [this]);
    }
  },
};
</script>

<style></style>
