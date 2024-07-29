<template>
		<el-dialog title="我是标题" :with-header="false" direction="ttb" size="300px" v-model="drawerson">
			<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="onSubmit"> 确认 </el-button>
			</span>
			<div ref="chartNode"  :style="{width: '1500px', height: '550px'}"></div>
			</template>	
		</el-dialog>
</template>
 
<script setup>
  import { defineProps, watch, ref,onMounted } from 'vue';
   // 引入echarts
   import * as echarts from 'echarts'
  const drawerson = ref(false);
  const props = defineProps({
	drawer: {
		type: Boolean,
		default: false,
	},
  });
  const chartNode = ref(null);
  watch(
	() => props.drawer,
	(newVal) => {
		drawerson.value = newVal;
		console.log('drawerson.value', drawerson.value);     //可以测试父传递的,子是否拿到了
	}
  );

      onMounted(() => { // 需要获取到element,所以是onMounted的Hook
        // let myChart = echarts.init(chartNode.value);
		let myChart = echarts.init(document.getElementById('chartNode'));
		
        // 绘制图表
        myChart.setOption({
          xAxis: {
            data: ["4-3", "4-4", "4-5", "4-6", "4-7", "4-8", "4-9"]
          },
          yAxis:{},
          series: [
            {
              name: "用户量",
              type: "line",
              data: [8, 15, 31, 13, 15, 22, 11]
            }
          ]
        });
        window.onresize = function () { // 自适应大小
          myChart.resize();
        };
      });
</script>