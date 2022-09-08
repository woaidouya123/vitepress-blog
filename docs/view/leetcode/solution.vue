<template>
  <div class="container">
    <div v-for="item in lcArticles">
      <a :href="item.link">{{item.title}}</a>
    </div>
  </div>
</template>
<script setup>
import lcArticles from '../../data/lcArticles.json'
</script>
