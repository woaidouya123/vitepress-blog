<template>
  <div class="live2d">
    <el-popover placement="top" :visible="visible" width="fit-content">
      <template #reference>
        <div>
          <canvas id="live2d" width="300" height="300" :onMouseover="mouseOver" :onMouseout="mouseOut"></canvas>
        </div>
      </template>
      <template #default>
        <div class="popover-box" :onMouseover="mouseOver" :onMouseout="mouseOut">
          <color-text :text="catText" :href="catTextHref"></color-text>
        </div>
      </template>
    </el-popover>
  </div>
</template>
<script setup>
import { withBase, useData } from 'vitepress';
import { ElPopover } from "element-plus";
import { onMounted, ref, watch } from "vue";
import ColorText from "./widges/colorText.vue";
import { useMouseOver } from "./hooks/useMouse";
let visible = ref(false);
const { mouseOut, mouseOver } = useMouseOver(() => {
  catText.value = "来玩把游戏喵~";
  catTextHref.value = withBase("/articles/games/gobang");
  visible.value = true;
}, () => {
  visible.value = false;
}, 3000)
const { page } = useData();
let catText = ref("");
let catTextHref = ref("");
watch(page, (val) => {
  visible.value = false;
  if (val.title) {
    setTimeout(() => {
      catText.value = `你在看${val.title}喵~`;
      catTextHref.value = "";
      visible.value = true;
      mouseOut();
    }, 500)

  }

})
onMounted(() => {
  import("../../utils/live2d").then(() => {
    loadlive2d("live2d", "/blog/tororo/tororo.model.json");
    catText.value = `你好~喵~`;
    visible.value = true;
    mouseOut();
  });
});
</script>
<style scoped>

</style>
