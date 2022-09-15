<script setup>
import { onMounted } from "vue";
import DefaultTheme from "vitepress/theme";
import { ElScrollbar, ElPopover } from "element-plus";
import ColorText from "../../components/colorText.vue";
import "element-plus/dist/index.css";
const { Layout } = DefaultTheme;
onMounted(() => {
  import("../../utils/live2d").then(() => {
    loadlive2d("live2d", "/blog/tororo/tororo.model.json");
  });
});
const goGamePage = () => {
  location.href = location.origin + "/blog/articles/games/gobang.html";
};
</script>

<template>
  <el-scrollbar class="srcoll">
    <Layout>
      <template #layout-bottom>
        <div class="live2d">
          <el-popover placement="top" trigger="hover" :show-after="3000">
            <template #reference>
              <canvas
                id="live2d"
                width="600"
                height="600"
                style="
                   {
                    width: 300px;
                    height: 300px;
                  }
                "
              ></canvas>
            </template>
            <template #default>
              <div class="popover-box">
                <color-text
                  text="来玩个游戏喵~"
                  @click="goGamePage"
                ></color-text>
              </div>
            </template>
          </el-popover>
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
</style>
