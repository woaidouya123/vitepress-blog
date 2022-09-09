# [使用css3filter属性实现图片毛玻璃效果](https://blog.csdn.net/woaidouya123/article/details/103758556)
*2019-12-29 22:05:45*

---
<p>可用于背景图片的遮盖和虚化处理；</p> 

```css
img {
    filter: url(blur.svg#blur);/* FireFox, Chrome, Opera */
    -webkit-filter: blur(5px);/* Chrome, Opera */
    -moz-filter: blur(5px);
    -ms-filter: blur(5px);
    filter: blur(5px);
    filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=5, MakeShadow=false);/* IE6~IE9 */
}
``` 
<p>&nbsp;</p>
