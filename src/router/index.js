import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入 useVant
import useVant from '../views/usevant.vue'
import login from '../views/login/login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',

    redirect: '/login'
  },
  {
    path: '/useVant',

    component: useVant
  },
  // 登录
  {
    path: '/login',
    component: login
  }
]

const router = new VueRouter({
  routes
})

export default router
