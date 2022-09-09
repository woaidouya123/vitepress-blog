# [JS实现宫格拖动动画效果](https://blog.csdn.net/woaidouya123/article/details/104384605)
*2020-02-18 22:59:10*

---
<p>效果图如下：</p> 
<p><img alt="效果图" height="360" src="https://img-blog.csdnimg.cn/20200218225046416.gif" width="640"></p> 
<p>html布局：</p> 

```html
<!DOCTYPE html>
<html>
<head>
	<title>dragLabel</title>
	<meta charset="utf-8">
</head>
<body>
	<div class="container">
		<div class="item" draggable="true"><span>1</span></div>
		<div class="item" draggable="true"><span>2</span></div>
		<div class="item" draggable="true"><span>3</span></div>
		<div class="item" draggable="true"><span>4</span></div>
		<div class="item" draggable="true"><span>5</span></div>
		<div class="item" draggable="true"><span>6</span></div>
		<div class="item" draggable="true"><span>7</span></div>
		<div class="item" draggable="true"><span>8</span></div>
		<div class="item" draggable="true"><span>9</span></div>
	</div>
</body>
</html>
``` 
<p>css样式：</p> 

```css
.container{
	width: 910px;
	font-size: 0px;
}
.item{
	font-size: 40px;
	color: white;
	width: 300px;
    height: 200px;
    background-color: yellowgreen;
    display: inline-block;
    text-align: center;
    position: absolute;
    cursor: grab;
    transition: left,top;
    transition-duration: 0.6s;
}
.item span{
    display: block;
    width: fit-content;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
    user-select: none;
}
``` 
<p>JS实现：</p> 

```javascript
var divs = document.querySelectorAll(".item"),i,div,dragDiv,isMoving = false;
for(i=0;i<divs.length;i++){
	divs[i].style["background-color"] = getRandomColor();
}
document.body.addEventListener("dragover",function(ev){
	ev.preventDefault();
})
sortDiv(divs);
for(i=0;i<divs.length;i++){
	div = divs[i];
	div.addEventListener("dragstart",function(e){
		dragDiv = this;
	})
	div.addEventListener("dragover",function(e){
		if(isMoving || this.isEqualNode(dragDiv)){
			return;
		}
		if(isPreviousElements(this,dragDiv)){
			this.parentNode.insertBefore(dragDiv,this.nextSibling);
		}else{
			this.parentNode.insertBefore(dragDiv,this);
		}
		isMoving = true;
		var st = setTimeout(function(){
			isMoving = false;
			clearTimeout(st);
		},600);
		sortDiv(document.querySelectorAll(".item"))
	})
}
// 随机生成颜色
function getRandomColor(){
	return "rgb(" + Math.random()*256 +","+ Math.random()*256+","+ Math.random()*256+")"
}
// 判断拖动元素是否在目标元素之前
function isPreviousElements(sourse, target){
	if(!sourse.previousSibling){
		return false;
	}
	if(target.isEqualNode(sourse.previousSibling)){
		return true;
	}
	return isPreviousElements(sourse.previousSibling, target)
}
// 位置排序
function sortDiv(divs){
	for(var i=0;i<divs.length;i++){
		divs[i].style.top = Math.floor(i/3)*201 + "px";
		divs[i].style.left = (i%3)*301 + "px";
	}
}
``` 
<p>完整代码更新地址：<a href="https://github.com/woaidouya123/cssLib/blob/master/src/cssDemo/dragLabel.html">github地址</a></p>
