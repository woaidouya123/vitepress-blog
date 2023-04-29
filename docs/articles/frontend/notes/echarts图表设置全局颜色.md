# [echarts图表设置全局颜色](https://blog.csdn.net/woaidouya123/article/details/103866088)
2023-03-18 09:30:31 `js` `echarts` `图表` `全局颜色`

---
<p>当项目需要定制echarts图表的颜色时，可以采用以下两种方法：</p> 
<p>1.使用官方的<a href="https://echarts.baidu.com/theme-builder/">主题定制工具</a></p> 
<p><img alt="https://echarts.baidu.com/theme-builder/" class="has" height="390" src="https://img-blog.csdnimg.cn/20200106222606373.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvYWlkb3V5YTEyMw==,size_16,color_FFFFFF,t_70" width="800"></p> 
<p>可以在基本配置里面修改颜色和顺序</p> 
<p><img alt="https://echarts.baidu.com/theme-builder/" class="has" src="https://img-blog.csdnimg.cn/2020010622295038.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvYWlkb3V5YTEyMw==,size_16,color_FFFFFF,t_70" width="400"></p> 
<p>在官方提供的构建工具里还可以其他各种配置的定制选择。</p> 
<p>2.如果只是简单的改变颜色，并且你也已经准备好了颜色代码，那么可以通过直接修改本地加载的echarts.js或者echarts.min.js文件来修改全局颜色。</p> 
<p>打开js文件，全文搜索&nbsp;globalDefault 并找到其下的color,如下图：</p> 
<p><img alt="" class="has" src="https://img-blog.csdnimg.cn/20200106224037200.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvYWlkb3V5YTEyMw==,size_16,color_FFFFFF,t_70" width="600"></p> 
<p>用准备好的颜色代码将其替换即可。</p>
