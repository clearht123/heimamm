import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入 useVant
import useVant from '../views/usevant.vue'
// 导入操作 localstorage 的方法
import { localget } from '@/utils/local.js'
// 导入 home 路由
import login from '../views/login/login.vue'
// 导入 home 路由
import home from '../views/home'
// 导入得到用户信息的方法
import { apiGetInfo } from '@/api/login.js'
// 导入 store
import store from '@/store/index.js'
// 导入 toast
import { Toast } from 'vant'
// 导入 find & my & question & info
import find from '../views/home/find/find.vue'
import my from '../views/home/my/my.vue'
import question from '../views/home/question/question.vue'
import info from '../views/info/info.vue'
import editinfo from '../views/info/editinfo.vue'
import editupload from '../views/info/editupLoad.vue'
import sharelist from '../views/sharelist/sharelist.vue'
import search from '../views/sharelist/search.vue'
import sharedeatils from '../views/sharelist/sharedeatils.vue'
import interview from '../views/home/question/interview.vue'
import company from '../views/home/company/company.vue'
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
  },
  // home
  {
    path: '/home',
    component: home,
    children: [
      { path: '/find', component: find },
      {
        path: '/my',
        component: my,
        meta: {
          needLogin: true
        }
      },
      {
        path: '/question',
        component: question,
        meta: {
          needLogin: true
        }
      },
      {
        path: '/company',
        component: company
      }
    ]
  },
  {
    path: '/info',
    component: info,
    meta: {
      needLogin: true
    }
  },
  {
    path: '/editinfo',
    component: editinfo,
    meta: {
      needLogin: true
    }
  },
  {
    path: '/editupload',
    component: editupload,
    meta: {
      needLogin: true
    }
  },
  {
    path: '/sharelist',
    component: sharelist
  },
  {
    path: '/search/share',
    component: search
  },
  {
    path: '/sharedeatils/:id',
    component: sharedeatils
  },
  {
    path: '/interview',
    component: interview,
    meta: {
      needLogin: true // 说明当前页面需要登录才能访问
    }
  }
]

const router = new VueRouter({
  routes
})

// 添加一个前置导入守卫
router.beforeEach(async (to, from, next) => {
  // 跳转到路由的元素信息
  const needLogin = to.meta.needLogin
  if (!needLogin) {
    next()
  } else {
    // 需要登录,判断是否存在token
    const token = localget('heima_token')
    // 判断是否存在
    if (token) {
      // 判断： vuex 中的 userInfo 中是否有数据
      // 得到 userInfo
      const userInfo = store.state.userInfo
      if (userInfo) {
        // 有直接next()
        next()
      } else {
        // 无: 根据token发送请求到服务器
        const res = await apiGetInfo()
        // 得到当前用户信息
        console.log(res.data)
        // 修改用户的头像地址
        res.data.avatar = 'http://localhost:1337' + res.data.avatar
        // 并且将信息保存到vuex中
        store.commit('setUserInfo', res.data)
        // 向下执行
        next()
      }
      // 存在
      // next() // vuex 中依旧没有数据，my 路由可以进入，但是不会显示内容
    } else {
      // 不存在：
      // 提示未登录
      Toast.fail('对不起,您还没有登录')
      // 跳转到登录页面: 保存当前访问页面的路径： to.fullPath = '/question'
      router.push('/login?_redirect=' + to.fullPath)
    }
  }
})

export default router
