<template>
  <div class="home-page">
    <MlHeatmap id="heat-map" :data="calendarData" :year="2022" locale="cn" />
    <canvas class="live2d" id="live2d" width="300" height="300"></canvas>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import lcData from '../../data/lcData.json'
import 'ml-heatmap/dist/style.css'
import moment from 'moment'
import { MlHeatmap } from 'ml-heatmap'
const submissionCalendar = JSON.parse(lcData.userCalendar.submissionCalendar)
let calendarData = Object.keys(submissionCalendar).map((key) => {
  let date = new Date((+key) * 1000)
  return {
    date: moment(date).format('YYYY-MM-DD'),
    count: submissionCalendar[key],
  }
})
onMounted(() => {
  setTimeout(() => {
    loadlive2d("live2d", "/blog/tororo/tororo.model.json")
  }, 1000)

})

</script>
<style scoped>
.live2d {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
