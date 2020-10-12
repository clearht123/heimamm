<template>
  <div class="company">
    <!-- 头部区域 -->
    <van-sticky>
      <div class="head">
        <!-- 头部搜索区域 -->
        <div class="search">
          <span>公司</span>
          <van-search
            class="mysearch"
            shape="round"
            v-model="value"
            placeholder="请输入搜索关键词"
          />
        </div>
        <!-- banner区域 -->
        <div class="banner" v-if="!show">
          <img
            src="http://134.175.59.248/heimamm_mobile/img/ios3x_img_banner@3x.9ed762f2.png"
            alt=""
          />
        </div>
        <!-- 筛选区域 -->
        <div class="filter">
          <div
            class="left"
            @click="fileterStart"
            :class="{ active: !distance && !score }"
          >
            推荐
          </div>
          <div class="left" @click="filterDistance">
            距离
            <span>
              <i
                :class="{ active: distance === 'desc' }"
                class="iconfont rotate iconicon_xuanze_nor"
              ></i>
              <i
                :class="{ active: distance === 'asc' }"
                class="iconfont iconicon_xuanze_sel"
              ></i>
            </span>
          </div>
          <div class="left" @click="filterScore">
            评分
            <span>
              <i class="iconfont rotate iconicon_xuanze_nor"></i>
              <i class="iconfont iconicon_xuanze_sel"></i>
            </span>
          </div>
          <div class="right" @click="show = true">
            筛选
          </div>
        </div>
      </div>
    </van-sticky>
    <!-- 公司区域 -->
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onload"
      finished-text="没有更多了"
    >
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="img">
          <img :src="item.logo" alt="" />
        </div>
        <div class="word">
          <div class="title">
            <div class="left">
              <p>{{ item.name }}</p>
              <p>
                <span>{{ item.region }}</span
                ><span>{{ item.distance }}</span>
              </p>
            </div>
            <div class="right">
              {{ item.score }}
            </div>
          </div>
          <div class="tags">
            <span>{{ item.type }}</span>
            <span>{{ item.step }}</span>
            <span>{{ item.scale }}</span>
          </div>
          <div class="msg">
            在找职位:<span>{{ item.positions }}</span> /最后更新时间:
            {{ item.updated_at | timeformat }}
          </div>
        </div>
      </div>
    </van-list>
    <!-- 筛选区域 -->
    <van-popup v-model="show" position="top" :style="{ height: '70%' }">
      <div class="find">
        <div class="box">
          <div class="title">距离</div>
          <ul>
            <li
              @click="distance = 'desc'"
              :class="{ active: distance === 'desc' }"
            >
              由远及近
            </li>
            <li
              @click="distance = 'asc'"
              :class="{ active: distance === 'asc' }"
            >
              由近及远
            </li>
          </ul>
        </div>
        <div class="box">
          <div class="title">评分</div>
          <ul>
            <li
              @click="scoreRange = item.value"
              :class="{ active: scoreRange === item.value }"
              v-for="(item, index) in rangeList"
              :key="index"
            >
              {{ item.text }}
            </li>
          </ul>
        </div>
        <div class="btns">
          <van-button @click="cancel" class="canBtn" color="#ffe2e9"
            >清除</van-button
          >
          <van-button @click="sure" class="sureBtn" type="danger"
            >确定</van-button
          >
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { apiGetCommpany } from '@/api/question.js'
export default {
  data () {
    return {
      // 输入框中的搜索数据
      value: '',
      // 控制弹出层
      show: false,
      // 是否加载中
      loading: false,
      // 数据是否加载完毕
      finished: false,
      // 起始索引
      start: 0,
      // 个数
      limit: 5,
      // 距离
      distance: undefined, // undefined & desc & asc
      // 评分
      score: undefined,
      // 评分范围
      scoreRange: undefined,
      // 保存数据
      list: [],
      rangeList: [
        { text: '4分-5分', value: '4-5' },
        { text: '3分-4分', value: '3-4' },
        { text: '2分-3分', value: '2-3' },
        { text: '1分-2分', value: '1-2' },
        { text: '1分以下', value: '0-1' }
      ]
    }
  },
  methods: {
    // 重置
    cancel () {
      this.distance = undefined
      this.scoreRange = undefined
      this.score = undefined
    },
    // 点击确认触发
    sure () {
      this.list = []
      this.start = 0
      this.finished = false
      this.onload()
      this.show = false
    },
    // 默认搜索
    fileterStart () {
      // 把所有的数据都进行重置
      this.start = 0
      this.distance = undefined
      this.score = undefined
      this.scoreRange = undefined
      this.loading = false
      this.finished = false
      this.list = []
      // 重新请求数据
      this.onload()
    },
    // 评分筛选
    filterScore () {
      // 判断： 如果 score 为 undefined 则 score 设置为 desc ，否则取反（desc 与 asc 中取反）
      if (!this.score) {
        this.score = 'desc'
      } else {
        this.score = this.score === 'desc' ? 'asc' : 'desc'
      }
      // 清除之前的数据： list start finished
      this.list = []
      this.start = 0
      this.finished = false
      // 重新请求公司数据
      this.onload()
    },
    // 距离筛选
    filterDistance () {
      // 判断： 如果 distance 为 undefined 则 distance 设置为 desc ，否则取反（desc 与 asc 中取反）
      if (!this.distance) {
        this.distance = 'desc'
      } else {
        this.distance = this.distance === 'desc' ? 'asc' : 'desc'
      }
      // 清除之前的数据： list start finished
      this.list = []
      this.start = 0
      this.finished = false
      // 重新请求公司数据
      this.onload()
    },
    async onload () {
      const res = await apiGetCommpany({
        start: this.start,
        limit: this.limit,
        q: this.q,
        distance: this.distance,
        score: this.score,
        scoreRange: this.scoreRange
      })
      // 将所有logo添加基地址
      res.data.list.forEach(item => {
        item.logo = 'http://127.0.0.1:1337' + item.logo
      })
      // console.log(res)
      this.list.push(...res.data.list)
      // 将加载状态设置为 false
      this.loading = false
      // 修改起始下标
      this.start += this.limit
      // 判断数据是否加载完毕
      if (this.list.length >= res.data.total) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.company {
  font-size: 12px;
  margin-bottom: 60px;
  .head {
    background-color: #fff;
    padding: 0 15px;
    .search {
      display: flex;
      align-items: center;
      line-height: 80px;
      span {
        font-size: 20px;
        font-weight: 700;
      }
      .mysearch {
        flex: 1;
        margin-left: 20px;
      }
    }
    .banner {
      img {
        width: 100%;
      }
    }
    .filter {
      display: flex;
      align-items: center;
      padding: 20px 0px;
      .left {
        display: flex;
        align-items: center;
        margin-right: 30px;
        font-size: 14px;
        span {
          display: flex;
          flex-direction: column;
          line-height: 14px;
          .rotate {
            transform: rotate(180deg);
          }
          .iconfont {
            color: #ccc;
          }
        }
      }
      .right {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        font-size: 14px;
      }
    }
  }
  .item {
    padding: 0 15px;
    display: flex;
    margin-bottom: 40px;
    .img {
      img {
        width: 73px;
        height: 73px;
        margin-right: 10px;
      }
    }
    .word {
      flex: 1;
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left p {
          margin: 0;
          &:first-child {
            font-size: 20px;
          }
          &:last-child {
            margin-top: 10px;
          }
        }
      }
      .tags {
        color: #999;
        display: flex;
        margin: 15px 0px;
        span {
          background-color: #f7f4f5;
          padding: 3px 5px;
          margin-right: 10px;
        }
      }
      .msg {
        color: #999;
        span {
          color: #53b5d1;
        }
      }
    }
  }
  /deep/ .van-popup--top,
  /deep/ .van-overlay {
    top: 140px;
  }
  .find {
    padding: 0 15px;
    .box {
      margin-top: 20px;
      .title {
        font-size: 20px;
        font-weight: 700;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 40%;
          text-align: center;
          background-color: #ccc;
          padding: 10px 0;
          margin-top: 20px;
          &:nth-child(2n + 1) {
            margin-right: 4%;
          }
        }
      }
    }
    .btns {
      display: flex;
      margin-top: 40px;
      .canBtn {
        border-radius: 5px;
        flex: 1;
        margin-right: 10px;
        /deep/ span.van-button__text {
          color: red;
        }
      }
      .sureBtn {
        border-radius: 5px;
        flex: 2;
      }
    }
  }
  .active {
    color: red !important;
  }
}
</style>
