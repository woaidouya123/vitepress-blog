# [关于echarts生成地图的二三事](https://blog.csdn.net/woaidouya123/article/details/118788527)
2022-09-19 09:27:02 `echarts` `地图` `可视化`

---
<h3>1.地图数据的获取</h3> 
<p>中国地图及各省市县地图可在<a href="http://datav.aliyun.com/tools/atlas/index.html" title="地图选择器">地图选择器</a>（数据来源于高德开放平台）</p> 
<p><img alt="" height="937" src="https://img-blog.csdnimg.cn/20210716112528619.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvYWlkb3V5YTEyMw==,size_16,color_FFFFFF,t_70" width="1200"></p> 
<p>选择需要的区域，右方可下载其JSON API格式的数据。</p> 
<h3>2.地图的编辑</h3> 
<p>特定需求下需要对原有地图数据进行修改，如：添加某一非行政区划的地区，特定地区的分割或边缘优化，由于地图数据由横纵坐标组成的点形成，无法直接修改，推荐使用地图修改工具进行修改。&nbsp;<a href="http://geojson.io/" title="地图在线编辑工具">地图在线编辑工具</a></p> 
<hr>
<p>&nbsp;2022-09-19 修改</p> 
<p>原地址已无效，可使用替代站点<a class="link-info" href="http://datav.aliyun.com/portal/school/atlas/area_generator" title="DataV地图边界生成器">DataV地图边界生成器</a></p> 
<p><img alt="" height="937" src="https://img-blog.csdnimg.cn/20210716141449633.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvYWlkb3V5YTEyMw==,size_16,color_FFFFFF,t_70" width="1200"></p> 
<p>如图，将地图的JSON数据复制进右面编辑框，在左边可视化窗口进行编辑后，可获得编辑完后的地图数据。</p> 
<p></p> 
<h3>3.地图的声明</h3> 
<p>想要在echarts中使用自定义的地图数据，需要先在echarts对象中对地图进行注册。</p> 

```javascript
import echarts from 'echarts'
const geoJson = `...地图JSON数据...`
echarts.registerMap('地图名（如：jiangsu）', geoJson, {})
``` 
<h3>&nbsp;4.地图的引用</h3> 
<p>在地图进行注册声明后，可直接在echarts配置中使用series-map进行地图的绘制</p> 

```javascript
option = {
    ...
    series: [{
      type: 'map',
      mapType: 'jiangsu', //地图名
      ...
    }]
    ...
  }
``` 
<p>以上便可以实现地图的简单绘制，更丰富的地图样式属性等设置请查询<a href="https://echarts.apache.org/zh/option.html#series-map" title="echarts文档">echarts文档</a></p> 
<h3>5.geo组件的使用</h3> 
<p>geo为地理坐标系组件，在一些场景需要使用，如地图上某特定坐标点的定位，地图飞线等，可以使用之前注册好的地图数据进行geo组件的声明</p> 

```javascript
 option = {
    ...
    geo: {
      map: 'jiangsu',//地图名
      ...
    },
    ...
  }
``` 
<p></p>
