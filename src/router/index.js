import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入 useVant

import useVant from '../views/usevant.vue'

Vue.use(VueRouter)

const routes = [{ path: '/useVant', component: useVant }]

const router = new VueRouter({
  routes
})

export default router
