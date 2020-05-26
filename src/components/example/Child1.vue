<template>
  <div class="child-1">
    <p><strong>儿子1</strong></p>
    <p>
      名字：{{ name }} | 年龄：{{ $attrs.age }} | 爱好：{{ hobbit }} |
      零花钱：{{ money }}
    </p>
    <button @click="getMoney">向爸爸伸手要10块钱</button>
    <button @click="$emit('play')">叫爸爸陪我打游戏</button>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
    },
  },
  data() {
    return {
      hobbit: "游戏",
      money: 10,
    };
  },
  methods: {
    getMoney() {
      this.$emit("money", 10);
    },
    borrow(money) {
      console.log("兄弟找我借" + money);
      if (this.money >= money) {
        console.log("我有20，可以给你");
        this.$bus.$emit("give20", money);
        this.money -= money;
      } else {
        console.log("我没有那么多，我找爸爸给你");
        // 通过$parent访问父组件实例
        this.$parent.giveToChild2(money)
      }
    },
  },
  mounted() {
    this.$bus.$on("borrow20", this.borrow);
    // console.log(this.$attrs);
  },
};
</script>

<style>
.child-1 {
  width: 45%;
  height: 350px;
  border: 5px solid rgb(179, 17, 17);
}
</style>
