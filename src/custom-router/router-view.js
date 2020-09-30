export default {
  render(h) {
    let component = null

    // 从routeMap路由映射表中获取当前path对应的component
    const route = this.$router.routeMap[this.$router.currentPath]

    if(route) {
      component = route.component
    }

    let _component = null

    if (component) {
      // 如果找到对应的组件，判断是否懒加载
      _component = typeof component === 'object' ? component : component().default
    } else {
      // 首先判断是否有匹配所有url的配置
      const matchAll = this.$router.routeMap['*'] 
      if (matchAll && matchAll.component) {
        _component =
          typeof matchAll.component === 'object' ? matchAll.component : matchAll.component().default
      } else {
        _component = 'div'
      }
    }

    return h(_component)
  },
}
