<template>
  <div class="myDeatils">
    <!-- 头部导航 -->
    <van-nav-bar title="面试详情">
      <template #left>
        <i @click="$router.go(-1)" class="iconfont iconbtn_nav_back myleft"></i>
      </template>
    </van-nav-bar>
    <div class="main">
      <!-- 文章标题 -->
      <h2>{{ detail.title }}</h2>
      <!-- 作者信息区域 -->
      <div class="author">
        <img class="img" :src="detail.author.avatar" alt="" />
        <div class="msg">
          <div class="name">{{ detail.author.nickname }}</div>
          <div class="time">{{ detail.updated_at | timeformat }}</div>
        </div>
      </div>
      <!-- 文章区域 -->
      <div class="article">
        <span v-html="detail.content"></span>
      </div>
    </div>
    <!-- 评论区域 -->
    <div class="comment">
      <div class="title">
        评论<sup>{{ total }}</sup>
      </div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="item" v-for="(item, index) in commentList" :key="index">
          <div class="top">
            <img
              @click="openReplyComment(item)"
              class="img"
              :src="'http://127.0.0.1:1337' + item.author.avatar"
              alt=""
            />
            <div class="msg">
              <div class="name">{{ item.author.nickname }}</div>
              <div class="time">{{ item.created_at | timeformat }}</div>
            </div>
            <div class="star">
              <span>{{ item.star ? item.star : 0 }}</span>
              <van-icon size="20" name="good-job-o" />
            </div>
          </div>
          <div class="bottom">
            <div class="com">
              {{ item.content }}
            </div>
            <div class="reply" v-if="item.children_comments.length !== 0">
              <div
                class="replymsg"
                v-for="(subitem, subindex) in item.children_comments"
                :key="subindex"
              >
                <span class="name">{{ subitem.author }}</span>
                <span>{{ subitem.content }}</span>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <!-- 书写评论区域 -->
    <div class="write">
      <div class="ipt" @click="openComment">我来补充两句</div>
      <div class="star" @click="collectArt">
        <van-icon v-if="isCollect" color="red" size="24" name="star-o" />
        <van-icon v-else size="24" name="star-o" />
        <span>{{ detail.collect }}</span>
      </div>
      <div class="star" @click="starArt">
        <van-icon v-if="isStar" color="red" size="24" name="good-job-o" />
        <van-icon v-else size="24" name="good-job-o" />
        <span>{{ detail.star }}</span>
      </div>
      <div class="star">
        <van-icon name="share-o" />
        <span>1</span>
      </div>
    </div>
    <!-- 评论面板 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '25%' }">
      <div class="text">
        <!-- 文本域 -->
        <textarea
          class="content"
          v-model="content"
          :placeholder="placehold"
        ></textarea>
        <div class="btnbox">
          <span @click="addcomment">发送</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  apiGetDeatail,
  apiGetComment,
  apiAddComment,
  apiCollectArt,
  apiStarArt
} from '@/api/find.js'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    }),
    // 定义一个属性
    isCollect () {
      return (
        this.userInfo.collectArticles &&
        this.userInfo.collectArticles.includes(+this.id)
      )
    },
    isStar () {
      return (
        this.userInfo.starArticles &&
        this.userInfo.starArticles.includes(+this.id)
      )
    }
  },
  data () {
    return {
      // 文章的id
      id: this.$route.params.id,
      // 文章的详情
      detail: {
        author: {} // 初始值问题 avatar未定义！！异步渲染值为空
      },
      loading: false,
      finished: false,
      // 文章评论数据
      commentList: [],
      // 文章的总数
      total: 0,
      // 页容量
      limit: 5,
      // 开始的下标
      start: 0,
      // 控制面板
      show: false,
      // 输入框中的默认内容
      placehold: '请输入评论',
      // 评论内容
      content: '',
      // 是否是添加回复数据
      isReply: false,
      // 保存当前操作的评论的 id
      commid: 0,
      // 当前操作的评论对象
      comObj: {}
    }
  },
  methods: {
    // 打开回复面板
    openReplyComment (item) {
      this.show = true
      // 修改输入框中的默认内容
      this.placehold = '回复:' + item.author.nickname
      this.isReply = true
      // 当前点击头像所在的评论的id保存起来
      this.commid = item.id
      // 将当前点击头像所在对象保存起来
      this.comObj = item
    },
    // 添加评论和回复数据
    async addcomment () {
      // 判断用户是否登录
      // 得到 userInfo
      if (this.userInfo) {
        // 判断是否是添加评论
        if (this.isReply === false) {
          // 说明已经登录: 提交数据到服务器(添加评论)
          const res = await apiAddComment({
            content: this.content,
            article: this.id
          })
          // 得到返回的评论数据
          const mycomment = res.data
          // 将返回的评论数据添加到评论数据源中
          this.commentList.unshift(mycomment)
          // 关闭面板
          this.show = false
          this.content = ''
        } else {
          // 添加评论的回复
          const res = await apiAddComment({
            content: this.content,
            parent: this.commid
          })
          // 将回复数据追加到评论数据的 children_comments 中
          console.log(res.data)
          // 关闭面板
          this.show = false
          // 将回复的数据追加到children_comments中
          this.comObj.children_comments.push(res.data)
          this.content = ''
        }
      } else {
        // 说明未登录：跳转到登录
        this.$router.push(`/login?_redirect=${this.$route.fullPath}`)
      }
    },
    // 打开评论面板
    openComment () {
      this.show = true
      this.isReply = false
      this.placehold = '请输入评论数据'
    },
    // 得到评论数据
    async onLoad () {
      const res = await apiGetComment({
        id: this.id,
        limit: this.limit,
        start: this.start
      })
      console.log(res)
      this.commentList.push(...res.data.list)
      this.total = res.data.total
      // 修改起始下标
      this.start += this.limit
      // 执行onload事件
      this.loading = false
      if (this.commentList.length >= this.total) {
        this.finished = true
      }
    },
    // 定义得到文章详情的方法
    async getDeatil () {
      const res = await apiGetDeatail(this.id)
      // 给图片拼接基本地址
      console.log(res)
      res.data.author.avatar = 'http://127.0.0.1:1337' + res.data.author.avatar
      this.detail = res.data
    },
    // 收藏&取消方法
    async collectArt () {
      // 判断用户是否登录
      if (this.userInfo) {
        const res = await apiCollectArt(this.id)
        // 更新当前作者收藏的数据
        this.detail.collect = res.data.num
        // 更新当前作者收藏的文章集合
        this.userInfo.collectArticles = res.data.list
        if (this.isCollect) {
          // 处于收藏状态
          this.$toast.success('收藏成功')
        } else {
          // 处于未收藏状态
          this.$toast.success('取消收藏成功')
        }
      } else {
        // 说明未登录：跳转到登录
        this.$router.push(`/login?_redirect=${this.$route.fullPath}`)
      }
    },
    // 点赞&取消方法
    async starArt () {
      if (this.userInfo) {
        const res = await apiStarArt(this.id)
        // 更新当前作者点赞的文章
        console.log(res)
        this.detail.star = res.data.num
        this.detail.starArticles = res.data.list
        if (this.isStar) {
          // 处于点赞状态
          this.$toast.success('点赞成功')
        } else {
          // 处于未收藏状态
          this.$toast.success('取消点赞成功')
        }
      } else {
        // 说明未登录：跳转到登录
        this.$router.push(`/login?_redirect=${this.$route.fullPath}`)
      }
    }
  },
  created () {
    // 得到文章详情
    this.getDeatil()
  }
}
</script>

