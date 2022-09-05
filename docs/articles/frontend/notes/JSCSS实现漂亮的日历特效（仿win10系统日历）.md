# [JSCSS实现漂亮的日历特效（仿win10系统日历）](https://blog.csdn.net/woaidouya123/article/details/103518773)
<p>初衷：无意见发现win10的系统日鼠标悬浮的特效非常好看，想尝试一下用CSS和JS实现一下。</p> 
<p>先上一下目前实现的效果图：</p> 
<p><img alt="效果图.gif" class="has" height="311" src="https://img-blog.csdnimg.cn/2019121223294465.gif" width="403"></p> 
<p>难点是这种间隔效果和鼠标移动效果的实现，如下图</p> 
<p><img alt="" class="has" height="137" src="https://img-blog.csdnimg.cn/20191212233336716.png" width="132"></p> 
<p>间隔效果的实现我采用了</p> 

```css
background-clip: content-box;
padding: 2px;
background-color: gray;
border: 1px solid gray;
``` 
<p>样式，为border和content加上颜色，并通过设置background-clip: content-box;将padding进行透明处理。</p> 
<p>鼠标移动效果则是使用JS监听鼠标相对位置，通过设置和移动背景的位置实现，颜色和透明度的变化则是通过CSS渐变实现。</p> 

```
background-image: radial-gradient(circle, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
background-size: 92px 92px;
background-repeat: no-repeat;
``` 
<p>鼠标监听方法：</p> 

```javascript
tbody.addEventListener("mousemove", function(event) {
            var ev = event || window.event;
            ev.preventDefault();
            this.style["background-position"] = (ev.clientX - this.offsetLeft - 40) + "px " +
                (ev.clientY - this.offsetTop - 40) + "px";
        }, true);
        tbody.addEventListener("mouseout", function(event) {
            var ev = event || window.event;
            ev.preventDefault();
            this.style["background-position"] = "-92px -92px";
        }, true)
``` 
<p>完整代码见：<a href="https://github.com/woaidouya123/cssLib/blob/master/src/cssDemo/GridHover.html">github地址</a></p>
