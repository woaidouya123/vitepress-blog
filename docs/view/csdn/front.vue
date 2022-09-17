<template>
  <div class="container">
    <div v-for="item in csdnFront">
      <a :href="item.link">{{ item.title }}</a>
    </div>
  </div>
</template>
<script setup>
import csdnFront from '../../data/csdnFront.json'
</script>
