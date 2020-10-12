<template>
  <div class="mytechnic">
    <!-- 技巧组件  -->
    <van-cell>
      <template #title>
        <div class="item">
          <div class="word">
            <div class="top">
              {{ item.title }}
            </div>
            <div class="bottom">
              <div class="time">{{ item.updated_at | timeformat }}</div>
              <div class="look">
                <i class="iconfont iconicon_liulanliang"></i>
                <span>{{ item.read }}</span>
              </div>
              <div class="star">
                <i class="iconfont iconbtn_dianzan_small_nor"></i>
                <span>{{ item.star }}</span>
              </div>
            </div>
          </div>
          <img class="img" :src="'http://127.0.0.1:1337' + item.cover" alt="" />
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  // 接收父组件参数
  props: ['item']
}
</script>

<style lang="less" scoped>
.mytechnic {
  .item {
    display: flex;
    .word {
      flex: 1;
      .top {
        font-size: 18px;
      }
      .bottom {
        margin-top: 8px;
        display: flex;
        align-items: center;
        .time {
          flex: 1;
        }
        .look {
          margin: 10px;
        }
        .star {
          margin: 10px;
        }
        span {
          margin-left: 5px;
        }
      }
    }
    .img {
      width: 125px;
      height: 83px;
      margin-left: 10px;
    }
  }
}
</style>
