<template>
  <div class="share">
    <van-cell @click="$router.push(`/sharedeatils/${item.id}`)">
      <template #title>
        <div class="title">
          <span v-html="item.title"></span>
        </div>
        <div class="content">
          {{ item.content }}
        </div>
        <div class="other">
          <div class="auth">
            <img
              class="img"
              :src="'http://127.0.0.1:1337' + item.author.avatar"
              alt=""
            />
            <span>{{ item.author.nickname }}</span>
          </div>
          <div class="time">{{ item.updated_at | timeformat }}</div>
          <div class="comment">
            <i class="iconfont iconicon_pinglunliang"></i>
            <span>{{ item.article_comments }}</span>
          </div>
          <div class="star">
            <i class="iconfont iconbtn_dianzan_small_nor"></i>
            <span>{{ item.star }}</span>
          </div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style lang="less" scoped>
.share {
  .title {
    font-size: 16px;
    line-height: 40px;
  }
   .van-cell__title {
    width: 100%;
    .content {
      font-size: 14px;
      line-height: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      /*! autoprefixer: off */
      -webkit-box-orient: vertical;
    }
  }
  .other {
    margin-top: 15px;
    display: flex;
    color: #b4b4bd;
    .auth {
      flex: 1;
      display: flex;
      align-items: center;
    }
    .img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .time {
      margin-right: 20px;
    }
    .comment,
    .star {
      margin-right: 20px;
      span {
        margin-left: 10px;
      }
    }
  }
}
</style>
