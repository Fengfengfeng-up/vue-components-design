import Vue from "vue";
import App from "./App.vue";
// import './utils/performance'
import ref from "./utils/ref";
import notice from "./components/notice";
import router from './custom-router'

Vue.use(notice);
Vue.use(ref);

Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
