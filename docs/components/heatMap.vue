<template>
  <div class="calander-container">
    <div class="week" v-if="props.showAxis">
      <div class="weekday" v-for="item in WeekDays">{{item}}</div>
    </div>
    <div :class="{'month': true, 'show-axis': props.showAxis}" v-for="mon in monthsMap.keys()" :style="{'width': (Math.ceil((monthsMap.get(mon)?.length || 0) / 7) * 11) + 'px'}">
      <div class="day-container">
        <div class="day hidden" v-for="_ in monthsMap.get(mon)?.filter(v => !v)"></div>
        <el-tooltip v-for="day in monthsMap.get(mon)?.filter(v => v)" :content="showText(day)" placement="top" :show-after="200">
          <div class="day"  :style="{'background-color': day === '' ? 'none' : calcColor(dataMap[day])}"></div>
        </el-tooltip>
      </div>
      <span class="mon" v-show="props.showAxis">{{mon}}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import moment from 'moment';
import 'element-plus/dist/index.css'
import { ElTooltip } from 'element-plus';

type Props = {
  data: Array<{date, count}>,
  color?: Array<string>,
  level?: Array<number>,
  tip1?: string,
  tip2?: string,
  showAxis?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  color: () => ["#EBEDF0", "#9BE9A8", "#40C463", "#30A14E", "#216E39"],
  level: () => [1, 4, 8, 12],
  tip1: () => "{0} 提交了 {1} 次",
  tip2: () => "{0} 还未提交，要加油哦",
  showAxis: () => false,
})

const WeekDays = ["Sun", "Wed", "Sat"];
const curDate = new Date();
let startDate = moment(curDate).subtract(364, 'day');
let monthsMap: Map<string, Array<string>> = new Map();
const dataMap: object = props.data.reduce((pre, cur) => { pre[cur.date] = cur.count; return pre;}, {})
while(startDate.valueOf() <= curDate.valueOf()) {
  let date = moment(startDate).format("YYYY-MM-DD");
  let mon = date.slice(0, 7);
  let arr = monthsMap.get(mon) || new Array(startDate.weekday()).fill('');
  arr.push(date);
  monthsMap.set(mon, arr);
  startDate = startDate.add(1, 'day');
}
const showText = (day:string) => {
  let count = dataMap[day] || 0;
  return count ? props.tip1.replace("{0}", day).replace("{1}", count) : props.tip2.replace("{0}", day);
}
const calcColor = (count) => {
  count = count || 0;
  let index = props.level.findIndex(v => count < v);
  return props.color[index > -1 ? index : props.color.length - 1];
}
</script>
<style scoped>
.calander-container{
  display: flex
}

.calander-container .month{
  display: inline-block;
  position: relative;
  margin-right: 8px;
  margin-bottom: 20px;
  font-size: 0px;
}
.calander-container .month.show-axis{
  min-width: 50px;
}
.calander-container .month .mon{
  font-size: 12px;
  position: absolute;
  width: 100%;
  left: 0;
  bottom: -20px;
  text-align: center;
}
.calander-container .month .day-container{
  display: inline-flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 70px;
}
.calander-container .month .day{
  width: 8px;
  height: 8px;
  background: none;
  background-clip: content-box;
  border: 1px solid transparent;
  box-sizing: content-box;
}

.calander-container .month .day:hover{
  border-color: #ffffff;
  box-shadow: 0 0 6px #626262db;
}
.hidden{
  visibility: hidden;
}
.week{
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.week .weekday{
  font-size: 12px;
  line-height: 10px;
}
</style>
