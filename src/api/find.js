// 导入_fetch
import _fetch from '@/utils/request.js'

// 封装方法:得到面试技巧

function apiGetTechnic ({ start, limit, q }) {
  return _fetch({
    url: '/articles/technic',
    method: 'GET',
    needToken: true,
    params: {
      start,
      limit,
      q
    }
  })
}

// 封装方法:得到市场数据
function apiGethot () {
  return _fetch({
    url: '/chart-data/hot',
    method: 'GET'
  })
}

// 封装方法:得到面经分享数据
function apiGetshare ({ start, limit, q }) {
  return _fetch({
    url: '/articles/share',
    method: 'GET',
    needToken: true,
    params: {
      start,
      limit,
      q
    }
  })
}

// 封装方法:得到热门历史数据
function apiGetSearch () {
  return _fetch({
    url: '/articles/shareTopSearch',
    method: 'GET'
  })
}

// 封装方法:得到面经详情数据
function apiGetDeatail (id) {
  return _fetch({
    url: `/articles/share/${id}`
  })
}

// 封装方法:得到面经评论数据
function apiGetComment ({ id, limit, start }) {
  return _fetch({
    url: `/articles/comments/${id}`,
    method: 'GET',
    params: {
      limit,
      start
    }
  })
}

// 封装方法:添加评论(评论的回复)
// 注意点:不需要同时传入三个参数
// 添加评论: 传入content & article
// 添加回复: 传入content & parent
function apiAddComment ({ content, article, parent }) {
  return _fetch({
    url: '/articles/comments',
    method: 'POST',
    needToken: true,
    data: {
      content,
      article,
      parent
    }
  })
}

// 封装方法:收藏取消&点赞
function apiCollectArt (id) {
  return _fetch({
    url: '/articles/collect',
    method: 'POST',
    needToken: true,
    data: {
      id
    }
  })
}

// 封装方法:收藏取消&点赞
function apiStarArt (article) {
  return _fetch({
    url: '/articles/star',
    method: 'POST',
    needToken: true,
    data: {
      article
    }
  })
}

export {
  apiGetTechnic,
  apiGethot,
  apiGetshare,
  apiGetSearch,
  apiGetDeatail,
  apiGetComment,
  apiAddComment,
  apiCollectArt,
  apiStarArt
}
