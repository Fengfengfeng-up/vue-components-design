<template>
  <div>
    <h2>FForm Test</h2>
    <FForm :model="model" :rules="rules" ref="loginForm">
      <FFormItem label="用户名" prop="username">
        <FInput v-model="model.username" placeholder="请输入用户名"></FInput>
      </FFormItem>
      <FFormItem label="密码" prop="password">
        <FInput
          type="password"
          v-model="model.password"
          placeholder="请输入密码"
        ></FInput>
      </FFormItem>
      <FFormItem>
        <button @click="submit">登陆</button>
      </FFormItem>
    </FForm>

    <!-- .sync -->
    <!-- <FInput :value.sync="model.username"></FInput> -->
    {{ model }}
  </div>
</template>

<script>
import FInput from "./FInput";
import FFormItem from "./FFormItem";
import FForm from "./FForm";
export default {
  provide() {
    return {
      form: this,
    };
  },
  data() {
    return {
      model: {
        username: "",
        password: "",
      },
      rules: {
        username: { required: true, message: "用户名必填" },
        password: { required: true, message: "密码必填" },
      },
    };
  },
  components: {
    FInput,
    FFormItem,
    FForm,
  },
  methods: {
    submit() {
      // 传入一个判断函数
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$notice({
            title: "登陆中",
            message: "登陆中!",
            duration: 1000,
          });
        } else {
          this.$notice({
            title: "提示",
            message: "请填写完整必要信息!",
            duration: 1000,
          });
        }
      });
    },
  },
};
</script>

<style></style>