<style lang="less" scoped>
.myDeatils {
  font-size: 12px;
  margin-bottom: 80px;
  /deep/ .van-nav-bar__left {
    padding-left: 0px !important;
  }
  /deep/ .van-nav-bar__title.van-ellipsis {
    font-size: 16px;
  }
  .myleft {
    font-size: 40px;
  }
  .main {
    padding: 0 15px;
    h2 {
      font-weight: 400;
    }
    .author {
      display: flex;
      .img {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .msg {
        .name {
          font-weight: 700;
          line-height: 20px;
        }
        .time {
          color: #999;
        }
      }
    }
    .article {
      margin-top: 40px;
      font-size: 16px;
      /deep/ img {
        width: 100%;
      }
    }
  }
  .comment {
    padding: 0 15px;
    .title {
      margin-top: 30px;
      font-size: 18px;
      sup {
        color: #999;
        margin-left: 5px;
      }
    }
    .item {
      margin-top: 20px;
      .top {
        display: flex;
        .img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .msg {
          flex: 1;
          .name {
            font-weight: 700;
            line-height: 20px;
          }
        }
      }
      .bottom {
        margin-left: 50px;
        .reply {
          background-color: #eeeeee;
          padding: 15px;
          margin-top: 10px;
          .replymsg {
            margin-bottom: 10px;
            .name {
              color: #696a82;
            }
          }
        }
      }
    }
  }
  .write {
    display: flex;
    padding: 10px 15px 20px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;
    .ipt {
      flex: 1;
      background-color: #eeeeee;
      height: 40px;
      line-height: 40px;
      padding-left: 5px;
    }
    .star {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: 20px;
      .van-icon {
        font-size: 20px;
      }
    }
  }
  .text {
    padding: 20px 15px 0px;
    .content {
      width: 100%;
      height: 100px;
      border: none;
      background-color: #eee;
      padding: 15px;
      box-sizing: border-box;
      font-size: 14px;
    }
    .btnbox {
      margin-top: 10px;
      text-align: right;
      font-size: 16px;
      color: #999;
    }
  }
}
</style>
