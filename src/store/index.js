import Vue from 'vue'
import Vuex from 'vuex'
import { apiGetInfo } from '@/api/login.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: '' // 属性
  },
  mutations: {
    setUserInfo (state, payload) {
      // 方法
      state.userInfo = payload // 保存用户信息
    }
  },
  actions: {
    // 定义一个方法来得到新的用户信息,并将信息提交到 mutations
    async setUserInfo (context) {
      // 发送网络请求获取到最新的数据
      const res = await apiGetInfo()
      // 将新的头像进行拼接
      res.data.avatar = 'http://127.0.0.1:1337' + res.data.avatar
      // 将新数据保存到mutaions中
      context.commit('setUserInfo', res.data)
    }
  },
  modules: {}
})
