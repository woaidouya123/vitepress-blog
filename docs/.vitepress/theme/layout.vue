<script setup>
import DefaultTheme from "vitepress/theme";
import { ElScrollbar } from "element-plus";
import LiveCat from "../../components/liveCat/index.vue";
import "element-plus/dist/index.css";
const { Layout } = DefaultTheme;
</script>

<template>
  <el-scrollbar class="srcoll">
    <Layout>
      <template #layout-bottom>
        <live-cat></live-cat>
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
