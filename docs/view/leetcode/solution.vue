<template>
  <div class="container">
    <div class="article-item" v-for="item in lcArticles">
      <a :href="item.link">{{item.title}}</a>
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
