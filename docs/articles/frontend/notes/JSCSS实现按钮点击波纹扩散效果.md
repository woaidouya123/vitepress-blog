# [JSCSS实现按钮点击波纹扩散效果](https://blog.csdn.net/woaidouya123/article/details/103467158)
2019-12-09 23:05:03 `JS` `CSS` `按钮特效`

---
<p>实现点击时按钮背景为动态扩散的波纹效果。</p> 
<p>效果图如下：</p> 
<p><img alt="效果图" class="has" height="227" src="https://img-blog.csdnimg.cn/2019121010020312.gif" width="406"></p> 
<p>页面代码：</p> 

```html
<!DOCTYPE html>
<html>
<head>
	<title>按钮点击特效</title>
</head>
<style>
	input[type=button]{
	    outline: none;
	    height: 60px;
	    line-height: 60px;
	    width: 200px;
	    background-color: white;
	    border: 1px solid skyblue;
	    color: blue;
	}
	input[type=button]:focus{
		background-image: url(bg.png);
	    background-repeat: no-repeat;
	    background-size: 0% 0%;
	}
</style>
<body>
<input type="button" value="点我">
<script>
	var buttons = document.getElementsByTagName("input");
	for(var i=0;i<buttons.length;i++){
		console.log(buttons[i]);
		if(buttons[i].type == "button"){
			buttons[i].addEventListener("click",function(e){
				var ev = e || window.event;//获取点击事件
				var parent = ev.target;//获取按钮的dom节点
				var count = 1; // 计时
				var sI = setInterval(function(){
					// 循环结束，清除背景
					if(count > 100){
						parent.style["background-image"] = "";
						parent.style["background-position"] = "";
						parent.style["background-size"] = "";
						clearInterval(sI);
						return;
					}
					// 设置背景的大小变化
					parent.style["background-size"] = 2*count + "%";
					// 设置背景位置根据背景大小改变
					parent.style["background-position"] = (ev.clientX - parent.offsetLeft - count*parent.offsetWidth/100)+
					"px "+
					(ev.clientY - parent.offsetTop - count*parent.offsetWidth/100)+
					"px";
					count += 1;
				},10) // 设置间隔时间为10ms
			})
		}
	}
</script>
</body>
</html>
``` 
<p>背景素材：</p> 
<p><img alt="背景图片" class="has" height="177" src="https://img-blog.csdnimg.cn/20191209230402721.png" width="168"></p>
