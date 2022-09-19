# [js实现手动滑动条](https://blog.csdn.net/woaidouya123/article/details/81677086)
2018-08-15 00:39:30 `js` `html` `滑动条`

---
<p>效果如下图所示：</p> 
<p><img alt="" class="has" height="123" src="https://img-blog.csdn.net/20180815002455377?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvYWlkb3V5YTEyMw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" width="856"></p> 
<p>滑动效果如下图：</p> 
<p><img alt="" class="has" height="121" src="https://img-blog.csdn.net/20180815002626219?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvYWlkb3V5YTEyMw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" width="848">&nbsp;</p> 
<p>样例页面代码如下：</p> 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>test</title>
    <style>
    #bg_bar {
        margin: 10px;
        height: 80px;
        border-radius: 38px;
        background-color: gray;
        opacity: 0.5;
    }
    #touch_bar {
        position: relative;
        top: -82px;
        border: 2px solid blue;
        width: 15%;
        height: 80px;
        border-radius: 38px;
        background-color: white;
        display: flex;
        flex: row;
        justify-content: center;
        align-items: center;
        z-index: 20;
    }
    #bg_new {
        position: relative;
        top: -164px;
        height: 80px;
        border-radius: 38px;
        background-color: blue;
        z-index: 15;
    }
    #bg_old {
        height: 80px;
        z-index: 10;
        display: flex;
        flex: row;
        justify-content: center;
        align-items: center;
    }
    </style>
</head>
<body>
    <div id="bg_bar">
        <div id="bg_old">
            <span style="font-size: 30px">滑动登录</span>
        </div>
        <div id="touch_bar">
        </div>
        <div id="bg_new"></div>
    </div>
</body>
<script>
var isTouch = false; //标志位，是否点击
var startX = 0; //鼠标点击的偏移量，实现平滑移动的保证
(function() {
    var touch_bar = document.getElementById("touch_bar");
    var bg_bar = document.getElementById("bg_bar");
    var bg_new = document.getElementById("bg_new");
    /* 
    为滑块绑定鼠标移动事件
    当鼠标在滑块上移动时，使滑块在水平方向上跟随移动
    是否移动要根据标志位检测滑块是否被点击
    */
    touch_bar.onmousemove = function(ev) {
        var ev = ev || event;
        // console.log(ev.clientX);
        if (ev.clientX - startX > 0 &&
            ev.clientX - startX < bg_bar.offsetWidth - touch_bar.offsetWidth &&
            isTouch) {
            touch_bar.style.left = ev.clientX - startX + "px";
            bg_new.style.width = ev.clientX - startX + touch_bar.offsetWidth / 2 + "px";
        }
    }
    /*
    设置滑块点击事件,改变标志位，并重置偏移量
    */
    touch_bar.onmousedown = function(ev) {
        isTouch = true;
        startX = event.clientX;
    }
    /*
    设置滑块鼠标点击取消事件,改变标志位，重置偏移量
    */
    touch_bar.onmouseup = function(ev) {
        isTouch = false;
        startX = 0;
        touch_bar.style.left = "0px";
        bg_new.style.width = "0px";
    }
    /*
    设置滑块鼠标移出事件,改变标志位，并重置偏移量
    */
    touch_bar.onmouseout = function(ev) {
        isTouch = false;
        startX = 0;
        touch_bar.style.left = "0px";
        bg_new.style.width = "0px";
    }
    //重置偏移量
    touch_bar.style.left = "0px";
    bg_new.style.width = "0px";
})();
</script>
</html>
``` 
<p>&nbsp;</p>
