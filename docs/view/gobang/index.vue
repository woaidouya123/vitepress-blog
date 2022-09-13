<template>
  <div class="container">
    <canvas ref="canvas"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useCanvas } from "./useCanvas";
import { useEvents } from "./useEvents";
type Props = {
  width?: number,
  height?: number,
  lines?: number,
  blackFirst?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  width: 700,
  height: 700,
  lines: 13,
  blackFirst: true
})

const canvas = ref(null);
onMounted(() => {
  const { drawPiece, calcPoint } = useCanvas(canvas.value, {
    width: props.width,
    height: props.height,
    lines: props.lines
  });
  useEvents(canvas.value, props.blackFirst, drawPiece, calcPoint);

})


</script>
<style scoped>

</style>
