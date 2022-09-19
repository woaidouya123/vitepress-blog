# [JSCSS实现页面滚动切换图片（从边角扩散）的效果](https://blog.csdn.net/woaidouya123/article/details/103588888)
2019-12-17 22:32:37 `JS` `CSS` `图片滚动切换`

---
<p>先上效果图：</p> 
<p><img alt="效果图" class="has" height="383" src="https://img-blog.csdnimg.cn/2019121722103970.gif" width="639"></p> 
<p>实现思路：</p> 
<p>两个绝对定位的div重合，通过监听页面滚动位置信息，动态的改变上面的div宽高、背景定位、边角半径</p> 
<p>div样式设计:</p> 

```css
.bgTrans {
        height: 400px;
        position: relative;
    }
    .bgTrans div {
        position: absolute;
    }
    .bgTrans div.back {
        background-image: url(../images/3.jpg);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        height: 100%;
        width: 100%;
        z-index: 90;
    }
    .bgTrans div.front {
        background-image: url(../images/4.jpg);
        background-position: -100% -100%;
        background-repeat: no-repeat;
        left: 100%;
        top: 400px;
        border-top-left-radius: 100%;
        z-index: 100;
    }
``` 
<p>页面滚动监听方法：</p> 

```javascript
window.onscroll = function(event) {
            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            var percents;
            if ((div.offsetTop - scrollTop - seeHeight + div.offsetHeight) < 0) {
                if ((div.offsetTop - scrollTop - seeHeight + div.offsetHeight) >= -1 * (seeHeight - div.offsetHeight)) {
                    percents = (div.offsetTop - scrollTop - seeHeight + div.offsetHeight) / (seeHeight - div.offsetHeight) * (-1) * 100;
                } else {
                    percents = 100;
                }
            } else {
                percents = 0;
            }
            // 重置front宽高和位置
            front.style.left = 100 - percents + "%";
            front.style.top = div.offsetHeight - div.offsetWidth * percents / 100 + "px";
            front.style.width = percents + "%";
            front.style.height = div.offsetWidth * percents / 100 + "px";
            // 计算角度，使动画效果更圆滑连贯
            front.style["border-top-left-radius"] = div.offsetWidth * percents / 100 < 
            			div.offsetWidth - div.offsetHeight ? 100+"%":div.offsetWidth - div.offsetHeight+"px";
            front.style["background-position"] = (div.offsetLeft - front.offsetLeft - 8) + "px " +
             (div.offsetLeft - front.offsetTop - 8) + "px";
        }
``` 
<p>完整代码持续更新地址：<a href="https://github.com/woaidouya123/cssLib/blob/master/src/cssDemo/bgTrans.html">github地址</a></p>
