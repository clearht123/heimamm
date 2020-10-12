<template>
  <div class="home">
    <!-- 路由出口 -->
    <keep-alive include="find">
      <router-view></router-view>
    </keep-alive>
    <!-- 导航栏 -->
    <van-tabbar  route active-color="red">
      <van-tabbar-item to='/company'>
        公司
        <template #icon>
          <i class="iconfont iconicon_footbar_gs_nor myicon"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="search" to="/question">
        刷题
        <template #icon>
          <i class="iconfont iconicon_footbar_st_nor myicon"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item
       to="/find" >发现
        <template #icon>
          <i class="iconfont iconicon_footbar_st_nor myicon"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        我的
        <template #icon>
          <i class="iconfont iconicon_footbar_wode_nor myicon"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.home {
    .myicon{
        font-size: 30px;
    }
}
</style>
