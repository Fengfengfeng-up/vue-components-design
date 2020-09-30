import install from './install'
import Vue from 'vue'

class CustomVueRouter {
  constructor(options) {
    this.$options = options

    // 路由映射表
    this.routeMap = genRouteMap(options.routes)

    // 创建响应式的 currentPath
    Vue.util.defineReactive(this, 'currentPath', '')

    // 当前路由信息对象
    this.route = {
      path: '',
      fullPath: '',
      query: null,
      param: null,
      meta: null
    }

    // 监听url变化
    window.addEventListener('hashchange', this.pathChange.bind(this))
    window.addEventListener('load', this.pathChange.bind(this))
  }

  pathChange() {
    // 当前path
    this.currentPath = window.location.hash.slice(1)
  }

  push(data) {
    const { hash, ...route } = parseData(data)
    for (const key in this.route) {
      this.route[key] = route[key]
    }

    this.route.meta = this.routeMap[route.path].meta || null

    window.location.hash = hash
  }

  replace(data) {
    const { hash, ...route } = parseData(data)
    for (const key in this.route) {
      this.route[key] = route[key]
    }

    this.route.meta = this.routeMap[route.path]

    window.location.replace(hash)
  }
}

CustomVueRouter.install = install

// 递归生成路由映射表
function genRouteMap(routes, routeMap = {}) {
  for (let i = 0; i < routes.length; i++) {
    routeMap[routes[i].path] = routes[i]

    const children = routes[i].children

    if (Array.isArray(children) && children.length > 0) {
      genRouteMap(children, routeMap)
    }
  }

  return routeMap
}

// 解析 push replace 方法参数
function parseData(data) {
  let hash = ''
  let pathStr = ''
  let queryObj = null
  let paramObj = null

  if (typeof data === 'string') {
    hash = '#' + data
    pathStr = data
  } else if (typeof data === 'object') {
    const { path, query, param } = data
    hash = '#' + path
    pathStr = path

    // 是否有param
    if (typeof param === 'object' && Object.keys(param).length > 0) {
      paramObj = param

      const paramStr = Object.keys(param).reduce((str, key) => {
        str += '/' + param[key]
        return str
      }, '')

      hash += paramStr
    }

    // 是否有query
    if (typeof query === 'object' && Object.keys(query).length > 0) {
      queryObj = query

      const queryStr = Object.keys(query).reduce((str, key) => {
        str += '?' + key + '=' + query[key]
        return str
      }, '')

      hash += queryStr
    }

    return { hash, query: queryObj, param: paramObj, fullPath: hash.slice(1), path: pathStr }
  }
}

export default CustomVueRouter
