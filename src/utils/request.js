// 负责对 axios 的封装
// 导入 axios
import axios from 'axios'
// 导入 toast
import { Toast } from 'vant'
import { localget } from '@/utils/local.js'
// 创建一个 axios 实例
const _fetch = axios.create({
  baseURL: 'http://localhost:1337' // 如果本地服务器搭建成功，就使用这个基本地址
  // withCredentials: true // 只要你们敢加，它就敢报错，报错的具体错误是跨域
})

// 添加请求拦截器
_fetch.interceptors.request.use(
  function (config) {
    // 判断：如果请求有 needToken ，就将 token 放到请求头中
    //       如果没有，不用理会
    // console.log('-----------')
    // console.log(config.needtoken)
    if (config.needToken) {
      const token = localget('heima_token')
      if (token) {
        // 将token携带到请求头中
        config.headers.authorization = `Bearer ${token}`
      }
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
_fetch.interceptors.response.use(
  function (response) {
    console.log(response)
    // response：从服务器中响应回来的内容
    const code = response.data.code
    // 判断成功
    if (code === 200) {
      // 说明请求成功
      return response.data // 将返回的内容交给 .then 方法
    } else if (code === 400 || code === 401 || code === 403) {
      // 说明请求失败
      // 返回错误信息
      // 提示用户
      console.log(response.data.message)
      Toast.fail(response.data.message)
      // new Error 创建一个新的错误
      return Promise.reject(new Error(response.data.message))
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 暴露对象
export default _fetch
