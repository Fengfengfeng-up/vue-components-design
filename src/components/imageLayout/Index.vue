<template>
  <div ref="container" :class="[`w-image-list`]">
    <template v-if="imgs.length > 0">
      <div v-for="(row, r) in imgs" :key="`image-row-${r}`" class="w-image-row">
        <div
          v-for="(item, l) in row"
          :key="`image-${r}-${l}`"
          class="w-image-item"
          :style="`height: ${item.height}px; width: ${item.width}px`"
          @click="handleSelect(item)"
        >
          <img :src="item.url" :alt="item.title" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import {
  defaultRow,
  addImgToRow,
  pushImg,
  buildImgList,
  alignImgRow,
  checkImgWidth,
} from "./index";

export default {
  props: {
    className: {
      type: String,
    },
    list: {
      type: Array,
      default: () => [],
      required: true,
    },
    imgHeight: {
      type: Number,
      default: 200,
    },
  },
  data() {
    return {
      imgs: [],
    };
  },
  computed: {
    containerWidth() {
      return this.$refs.container.clientWidth;
    },
  },
  methods: {
    //   /**
    //  * 处理数据，根据图片宽度生成二维数组
    //  * @param {Array} list 数据集
    //  * @param {Number} maxWidth 单行最大宽度，通常为容器宽度
    //  * @param {Number} imgHeight 每行的基准高度，根据这个高度算出图片宽度，最终为对齐图片，高度会有浮动
    //  * @param {Boolean} deal 是否处理异常数据，默认处理
    //  * @return {Array} 二维数组，按行保存图片宽度
    //  */
    calcWidth(list, maxWidth, imgHeight, deal = true) {
      if (!Array.isArray(list) || !maxWidth) {
        return;
      }
      const innerList = JSON.parse(JSON.stringify(list));
      const remaindArr = []; // 兼容不含宽高的数据
      let allRow = [defaultRow()]; // 初始化第一行

      for (const item of innerList) {
        // 处理不含宽高的数据，统一延后处理
        if (!item.height || !item.width) {
          remaindArr.push(item);
          continue;
        }
        const imgWidth = Math.floor((item.width * imgHeight) / item.height);
        item.width = imgWidth;
        item.height = imgHeight;

        // 单图成行
        if (imgWidth >= maxWidth) {
          console.log("单图成行: ", item);
          allRow = addImgToRow(allRow, item, allRow.length, maxWidth);
          continue;
        }

        // 递归处理当前图片
        allRow = pushImg(allRow, 0, { maxWidth, item });
      }
      console.log("allRow======>", maxWidth, allRow);

      // 处理异常数据
      deal && this.initRemaindImg(remaindArr);
      return buildImgList(allRow, maxWidth);
    },

    // 处理没有宽高信息的图片数据
    initRemaindImg(list) {
      const arr = []; // 获取到宽高之后的数据
      let count = 0;
      list &&
        list.map((x) => {
          checkImgWidth(x.url).then((res) => {
            count++;
            arr.push({ ...x, ...res });
            if (count === list.length) {
              // 为防止数据异常导致死循环，本次 calcWidth 不再处理错误数据
              const imgs2 = this.calcWidth(
                arr,
                this.containerWidth - 10,
                this.imgHeight,
                false
              );
              this.imgs.push(...imgs2);
            }
          });
        });
    },
    handleSelect(item) {
      console.log("handleSelect", item);
    },
  },
  mounted() {
    console.time("CalcWidth");
    const imgs = this.calcWidth(this.list, this.containerWidth, this.imgHeight);
    this.imgs = imgs;
    console.timeEnd("CalcWidth");
  },
};
</script>
<style lang="scss" scoped>
.w-image-list {
  .w-image-row {
    display: flex;
    justify-content: center;
    .w-image-item {
      padding: 2px;
      box-sizing: border-box;
      img {
        -webkit-user-drag: none;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
