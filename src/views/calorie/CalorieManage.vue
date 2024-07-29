<script setup>
import { ref, watch } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { calorieGetAllService, calorieDelRecordService } from '@/api/calorie'
import CalorieEdit from './components/CalorieEdit.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const incryCalorieList = ref([])
const params = ref({
  pagenum: 1, // 当前页
  pagesize: 5, // 当前生效的每页条数
  itemname: ''
})
const loading = ref(false)
const dialog = ref()
const getIncryCalorieList = async () => {
  loading.value = true
  const res = await calorieGetAllService(params.value.itemname,router.currentRoute.value.query.flag)
  incryCalorieList.value = res.data.data
  loading.value = false
}
getIncryCalorieList()

const onEditCalorie = (row) => {
  dialog.value.open(row)
}
const onDelCalorie = async (row) => {
  await ElMessageBox.confirm('你确认删除该信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await calorieDelRecordService(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  getIncryCalorieList()
}

const onAddCalorie = () => {
  dialog.value.open({})
}

const onSuccess = () => {
  getIncryCalorieList()
}
watch(() => router.currentRoute.value.query, () => {
  getIncryCalorieList()
})

const onSearch = () => {
  params.value.pagenum = 1
  getIncryCalorieList()
}
const onReset = () => {
  params.value.pagenum = 1
  params.value.pagesize = ''
  params.value.itemname = ''
  getIncryCalorieList()
}
</script>

<template>
  <page-container :title="router.currentRoute.value.query.kind">
    <template #extra>
      <el-button type="primary" @click="onAddCalorie">添加 </el-button>
    </template>
    <el-form inline label-width="100px">
      <el-form-item label="名称：">
        <el-input v-model="params.itemname" style="width: 240px" placeholder="请输入名字" />
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="incryCalorieList" style="width: 100%">
      <el-table-column prop="itemname" label="名称"></el-table-column>
      <el-table-column prop="heat" label="热量"></el-table-column>
      <el-table-column prop="unit" label="单位" ></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row, $index }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditCalorie(row, $index)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelCalorie(row, $index)"
          ></el-button>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>
    <calorie-edit ref="dialog" @success="onSuccess"></calorie-edit>
  </page-container>
</template>

<style lang="scss" scoped></style>
