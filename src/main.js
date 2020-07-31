import Vue from "vue";
import App from "./App.vue";
import notice from "./components/notice";
Vue.use(notice);

// Vue.prototype.$notice = notice

Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
