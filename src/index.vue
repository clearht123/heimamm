<template>
  <div class="login">
    <!-- 头部导航 -->
    <van-nav-bar>
      <template #left>
        <i class="iconfont iconbtn_nav_back mylefticon"></i>
      </template>
    </van-nav-bar>
    <!-- 内容区域 -->
    <div class="content">
      <!-- 标题 -->
      <h2>您好，请登录</h2>
      <!-- 表单区域 -->
      <van-form ref="myform" @submit="login">
        <!-- 手机号 -->
        <van-field
          :rules="rules.mobile"
          v-model="use.mobile"
          name="mobile"
          placeholder="请输入手机号"
        >
          <template #left-icon>
            <i class="iconfont iconbianzu1"></i>
          </template>
        </van-field>
        <!-- 验证码 -->
        <van-field
          :rules="rules.code"
          v-model="use.code"
          placeholder="请输入验证码"
        >
          <template #button>
            <span @click="getCode" class="mycolor">
              {{ isback ? time + 'S后重新发送' : '获取验证码' }}
            </span>
          </template>
          <template #left-icon>
            <i class="iconfont iconyanzhengma"></i>
          </template>
        </van-field>
        <!-- 同意协议 -->
        <p class="word">
          登录既同意
          <span class="mycolor">《用户使用协议》</span>
          和
          <span class="mycolor">《隐私协议》</span>
        </p>
        <div class="loginBtn">
          <van-button round block type="danger">
            确定
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
// 导入操作 登录 的方法
import { apiGetCode, apiLogin } from '@/api/au.js'
// 导入操作 local 的方法
import { localset } from '@/utils/local.js'
export default {
  data () {
    return {
      use: {
        mobile: '18888881111',
        code: ''
      },
      // 添加验证规则
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'onBlur' }, // 非空判断
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '请输入正确的手机号',
            trigger: 'onBlur'
          }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'onBlur' }, // 非空判断
          {
            pattern: /^\d{4}$/,
            message: '请输入正确的验证码',
            trigger: 'onBlur'
          }
        ]
      },
      // 是否处于倒计时
      isback: false,
      // 倒计时的时长
      time: 5,
      // 定义倒计时的定时器
      timer: null
    }
  },
  methods: {
    // 提交登录的参数
    async login () {
      // 添加加载效果
      this.$toast.loading({
        duration: 0 // 一直加载
      })
      try {
        const res = await apiLogin(this.use)
        console.log(res)
        // 保存用户登录的 token
        localset('heimamm_token', res.data.jwt)
        // 将得到用户的信息中的头像地址拼接完整
        res.data.user.avatar = 'http://localhost:1337' + res.data.user.avatar
        // 保存用户信息到 vuex 中
        this.$store.commit('setUserInfo', res.data.user)
        // 提示登录成功
        this.$toast.success('登录成功')
        // 跳转到`首页`
        this.$router.push('/my')
      } catch (err) {
        console.log(err)
      }
    },
    // 得到服务器中的验证码
    async getCode () {
      // 判断是否处于倒计时
      if (this.isback) {
        // 说明正倒计时
        return
      }
      try {
        // 校验手机号是否合法
        await this.$refs.myform.validate('mobile')
        // 将倒计时状态开启
        this.isback = true
        // 让时间减减
        this.timer = setInterval(() => {
          this.time--
          // 如果时间小于 0 就要停止定时器
          if (this.time < 0) {
            // 清除定时器
            clearInterval(this.timer)
            // 关闭倒计时的状态
            this.isback = false
            // 重置倒计时的时间
            this.time = 5
          }
        }, 1000)

        // 添加加载动画
        this.$toast.loading({
          duration: 0, // 一直显示
          message: '加载中', // 加载的文本
          forbidClick: true // 禁止点击背景
        })
        const resCode = await apiGetCode(this.use.mobile)
        console.log(resCode)
        this.$toast.success(resCode.data)
      } catch (error) {
        // 提示用户，错误信息
        this.$toast.fail(error.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
// scoped：让样式只在当前组件中起作用
// 为了能够让设置了 scoped 的样式响应到子组件中内部去，可以使用一个选择器： 深度选择器 /deep/
.login {
  font-size: 12px;
  /deep/ .van-nav-bar__left {
    padding-left: 0px !important;
  }
  .mylefticon {
    font-size: 44px;
  }
  .content {
    padding: 0 15px;
    h2 {
      margin-top: 50px;
      margin-bottom: 63px;
    }
  }
  .mycolor {
    color: #16bed8;
  }
  .word {
    margin: 15px 0 12px 0;
  }
  .loginBtn {
    margin-top: 44px;
  }
}
</style>
