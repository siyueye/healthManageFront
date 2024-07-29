<template>
    <el-dialog title="我是标题" :with-header="false" direction="ttb" size="300px" v-model="drawerson">
      <div ref="chartDom" style="width: 600px; height: 400px;"></div>
  </el-dialog>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, nextTick,defineProps, watch } from 'vue';
  import * as echarts from 'echarts';
  
  const drawerson = ref(false);
    
    const props = defineProps({
      drawer: {
          type: Boolean,
          default: false,
      },
    });
    
    watch(
      () => props.drawer,
      (newVal) => {
          drawerson.value = newVal;
          console.log('drawerson.value', drawerson.value);     //可以测试父传递的,子是否拿到了
      }
    );
  // 创建一个响应式引用来保存DOM元素
  const chartDom = ref(null);
  let chartInstance = null;
   // 初始化ECharts实例并设置配置项（这里以折线图为例，但可灵活替换）
   onMounted(async () => {
    await nextTick(); // 确保DOM已经渲染完成
    initEcharts()
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
      const option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
            }
        ]
        };
  
    chartInstance.setOption(option);
      })
  }
  
  
 
  
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
  