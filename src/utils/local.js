// 封装保存localstorage的方法
// 赋值
export function localset (key, value) {
  window.localStorage.setItem(key, value)
}
// 取值
export function localget (key) {
  return window.localStorage.getItem(key)
}
// 删除值
export function localde (key) {
  window.localStorage.removeItem(key)
}
