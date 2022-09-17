<template>
  <div class="home-page">
    <ClientOnly>
      <HeatMap :data="calendarData" :show-axis="true"></HeatMap>
    </ClientOnly>
  </div>
</template>
<script setup>
import lcData from '../../data/lcData.json'
import moment from 'moment'
import HeatMap from '../../components/heatMap.vue'
const submissionCalendar = JSON.parse(lcData.userCalendar.submissionCalendar)
const calendarData = Object.keys(submissionCalendar).map((key) => {
  const date = new Date(+key * 1000)
  return {
    date: moment(date).format('YYYY-MM-DD'),
    count: submissionCalendar[key],
  }
})
</script>
<style scoped>
.home-page {
  display: flex;
  justify-content: center;
}
</style>
