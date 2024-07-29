<script setup>
import { userRegisterService, userLoginService } from '@/api/user.js'
import { User, Lock } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import { useRouter } from 'vue-router'

const isRegister = ref(false)
const form = ref()
let login_title = ref();

const formModel = ref({
  username: '',
  password: '',
  repassword: '',
  height: '',
  gender: '',

})
const options = [
  {
    value: 0,
    label: '女',
  },
  {
    value: 1,
    label: '男',
  }]
const rules = {
  username: [
   { required: true, message: '请输入用户名', trigger: 'blur' },
   { min: 5, max: 10, message: '用户名必须是5-10位的字符', trigger: 'blur' }
 ],
 height:[
   { required: true, message: '请输入身高', trigger: 'blur' },
 ],
 gender:[
   { required: true, message: '请选择性别', trigger: 'blur' },
 ],
 password: [
   { required: true, message: '请输入密码', trigger: 'blur' },
   {
     pattern: /^\S{6,15}$/,
     message: '密码必须是6-15位的非空字符',
     trigger: 'blur'
   }
 ],
 repassword: [
   { required: true, message: '请再次输入密码', trigger: 'blur' },
   {
     pattern: /^\S{6,15}$/,
     message: '密码必须是6-15的非空字符',
     trigger: 'blur'
   },
   {
     validator: (rule, value, callback) => {
       if (value !== formModel.value.password) {
         callback(new Error('两次输入密码不一致!'))
       } else {
         callback()
       }
     },
     trigger: 'blur'
   }
 ]
}

const register = async () => {
  await form.value.validate()
  await userRegisterService(formModel.value)
  ElMessage.success('注册成功')
  isRegister.value = false
}
function forgetPass (){
  isRegister.value = true;
  login_title.value='重置'
}
function registerAcc(){
  isRegister.value = true;
  login_title.value='注册'
}


const userStore = useUserStore()
const router = useRouter()
const login = async () => {
  await form.value.validate()
  const res = await userLoginService(formModel.value)
  console.log(res)
  userStore.setToken(res.data.data.token)
  ElMessage.success('登录成功')
  router.push('/')
}

watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
</script>

<template>
  <div class="logincontent">
    <section class="login-section">
      <!-- 左侧项目介绍页 -->
      <div class="left flexCenter" style="color: #fff">
        <div class="left-contain">
          <!-- <h1>田田 for 顺强 custom-made</h1> -->
          <h2>健康管理-体重饮食运动相关</h2>
          <span
            >健康是我们每个人最宝贵的财富,而运动和饮食是我们维持健康的重要保障。</span
          >
        </div>
      </div>
      <!-- 左侧项目介绍页 -->
      <!-- 右侧表单页 -->
      <div class="right">
        <div class="form-content">
           <!-- 注册表单 -->
           <!-- 注册表单 -->
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>{{login_title}}</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="gender">
        <el-select
          v-model="formModel.gender"
          placeholder="请选择性别"
          size="large"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        </el-form-item>
        <el-form-item prop="height">
          <el-input
            v-model="formModel.height"
            :prefix-icon="User"
            placeholder="请输入身高"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="register"
            class="button"
            type="primary"
            auto-insert-space
          >
          {{login_title}}
          </el-button>
          <el-link type="info" :underline="false" @click="isRegister = false " >
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 登录表单 -->
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-else
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <!-- <el-link type="primary" :underline="false">忘记密码？</el-link> -->
            <el-link type="primary" :underline="false" @click="forgetPass">忘记密码？</el-link>            
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="login"
            class="button"
            type="primary"
            auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="registerAcc">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
        </div>
      </div>
      <!-- 右侧表单页 -->
    </section>
  </div>
</template>


<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 440px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
.logincontent {
  background: url('@/assets/bg.jpg') no-repeat center / contain;
  height: 100%;
  width: 100%;
  /*把背景图片放大到适合元素容器的尺寸，图片比例不变*/
  background-size: 100% 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.login-section {
  // background-color: aqua;
  width: 940px;
  height: 538px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  // opacity: 0.5;
  display: flex;
  justify-content: space-between;
  .left {
    width: 50%;
    height: 100%;
    background-color: #455165;
    opacity: 0.5;
    .left-contain {
      width: 80%;
      height: 70%;
      border-bottom: 1px solid #fff;
    }
  }
  .right {
    width: 50%;
    height: 100%;
    background-color: #fff;

    display: flex;
    justify-content: center;
    align-items: center;

    .form-content {
      width: 70%;
      height: 70%;
      // background-color: black;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .el-form {
        width: 100%;
        height: 100%;
      }
      .form-top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        // background-color: aquamarine;
        container-type: inline-size;
        // 设置字体大小和容器适配
        span {
          font-size: 7cqw;
        }
      }
    }
  }
}
.flexCenter{
    display: flex;
    justify-content: center;
    align-items: center;
}
.flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
</style>
