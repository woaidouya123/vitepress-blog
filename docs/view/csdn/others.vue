<template>
  <div class="container">
    <div v-for="item in csdnOthers">
      <a :href="item.link">{{ item.title }}</a>
    </div>
  </div>
</template>
<script setup>
import csdnOthers from '../../data/csdnOthers.json'
</script>
