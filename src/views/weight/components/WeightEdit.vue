<script setup>
import { ref } from 'vue'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()
import {
  weightGetDetailService,
  weightAddService,
  weightEditService
} from '@/api/weight'


const options = [
  {
    value: '0',
    label: '起床空腹',
  },
  {
    value: '1',
    label: '早餐前',
  },
  {
    value: '2',
    label: '早餐后',
  },
  {
    value: '3',
    label: '午餐前',
  },
  {
    value: '4',
    label: '午餐后',
  },
  {
    value: '5',
    label: '晚餐前',
  },
  {
    value: '6',
    label: '晚餐后',
  },
  {
    value: '7',
    label: '睡觉前',
  },
  {
    value: '8',
    label: '其他',
  },
]

// 控制抽屉显示隐藏
const visibleDrawer = ref(false)

// 默认数据
const defaultForm = {
  userid:userStore.user.id,
  daytime: '', // 称重时间
  scene:'',
  weight:'',
  height:userStore.user.height,
  gender:userStore.user.gender,
}

// 准备数据
const formModel = ref({ ...defaultForm })


// 提交
const emit = defineEmits(['success'])
const onPublish = async () => {
  // 发请求
  if (formModel.value.id) {
    // 编辑操作
    formModel.value.faterate = parseFloat(formModel.value.faterate)
    formModel.value.scene = parseInt(formModel.value.scene.value)
    await weightEditService(formModel.value)
    ElMessage.success('修改成功')
    visibleDrawer.value = false
    emit('success', 'edit')
  } else {
    // 添加操作
    await weightAddService(formModel.value)
    ElMessage.success('添加成功')
    visibleDrawer.value = false
    // 通知到父组件，添加成功了
    emit('success', 'add')
  }
}

// 组件对外暴露一个方法 open，基于open传来的参数，区分添加还是编辑
// open({})  => 表单无需渲染，说明是添加
// open({ id, ..., ... })  => 表单需要渲染，说明是编辑
// open调用后，可以打开抽屉
const editorRef = ref()
const open = async (row) => {
  visibleDrawer.value = true // 显示抽屉

  if (row.id) {
    // 需要基于 row.id 发送请求，获取编辑对应的详情数据，进行回显
    const res = await weightGetDetailService(row.id)
    formModel.value = res.data.data
    formModel.value.daytime=new Date(res.data.data.daytime)
    formModel.value.scene=options[res.data.data.scene]
  } else {
    formModel.value = { ...defaultForm } // 基于默认的数据，重置form数据
  }
}

function bmiClick(){//bmi计算公式： 体质指数（BMI）=体重（kg）÷身高^2（m）
  formModel.value.bmi =Math.round(parseFloat(formModel.value.weight)/(2 * (formModel.value.height/100)*(formModel.value.height/100)) * 100) / 100 
}

function fatClick(){//(体脂率计算公式 成年女性：(腰围（cm）×0.74 - (体重（kg）×0.082+34.89))/体重（kg）*100%   成年男性:(腰围（cm）×0.74-(体重（kg）×0.082+44.74))/体重kg）*100% 
  if(formModel.value.gender===0){//女性  
    formModel.value.faterate =Math.round((formModel.value.waistline*0.74-(formModel.value.weight/2*0.082+34.89))/formModel.value.weight*2*10000)/10000 
  }else{//男性
   formModel.value.faterate =Math.round((formModel.value.waistline*0.74-(formModel.value.weight/2*0.082+44.74))/formModel.value.weight*2*10000)/10000 
  }
}
defineExpose({
  open
})
</script>

<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑' : '添加'"
    direction="rtl"
    size="50%"
  >
    <!-- 发表称重表单-->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="称重时间" prop="title">
        <el-date-picker
            v-model="formModel.daytime"
            type="datetime"
            placeholder="选择称重时间"
          />
      </el-form-item>
      <el-form-item label="称重场景" prop="scene">
        <el-select
          v-model="formModel.scene"
          placeholder="选择场景"
          size="large"
          style="width: 240px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="体重（斤）" prop="weight">
        <el-input
          v-model="formModel.weight"
          minlength="2"
          maxlength="10"
        ></el-input>
      </el-form-item>
      <el-form-item label="目标（斤）"  prop="targetweight">
        <el-input
          v-model="formModel.targetweight"
          minlength="2"
          maxlength="10"
        ></el-input>
      </el-form-item>
      <el-form-item label="腰围（cm）" prop="waistline">
        <el-input
          v-model="formModel.waistline"
          minlength="1"
          maxlength="10"
        ></el-input>
      </el-form-item>
      <el-form-item label="BMI" prop="bmi" @click="bmiClick">
        <el-input
          v-model="formModel.bmi"
          minlength="1"
          maxlength="10"
        ></el-input>
      </el-form-item>
      <el-form-item label="体脂率" prop="faterate"  @click="fatClick">
        <el-input
          v-model="formModel.faterate"
          minlength="1"
          maxlength="10"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish('已提交')" type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }

    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}

.editor {
  width: 100%;

  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
