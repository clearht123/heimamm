<template>
  <div class="inter" v-if="currentQue.detail">
    <!-- 头部导航 -->
    <van-nav-bar>
      <template #title>
        <div>
          面试题<sup>{{ questionList.length }}</sup>
        </div>
      </template>
      <template #left>
        <i
          @click="$router.go(-1)"
          class="iconfont iconbtn_nav_back mylefticon"
        ></i>
      </template>
      <template #right>
        <div @click="show = true">答题卡</div>
      </template>
    </van-nav-bar>
    <!-- 试题区域 -->
    <div class="question">
      <!-- 题面 -->
      <div class="title">
        <span v-if="currentQue.detail.type === 1">【 单选 】</span>
        <span v-if="currentQue.detail.type === 2">【 多选 】</span>
        <span v-if="currentQue.detail.type === 3">【 简答 】</span>
        <span>{{ currentQue.detail.title }}</span>
      </div>
      <!-- tags -->
      <div class="tags">
        <span v-for="(item, index) in currentQue.detail.tag" :key="index">{{
          item
        }}</span>
      </div>
      <!-- 选项：单选 -->
      <van-radio-group v-if="currentQue.detail.type === 1" v-model="radio">
        <!-- setcss 有返回值：三种： 空  error right -->
        <van-radio name="A" :class="setcss('A')">
          <template #icon>
            A.
          </template>
          <template>
            <div class="option">
              <span>{{ currentQue.detail.option[0] }}</span>
              <i class="iconfont iconicon_cuowu"></i>
              <i class="iconfont iconicon_zhengque"></i>
            </div>
          </template>
        </van-radio>
        <van-radio name="B" :class="setcss('B')">
          <template #icon>
            B.
          </template>
          <template>
            <div class="option">
              <span>{{ currentQue.detail.option[1] }}</span>
              <i class="iconfont iconicon_cuowu"></i>
              <i class="iconfont iconicon_zhengque"></i>
            </div>
          </template>
        </van-radio>
        <van-radio name="C" :class="setcss('C')">
          <template #icon>
            C.
          </template>
          <template>
            <div class="option">
              <span>{{ currentQue.detail.option[2] }}</span>
              <i class="iconfont iconicon_cuowu"></i>
              <i class="iconfont iconicon_zhengque"></i>
            </div>
          </template>
        </van-radio>
        <van-radio name="D" :class="setcss('D')">
          <template #icon>
            D.
          </template>
          <template>
            <div class="option">
              <span>{{ currentQue.detail.option[3] }}</span>
              <i class="iconfont iconicon_cuowu"></i>
              <i class="iconfont iconicon_zhengque"></i>
            </div>
          </template>
        </van-radio>
      </van-radio-group>
      <!-- 选项：多选 -->
      {{ result }}
      <van-checkbox-group v-if="currentQue.detail.type === 2" v-model="result">
        <van-checkbox
          name="A"
          :class="setcss('A')"
          :disabled="!!currentQue.result"
        >
          <template #icon>
            A.
          </template>
          <template>
            <div class="option">
              <span>{{ currentQue.detail.option[0] }}</span>
              <i class="iconfont iconicon_cuowu"></i>
              <i class="iconfont iconicon_zhengque"></i>
            </div>
          </template>
        </van-checkbox>
        <van-checkbox
          name="B"
          :class="setcss('B')"
          :disabled="!!currentQue.result"
        >
          <template #icon>
            B.
          </template>
          <template>
            <div class="option">
              <span>{{ currentQue.detail.option[1] }}</span>
              <i class="iconfont iconicon_cuowu"></i>
              <i class="iconfont iconicon_zhengque"></i>
            </div>
          </template>
        </van-checkbox>
        <van-checkbox
          name="C"
          :class="setcss('C')"
          :disabled="!!currentQue.result"
        >
          <template #icon>
            C.
          </template>
          <template>
            <div class="option">
              <span>{{ currentQue.detail.option[2] }}</span>
              <i class="iconfont iconicon_cuowu"></i>
              <i class="iconfont iconicon_zhengque"></i>
            </div>
          </template>
        </van-checkbox>
        <van-checkbox
          name="D"
          :class="setcss('D')"
          :disabled="!!currentQue.result"
        >
          <template #icon>
            D.
          </template>
          <template>
            <div class="option">
              <span>{{ currentQue.detail.option[3] }}</span>
              <i class="iconfont iconicon_cuowu"></i>
              <i class="iconfont iconicon_zhengque"></i>
            </div>
          </template>
        </van-checkbox>
      </van-checkbox-group>
      <!-- 简答 -->
      <!-- 答案解析 -->
      <div class="answer" v-if="currentQue.result">
        <h2>答案解析</h2>
        <div class="result">
          正确答案：
          <span v-if="currentQue.result.singleAnswer">{{
            currentQue.result.singleAnswer
          }}</span>
          <span v-if="currentQue.result.multipleAnswer">{{
            currentQue.result.multipleAnswer.join(',')
          }}</span>
        </div>
        <div class="msg">
          <span
            >难度：
            <span v-if="currentQue.result.difficulty === '1'">简单</span>
            <span v-if="currentQue.result.difficulty === '2'">中等</span>
            <span v-if="currentQue.result.difficulty === '3'">困难</span>
          </span>
          <span>提交次数：{{ currentQue.result.submitNum }}</span>
          <span>正确次数：{{ currentQue.result.correctNum }}</span>
        </div>
        <div class="detail">
          {{ currentQue.result.answerAnalysis }}
        </div>
      </div>
    </div>
    <!-- 底部区域 -->
    <div class="bottom">
      <div class="item star">
        <van-icon name="star-o" />
        <span>收藏</span>
      </div>
      <div class="item star">
        <van-icon name="edit" />
        <span>反馈</span>
      </div>
      <div class="item que">
        <span class="myfont">{{ currentIndex + 1 }}</span
        >/{{ questionList.length }}题
      </div>
      <div class="item que">
        <van-button
          v-if="!currentQue.result && !isFinished"
          @click="submit"
          :disabled="isDisable"
          class="mybtn"
          type="danger"
          >提交</van-button
        >
        <van-button
          @click="nextOne"
          v-if="currentQue.result && !isFinished"
          class="mybtn"
          type="info"
          >下一题</van-button
        >
        <van-button
          @click="endAnswer"
          v-if="isFinished"
          class="mybtn"
          type="danger"
          >结束</van-button
        >
      </div>
    </div>
    <!-- 答题卡区域 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '80%' }">
      <van-nav-bar title="答题卡">
        <template #right>
          <span>{{ currentIndex }}</span
          >/ <span>{{ questionList.length }}</span
          >题目</template
        >
      </van-nav-bar>
      <ul class="qubox">
        <li
          :class="{
            current: currentIndex === index,
            error: item.result && !item.result.isRight,
            right: item.result && item.result.isRight
          }"
          v-for="(item, index) in questionList"
          :key="index"
          @click="toIndex(index)"
        >
          {{ index + 1 }}
        </li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
