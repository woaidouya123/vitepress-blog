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
import { withBase, useData } from 'vitepress'
import { ElPopover } from 'element-plus'
import { onMounted, ref, watch } from 'vue'
import ColorText from './widges/colorText.vue'
import { useMouseOver } from './hooks/useMouse'
import { useEvents } from './hooks/useEvents'
import eventBus from '../../utils/eventBus'
const visible = ref(false)

const { page } = useData()
const catText = ref('')
const catTextHref = ref('')

const showMessage = ({ text, href = '', delay = 500 }) => {
  visible.value = false
  if (text) {
    setTimeout(() => {
      catText.value = text
      catTextHref.value = href
      visible.value = true
      mouseOut()
    }, delay)
  }
}

const { mouseOut, mouseOver } = useMouseOver(
  () => {
    showMessage({
      text: '来玩把游戏喵~',
      href: withBase('/articles/games/gobang'),
      delay: 10,
    })
  },
  () => {
    visible.value = false
  },
  3000
)

useEvents(showMessage, eventBus)

watch(page, (val) => {
  val.title && showMessage({ text: `你在看${val.title}喵~` })
})
onMounted(() => {
  import('../../utils/live2d').then(() => {
    // eslint-disable-next-line no-undef
    loadlive2d('live2d', '/blog/tororo/tororo.model.json')
    showMessage({ text: `你好~喵~` })
  })
})
</script>
<style scoped></style>
