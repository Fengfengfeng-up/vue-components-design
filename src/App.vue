<template>
  <div id="app">
    <!-- <Ancestor></Ancestor> -->
    <!-- <FForm></FForm> -->
    <!-- <Ref></Ref> -->
    <!-- <ImgsLayout :list="imgList"></ImgsLayout> -->
    
    <router-link to="/">Home</router-link>
    |
    <router-link to="/about">About</router-link>
    |
    <router-link to="/child1">child1</router-link>
    <router-view />
  </div>
</template>

<script>
// import Ancestor from "./components/example/Ancestor.vue";
import ImgsLayout from './components/imageLayout/Index.vue'
import FForm from './components/form_design/Index'
import Ref from './components/ref'
export default {
  name: 'App',
  components: {
    // Ancestor,
    ImgsLayout,
    Ref,
    FForm,
  },
  data() {
    return {
      imgList: [],
    }
  },
  created() {
    this.imgList = [
      'https://cdn.goexplore.io/CleanShot%202020-08-31%20at%2011.01.585626392488951.png',
      'https://cdn.goexplore.io/CleanShot%202020-08-31%20at%2011.01.587167692488951.png',
      'https://cdn.goexplore.io/279759ee3d6d55fb54ef037c62224f4a20a4ddbb2230650428951.jpg',
      'https://cdn.goexplore.io/%E7%BB%84%201%20%E6%8B%B7%E8%B4%9D%204@2x1829302428951.png',
      'https://cdn.goexplore.io/FlRo--kLofb8t911riu4WWI_XW5t1322166328951.jpg',
      'https://cdn.goexplore.io/FlRo--kLofb8t911riu4WWI_XW5t5770266328951.jpg',
      'https://cdn.goexplore.io/65538b4ecb1183646b381adcfe32a45c5406947688951.jpg',
      'https://cdn.goexplore.io/65538b4ecb1183646b381adcfe32a45c6978947688951.jpg',
      'https://cdn.goexplore.io/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202008121113150089102027951.jpg',
      'https://cdn.goexplore.io/u=573362797,4228559155&fm=26&gp=07416238217951.jpg',
    ].map((item) => {
      return {
        url: item,
      }
    })
  },
}
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
