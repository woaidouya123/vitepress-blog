<template>
  <div class="container">
    <canvas ref="canvas"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useCanvas } from './useCanvas'
import { useEvents } from './useEvents'
import { useJudge } from './useJudge'
import { useRobot } from './useRobot'
type Props = {
  width?: number
  height?: number
  lines?: number
  blackFirst?: boolean
  robot?: string | boolean
}
const props = withDefaults(defineProps<Props>(), {
  width: 700,
  height: 700,
  lines: 13,
  blackFirst: true,
  robot: false,
})
const canvas = ref(null)
const emit = defineEmits(['on-piece', 'on-game-over'])

onMounted(() => {
  const { drawPiece, calcPoint, drawGameOver } = useCanvas(canvas.value, {
    width: props.width,
    height: props.height,
    lines: props.lines,
  })
  const { judgeWin, judgeDraw } = useJudge(props.lines)
  const { getRobotStep } = useRobot(props.lines)
  useEvents(canvas.value, emit, props.blackFirst, props.robot, {
    drawPiece,
    calcPoint,
    judgeWin,
    drawGameOver,
    getRobotStep,
    judgeDraw,
  })
})
</script>
<style scoped>
.container {
  text-align: center;
}

canvas {
  display: inline-block;
}
</style>
