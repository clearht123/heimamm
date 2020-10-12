<template>
  <div class="upload">
    <!-- 头部导航 -->
    <van-nav-bar title="修改头像">
      <template #left>
        <i @click="$router.go(-1)" class="iconfont iconbtn_nav_back myleft"></i>
      </template>
      <template #right>
        <span v-if="isSave" @click="save">保存</span>
      </template>
    </van-nav-bar>
    <!-- 上传区域 -->
    <div class="main">
      <van-uploader
        v-model="fileList"
        :after-read="afterRead"
        preview-size="200"
        :max-count="1"
      />
    </div>
  </div>
</template>

<script>
// 导入方法
import { apiUpload, apiEdit } from '@/api/login.js'
export default {
  data () {
    return {
      // 控制保存的显示与隐藏
      isSave: false,
      // 设置默认图片
      fileList: [
        {
          url: this.$store.state.userInfo.avatar,
          status: 'done',
          message: '上传中...'
        }
      ],
      // 上传成功后图片的id
      imgId: 0
    }
  },
  methods: {
    // 上传成功之后的回调函数
    async afterRead (file) {
      // status：图片的状态 message：状态的说明 file：图片对象
      // 上传时添加 loading 效果
      file.status = 'uploading'
      file.message = '上传中'
      const res = await apiUpload(file.file)
      // 将上传之后的图片id保存起来
      this.imgId = res.data[0].id
      console.log('头像', res)
      // 显示保存按钮
      this.isSave = true
      // 清除加载效果
      file.status = 'done'
    },
    async save () {
      // 修改用户头像
      await apiEdit({
        avatar: this.imgId // 接收返回图片的id
      })
      // 重新得到用户信息
      this.$store.dispatch('setUserInfo')
      // 跳转到 info
      this.$router.push('/info')
    }
  }
}
</script>

<style lang="less" scoped>
.upload {
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
  .main {
    margin-top: 10px;
    text-align: center;
  }
}
</style>
