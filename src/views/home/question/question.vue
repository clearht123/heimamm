<template>
  <div class="question">
    <!-- 头部导航 -->
    <van-dropdown-menu>
      <van-dropdown-item ref="myitem">
        <template #title>
          <div>
            面试宝典<span style="font-size: 12px">{{ city }}</span>
          </div>
        </template>
        <template>
          <!-- 地区选中框 -->
          <van-index-bar>
            <div v-for="(value, key) in cityList" :key="key">
              <van-index-anchor
                style="background-color: #f7f4f5"
                :index="key"
              />
              <van-cell
                :title="item"
                v-for="(item, index) in value"
                :key="index"
                @click="changeCity(item)"
              />
            </div>
          </van-index-bar>
        </template>
      </van-dropdown-item>
    </van-dropdown-menu>
    <!-- 岗位区域 -->
    <div class="pos_box">
      <div class="position">
        <span
          class="tags"
          :class="{ active: active === index }"
          v-for="(item, index) in positionList"
          :key="index"
          @click="changeIndex(index)"
          >{{ item.name }}</span
        >
      </div>
    </div>
    <!-- 刷题区域 -->
    <div class="que-box">
      <div class="item error">
        <i class="iconfont iconicon_mine_cuoti"></i>
        <span>常错题库</span>
      </div>
      <div class="item collect">
        <i class="iconfont iconicon_mine_tikushoucang"></i>
        <span>收藏题库</span>
      </div>
      <div class="item compony">
        <i class="iconfont iconicon_mine_qiyeshoucang"></i>
        <span>企业题库</span>
      </div>
      <div class="item answer">
        <i class="iconfont iconicon_mine_mianjing"></i>
        <span>已答题库</span>
      </div>
      <!-- 展示组件 圆圈 -->
      <van-circle
        class="circle"
        style="width: 120px; height: 120px;"
        layer-color="transparent"
        v-model="currentRate"
        color="#e9325e"
        :stroke-width="70"
        :rate="rate"
        :speed="100"
      >
        <template>
          <div class="content">
            <div class="w">顺序刷题</div>
            <div class="num">
              {{ userData.correctCount }}/{{ userData.totalCount }}
            </div>
          </div>
        </template>
      </van-circle>
    </div>
    <!-- 累计收录 -->
    <div class="total">
      <h1>累计收录</h1>
      <div class="num">126</div>
      <van-button
        class="mybtn"
        color="#00b8d4"
        size="large"
        @click="toInterview"
        >模拟面试</van-button
      >
    </div>
  </div>
</template>

<script>
import { apiGetFilters } from '@/api/question.js'
export default {
  data () {
    return {
      // 岗位的列表
      positionList: [],
      // 选中的岗位的下标
      active: 0,
      // 初始值
      currentRate: 0,
      // 城市数据列表
      cityList: {},
      // 选中的城市
      city: '全国',
      // 保存岗位数据源
      cityPosition: {},
      // 定义刷题数目
      userData: {
        totalCount: 0,
        correctCount: 0
      }
    }
  },
  computed: {
    rate () {
      if (this.userData.totalCount !== 0 && this.userData.correctCount !== 0) {
        return ((18 / this.userData.totalCount) * 100).toFixed(0)
      } else {
        return 0
      }
    }
  },
  watch: {
    city: function () {
      // 只要 city 发生了改变，岗位列表就要发生改变
      this.positionList = this.cityPosition[this.city]
    }
  },
  methods: {
    // 跳转到面试题页面
    toInterview () {
      // 这里跳转之前还需要传入两个参数: type(id) city(城市名)
      const typeid = this.positionList[this.active].id
      this.$router.push(`/interview?type=${typeid}&city=${this.city}`)
      // this.$router.push('/interview')
      // console.log('11111')
    },
    // 改变岗位的下标
    changeIndex (index) {
      this.active = index
    },
    // 切换选中的城市
    changeCity (item) {
      this.city = item
      // 关闭面板
      this.$refs.myitem.toggle()
      // 将选中的岗位下标重置为 0
      this.active = 0
    },
    // 得到城市数据
    async getFilters () {
      const res = await apiGetFilters()
      // 保存城市数据
      this.cityList = res.data.citys
      this.cityPosition = res.data.cityPositions
      this.positionList = this.cityPosition[this.city]
      // 保存题库题目的总数
      this.userData.totalCount = res.data.totalCount
      // 保存用户答对的题目
      this.userData.correctCount = this.$store.state.userInfo.correctQuestions.length
    }
  },
  created () {
    this.getFilters()
  }
}
</script>

<style lang="less" scoped>
.question {
  /deep/ .van-dropdown-menu__bar {
    box-shadow: none;
  }
  .pos_box {
    overflow: scroll;
    .position {
      display: flex;
      padding: 15px 15px;
      .tags {
        // 不要压缩宽度
        flex-shrink: 0;
        font-size: 12px;
        background-color: #f7f4f5;
        padding: 8px 15px;
        border-radius: 15px;
        margin-right: 15px;
      }
      .active {
        background-color: #00b8d4;
        color: #fff;
      }
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .que-box {
    width: 100%;
    height: 220px;
    margin-top: 16px;
    position: relative;
    .item {
      display: flex;
      flex-direction: column;
      i {
        display: block;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(#ff8080, #ff4949);
        font-size: 26px;
        color: #fff;
      }
      span {
        margin-top: 10px;
        font-size: 12px;
      }
    }
    .error {
      position: absolute;
      top: 20px;
      left: 40px;
    }
    .collect {
      position: absolute;
      top: 20px;
      right: 40px;
      i {
        background: linear-gradient(#ffda05, #ffb302);
      }
    }
    .compony {
      position: absolute;
      bottom: 20px;
      left: 40px;
      i {
        background: linear-gradient(#00ddec, #00b8d4);
      }
    }
    .answer {
      position: absolute;
      bottom: 20px;
      right: 40px;
      i {
        background: linear-gradient(#3ee5b1, #1dc779);
      }
    }
    .circle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-image: url('../../../assets/circleBg.png');
      background-size: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .content {
        width: 100px;
        height: 100px;
        padding: 30px 0;
        box-sizing: border-box;
        background: linear-gradient(#ff6f92, #e40137);
        border-radius: 50%;
        color: #fff;
        .w {
          font-size: 16px;
          font-weight: 700;
        }
        .num {
          font-size: 16px;
          margin-top: 10px;
        }
      }
    }
  }
  .total {
    text-align: center;
    padding: 15px;
    h1 {
      font-size: 28px;
    }
    .num {
      font-size: 28px;
    }
    .mybtn {
      margin-top: 40px;
      border-radius: 10px;
    }
  }
}
</style>
