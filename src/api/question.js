import _fetch from '@/utils/request.js'

// 封装方法:得到城市数据
function apiGetFilters () {
  return _fetch({
    url: '/interview/filters'
  })
}

// 封装方法:得到题目信息
function apiGetQuestion ({ type, city }) {
  return _fetch({
    url: '/interview/questions',
    needToken: true,
    params: {
      type,
      city
    }
  })
}

// 封装方法:得到题目信息
function apiGetSubmit ({ id, singleAnswer, multipleAnswer }) {
  return _fetch({
    url: '/questions/submit',
    method: 'POST',
    needToken: true,
    data: {
      id,
      singleAnswer,
      multipleAnswer
    }
  })
}

// 封装方法:面试题详情
function apiGetnext (id) {
  return _fetch({
    url: `/questions/${id}`,
    needToken: true
  })
}

// 封装方法:企业列表
function apiGetCommpany ({
  start,
  limit,
  longitude,
  latitude,
  distance,
  score
}) {
  return _fetch({
    url: '/companies/list',
    params: {
      start,
      limit,
      longitude,
      latitude,
      distance,
      score
    }
  })
}
export {
  apiGetFilters,
  apiGetQuestion,
  apiGetSubmit,
  apiGetnext,
  apiGetCommpany
}
