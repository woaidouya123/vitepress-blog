# [兼容IE8的多文件上传实现](https://blog.csdn.net/woaidouya123/article/details/103501295)
2019-12-11 23:40:11 `JS` `多文件上传` `ie8`

---
<p>兼容IE8的注意点：</p> 
<ol><li>原生多文件属性multiple只在IE10/11上有效，IE8不兼容无法使用</li><li>formdata对象同样只支持在IE10/11，IE8无法使用</li><li>很多API在IE8上无法使用，同样是兼容的难点</li><li>IE8的安全机制，使一些操作无法实现</li></ol>
<p>本文使用原生JS对文件进行简单处理实现多文件上传，未使用其他插件。</p> 
<p>实现思路：</p> 
<p>由于multiple属性无法使用，采取通过增加input框的方式实现多文件的选择和存储，故单次只能选择一个文件，可选择多次。</p> 
<p>选择完一个文件之后，调用方法隐藏input，并将文件名以列表形式显示出来，并提供删除选项。</p> 
<p>效果图：</p> 
<p><img alt="效果图" class="has" src="https://img-blog.csdnimg.cn/20191211233134870.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvYWlkb3V5YTEyMw==,size_16,color_FFFFFF,t_70"></p> 
<p>实现代码：</p> 

```html
<!DOCTYPE html>
<html>
<head>
    <title>多文件上传</title>
    <meta charset="utf-8">
    <style>
        .file-select{
			position: relative;
		}
		/*设置透明*/
		.file-select input[type=file]{
			position: absolute;
			width: 50px;
		    filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0);
		    -ms-filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0);
		    opacity: 0;
		    -webkit-opacity: 0;
		    -moz-opacity: 0;
		    z-index: 100;
		}
		.brower{
			display: inline-block;
			width: 50px;
			position: absolute;
			left: 0px;
			color: skyblue;
		}
		.file-select input:hover + span.brower{
			text-decoration: underline;
		}
	</style>
</head>
<body>
    <form action="hello.do" method="post" enctype="multipart/form-data">
        <div id="eee">
            <span>选择文件：</span>
            <input type="submit"  value="提交" />
            <br />
            <div class="file-select" id="file_div1">
                <input type="file" name="UploadFile" onchange="fileChange()" />
                <span class="brower">浏览</span>
                <input type="button" onclick="deleteDiv()" style="display: none;" value="删除" />
            </div>
        </div>
    </form>
    <script>
    var FILECOUNT = 1;
    function fileChange() {
        var preDiv = document.getElementById("file_div" + FILECOUNT);
        var nextDiv = preDiv.cloneNode(true);
        FILECOUNT = FILECOUNT + 1;
        // 添加新的div
        nextDiv.setAttribute("id", "file_div" + FILECOUNT)
        document.getElementById("eee").appendChild(nextDiv);
        // 对已选完文件的div进行处理
        var preFile = preDiv.children[0],
            preSpan = preDiv.children[1],
            preButton = preDiv.children[2];
        preFile.style["display"] = "none";
        preSpan.className = "";
        preSpan.innerHTML = preFile.value;
        preButton.style["display"] = "inline-block";
    }
    // 删除方法
    function deleteDiv(event) {
        var ev = event || window.event;
        var target = ev.target || ev.srcElement;
        document.getElementById("eee").removeChild(target.parentNode);
    }
    </script>
</body>
</html>
``` 
<p>持续更新：<a href="https://github.com/woaidouya123/cssLib/tree/master/src/mutipleFile/mutiple.html">github地址</a></p>
