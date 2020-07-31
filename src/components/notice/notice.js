import Vue from "vue";

// 弹窗提示函数
function notice(Component, props) {
  // 方法1 Vue.extend
  // 生成组件构造函数
  const Notice = Vue.extend(Component);
  // 实例化
  const compo = new Notice({ propsData: props });
  // 挂载将虚拟dom转为真实dom
  compo.$mount();
  // 将组件dom插入到body元素中
  document.body.appendChild(compo.$el);
  // 给组件添加remove方法
  compo.remove = () => {
    // 移除dom
    document.body.removeChild(compo.$el);
    // 销毁组件
    compo.$destroy();
  };

  // 方法2 render函数
  // 创建一个vue实例
  // const vm = new Vue({
  //   render(h) {
  //     // render函数将传入组件配置对象转换为虚拟dom
  //     return h(Component || NoticeTemplate, { props });
  //   },
  // }).$mount(); //执行挂载函数，但未指定挂载目标，表示只执行初始化工作

  // // 将生成dom元素追加至body
  // document.body.appendChild(vm.$el);

  // const comp = vm.$children[0];
  // // 给组件实例添加销毁方法
  // comp.remove = () => {
  //   document.body.removeChild(vm.$el);
  //   vm.$destroy();
  // };

  // return comp;
}

export default notice
