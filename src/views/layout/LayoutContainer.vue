<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom,
  Food,
  Basketball,
  GoldMedal,
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import { useRouter } from 'vue-router'
const router = useRouter()
const userStore = useUserStore()

onMounted(() => {
  userStore.getUser()
})

const handleCommand = async (command) => {
  if (command === 'logout') {
    await ElMessageBox.confirm('你确认退出大事件吗？', '温馨提示', {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    })
    userStore.removeToken()
    userStore.setUser({})
    router.push(`/login`)
  } else {
    router.push(`/user/${command}`)
  }
}
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <el-menu
        active-text-color="#ffd04b"
        background-color="hsl(239, 93%, 19%)"
        :default-active="$route.path"
        text-color="#fff"
        router
      >
      <el-menu-item index="/weight/linechart">
        <el-icon><GoldMedal /></el-icon>
          <span>体重仪表盘</span>
        </el-menu-item>
      <el-menu-item index="/weight/manage">
        <el-icon><GoldMedal /></el-icon>
          <span>体重管理</span>
        </el-menu-item>
      
        <el-sub-menu index="/user">
          <template #title>
            <el-icon>
              <Basketball />
            </el-icon>
            <span>运动管理</span>
          </template>
          <el-menu-item index="/sport/manage">
            <el-icon>
              <User />
            </el-icon>
            <span>我的运动</span>
          </el-menu-item>
          <el-menu-item index="/calorie/manage" :route="{name:'calorie',query:{kind:'运动消耗的能量',flag:'-'}}">
            <el-icon>
              <Crop />
            </el-icon>
            <span>运动热量管理</span>
          </el-menu-item> 
        </el-sub-menu>
        <el-sub-menu index="/calorie/manage">
          <template #title>
            <el-icon>
              <Food />
            </el-icon>
            <span>饮食管理</span>
          </template>
          <el-menu-item index="/diet/manage">
            <el-icon>
              <User />
            </el-icon>
            <span>我的饮食</span>
          </el-menu-item>
          <el-menu-item index="/calorie/manage" :route="{name:'calorie',query:{kind:'食物蕴含的能量',flag:'+'}}">
            <el-icon>
              <Crop />
            </el-icon>
            <span>饮食热量管理</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/user">
          <template #title>
            <el-icon>
              <UserFilled />
            </el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/user/profile">
            <el-icon>
              <User />
            </el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          用户：<strong>{{
            userStore.user.nickname || userStore.user.username
          }}</strong>
        </div>
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <span class="el-dropdown__box">
            <el-avatar :src="userStore.user.user_pic || avatar" />
            <el-icon>
              <CaretBottom />
            </el-icon>
          </span>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User"
                >基本资料</el-dropdown-item
              >
              <el-dropdown-item command="avatar" :icon="Crop"
                >更换头像</el-dropdown-item
              >
              <el-dropdown-item command="password" :icon="EditPen"
                >重置密码</el-dropdown-item
              >
              <el-dropdown-item command="logout" :icon="SwitchButton"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>Created by x2x3y5</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: hwb(239 2% 59% / 0.949);

    &__logo {
      height: 18px;
      // background: url('@/assets/logo.png') no-repeat center / 180px auto;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
