<template>
  <div class="ancestor">
    <p><strong>祖先</strong></p>
    <div style="margin: 5px 0;">
      <button @click="child1Name = 'john'">通过props给儿子1改名</button>
      <button @click="child1Age = '18'">通过attributes特性给儿子1改年龄</button>
      <button @click="$refs.child1.hobbit = '学习'">
        通过ref引用让儿子1喜欢学习
      </button>
      <button @click="$children.filter((c) => c.name == 'jack')[0].money += 20">
        通过$children给名字叫jack的儿子更多零花钱
      </button>
    </div>
    <div class="children">
      <Child1
        ref="child1"
        @money="give($event)"
        @play="notNow"
        :name="child1Name"
        :age="child1Age"
      ></Child1>
      <Child2 ref="child2" :name="child2Name" :age="child2Age"></Child2>
    </div>
  </div>
</template>

<script>
import Child1 from "./Child1";
import Child2 from "./Child2";
export default {
  name: "ancestor",
  provide() {
    return {
      gift: {
        toy: "变形金刚",
        trip: this.travalle,
      },
    };
  },
  data() {
    return {
      child1Name: "jack",
      child1Age: 15,
      child2Name: "neal",
      child2Age: 30,
    };
  },
  components: {
    Child1,
    Child2,
  },
  methods: {
    give(e) {
      this.$refs.child1.money += e;
      console.log(`给儿子 ${e}块`);
    },
    giveToChild2(money) {
      console.log("没有" + money + "，" + "给你10块");
      this.$refs.child2.money += 10;
    },
    notNow() {
      console.log("我现在没空，叫你哥陪你玩");
      // 通过$refs访问子组件实例
      this.$refs.child2.playWithBrother();
    },
    travalle() {
      return "明天带孙子去旅游";
    },
    callGrandGrandChild1() {
      console.log('收到祖孙的电话');
      
    }
  },
  mounted() {
    console.log(this.$children);
  },
};
</script>

<style>
.ancestor {
  width: 80%;
  height: 500px;
  margin: 0 auto;
  border: 5px solid red;
}
.children {
  display: flex;
  justify-content: space-around;
}
</style>
