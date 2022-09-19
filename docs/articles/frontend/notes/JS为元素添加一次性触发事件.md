# [JS为元素添加一次性触发事件](https://blog.csdn.net/woaidouya123/article/details/105188678)
2020-03-29 22:53:21 `js` `javascript` `一次性事件` `事件监听`

---
<p>可使用arguments的callee属性配合removeEventListener方法实现事件的移除</p> 

```javascript
element.addEventListener( "EventName", function(){
	//TODO
    element.removeEventListener("EventName", arguments.callee);
});
``` 
<p>注：arguments.callee在严格模式下无法使用&nbsp;</p>
