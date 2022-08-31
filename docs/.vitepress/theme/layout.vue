<script setup>
import { onMounted } from 'vue'
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme
onMounted(() => {
  import('../../utils/live2d').then(() => {
    loadlive2d("live2d", "/blog/tororo/tororo.model.json")
  })
})
</script>

<template>
  <Layout>
    <template #layout-bottom>
      <canvas class="live2d" id="live2d" width="300" height="300"></canvas>
    </template>
  </Layout>
</template>
<style scoped>
.live2d {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
