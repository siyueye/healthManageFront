<template>
    <div>
        <div>
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
    </div>
      <div ref="chartDom" style="width: 1800px; height: 400px;"></div>
     </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, nextTick, onBeforeMount,watch } from 'vue';
  import * as echarts from 'echarts';
  import { useUserStore } from '@/stores/modules/user'
  import {  getWeightLineService  } from '@/api/weight.js'
  const userStore = useUserStore()
const params = ref({
  userid: userStore.user.id,
  startDaytime: '',
  endDaytime: ''
})
const onReset = () => {
  params.value.userid = userStore.user.id
  params.value.startDaytime = ''
  params.value.endDaytime = ''
  getWeightList()
}
// 搜索与重置
const onSearch = () => {
  getWeightList()
}
const res=ref({"data": {"data":[{"daytimeArr":''},{"weightArr":''},{"waistlineArr":''},{"bmiArr":''}]}});
watch(res, (newValue, oldValue) => {
      console.log(`Message changed from "${oldValue}" to "${newValue}"`);
      option.value = {
        title: {
          text: '体重折线'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['体重', '腰围', 'BMI']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: res.value.data.data.daytimeArr
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '体重',
            type: 'line',
            stack: 'Total',
            data: res.value.data.data.weightArr
          },
          {
            name: '腰围',
            type: 'line',
            stack: 'Total',
            data: res.value.data.data.waistlineArr
          },
          {
            name: 'BMI',
            type: 'line',
            stack: 'Total',
            data: res.value.data.data.bmiArr
          }
        ]
      };
      chartInstance.setOption(option.value);
    });
   
// 获取数据
const getWeightList = async () => {
  params.value.userid = userStore.user.id
  res.value = await getWeightLineService(params.value)
}
  // 创建一个响应式引用来保存DOM元素
  const chartDom = ref(null);
  const option = ref({});
  let chartInstance = null;
  watch(option, (newValue, oldValue) => {
      console.log(`Message changed from "${oldValue}" to "${newValue}"`);
      console.log(`option : "${option.value}"`)
      chartInstance.setOption(option.value);
    });
  // 方法
  function initEcharts () {
      // 新建一个promise对象
      let newPromise = new Promise((resolve) => {
          resolve()
      })
      //然后异步执行echarts的初始化函数
      newPromise.then(() => {
          //	此dom为echarts图标展示dom
      chartInstance =	echarts.init(chartDom.value)
  
    chartInstance.setOption(option.value);
      })
  }
  

  onBeforeMount(async () => {
    getWeightList()  
  });
  // 初始化ECharts实例并设置配置项（这里以折线图为例，但可灵活替换）
  onMounted(async () => {
    await nextTick(); // 确保DOM已经渲染完成
    initEcharts()
  });
  
  // 销毁ECharts实例
  onUnmounted(() => {
    if (chartInstance != null && chartInstance.dispose) {
      chartInstance.dispose();
    }
  });
  </script>
  
  <style scoped>
  /* 添加一些CSS样式来美化图表容器（可选） */
  </style>
  