<template>
  <!-- 头部导航 -->
  <div class="myshare">
    <van-nav-bar title="面试技巧">
      <template #left>
        <i @click="$router.go(-1)" class="iconfont iconbtn_nav_back myleft"></i>
      </template>
    </van-nav-bar>
    <!-- 搜索区域 -->
    <div class="search" @click="$router.push('/search/share')">
      <i class="iconfont iconicon_search"></i>
      <span>请输入关键字</span>
    </div>
    <!-- 文章区域:完成上拉加载更多 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <shareep
        v-for="(item, index) in list"
        :key="index"
        :item="item"
      />
      <!-- <van-cell >
      </van-cell> -->
    </van-list>
  </div>
</template>

<script>
import { apiGetshare } from '@/api/find.js'
import shareep from '../home/find/shareep.vue'
export default {
  components: {
    shareep
  },
  data () {
    return {
      list: [],
      loading: false, // 是否处于加载状态
      finished: false, // 数据源是否加载完毕
      start: 0, // 开始的下标
      limit: 5 // 获取多少条
    }
  },
  methods: {
    async onLoad () {
      const res = await apiGetshare({
        start: this.start,
        limit: this.limit
      })
      // 保存数据源
      this.list.push(...res.data.list)
      //   console.log(res) 保存数据
      // 将下标进行修改
      this.start += this.limit
      // 继续向后执行
      this.loading = false
      // 判断数据源是否加载完毕
      if (this.list.length >= res.data.total) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.myshare {
  font-size: 12px;
  /deep/ .van-nav-bar__left {
    padding-left: 0px !important;
  }
  /deep/ .van-nav-bar__title.van-ellipsis {
    font-size: 16px;
  }
  .myleft {
    font-size: 40px;
  }
  .search {
    height: 36px;
    background-color: #f7f4f5;
    margin: 15px 15px 0px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #b3b3b3;
    font-size: 14px;
  }
}
</style>
