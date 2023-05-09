# [CSS——设置页面整体变为灰色](https://blog.csdn.net/woaidouya123/article/details/103395986)
2023-04-06 13:23:20 `CSS`

---
<p>应用于一些特殊的地方，比如设置怀念模式等。</p> 

```css
body>* {
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
    -webkit-filter: grayscale(1);
}
``` 
<p>&nbsp;</p>
