/**
 * @param {function} func - 执行函数
 * @param {number} wait - 等待时间
 * @param {boolean} immediate - 是否立即执行
 * @return {function}
 */
export function debounce(func, wait = 300, immediate = false) {
  let timer, ctx;
  let later = (arg) =>
    setTimeout(() => {
      func.apply(ctx, arg);
      timer = ctx = null;
    }, wait);
  return function(...arg) {
    if (!timer) {
      timer = later(arg);
      ctx = this;
      if (immediate) {
        func.apply(ctx, arg);
      }
    } else {
      clearTimeout(timer);
      timer = later(arg);
    }
  };
}

/**
 * @param {function} func - 执行函数
 * @param {number} delay - 延迟时间
 * @return {function}
 */
export function throttle(func, delay) {
  let timer = null;
  return function(...arg) {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, arg);
        timer = null;
      }, delay);
    }
  };
}

