<template>
  <div :class="isMobile ? 'live2d-mobile' : 'live2d'">
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

// eslint-disable-next-line no-undef
const isMobile = navigator.userAgent.match(
  /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
)

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
  const img = new Image()
  img.src = '/blog/tororo/moc/tororo.2048/texture_00.png'
  img.onload = () => {
    import('../../utils/live2d').then(() => {
      // eslint-disable-next-line no-undef
      loadlive2d('live2d', '/blog/tororo/tororo.model.json')
      showMessage({ text: `你好~喵~` })
    })
  }
})
</script>
<style scoped>
.live2d {
  position: fixed;
  bottom: 0;
  right: 0;
}
.live2d-mobile {
  text-align: center;
}
#live2d {
  display: inline-block;
}
</style>
