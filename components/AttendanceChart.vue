<template>
   
       <div class="flex justify-center items-center">
        <apexchart width="480" type="pie" :options="chartOptions" :series="chartSeries"></apexchart>
    
       </div>
  </template>
  
  <script setup>
  const {attendanceReport} = defineProps({
    attendanceReport: {
      type: Object,
      required: true
    }
  })
  const chartOptions = ref({
    chart: {
      type: 'pie',
      height: 350
    },
    labels: ['Present', 'Absent'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
    // ,colors: ['#e2432e', '#49a94c']
  })
  
  const chartSeries = ref([attendanceReport.attended, attendanceReport.total - attendanceReport.attended])
  </script>
  
  <script>
  import { defineComponent } from 'vue'
  import VueApexCharts from 'vue3-apexcharts'
  
  export default defineComponent({
    components: {
      apexchart: VueApexCharts
    }
  })
  </script>
  