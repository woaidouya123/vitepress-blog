<template>
  <div class="container">
    <div class="article-item" v-for="item in lcArticles">
      <div class="article-title">
        <a :href="item.link">{{item.title}}</a>
        <span :class="['diff-band', 'diff-'+item.difficulty.toLowerCase()]">{{item.diffName}}</span>
      </div>
      <div class="article-info">
        <span class="publish-time">{{item.time}}</span>
        <span class="article-tag" v-for="tag in item.tags">{{tag}}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import lcArticles from '../../data/lcArticles.json'
</script>
<style lang="less" scoped>
.container {

  .article-item {
    border-radius: 6px;
    box-shadow: 0 0 6px 1px #dddddd;
    margin: 20px 0;
    padding: 10px 20px;
    position: relative;
    overflow: hidden;
  }

  .article-title {
    display: flex;
    justify-content: space-between;

    .diff-band {
      position: absolute;
      width: 80px;
      text-align: center;
      right: -25px;
      top: 5px;
      transform: rotateZ(45deg);
      color: #ffffff;
      font-size: 12px;
    }
  }

  .publish-time {
    font-size: 14px;
    font-weight: normal;
    opacity: .5;
  }

  .article-tag {
    font-size: 12px;
    display: inline-block;
    margin: 0 5px;
  }
}
</style>
