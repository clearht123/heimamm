// 导入了vue
import Vue from 'vue'
// 导入了App.vue （项目的根组件）
import App from './App.vue'
// 导入了路由
import router from './router'
// 路由vuex
import store from './store'
// 导入vnt组件
import Vant from 'vant'
import 'vant/lib/index.css'
// 使用Vant
// 导入适配
import 'amfe-flexible'
// 导入初始化css
import 'normalize.css'
// 导入字体图标
import './styles/iconfont.css'
// 导入过滤器
import dayjs from 'dayjs'

Vue.filter('timeformat', function (value) {
  // value:使用过滤器的数据
  return dayjs(value).format('YYYY-MM-DD')
})
// 使用过滤器{{value ! 过滤名}}
Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