import { apiGetQuestion, apiGetSubmit, apiGetnext } from '@/api/question.js'
export default {
  data () {
    return {
      // 单选框的结果
      radio: '',
      // 多选框的结果
      result: [],
      // 接收城市名
      city: this.$route.query.city,
      // 接收岗位 id
      type: this.$route.query.type,
      // 题目列表
      questionList: [],
      // 选中题目的下标
      currentIndex: 0,
      // 控制弹出层
      show: false
    }
  },
  computed: {
    // 设置选项的类名： 返回值：函数
    //  而返回的函数的返回值： '' / error / right
    setcss () {
      return str => {
        // 判断：当前是什么题型（单选&多选）
        if (!this.currentQue.result) {
          return '' // 如果不存在题面返回空
        }
        if (this.currentQue.detail.type === 1) {
          // 说明是单选：还需要判断当前选是否为正确
          //           正确答案                    当前选项的结果
          if (this.currentQue.result.singleAnswer === str) {
            // 说明该选项是正确选项
            return 'right'
          }
          if (
            // 我们选中的选项  ===  当前选项的结果
            this.radio === str &&
            //               正确答案    !==     当前选项的结果
            this.currentQue.result.singleAnswer !== str
          ) {
            // 说明该选项是我们选择的选项，但是这个选项不正确
            return 'error'
          }
        }
        if (this.currentQue.detail.type === 2) {
          if (this.currentQue.result.multipleAnswer.includes(str)) {
            return 'right' // 当前项的结果在正确答案的数组中
          }
          if (
            this.result.includes(str) &&
            !this.currentQue.result.multipleAnswer.includes(str)
          ) {
            return 'error' // 1.0 当前项是我们选中的项 2.0 当前项在不正确答案中
          }
        }
        return ''
      }
    },
    // 得到当前选中的题目
    currentQue () {
      // 从题目列表中去取
      return this.questionList[this.currentIndex] || {}
    },
    // 判断是否答题完毕
    isFinished () {
      // 判断是否存在数组
      return this.questionList.every(item => {
        return item.result
      })
    },
    // 设置按钮的禁用状态
    isDisable () {
      if (this.currentQue.detail.type === 1) {
        // 说明是单选框
        return !this.radio // 如果单选框中没有选中内容：返回 true 否则返回 false
      }
      return false
    }
  },
  methods: {
    // 跳题
    async toIndex (index) {
      // 当前下标修改为 index
      this.currentIndex = index
      // 判断当前index对应的题目是否存在题面
      if (!this.currentQue.detail) {
        // 根据 index 元素对应的id去服务器中得到题面
        const res = await apiGetnext(this.currentQue.id)
        // 保存起来
        this.$set(this.questionList[this.currentIndex], 'detail', res.data)
      }
    },
    // 结束答题
    endAnswer () {
      this.$toast.success('哎呀，真厉害，所有的题目都答完啦！！')
    },
    // 下一题
    async nextOne () {
      // 当前下标加加
      this.currentIndex++
      // 清空之前的单选
      this.radio = ''
      // 清空之前的多选项
      this.result = []
      const res = await apiGetnext(this.currentQue.id)
      console.log(res)
      // 保存数据:保存到currenIndex对应的元素中
      this.$set(this.questionList[this.currentIndex], 'detail', res.data)
    },
    // 提交答案
    async submit () {
      // 将选中的答案提交到服务器
      const res = await apiGetSubmit({
        id: this.currentQue.id,
        singleAnswer: this.radio,
        multipleAnswer: this.result
      })
      // 将响应回来的答案信息保存到当前题目中的 result 属性中
      // this.questionList[this.currentIndex].result = res.data // 这个 result 属性没有响应式的特点
      this.$set(this.questionList[this.currentIndex], 'result', res.data)
    },
    // 得到题目信息
    async getQuestion () {
      const res = await apiGetQuestion({
        city: this.city,
        type: this.type
      })
      // 保存题目信息
      this.questionList = res.data
    }
  },
  created () {
    // 得到题目信息
    this.getQuestion()
  }
}
</script>

