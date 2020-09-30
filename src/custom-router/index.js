import Vue from 'vue'
import CustomVueRouter from './custom-vue-router'

Vue.use(CustomVueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => require('@/views/Home.vue'),
    children: [
      {
        path: '/child1',
        name: 'Child1',
        component: () => require('@/views/Child1.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => require('@/views/About.vue'),
  },
  {
    path: '*',
    name: '404',
    component: () => require('@/views/404.vue')
  }
]

export default new CustomVueRouter({
  mode: 'hash',
  routes
})
