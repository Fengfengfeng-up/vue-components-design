const BUFFER = 30; // 单行宽度缓冲值

// 以函数的形式处理图片列表默认值
export const defaultRow = () => ({
  img: [], // 图片信息，最终只保留该字段
  total: 0, // 总宽度
  over: false, // 当前行是否完成
});

/**
 * 向某一行追加图片
 * @param {Array}  list 列表
 * @param {Object} img 图片数据
 * @param {Number} row 当前行 index
 * @param {Number} max 单行最大宽度
 */
export function addImgToRow(list, img, row, max) {
  if (!list[row]) {
    // 新增一行
    list[row] = defaultRow();
  }
  const total = list[row].total;
  const innerList = JSON.parse(JSON.stringify(list));
  innerList[row].img.push(img);
  innerList[row].total = total + img.width;
  // 当前行若空隙小于缓冲值，则不再补图
  if (max - innerList[row].total < BUFFER) {
    innerList[row].over = true;
  }
  return innerList;
}

/**
 * 递归添加图片
 * @param {Array} list 列表
 * @param {Number} row 当前行 index
 * @param {Objcet} opt 补充参数
 */
export function pushImg(list, row, opt) {
  const { maxWidth, item } = opt;
  if (!list[row]) {
    list[row] = defaultRow();
  }
  const total = list[row].total; // 当前行的总宽度
  if (!list[row].over && item.width + total < maxWidth + BUFFER) {
    // 宽度足够时，向当前行追加图片
    return addImgToRow(list, item, row, maxWidth);
  } else {
    // 宽度不足，判断下一行
    return pushImg(list, row + 1, opt);
  }
}

// 提取图片列表
export function buildImgList(list, max) {
  const res = [];
  Array.isArray(list) &&
    list.map((row) => {
      res.push(alignImgRow(row.img, (max / row.total).toFixed(2)));
    });
  return res;
}

// 调整单行高度以左右对齐
export function alignImgRow(arr, coeff) {
  if (!Array.isArray(arr)) {
    return arr;
  }
  const coe = +coeff; // 宽高缩放系数
  return arr.map((x) => {
    return {
      ...x,
      width: x.width * coe,
      height: x.height * coe,
    };
  });
}

// 根据 url 获取图片宽高
export function checkImgWidth(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = function() {
      const res = {
        width: this.width,
        height: this.height,
      };
      resolve(res);
    };
    img.src = url;
  });
}
