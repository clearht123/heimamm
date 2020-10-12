<template>
  <div class="my">
    <!-- 个人信息 -->
    <div class="user">
      <!-- 用户信息 -->
      <div class="info">
        <div class="i-l">
          <div class="name">{{ userInfo.nickname }}</div>
          <div class="intro">{{ userInfo.intro }}</div>
        </div>
        <img @click="$router.push('/info')" class="i-r" :src="userInfo.avatar" alt="" />
      </div>
      <!-- 用户数据 -->
      <div class="user-data">
        <ul>
          <li>
            <p class="question-data">{{ userInfo.submitNum }}</p>
            <span class="question-info">累计答题</span>
          </li>
          <li>
            <p class="question-data">{{ userInfo.collectQuestions.length }}</p>
            <span class="question-info">收藏题目</span>
          </li>
          <li>
            <p class="question-data">{{ userInfo.errorQuestions.length }}</p>
            <span class="question-info">我的错题</span>
          </li>
          <li>
            <p class="question-data">
              {{
                (
                  ((userInfo.submitNum - userInfo.errorNum) /
                    userInfo.submitNum) *
                  100
                ).toFixed(0) + '%'
              }}
            </p>
            <span class="question-info">正确率</span>
          </li>
        </ul>
      </div>
      <!-- 岗位信息 -->
      <div class="job">
        <van-cell
          class="mycell"
          title="我的岗位"
          :value="userInfo.position"
          is-link
        >
          <template #icon>
            <i class="iconfont myicon iconicon_mine_gangwei"></i>
          </template>
        </van-cell>
      </div>
    </div>
    <!-- 其他数据 -->
    <div class="other">
      <!-- 面经数据 -->
      <div class="face">
        <div class="title">面经数据</div>
        <ul class="read">
          <li class="r-item">
            <div>
              昨日阅读
              <span class="mycolor">+{{ userInfo.shareData.read.yesterday }}</span>
            </div>
            <div>{{ userInfo.shareData.read.total }}</div>
            <div>阅读总数</div>
          </li>
          <li class="r-item">
            <div>
              昨日获赞
              <span class="mycolor">+{{ userInfo.shareData.star.yesterday }}</span>
            </div>
            <div>{{ userInfo.shareData.star.total }}</div>
            <div>获赞总数</div>
          </li>
          <li class="r-item">
            <div>昨日新增<span class="mycolor">+{{ userInfo.shareData.comment.yesterday }}</span></div>
            <div>{{ userInfo.shareData.comment.total }}</div>
            <div>评论总数</div>
          </li>
        </ul>
      </div>
      <!-- 其它选项 -->
      <van-cell-group class="otheritem">
        <van-cell class="mycell" title="我的面经分享" value="21" is-link>
          <template #icon>
            <i class="iconfont myicon iconicon_mine_mianjing"></i>
          </template>
        </van-cell>
        <van-cell class="mycell" title="我的消息" value="98" is-link>
          <template #icon>
            <i class="iconfont myicon iconicon_mine_xiaoxi"></i>
          </template>
        </van-cell>
        <van-cell class="mycell" title="收藏的题库" value="29" is-link>
          <template #icon>
            <i class="iconfont myicon iconicon_mine_tikushoucang"></i>
          </template>
        </van-cell>
        <van-cell class="mycell" title="收藏的企业" value="32" is-link>
          <template #icon>
            <i class="iconfont myicon iconicon_mine_qiyeshoucang"></i>
          </template>
        </van-cell>
        <van-cell class="mycell" title="我的错题" value="123" is-link>
          <template #icon>
            <i class="iconfont myicon iconicon_mine_cuoti"></i>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  // 将vuex中的数据映射到computed中
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  }
}
</script>

<style lang="less" scoped>
.my {
  font-size: 12px;
  .user {
    height: 216px;
    background: linear-gradient(#ce0031, #b8002c);
    color: #fff;
    .info {
      padding: 31px 37px 0 15px;
      display: flex;
      justify-content: space-between;
      .i-l {
        .name {
          font-size: 22px;
          font-weight: 700;
        }
        .intro {
          margin-top: 6px;
          opacity: 0.7;
        }
      }
      .i-r {
        width: 50px;
        height: 50px;
        box-sizing: border-box;
        border-radius: 50%;
        border: 4px solid #c7697e;
      }
    }
    .user-data {
      ul {
        display: flex;
        justify-content: space-around;
        align-items: center;
        text-align: center;
        li {
          flex: 1;
          .question-data {
            font-size: 21px;
            font-weight: 700;
            text-align: center;
          }
          .question-info {
            width: 49px;
            opacity: 0.7;
            display: block;
            font-size: 12px;
            margin-top: -14px;
            margin-left: 20px;
          }
        }
      }
    }
    .job {
      margin: 20px 15px 0;
      .mycell {
        border-radius: 10px 10px 0px 0px;
        padding: 20px;
      }
    }
  }
  .other {
    padding: 30px 15px;
    .face {
      padding: 15px;
      .title {
        font-weight: 700;
        font-size: 14px;
      }
      .mycolor {
        color: #53b5d1;
      }
      .read {
        margin-top: 18px;
        display: flex;
        .r-item {
          flex: 1;
          text-align: center;
          div:nth-child(2) {
            font-size: 24px;
            font-weight: 700;
            margin: 5px 0px;
          }
        }
      }
    }
    .otheritem {
      margin-top: 30px;
      .mycell {
        padding: 20px 30px;
      }
    }
  }
  .myicon {
    margin-right: 10px;
    font-size: 26px;
  }
}
</style>
