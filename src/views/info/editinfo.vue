<template>
  <div class="editinfo">
    <van-nav-bar :title="title">
      <template #left>
        <i @click="$router.go(-1)" class="iconfont iconbtn_nav_back myleft"></i>
      </template>
      <template #right>
        <span v-if="isSave" @click="save">保存</span>
      </template>
    </van-nav-bar>
    <div class="mydie">
      <van-field class="editnick" @input="isSave = true" v-model="value" />
    </div>
  </div>
</template>

<script>
// 导入修改的方法
import { apiEdit } from '@/api/login.js'
export default {
  data () {
    return {
      // 按钮保存按钮的显示与隐藏
      isSave: false,
      // 页面的标题
      title: '',
      // 文本框的内容
      value: '',
      // 传入的需要修改的数据            路由传值
      prop: this.$route.query.prototype
    }
  },
  created () {
    // 判断:prop是否是nickename
    if (this.prop === 'nickname') {
      // 设置标题
      this.title = '修改昵称'
    } else if (this.prop === 'intro') {
      this.title = '修改个性签名'
    }
    this.value = this.$store.state.userInfo[this.prop]
  },
  methods: {
    async save () {
      this.$toast.loading({
        duration: 0
      })
      // 修改之后的昵称提交
      await apiEdit({
        [this.prop]: this.value
      })
      // if(this.prop === 'nickname'){
      //     // 修改之后的昵称提交
      //     await apiEdit({
      //         nickname:this.value
      //     })
      // }else if(this.prop === 'intro'){
      //     // 修改之后的签名提交
      //     await apiEdit({
      //         intro:this.value
      //     })
      // }
      // 更新数据
      this.$store.dispatch('setUserInfo')
      // 跳转
      this.$router.push('/info')
      this.$toast.success('修改成功')
    }
  }
}
</script>

<style lang="less" scoped>
.editinfo {
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
  .mydie {
    margin: 10px;
    .editnick {
      background-color: #eee;
      border-radius: 5px;
    }
  }
}
</style>
