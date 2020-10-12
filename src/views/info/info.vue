<template>
  <div class="info">
    <van-nav-bar title="我的资料">
      <template #left>
        <i @click="$router.go(-1)" class="iconfont iconbtn_nav_back myleft"></i>
      </template>
    </van-nav-bar>
    <!-- 个人信息选项 -->
    <div class="groupbox">
      <van-cell-group>
        <van-cell title="头像" @click="$router.push('/editUpload')" is-link>
          <template #default>
            <img class="myimg" :src="userInfo.avatar" alt="" />
          </template>
        </van-cell>
        <van-cell
          title="昵称"
          @click="todoEist('nickname')"
          :value="userInfo.nickname"
          is-link
        />
        <van-cell @click="gendershow = true" title="性别" is-link>
          <template #default>
            <span v-if="userInfo.gender === 0">未知</span>
            <span v-if="userInfo.gender === 1">男孩子</span>
            <span v-if="userInfo.gender === 2">女孩子</span>
          </template>
        </van-cell>
        <van-cell
          @click="areashow = true"
          title="地区"
          :value="areaList.city_list[userInfo.area]"
          is-link
        />
        <van-cell
          title="个人简介"
          @click="todoEist('intro')"
          :value="userInfo.intro"
          is-link
        />
      </van-cell-group>
    </div>
    <!-- 退出按钮 -->
    <div class="btnbox">
      <van-button @click="logout" class="btn" type="default" plain size="large"
        >退出登录</van-button
      >
    </div>
    <!-- 性别修改面板 -->
    <van-popup
      v-model="gendershow"
      position="bottom"
      :style="{ height: '40%' }"
      close-on-click-overlay=""
    >
      <van-picker
        title="标题"
        show-toolbar
        :columns="columns"
        :default-index="userInfo.gender"
        @cancel="gendershow = false"
        @confirm="savearea"
      />
    </van-popup>
    <!-- 地区修改的面板 -->
    <van-popup
      v-model="areashow"
      position="bottom"
      :style="{ height: '40%' }"
      :close-on-click-overlay="false"
    >
      <!-- area-list: 地区的数据源 columns-num: 显示的列表数  -->
      <van-area
        title="标题"
        :value="userInfo.area"
        :area-list="areaList"
        :columns-num="2"
        @cancel="areashow = false"
        @confirm="savearea"
      />
    </van-popup>
  </div>
</template>

<script>
// 导入辅助函数
import { mapState } from 'vuex'
// 清除 token
import { localdel } from '@/utils/local.js'
// 导入修改的方法
import { apiEdit } from '@/api/login.js'
// 导入地区的数据源
import areaList from '@/utils/area.js'
export default {
  data () {
    return {
      // 性别状态面板打开
      gendershow: false,
      // 选项的数据源
      columns: ['未知', '男孩子', '女孩子'],
      // 地区面板的打开状态
      areashow: false,
      // 定义一个数据源
      areaList: areaList
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  },
  methods: {
    // 点击确定保存地区
    async savearea (data) {
      // 关闭面板
      this.areashow = false
      this.$toast.loading({
        duration: 0
      })
      // console.log(data[1].code) 要修改的地区数据
      // 将数据提交到服务器
      await apiEdit({
        area: data[1].code
      })
      // 更新数据
      this.$store.dispatch('setUserInfo')
      this.$toast.success('地区修改成功')
    },
    // 保存性别
    async savegender (value, index) {
      // value: 选中的文本
      // index: 选中文本对应的下标(就是需要的性别)
      this.$toast.loading({
        duration: 0
      })
      await apiEdit({
        gender: index
      })
      // 关闭面板
      this.gendershow = false
      //   // 更新 vuex 中的数据（重新请求用户信息）
      //   const res = await apiGetInfo()
      //   // 将头像进行拼接
      //   res.data.avatar = 'http://127.0.0.1:1337' + res.data.avatar
      //   this.$store.commit('setUserInfo', res.data)
      this.$store.dispatch('setUserInfo')
      this.$toast.success('修改性别成功')
    },
    // 退出登录
    logout () {
      this.$dialog
        .confirm({
          title: '警告',
          message: '你确定要退出吗'
        })
        .then(() => {
          // 清除token
          localdel('heima_token')
          // 清除vuex
          this.$store.commit('setUserInfo', '')
          // 跳转登录页面
          this.$router.push('/login')
        })
        .catch(() => {
          // on cancel
        })
    },
    // 去编辑页面
    todoEist (e) {
      this.$router.push('/editInfo?prototype=' + e)
    }
  }
}

// 路由传值

// 1.传

// 1. this.$router.push("/path?参数名=值")
// 2. this.$router.push({path:"地址",query:{参数}})

// 2.收

//    1.this.$route.query.参数名
</script>

<style lang="less" scoped>
.info {
  font-size: 12px;
  /deep/ .van-nav-bar__left {
    padding-left: 0px !important;
  }
  /deep/ .van-nav-bar__title.van-ellipsis {
    font-size: 18px;
  }
  .van-cell.van-cell--clickable {
    display: flex;
    align-items: center;
  }
  .myleft {
    font-size: 40px;
  }
  .groupbox {
    padding: 15px;
    .myimg {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }
  .btnbox {
    padding: 0 15px;
    .btn {
      border-radius: 10px;
      height: 40px;
      color: #e40137;
      font-size: 14px;
    }
  }
}
</style>
