<template>	
   <heightChart :drawer="drawer"></heightChart>   //bind绑定子组件
    {{   drawer   }}       // 看是否父更改了状态
   <el-button @click="CanShowDrawer">点击显示弹窗</el-button>
</template>


<script setup>
   import { ref } from 'vue'
  import heightChart from './components/heightChart.vue'; //引入子

  const drawer = ref(false); //显示弹窗

  const CanShowDrawer = () => {
  drawer.value = !drawer.value;
  };
  </script>