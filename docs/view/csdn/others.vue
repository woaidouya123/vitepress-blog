<template>
  <div class="container">
    <div class="card-left">
      <div class="csdn-item" v-for="item in csdnOthers.filter((_, i) => i % 2 === 0)">
        <a :href="item.link">{{ item.title }}</a>
        <div class="desc">{{ item.desc }}</div>
        <div class="date">{{ item.time }}</div>
      </div>
    </div>
    <div class="card-right">
      <div class="csdn-item" v-for="item in csdnOthers.filter((_, i) => i % 2 === 1)">
        <a :href="item.link">{{ item.title }}</a>
        <div class="desc">{{ item.desc }}</div>
        <div class="date">{{ item.time }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import csdnOthers from '../../data/csdnOthers.json'
</script>
<style lang="less" scoped>
.container {
  .card-left {
    width: 48%;
    display: inline-block;
  }
  .card-right {
    width: 48%;
    margin-left: 4%;
    display: inline-block;
    vertical-align: top;
  }
  .csdn-item {
    border-radius: 6px;
    box-shadow: 0 0 6px 1px #dddddd;
    position: relative;
    display: inline-block;
    padding: 10px 15px 0px 15px;
    margin-bottom: 20px;
    .desc {
      margin-top: 10px;
      word-break: break-all;
      font-size: 12px;
      line-height: 18px;
      color: gray;
    }
    .date {
      font-size: 12px;
      text-align: right;
    }
  }
}
</style>
