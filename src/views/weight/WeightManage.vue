<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import { ref } from 'vue'
import WeightEdit from './components/WeightEdit.vue'
import { getWeightListService, delWeightRecordService } from '@/api/weight.js'
import { formatTime } from '@/utils/format'
import { useUserStore } from '@/stores/modules/user'
const weightList = ref([])
const total = ref(0)
const loading = ref(false)
const userStore = useUserStore()

let sceneList = {
  0: "起床空腹",
  1: "早餐前",
  2: "早餐后",
  3: "午餐前",
  4: "午餐后",
  5: "晚餐前",
  6: "晚餐后",
  7: "睡觉前",
  8: "其他",
};


const params = ref({
  pagenum: 1, // 当前页
  pagesize: 5, // 当前生效的每页条数
  userid: userStore.user.id
})

// 获取数据
const getWeightList = async () => {
  loading.value = true
  params.value.userid = userStore.user.id
  const res = await getWeightListService(params.value)
  weightList.value = res.data.data.record
  total.value = res.data.data.total
  loading.value = false
}
getWeightList()

// 页码变化
const onSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getWeightList()
}
const onCurrentChange = (page) => {
  params.value.pagenum = page
  getWeightList()
}

// 搜索与重置
const onSearch = () => {
  params.value.pagenum = 1
  getWeightList()
}
const onReset = () => {
  params.value.pagenum = 1
  params.value.startDaytime = ''
  params.value.endDaytime = ''
  getWeightList()
}

const weightEditRef = ref()

// 添加编辑与删除
const onAddWeight = () => {
  weightEditRef.value.open({})
}
const onEditWeight = (row) => {
  weightEditRef.value.open(row)
}
const onDeleteWeight = async (row) => {
  await ElMessageBox.confirm('你确认删除该笔记信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await delWeightRecordService(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  getWeightList()
}

// 添加修改成功
const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加，需要跳转渲染最后一页，编辑直接渲染当前页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getWeightList()
}
function formatPercent(value) {
  return (value * 100).toFixed(2) + '%';
}
// 开始日期不能大于结束日期
function disabledStartDate(time) {
  if (time && params.value.endDaytime) {
    return time.getTime() >= new Date(params.value.endDaytime).getTime();
  } else {
    return false;
  }
}
// 结束日期不能小于开始日期
function disabledEndDate(time) {
  if (time && params.value.startDaytime) {
    return time.getTime() <= new Date(params.value.startDaytime).getTime();
  } else {
    return false;
  }
}

</script>

<template>
  <page-container title="体重管理">
    <template #extra>
      <el-button type="primary" @click="onAddWeight">添加体重</el-button>
    </template>

    <el-form inline>
      <el-form-item label="开始时间：">
          <el-date-picker
            v-model="params.startDaytime"
            type="datetime"
            :disabled-date="disabledStartDate"
            placeholder="选择开始时间"
          />
      </el-form-item>
      <el-form-item label="结束时间：">
          <el-date-picker
            v-model="params.endDaytime"
            type="datetime"
            :disabled-date="disabledEndDate"
            placeholder="选择结束时间"         
          />
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="weightList" v-loading="loading" style="width: 100%">
      <el-table-column label="称重时间" prop="daytime" width="240">
        <template #default="{ row }">
          {{ formatTime(row.daytime) }}
          
        </template>
      </el-table-column>
      <el-table-column label="称重场景" prop="scene">
        <template #default="{ row }">
          {{ sceneList[row.scene] }}
        </template>
      </el-table-column>
      <el-table-column label="体重" prop="weight"></el-table-column>
      <el-table-column label="目标体重" prop="targetweight"></el-table-column>
      <el-table-column label="腰围" prop="waistline"></el-table-column>
      <el-table-column label="BMI" prop="bmi"></el-table-column>
      <el-table-column label="体脂率" prop="faterate">
        <template #default="{ row }">
          {{ formatPercent(row.faterate)   }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditWeight(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDeleteWeight(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 4, 5, 10]"
      layout="jumper, total, sizes, prev, pager, next"
      background
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />

     <weight-edit ref="weightEditRef" @success="onSuccess"></weight-edit> 
  </page-container>
</template>