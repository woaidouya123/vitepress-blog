<template>
  <a :class="{ nolink: !href }" :href="props.href || '#'">
    <div class="container" v-for="item in textArr">
      <div class="text-content" :style="{ color: props.color }">{{ item }}</div>
      <div class="text-mask" :style="{ color: props.bg }">{{ item }}</div>
    </div>
  </a>
</template>
<script lang="ts" setup>
import { watchEffect, ref, Ref } from 'vue'
type Props = {
  text: string
  color?: string
  bg?: string
  href?: string
}
const props = withDefaults(defineProps<Props>(), {
  color: 'rgb(165 136 104)',
  bg: 'rgb(9 8 8)',
})
const textArr: Ref = ref([])
watchEffect(() => {
  textArr.value = props.text.match(/.{1,10}/g) || []
})
</script>
<style scoped>
.container {
  display: block;
  position: relative;
  font-size: 18px;
  font-weight: bolder;
  text-align: center;
  user-select: none;
  max-width: 300px;
}

.container > div {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}

.nolink {
  cursor: default;
}

.text-content {
  color: transparent;
}

.text-mask {
  color: rgba(29, 29, 236, 1);
  animation: move 3s ease-in-out infinite;
  position: absolute;
  width: 100%;
  top: 0;
}

@keyframes move {
  0% {
    clip-path: polygon(0% 62%, 14% 55%, 24% 51%, 32% 51%, 41% 56%, 50% 59%, 60% 59%, 69% 55%, 76% 49%, 84% 48%, 93% 50%, 100% 54%, 100% 100%, 0 100%);
  }

  50% {
    clip-path: polygon(0% 62%, 10% 62%, 23% 68%, 36% 68%, 44% 64%, 50% 59%, 59% 54%, 67% 55%, 74% 59%, 86% 62%, 94% 61%, 100% 54%, 100% 100%, 0 100%);
  }

  100% {
    clip-path: polygon(0% 62%, 14% 55%, 24% 51%, 32% 51%, 41% 56%, 50% 59%, 60% 59%, 69% 55%, 76% 49%, 84% 48%, 93% 50%, 100% 54%, 100% 100%, 0 100%);
  }
}
</style>
