// 负责对 axios 的封装
// 导入 axios
import axios from 'axios'
// 创建一个 axios 实例
const _fetch = axios.create({
  baseURL: 'http://localhost:1337' // 如果本地服务器搭建成功，就使用这个基本地址
  // withCredentials: true // 只要你们敢加，它就敢报错，报错的具体错误是跨域
})

// 添加请求拦截器
_fetch.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
_fetch.interceptors.response.use(
  function (response) {
    // response：从服务器中响应回来的内容
    return response.data // 将返回的内容交给 .then 方法
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 暴露对象
export default _fetch
