<template>
  <div class="child-2">
    <p><strong>儿子2</strong></p>
    <p>
      名字：{{ name }} | 年龄：{{ $attrs.age }} | 爱好：{{ hobbit }} |
      零花钱：{{ money }}
    </p>
    <button @click="borrow">找兄弟借20块钱</button>
    <div class="son">
      <GrandChild1></GrandChild1>
      <GrandChild2></GrandChild2>
    </div>
  </div>
</template>

<script>
import GrandChild1 from './GrandChild1'
import GrandChild2 from './GrandChild2'
export default {
  props: {
    name: {
      type: String,
    },
  },
  components: {
    GrandChild1,
    GrandChild2
  },
  data() {
    return {
      hobbit: "游戏",
      money: 0,
    };
  },
  methods: {
    borrow() {
      console.log("找兄弟借20");
      this.$bus.$emit("borrow20", 20);
    },
    playWithBrother() {
      console.log("好的爸，我陪弟弟玩");
    },
  },
  mounted() {
    this.$bus.$on("give20", (money) => (this.money += money));
  },
};
</script>

<style>
.child-2 {
  width: 45%;
  height: 350px;
  border: 5px solid rgb(179, 17, 17);
}
.son {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
</style>
