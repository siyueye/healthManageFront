<script setup>
import { ref } from 'vue'
import { calorieEditService, calorieAddService } from '@/api/calorie.js'
import { useRouter } from 'vue-router'
const router = useRouter()
const dialogVisible = ref(false)
const formRef = ref()
const formModel = ref({
  itemname: '',
  heat: '',
  unit: '',
  flag: router.currentRoute.value.query.flag
})

const emit = defineEmits(['success'])
const onSubmit = async () => {
  formModel.value.heat=router.currentRoute.value.query.flag === '-' ? -formModel.value.heat : formModel.value.heat;
  await formRef.value.validate()
  formModel.value.id
    ? await calorieEditService(formModel.value)
    : await calorieAddService(formModel.value)
  ElMessage({
    type: 'success',
    message: formModel.value.id ? '编辑成功' : '添加成功'
  })
  dialogVisible.value = false
  emit('success')
}

const open = async (row) => {
  dialogVisible.value = true
  formModel.value = { ...row }
  console.log(row)
}


defineExpose({
  open
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑' : '添加'"
    width="30%"
  >
    <!-- <el-form
      ref="formRef"
      :model="formModel"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="名称" prop="itemname">
        <el-input
          v-model="formModel.itemname"
          placeholder="请输入名称"
          minlength="1"
          maxlength="10"
        ></el-input>
      </el-form-item>
      <el-form-item label="热量" prop="heat">
        <el-input
          v-model="formModel.heat"
          placeholder="请输入热量"
          minlength="1"
          maxlength="15"
        ></el-input>
      </el-form-item>
      <el-form-item label="单位" prop="unit">
        <el-input
          v-model="formModel.unit"
          placeholder="请输入单位"
          minlength="1"
          maxlength="15"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </span>
    </template> -->
  </el-dialog>
</template>
