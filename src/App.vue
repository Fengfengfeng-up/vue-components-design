<template>
  <div id="app">
    <!-- <Ancestor></Ancestor> -->
    <FForm></FForm>
  </div>
</template>

<script>
// import Ancestor from "./components/example/Ancestor.vue";
import FForm from './components/form_design/Index'
export default {
  name: "App",
  components: {
    // Ancestor,
    FForm
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
