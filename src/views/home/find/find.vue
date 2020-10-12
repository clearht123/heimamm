<template>
  <div class="find">
    <!-- 顶部导航栏 -->
    <van-nav-bar title="发现"> </van-nav-bar>
    <!-- 面试技巧区域 -->
    <div class="face">
      <van-cell is-link>
        <template #title>
          <span class="technic">面试技巧</span>
        </template>
        <template #default>
          <span class="more">查看更多</span>
        </template>
      </van-cell>
      <technic :item="item" v-for="(item, index) in technicList" :key="index" />
      <!-- 循环3个 -->
    </div>
    <!-- 市场数据 -->
    <div class="hot">
      <van-cell is-link>
        <template #title>
          <span class="technic">市场数据</span>
        </template>
        <template #default>
          <span class="more">查看更多</span>
        </template>
      </van-cell>
      <div class="tags">
        <span>{{ chartData.city }}</span>
        <span>{{ chartData.position }}</span>
      </div>
      <div class="salary" v-for="(item, index) in hotlist" :key="index">
        <div class="year">
          {{ item.year }}
        </div>
        <div class="progerss">
          <div
            class="inner"
            :style="{ width: (item.salary / chartData.topSalary) * 100 + '%' }"
          >
            ¥{{ item.salary }}
          </div>
        </div>
        <div class="count">
          <i
            v-if="item.percent > 0"
            style="color:green"
            class="iconfont iconicon_shangsheng"
          ></i>
          <i v-else style="color:red" class="iconfont iconicon_xiajiang"></i>
          <span>{{ item.percent + '%' }}</span>
        </div>
      </div>
      <div class="showmore" @click="showmore">
        <template v-if="isOpen === false">
          展开更多 <van-icon name="arrow-down" />
        </template>
        <template v-else> 收起更多<van-icon name="arrow-up" /> </template>
      </div>
    </div>
    <!-- 面经分享 -->
    <div class="shareep">
      <van-cell is-link>
        <template #title>
          <span class="technic">面经分享</span>
        </template>
        <template #default>
          <span class="more" @click="$router.push('/sharelist')">查看更多</span>
        </template>
      </van-cell>
      <shareep :item="item" v-for="(item, index) in shareList" :key="index" />
    </div>
  </div>
</template>

<script>
import technic from './technic.vue'
import shareep from './shareep.vue'
// 导入方法
import { apiGetTechnic, apiGethot, apiGetshare } from '@/api/find'
export default {
  name: 'find', // 要缓存的组件
  // 注册组件
  components: {
    technic,
    shareep
  },
  data () {
    return {
      // 市场数据的条数
      hotlist: [],
      chartData: '',
      // 判断是否是打开状态
      isOpen: false,
      // 保存技巧数据
      technicList: [],
      shareList: []
    }
  },
  methods: {
    showmore () {
      // isOpen 取反
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        // 显示4条数据
        this.hotlist = this.chartData.yearSalary
      } else {
        this.hotlist = this.chartData.yearSalary.slice(0, 4)
      }
    },
    // 发送面试技巧数据源
    async getTechnic () {
      const res = await apiGetTechnic({
        limit: 3
      })
      this.technicList = res.data.list
    },
    // 发送市场数据
    async apiGethot () {
      const res = await apiGethot()
      // console.log(res)
      // 对数组进行倒序
      res.data.yearSalary.reverse()
      this.chartData = res.data
      this.hotlist = res.data.yearSalary.slice(0, 4)
    },
    // 发送面经分享数据
    async apiGetshare () {
      const res = await apiGetshare({
        limit: 3
      })
      console.log(res)
      this.shareList = res.data.list
    }
  },
  // 得到数据
  created () {
    // 得到面试技巧
    this.getTechnic()
    // 得到市场数据
    this.apiGethot()
    // 得到面经分享数据
    this.apiGetshare()
  }
}
</script>

<style lang="less" scoped>
.find {
  background: #f9f9f9;
  margin-bottom: 60px;
  font-size: 12px;
  /deep/ .van-nav-bar__title .van-ellipsis {
    font-size: 20px;
  }
  .technic {
    font-size: 20px;
  }
  .hot {
    margin-top: 10px;
    background-color: #fff;
    .tags {
      margin: 20px 15px;
      span {
        display: inline-block;
        background-color: #eceaea;
        color: #545671;
        border-radius: 5px;
        padding: 5px;
        margin-right: 10px;
      }
    }
    .salary {
      margin: 20px 15px;
      display: flex;
      .progerss {
        margin: 0 10px;
        flex: 1;
        background-color: #eee;
        height: 12px;
        border-radius: 5px;
        .inner {
          background-color: #fe6d67;
          border-radius: 5px;
          text-align: right;
          height: 12px;
          color: #fff;
          padding-right: 5px;
          box-sizing: border-box;
        }
      }
      .count {
        width: 60px;
      }
    }
    .showmore {
      font-size: 14px;
      color: #545671;
      text-align: center;
    }
  }
}
</style>
