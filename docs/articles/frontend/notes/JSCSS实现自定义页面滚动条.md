# [JSCSS实现自定义页面滚动条](https://blog.csdn.net/woaidouya123/article/details/103484605)
*2019-12-10 23:10:54*

---
<p>效果图如下：</p> 
<p><img alt="sliber.gif" class="has" height="227" src="https://img-blog.csdnimg.cn/20191210225629683.gif" width="406"></p> 
<p>首先隐藏原生的滚动条（仅限chrome浏览器）</p> 

```css
html::-webkit-scrollbar{
    display: none;
}
``` 
<p>通过JS监听页面滚动</p> 

```javascript
document.addEventListener("scroll", function(e) {
        var ev = e || window.event;
        var height = window.innerHeight - 50; //计算剩余高度
        var pointer = document.getElementById("pointer");
        var percents = window.scrollY/(document.body.offsetHeight-window.innerHeight);// 计算滑动百分比
        percents = percents>1?1:percents;//差额取整
        pointer.style["top"] = 10 + height * percents + "px";
        pointer.innerHTML=Math.round(percents*100) + "%";
    })
``` 
<p>完整代码见：<a href="https://github.com/woaidouya123/cssLib/blob/master/src/cssDemo/slideBar.html">github地址</a></p>
