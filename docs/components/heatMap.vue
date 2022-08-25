<template>
  <div class="calander-container">
    <div class="month" v-for="mon in monthsMap.keys()" :style="{'width': (Math.ceil((monthsMap.get(mon)?.length || 0) / 7) * 11) + 'px'}">
      <div class="day" v-for="day in monthsMap.get(mon)" :style="{'background': day === '' ? 'none' : 'green'}"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import moment from 'moment';
const curDate = new Date();
let startDate = moment(curDate).subtract(364, 'day');
console.log(startDate.format("YYYY-MM-DD"), 9999);
let monthsMap: Map<string, Array<string>> = new Map();
while(moment(startDate).isBefore(curDate)) {
  let date = moment(startDate).format("YYYY-MM-DD");
  let mon = date.slice(0, 7);
  let arr = monthsMap.get(mon) || new Array(startDate.weekday()).fill('');
  arr.push(date);
  monthsMap.set(mon, arr);
  startDate = startDate.add(1, 'day');
}
console.log(monthsMap, 888)
</script>
<style scoped>
.calander-container{
  display: flex
}
.calander-container .month{
  display: inline-flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 70px;
  margin-right: 5px;
}
.calander-container .month .day{
  width: 8px;
  height: 8px;
  margin: 1px;
  background: aqua;
}
</style>
