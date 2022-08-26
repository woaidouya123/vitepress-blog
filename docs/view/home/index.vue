<template>
  <div class="home-page">
    <ClientOnly>
      <HeatMap :data="calendarData" :show-axis="true"></HeatMap>
    </ClientOnly>
    <canvas class="live2d" id="live2d" width="300" height="300"></canvas>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import lcData from '../../data/lcData.json'
import moment from 'moment'
import HeatMap from '../../components/heatMap.vue'
const submissionCalendar = JSON.parse(lcData.userCalendar.submissionCalendar)
let calendarData = Object.keys(submissionCalendar).map((key) => {
  let date = new Date((+key) * 1000)
  return {
    date: moment(date).format('YYYY-MM-DD'),
    count: submissionCalendar[key],
  }
})
onMounted(() => {
  import('../../utils/live2d').then(() => {
    loadlive2d("live2d", "/blog/tororo/tororo.model.json")
  })
})

</script>
<style scoped>
.live2d {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
