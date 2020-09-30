import RouterLink from './router-link';
import RouterView from './router-view';

function install(_Vue){
  // 挂载$router
  _Vue.mixin({
    beforeCreate() {
      // 根实例才执行
      const router = this.$options.router
      if (router) {
        // router 指向 main.js 中 new Vue时传入的 options对象中的router
        _Vue.prototype.$router = router // 挂载到构造函数原型上，每个实例都能访问
        _Vue.prototype.$route = router.route // 挂载到构造函数原型上，每个实例都能访问
      }
    },
  })

  // 注册 router-link 组件
  _Vue.component('router-link', RouterLink)
  
  // 注册 router-view 组件
  _Vue.component('router-view', RouterView)
}

export default install