<style lang="less" scoped>
.inter {
  font-size: 12px;
  margin-bottom: 94px;
  /deep/ .van-nav-bar__left {
    padding-left: 0px !important;
  }
  .mylefticon {
    font-size: 44px;
  }
  /deep/ .van-nav-bar__title.van-ellipsis {
    font-size: 18px;
  }
  .question {
    padding: 30px 15px;
    .title {
      font-size: 16px;
    }
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    span {
      padding: 5px;
      background-color: #eee;
      margin: 10px 10px 0 0;
      font-size: 14px;
      color: #999;
    }
  }
  /deep/ .van-radio,
  /deep/ .van-checkbox {
    padding: 10px 20px;
    margin-top: 20px;
    border: 1px solid transparent;
  }
  /deep/ .van-radio {
    padding: 10px 20px;
    margin-top: 20px;
  }
  /deep/ .van-radio__label,
  /deep/ .van-radio__label {
    font-size: 16px;
    color: #ccc;
  }
  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 30px;
    background-color: #eee;
    display: flex;
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .star {
      flex: 1;
      display: flex;
      flex-direction: column;
      font-size: 24px;
      span {
        margin-top: 5px;
        font-size: 14px;
      }
    }
    .que {
      flex: 2;
      font-size: 14px;
      .myfont {
        font-size: 20px;
        font-weight: 700;
        color: red;
      }
      .mybtn {
        padding: 0px 35px;
      }
    }
  }
  // 设置选中元素的样式
  [aria-checked='true'] {
    border: 1px solid #ccc;
  }
  .error {
    background: #ffefea;
    .iconicon_cuowu {
      color: #ec5851;
      display: block !important;
    }
  }
  .right {
    background: #ddfad9;
    .iconicon_zhengque {
      color: #1dc779;
      display: block !important;
    }
  }
  .option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .iconfont {
      display: none;
    }
  }
  .qubox {
    display: flex;
    flex-wrap: wrap;
    padding: 40px 20px;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;
      border: 1px solid #ccc;
      border-radius: 50%;
      color: #ccc;
      margin-right: 10px;
      margin-bottom: 15px;
    }
    .current {
      border: 1px solid #666;
      color: #666;
    }
    .error {
      background-color: #ffefea;
      color: #ff4c4c;
    }
    .right {
      background-color: #ddfad9;
      color: #22c87b;
    }
  }
}
</style>
