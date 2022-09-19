# [记录贴——echarts图表动态刻度尺的简单实现](https://blog.csdn.net/woaidouya123/article/details/109152016)
2020-10-18 23:58:46 `javascript` `echarts` `刻度尺` `自定义刻度显示`

---
<h1><a id="_1"></a>项目场景：</h1> 
<p><span style="color:#999aaa;">如下图表：</span></p> 
<p style="text-align:center;"><img alt="效果图" src="https://img-blog.csdnimg.cn/20201018231143322.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvYWlkb3V5YTEyMw==,size_16,color_FFFFFF,t_70"></p> 
<hr>
<h1><a id="_7"></a>问题描述：</h1> 
<p><span style="color:#999aaa;">后端传来的数据单位为bps,需要前端根据数据动态换算到对应的单位</span></p> 
<p><span style="color:#999aaa;">换算关系为</span></p> 
<p><span style="color:#999aaa;">1024 bps =&gt; 1kbps</span></p> 
<p><span style="color:#999aaa;">1024 kbps =&gt; 1Mbps</span></p> 
<p><span style="color:#999aaa;">1024 Mbps =&gt; 1Gbps</span></p> 
<p><span style="color:#999aaa;">此处换算较为简单，只需一个简单函数实现</span></p> 

```javascript
// 动态计算流量单位
export function calcUnit(value){
  // 初始单位bps
  let unit_arry = ['bps', 'kbps', 'Mbps', 'Gbps'], unit_index = 0, res = +value;
  while(res >= 1024&&unit_index<3){
    res = res/1024;
    unit_index++;
  }
  // 此处返回值保留一位小数
  return [Math.round(res*10)/10,unit_arry[unit_index]];
}
``` 
<p>然后配置到图表对应的formatter即可</p> 
<p>在对yAxis上的刻度formatter配置了换算函数后，出现了下面的效果</p> 
<p style="text-align:center;"><img alt="" src="https://img-blog.csdnimg.cn/20201018232431316.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvYWlkb3V5YTEyMw==,size_16,color_FFFFFF,t_70"></p> 
<p>y轴上刻度并没有像之前的echarts图表那样以10 100 等整数刻度显示，而是出现了小数</p> 
<hr>
<h1><a id="_27"></a>原因分析：</h1> 
<p><span style="color:#999aaa;">出现这种情况的原因是：echarts用来动态计算刻度的数据并没有因为自定义的显示格式化而改变，echarts是根据十进制来计算的，而由于字节单位的计算是以1024进行单位换算的，就会造成这种现象。</span></p> 
<hr>
<h1><a id="_34"></a>解决方案：</h1> 
<p>根据返回数据中的最大值，设计算法获取大于并接近其的大整数，使该整数位刻度的最大值</p> 
<p>如：</p> 
<p>最大值&nbsp; &nbsp; 返回值</p> 
<p>88&nbsp; =》&nbsp; 90</p> 
<p>888&nbsp; =》&nbsp; 900</p> 
<p>8888 =》&nbsp; 9000</p> 
<p>算法简单实现如下</p> 

```javascript
function getMaxLine(num){
    let pow = 0;
    // 现将数据处理至能达到的最大单位（Gbps为上限）
    while(num >= 1024 && pow < 3){
        num = num/1024;
        pow++;
    }
    // 数据向上取整
    num = Math.ceil(num);
    // 计算达到最近数据的差
    let pad = Math.pow(10,calcWei(num)) - (''+num).substring(1);
    return (num + pad)*Math.pow(1024,pow);
}
// 以10为倍数计算最大值的位数（-1）
function calcWei(value){
    let res = 0;
    while(value >= 10){
        value = value/10;
        res++;
    }
    return res;
}
``` 
<p>实现效果：</p> 
<p style="text-align:center;"><img alt="" src="https://img-blog.csdnimg.cn/20201018235551689.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvYWlkb3V5YTEyMw==,size_16,color_FFFFFF,t_70"></p> 
<p>注意：</p> 
<p>echarts图表只设置yAxis的max值时并不会自动平均间隔，需要设置splitNumber，interval将其强制分割</p>
