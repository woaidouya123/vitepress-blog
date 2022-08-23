<template>
  <div class="home-page">
    <MlHeatmap id="heat-map" :data="calendarData" :year="2022" title="leetcode打卡记录" locale="en" />
  </div>
</template>
<script setup>
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
</script>
<style scoped>
</style>
