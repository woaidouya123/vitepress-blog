# [Leanote——搭建自己的私人笔记服务器](https://blog.csdn.net/woaidouya123/article/details/81484028)
*2018-08-07 17:29:26*

---
<p>话说好记性不如烂笔头，把平常遇到的问题通过笔记记下来对于程序猿来说实在是太有用了，找了一些笔记软件，除了oneNote,大多数都不免费提供云端同步功能。然而微软的服务器感觉速度实在太慢，而且不支持markdown功能。</p> 
<p>最后让我找到了leanote,这是一个开源的笔记框架，你可以将它搭建在自己的服务器上。客户端支持windows/Mac/Linux/Android/IOS ,实在是相当强大。最关键的是它还能自动生成博客，省了好多事。。。最后说一下，这个框架是由国产的呦。</p> 
<p><img alt="" class="has" height="168" src="https://img-blog.csdn.net/20180807164703970?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvYWlkb3V5YTEyMw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" width="533"></p> 
<p>服务器版本分为 源码版 和 二进制编译版</p> 
<p>因为leanote是由go语言编写，所以安装源码版本的话需要先搭建go语言的编译环境，在经过一番折腾源码版失败之后T-T，我选择了二进制编译版本。</p> 
<hr>
<p>安装步骤如下：</p> 
<h3>1.先去官网下载<a href="http://leanote.org/#download">leanote服务器最新版</a>，不想折腾的话建议直接二进制版本</h3> 
<h2>2.安装mongodb数据库</h2> 
<p>各系统安装mongodb数据库的方式大体一样，从官网下载包之后解压，然后将路径添加到环境变量中（各系统添加环境变量方式不一样，不知道的话百度就可以）</p> 
<p>设置后环境变量之后，在命令窗口中输入下面这条命令，对leanote所用到的表进行初始化</p> 

```
mongorestore -h localhost -d leanote --dir ~/leanote/mongodb_backup/leanote_install_data/
``` 
<p>注意：其中 --dir&nbsp; 后面为解压后的leanote中的路径，需要将其改为自己对应的路径</p> 
<h3>3.配置leanote</h3> 
<p>leanote配置文件在 leanote-&gt;conf-&gt;app.conf&nbsp;</p> 
<p>可以修改端口号、url、数据库信息等，</p> 
<p>里面有一个appkey,官方说明文档里说用户必须要修改，要不然会有安全问题，随便改改就好</p> 
<h3>4.运行leanote</h3> 
<p>下面就可以运行leanote了，运行文件在leanote/bin中，我用的linux系统搭建的，所以里面有一个 start.sh, 使用别的系统的话应该是对应的可执行文件，直接运行就可以。</p> 
<h3>5.测试和使用</h3> 
<p>在浏览器地址栏输入http://你的服务器IP地址：设置的端口号，就可以访问到leanote的欢迎页。</p> 
<p>默认管理员用户为admin,默认密码为abc123。</p> 
<p>注意：只有管理员用户有后台管理的功能，如果将管理员admin的用户名更改的话就会失去管理员功能，需要将leanote/conf/app.conf中的adminUser改为更改后的用户名并重新启动leanote。</p> 
<p>如果有不详细的地方或遇到什么错误，请参考leanote官方文档，</p> 
<p><a href="https://github.com/leanote/leanote/wiki/QA">据说所有的坑都在这里能找到</a><a href="https://github.com/leanote/leanote/wiki/QA">https://github.com/leanote/leanote/wiki/QA</a></p> 
<p>&nbsp;</p> 
<p>下面附上我的服务器地址<a href="http://www.woaidouya123.cf:2333">woaidouya123的leanote博客</a></p>
