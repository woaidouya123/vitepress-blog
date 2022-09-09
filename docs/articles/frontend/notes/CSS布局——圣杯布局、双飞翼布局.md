# [CSS布局——圣杯布局、双飞翼布局](https://blog.csdn.net/woaidouya123/article/details/103378140)
*2019-12-03 23:06:16*

---
<p>圣杯布局和双飞翼布局解决的都是两边顶宽、中间自适应的三栏布局问题，要实现中间部分优先渲染。</p> 
<p>先上两个demo。</p> 
<p>圣杯布局：</p> 

```html
<!DOCTYPE html>
<html>
<head>
	<title>圣杯布局</title>
	<meta charset="utf-8">
	<style>
		.header {
			width: 100%;
			height: 30px;
			background: red;
		}
		.content {
			overflow: hidden;
			padding: 0 100px;
		}
		.footer {
			width: 100%;
			height: 30px;
			background: red;
		}
		.middle {
			position:relative;			
			width: 100%;
			float: left;
			height: 80px;
			background: green;
		}
		.left {
			position:relative;
			width: 100px;
			float: left;
			left:-100px;
			height: 80px;
			margin-left: -100%;
			background: yellow;
		}
		.right {
			position:relative;			
			width: 100px;
			float: left;
			right:-100px;
			height: 80px;
			margin-left: -100px;
			background: pink
		}
	</style>
</head>
<body>
        <div class="header"></div>
     	<div class="content">
		<div class="middle"></div>
		<div class="left"></div>
		<div class="right"></div>
	</div>
	<div class="footer"></div>
</body>
</html>
``` 
<p>双飞翼布局：</p> 

```html
<!DOCTYPE html>
<html>
<head>
	<title>双飞翼布局</title>
	<meta charset="utf-8">
	<style>
		.header {
			width: 100%;
			height: 30px;
			background: red;
		}
		.content {
			overflow: hidden;
		}
		.footer {
			width: 100%;
			height: 30px;
			background: red;
		}
		.middle {			
			width: 100%;
			float: left;
		}
               .inner-middle{
			 height: 80px; 
   margin: 0 100px; 
   background: green;			
		}
		.left {
			width: 100px;
			float: left;
			height: 80px;
			margin-left: -100%;
			background: yellow;
		}
		.right {			
			width: 100px;
			float: left;
			height: 80px;
			margin-left: -100px;
			background: pink
		}
	</style>
</head>
<body>
        <div class="header"></div>
	<div class="content">
		<div class="middle">
			<div class="inner-middle"></div>
		</div>
		<div class="left"></div>
		<div class="right"></div>
	</div>
	<div class="footer"></div>
</body>
</html>
``` 
<p>两者的异同：</p> 
<p>首先如开题所述，两种布局解决的问题是一样的，只是实现方式有些微小的差别；</p> 
<p>两者都采用了向左浮动的方式，还用实现布局的重点都是负边距的使用；</p> 
<p>圣杯布局使用固定的左右padding值的限制左右栏的大小，实现中间部分的自适应，两侧部分使用了负边距和relative控制；双飞翼布局则在中间栏使用了嵌套的div,在内层使用了margin来控制边距，两侧则只使用了负边距来保持位置；两者相比双飞翼布局d增加了一个div,但少用了relative样式。</p>
