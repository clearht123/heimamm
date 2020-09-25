import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uersInfo: '' // 属性
  },
  mutations: {
    setUserInfo (state, payload) {
      // 方法
      state.uersInfo = payload // 保存用户信息
    }
  },
  actions: {},
  modules: {}
})
