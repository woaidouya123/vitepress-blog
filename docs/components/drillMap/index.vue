<template>
  <div class="map-wrapper" ref="map" @click="handleClick"></div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import axios from 'axios'
const map = ref(null)
let chart: echarts.EChartsType | null = null
const getMapData = (code: string) => {
  const url = `https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=${code}_full`
  return axios
    .get(url)
    .then((res) => res.data)
    .catch(() => {
      const tempUrl = `https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=${code}`
      return axios.get(tempUrl).then((res) => res.data)
    })
}
const codeMap: Map<string, string> = new Map()
const mapLevel: string[] = []
const handleClick = () => {
  if (mapLevel.length > 1) {
    mapLevel.pop()
    const mapName = mapLevel[mapLevel.length - 1]
    chart?.setOption({
      geo: {
        map: mapName,
      },
    })
  }
}
onMounted(async () => {
  const data = await getMapData('100000')
  data.features.forEach((item) => {
    const proper = item.properties
    codeMap[proper.name] = proper.adcode
  })
  echarts.registerMap('china', data)
  chart = echarts.init(map.value as unknown as HTMLElement)
  chart.setOption({
    geo: [
      {
        map: 'china',
        select: {
          disabled: true,
          show: true,
        },
      },
    ],
  })
  mapLevel.push('china')
  chart.on('click', (params) => {
    const event = window.event
    // event?.stopPropagation()
    console.log(params)
    // getMapData(codeMap[params.name]).then((data) => {
    //   if (mapLevel.includes(params.name)) return
    //   data.features.forEach((item) => {
    //     const proper = item.properties
    //     codeMap[proper.name] = proper.adcode
    //   })
    //   echarts.registerMap(params.name, data)
    //   chart?.setOption({
    //     geo: [
    //       {
    //         map: params.name,
    //       },
    //     ],
    //   })
    //   mapLevel.push(params.name)
    // })
  })
  chart?.dispatchAction({
    type: 'geoSelect',
    geoIndex: 0,
    geoId: 1,
  })
  chart.on('select', (params) => {
    console.log(params, 666)
  })
})
</script>
<style>
.map-wrapper {
  position: absolute;
  top: 200px;
  width: 800px;
  height: 500px;
}
</style>
