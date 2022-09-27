<script setup>
import DefaultTheme from 'vitepress/theme'
import { ElScrollbar } from 'element-plus'
import LiveCat from '../../components/liveCat/index.vue'
import 'element-plus/dist/index.css'
import { useStarTail } from '../../components/starTrail'
import { onMounted, ref } from 'vue'
const { Layout } = DefaultTheme
const bg = ref(null)
onMounted(() => {
  let canvas = bg.value
  let { innerWidth: width, innerHeight: height } = window
  canvas.width = width
  canvas.height = height
  useStarTail(bg.value)
})
</script>

<template>
  <el-scrollbar class="srcoll">
    <Layout>
      <template #layout-bottom>
        <div>
          <live-cat></live-cat>
          <canvas class="bg" ref="bg"></canvas>
        </div>
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
.bg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -2;
}
</style>
