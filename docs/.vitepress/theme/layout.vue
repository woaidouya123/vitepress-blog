<script setup>
import { onMounted } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { ElScrollbar } from 'element-plus'
import 'element-plus/dist/index.css'
const { Layout } = DefaultTheme
onMounted(() => {
  import('../../utils/live2d').then(() => {
    loadlive2d("live2d", "/blog/tororo/tororo.model.json")
  })
})
</script>

<template>
  <el-scrollbar class="srcoll">
    <Layout>
      <template #layout-bottom>
        <canvas class="live2d" id="live2d" width="300" height="300"></canvas>
      </template>
    </Layout>
  </el-scrollbar>

</template>
<style scoped>
.live2d {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
