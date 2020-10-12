<template>
  <div id="app">
    <h1>使用按钮</h1>
    <van-button loading type="primary" />
    <van-button loading type="primary" loading-type="spinner" />
    <van-button loading type="info" loading-text="加载中..." />
    <h2>使用单元格</h2>
    <van-cell-group>
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>
    <h3>使用icon字体图标</h3>
    <van-icon name="like" />
    <van-icon name="shopping-cart" />
    <h4>使用插槽</h4>
    <van-cell value="内容">
      <template #title>
        <van-icon name="like" />
        标题
        <van-icon name="like" />
      </template>
      <template #default>
        <van-icon name="shopping-cart" />
        内容
        <van-icon name="shopping-cart" />
      </template>
    </van-cell>
    <div class="box1"><i class="iconfont iconicon_shangsheng"></i></div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.box1 {
  width: 200px;
  height: 200px;
  background-color: pink;
}
</style>
