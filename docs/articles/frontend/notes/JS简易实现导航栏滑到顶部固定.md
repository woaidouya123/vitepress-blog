# [JS简易实现导航栏滑到顶部固定](https://blog.csdn.net/woaidouya123/article/details/81517595)
2018-08-09 00:07:49 `jquery` `导航栏固定`

---
<p>适用场景如下图所示：</p> 
<p><img alt="" class="has" height="304" src="https://img-blog.csdn.net/20180808234243172?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvYWlkb3V5YTEyMw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" width="563"></p> 
<p>适用于导航栏顶部有滑动时需要隐藏的内容。</p> 
<p>实现思路：利用position:fix 的css属性能够实现元素固定在屏幕的某一位置，配合 top:0px;可实现将导航栏固定在顶部。</p> 
<p>故，可通过JS监听屏幕的滚动，当导航栏滚动到屏幕顶部时，修改导航栏的position属性。</p> 
<p>简易DEMO代码如下：</p> 

```html
<!-- 此处引入百度的cdn,方便调试 -->
<script src="http://libs.baidu.com/jquery/1.9.0/jquery.min.js"></script>
<style type="text/css">
    * {
        margin: 0;
        padding: 0;
    }
    .header{
        height: 70px;
        background:blue;
        width: 100%;
        font-size: 30px;
    }
    .nav {
        height: 50px;
        background: red;
        width: 100%;
        font-size: 30px;
    }
    .content{
        height: 500px;
        background:yellow;
        width: 100%;
        font-size: 30px;
    }
</style>
<div class="header">这是顶部</div>
<div class="nav">这是导航栏</div>
<div class="content">这是内容</div>
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
<script type="text/javascript">
    // 获取导航栏到屏幕顶部的距离
    var oTop = $(".nav").offset().top;
    //获取导航栏的高度，此高度用于保证内容的平滑过渡
    var martop = $('.nav').outerHeight();
    var sTop = 0;
    // 监听页面的滚动
    $(window).scroll(function () {
        // 获取页面向上滚动的距离
        sTop = $(this).scrollTop();
        // 当导航栏到达屏幕顶端
        if (sTop >= oTop) {
            // 修改导航栏position属性，使之固定在屏幕顶端
            $(".nav").css({ "position": "fixed", "top": "0" });
            // 修改内容的margin-top值，保证平滑过渡
            $(".content").css({ "margin-top": martop });
        } else {
            // 当导航栏脱离屏幕顶端时，回复原来的属性
            $(".nav").css({ "position": "static" });
            $(".content").css({ "margin-top": "0" });
        }
    });
</script>
``` 
<p>要注意的是，如果只修改导航栏的positon值，导航栏固定在顶端的同时，内容部分会向上跳一段距离，原因是当元素的position为fix时，会脱离原本的文档流，下面的元素会向上填充它原来占据的空间。</p> 
<p>为了页面的平滑移动，避免出现内容被覆盖的情况，可以在修改导航栏position属性的同时，为下面的内容元素加上高度为导航栏高度的上边距。当然，方法也不唯一，可以根据情况采用不同方法，实现页面的平滑滑动。</p> 
<p>不会发动图，大家想看效果的话可以将上面的代码复制到html文档中，浏览器查看即可。</p>
