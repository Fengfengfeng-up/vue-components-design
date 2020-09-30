import NoticeTemplate from "./Notice.vue";
import notice from "./notice";

export default {
  install(Vue) {
    Vue.prototype.$notice = function(options) {
      notice(NoticeTemplate, options);
    };
  },
};
