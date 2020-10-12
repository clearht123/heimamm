<template>
  <div class="shareSearch">
    <van-nav-bar title="面试搜索">
      <template #left>
        <i @click="$router.go(-1)" class="iconfont iconbtn_nav_back myleft"></i>
      </template>
    </van-nav-bar>
    <van-search
      v-model="search"
      show-action
      placeholder="请输入搜索关键词"
      shape="round"
      @search="getResult"
      @cancel="onCancel"
    />
    <!-- 搜索记录 -->
    <div class="main" v-if="isShow === false">
      <div class="title">
        <span>大家都在搜索</span>
      </div>
      <div class="tags">
        <span
          @click="getResult(item)"
          v-for="(item, index) in hotlist"
          :key="index"
          >{{ item }}</span
        >
      </div>
      <div class="title">
        <span>历史记录</span>
        <span @click="delall">清空</span>
      </div>
      <div class="tags">
        <span
          @click="getResult(item)"
          v-for="(item, index) in historyList"
          :key="index"
          >{{ item }}</span
        >
      </div>
    </div>
    <!-- 搜索结果 -->
    <div v-else>
      <shareep
        v-for="(item, index) in searchResult"
        :key="index"
        :item="item"
      ></shareep>
    </div>
  </div>
</template>

<script>
import { apiGetSearch, apiGetshare } from '@/api/find.js'
import shareep from '../home/find/shareep.vue'
import { localset, localget, localdel } from '@/utils/local.js'
export default {
  components: {
    shareep
  },
  data () {
    return {
      isShow: false,
      search: '',
      hotlist: [],
      // 得到搜索结果
      searchResult: [],
      historyList: JSON.parse(localget('history')) || []
    }
  },
  methods: {
    // 删除历史
    delall () {
      // 删除所有历史数据
      this.historyList = []
      // 从localstorage
      localdel('history')
    },
    // 根据关键字搜索文档
    async getResult (key) {
      // 将搜索关键字存储到historyList中
      this.historyList.unshift(key)
      this.historyList = [...new Set(this.historyList)]

      if (this.historyList > 5) {
        // 取出五个数组
        this.historyList = this.historyList.splice(0, 5)
      }
      localset('history', JSON.stringify(this.historyList))
      // 将搜索结果显示出来
      this.isShow = true
      // 将key显示到输入框
      this.search = key
      const res = await apiGetshare({ q: key })
      // console.log(res)
      res.data.list.forEach(item => {
        // 将item中的title属性中的关键字拿出来替换
        item.title = item.title.replace(
          key,
          `<span style="color : red">${key}</span> `
        )
      })
      this.searchResult = res.data.list
    },
    // 得到搜索历史热门数据
    async getSeach () {
      const res = await apiGetSearch()
      // console.log(res)
      this.hotlist = res.data
    },
    // 回车是触发 有key输入框内容
    onSearch () {},
    onCancel () {
      this.isShow = false
    }
  },
  // 刷新页面
  created () {
    this.getSeach()
  }
}
</script>

<style lang="less" scoped>
.shareSearch {
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
  .van-search__content {
    background: #f7f4f5;
  }
  .main {
    padding: 0 15px;
    .title {
      font-size: 20px;
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      span:nth-child(2) {
        font-size: 12px;
      }
    }
    .tags {
      span {
        display: inline-block;
        padding: 5px;
        background-color: #dddddd;
        margin-right: 10px;
        margin-top: 20px;
        border-radius: 8px;
      }
    }
  }
}
</style>
