# [使用JS判断日期的有效性](https://blog.csdn.net/woaidouya123/article/details/103413938)
<p>为了方便，这里使用的是&nbsp;yyyy/MM/dd 格式的日期。</p> 
<p>一般策略：</p> 
<p>将年月日分别取出，根据是否闰年和每月的日期进行判断。</p> 

```javascript
function judgeDate(date){
	const rmons = [31,29,31,30,31,30,31,31,30,31,30,31],
		  pmons = [31,28,31,30,31,30,31,31,30,31,30,31];
	var year = parseInt(date.substr(0,4)),
		mon = parseInt(date.substr(5,7)),
		day = parseInt(date.substr(8,10));
	if(year % 4 == 0 &amp;&amp; year % 100 != 0 || year % 400 == 0){
		return mon > 0 &amp;&amp; mon <=12 &amp;&amp; day > 0 &amp;&amp; day <= rmons[mon-1];
	}else{
		return mon > 0 &amp;&amp; mon <=12 &amp;&amp; day > 0 &amp;&amp; day <= pmons[mon-1];
	}
}
``` 
<p>使用JS内置对象Date进行判断：</p> 
<p>将输入的字符串直接转化为Date对象，并根据是否转化后的对象是否有效及重新拼接后是否和原来相同判断有效性。</p> 

```javascript
function judgeDate(date){
	var pDate = new Date(date);
	if(isNaN(pDate.getTime())){
		return false;
	}
	var year = pDate.getFullYear(),
		mon = /(\d+)/.test(pDate.getMonth()+1+"")&amp;&amp;RegExp.$1.length <= 1?"0"+RegExp.$1:RegExp.$1,
		day = /(\d+)/.test(pDate.getDate()+"")&amp;&amp;RegExp.$1.length <= 1?"0"+RegExp.$1:RegExp.$1;
	return date == year + "/" + mon + "/" + day;
}
``` 
<p>&nbsp;</p>
