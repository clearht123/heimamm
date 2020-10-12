// 负责封装所有与登录相关的网络请求
// 导入自己封装的 request 文件
import _fetch from '@/utils/request'
// import { localget } from '@/utils/local.js'
// 封装方法: 获取验证码
function apiGetCode (mobile) {
  return _fetch({
    url: '/au/code',
    method: 'POST',
    data: {
      mobile: mobile
    }
  })
}
// 封装方法: 获取登录信息
function apiGetLogin ({ mobile, code }) {
  return _fetch({
    url: '/au/login',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

// 封装方法: 根据 token 得到用户信息

function apiGetInfo () {
  return _fetch({
    url: '/au/info',
    method: 'GET',
    // 添加一个标志属性  只给需要携带的token添加needToken: true
    needToken: true
    // headers: {
    //   authorization: `Bearer ${localget('heima_token')} `
    // }
  })
}

// 封装方法: 修改用户信息

function apiEdit ({ nickname, intro, gender, avatar, posistion, area }) {
  return _fetch({
    url: '/au/edit',
    method: 'POST',
    needToken: true,
    data: {
      nickname,
      intro,
      gender,
      avatar,
      posistion,
      area
    }
  })
}

// 封装方法上传文件
function apiUpload (file) {
  // 创建FromData
  const fd = new FormData()
  // 添加参数
  fd.append('files', file)
  return _fetch({
    url: '/upload',
    method: 'POST',
    needToken: true,
    data: fd
  })
}

// 暴露方法
export { apiGetCode, apiGetLogin, apiGetInfo, apiEdit, apiUpload }
