<script setup>
import { calorieGetAllService } from '@/api/calorie'
import { ref,defineProps } from 'vue'

defineProps({
  modelValue: {
    type: [Number, String]
  },
  width: {
    type: String
  }
})

const emit = defineEmits(['update:modelValue'])
const itemnameList = ref([])
const getCalorieList = async () => {
  const res = await calorieGetAllService('', '+')
  itemnameList.value = res.data.data
}
getCalorieList()
</script>

<template>
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    :style="{ width }"
  >
 
  
    <el-option
      v-for="iteam in itemnameList"
      :key="iteam.heat"
      :label="iteam.itemname"
      :value="iteam.itemname+'_'+iteam.heat"
    ></el-option>
  </el-select>
</template>
