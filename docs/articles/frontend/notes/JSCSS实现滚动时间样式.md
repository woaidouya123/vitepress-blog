# [JSCSS实现滚动时间样式](https://blog.csdn.net/woaidouya123/article/details/103706264)
2019-12-25 22:08:52 `时间滚动` `JS` `CSS`

---
<p>效果图：</p> 
<p><img alt="效果图" class="has" height="146" src="https://img-blog.csdnimg.cn/20191225214425130.gif" width="637"></p> 
<p>动画实现的方案是缩减上方div的高度带动整体上滑，然后用Js操作dom将最上方的div移到最下方。</p> 
<p>主要css:</p> 

```css
.continer {
    display: flex;
    justify - content: center;
    align - items: center;
    font - size: 40 px;
}
.scroll {
    width: 100 px;
    height: 100 px;
    position: relative;
    overflow: hidden;
    display: inline - block;
    border: 1 px solid gray;
}
.scroll span {
    display: flex;
    height: 100 px;
    width: 100 px;
    text - align: center;
    font - size: 40 px;
    box - sizing: border - box;
    justify - content: center;
    align - items: center;
}
.bar {
    position: relative;
    top: -200 px;
}
@keyframes close {
    0 % {
        height: 100 px;
    }
    100 % {
        height: 0 px;
    }
}
``` 
<p>页面主要部分：</p> 

```html
<div class="continer">
    <div id="scroll6"></div>
    <div id="scroll5"></div>:
    <div id="scroll4"></div>
    <div id="scroll3"></div>:
    <div id="scroll2"></div>
    <div id="scroll1"></div>
</div>
``` 
<p>Js根据时间动态生成dom方法：</p> 

```javascript
var timeArray = [9, 5, 9, 5, 13, 2];
// 生成dom结点
function init_dom(date) {
    var s = [date.getHours(), date.getMinutes(), date.getSeconds()].reduce(function(total, item) {
        return total + (item > 9 ? item : "0" + item);
    }, "");
    var scrollDiv, barDiv, span, i, j;
    var columns = [],
        col, s_num;
    // 计算每一列的值
    for (i = 0; i < timeArray.length; i++) {
        col = [], s_num = parseInt(s[timeArray.length - i - 1]);
        for (j = 0; j <= timeArray[i]; j++) {
            col.push((s_num - 1 + j + timeArray[i]) % (timeArray[i] + 1) % 10);
        }
        // 对小时进行特殊处理
        if (i === 4 && parseInt(s[0]) >= 2) {
            col = col.slice(10).concat(col.slice(0, 10));
        }
        if (i === 5) {
            for (j = 0; j <= timeArray[i]; j++) {
                col.push((s_num - 1 + j + timeArray[i]) % (timeArray[i] + 1));
            }
        }
        columns.push(col);
    }
    for (i = 0; i < columns.length; i++) {
        scrollDiv = document.getElementById("scroll" + (i + 1));
        scrollDiv.innerHTML = "";
        scrollDiv.className = "scroll";
        barDiv = document.createElement("div");
        barDiv.className = "bar";
        for (j = 0; j < columns[i].length; j++) {
            span = document.createElement("span");
            span.innerHTML = columns[i][j];
            barDiv.appendChild(span);
        }
        scrollDiv.appendChild(barDiv);
    }
};
``` 
<p>滚动实现与进位触发：</p> 

```javascript
// 启动方法；
function scroll() {
    var scrollDiv = document.getElementById("scroll1");
    SI = setInterval(function() {
        var dom = scrollDiv.children[0].children[0];
        dom.style.animation = "close 0.5s linear";
        if (scrollDiv.children[0].children[3].innerHTML == "0") {
            tickSec(1);
        }
        dom.addEventListener("animationend", function(event) {
            var ev = event || window.event;
            var target = ev.target;
            var node = document.createElement("span");
            node.innerHTML = target.innerHTML;
            target.parentNode.removeChild(target);
            scrollDiv.children[0].appendChild(node);
        })
    }, 1000)
};
// 触发器
function tickSec(index) {
    var scrollDiv = document.getElementById("scroll" + (index + 1));
    var dom = scrollDiv.children[0].children[0];
    dom.style.animation = "close 0.5s linear";
    if (index < timeArray.length - 1 && scrollDiv.children[0].children[3].innerHTML == "0") {
        tickSec(index + 1);
    }
    dom.addEventListener("animationend", function(event) {
        var ev = event || window.event;
        var target = ev.target;
        var node = document.createElement("span");
        node.innerHTML = target.innerHTML;
        scrollDiv.children[0].removeChild(target);
        scrollDiv.children[0].appendChild(node);
    })
}
``` 
<p>由于获取的时间与系统当前时间仍有1000ms以内的差值，所以还要有用来纠正时间差值的启动方法：</p> 

```javascript
// 启动
function start() {
    // 毫秒差纠正
    var date = new Date();
    var pad = 1000 - date.getMilliseconds();
    var st = setTimeout(function() {
        scroll();
        clearTimeout(st);
    }, pad)
    init_dom(new Date(date.getTime() + pad));
}
``` 
<p>&nbsp;</p> 
<p>&nbsp;</p> 
<p>以上就实现了基本的滚动样式实现；</p> 
<p>但值得注意的是，当浏览器最小化或者页面不可见时，定时程序是停止运行的，所以会出现时间与当前时间并不匹配的情况。</p> 
<p>这可以通过监听页面的显隐解决，代码如下：</p> 

```javascript
// 设置隐藏属性和改变可见属性的事件的名称
var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
    hidden = "hidden";
    visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
}
// 处理页面可见属性的改变
document.addEventListener(visibilityChange, function() {
    clearInterval(SI);
    start();
}, false);
``` 
<p>完整代码更新地址：<a href="https://github.com/woaidouya123/cssLib/blob/master/src/cssDemo/scrollTime.html">github地址</a></p>
