# [记录贴——用Jenkins自动化构建部署微信小程序](https://blog.csdn.net/woaidouya123/article/details/109233075)
*2020-10-23 00:39:39*

---
<p>最近开始接触小程序开发，顺便尝试了一下使用Jenkins对小程序进行自动化构建部署，</p> 
<p>即：git仓库变更——&gt;jenkins自动构建——&gt;代码上传至微信小程序服务器</p> 
<p>&nbsp;</p> 
<p>jenkins监听git仓库自不必多说，主要写一下小程序的miniprogram-ci模块以及在服务器上构建以及上传是遇到的坑</p> 
<p>&nbsp;</p> 
<h2>1.miniprogram-ci</h2> 
<p>在miniprogram-ci模块出现之前，小程序的代码上传要通过微信开发者工具手动上传。当然，仍然有很多大佬开发出了各种脚本工具实现自动化，但大都还是基于windows/Mac等操作系统安装微信开发者工具之后的实现。</p> 
<p><a href="https://www.npmjs.com/package/miniprogram-ci">miniprogram-ci</a>&nbsp;是从<a href="https://developers.weixin.qq.com/miniprogram/dev/devtools/devtools.html">微信开发者工具</a>中抽离的关于小程序/小游戏项目代码的编译模块。</p> 
<p>开发者可不打开小程序开发者工具，独立使用 miniprogram-ci 进行小程序代码的上传、预览等操作。</p> 
<p>所以我们可以愉快的在linux服务器上愉快的玩耍了ヽ(￣▽￣)ﾉ</p> 
<p>具体API文档可查看<a href="https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html">https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html</a></p> 
<p>这里晒一下我的配置文件：</p> 

```javascript
const ci = require('miniprogram-ci')
;(async () => {
  const BUILD_NUMBER = process.env.BUILD_NUMBER;
  const SCM_CHANGELOG = process.env.SCM_CHANGELOG;
  // 工程信息
  const project = new ci.Project({
    appid: 'wxac429285b3099f2e',
    type: 'miniProgram',
    projectPath: 'dist/build/mp-weixin',
    privateKeyPath: '/root/wechat_key/private.wxac429285b3099f2e.key',
    ignores: ['node_modules/**/*'],
  })
  // 上传信息
  const uploadResult = await ci.upload({
    project,
    version: `1.0.${BUILD_NUMBER}`,
    desc: `${SCM_CHANGELOG}`,
    onProgressUpdate: console.log,
  })
  console.log(uploadResult)
  // 预览信息
  const previewResult = await ci.preview({
    project,
    version: `1.0.${BUILD_NUMBER}`,
    desc: `${SCM_CHANGELOG}`,
    qrcodeFormat: 'image',
    qrcodeOutputDest: 'ci/destination.jpg',
    onProgressUpdate: console.log,
    // pagePath: 'pages/index/index', // 预览页面
    // searchQuery: 'a=1&b=2',  // 预览参数 [注意!]这里的`&`字符在命令行中应写成转义字符`\&`
  })
  console.log(previewResult)
})()
``` 
<p><span style="color:#f33b45;">注意：</span></p> 
<p>要想使用miniprogram-ci模块上传小程序代码，必须在&nbsp; 微信公众平台-开发-开发设置&nbsp;&nbsp;下载代码上传密钥，并配置 IP 白名单 开发者可选择打开 IP 白名单，打开后只有白名单中的 IP 才能调用相关接口。</p> 
<p style="text-align:center;"><img alt="" height="286" src="https://img-blog.csdnimg.cn/img_convert/e6847e59fbee1e7220047fb328d38f26.png" width="600"></p> 
<h2>&nbsp;</h2> 
<h2>2.构建以及发布</h2> 
<p>遇到的坑：</p> 
<p>（1）由于我开发使用的是uni-app框架，采用vue.js编写，所以比直接的小程序代码上传多了一步编译构建过程，在部署到服务器构建时遇到了一个问题——使用npm install安装某些包时构建程序卡住超时。。。不知道是不是我用的是境外服务器的原因，切换成淘宝镜像源也没解决这个问题。。。最后手动打包了node_modules放到了代码里，在构建时直接解压就可以了</p> 
<p><span style="color:#f33b45;">注意：</span>如果要使用手动打包好的依赖包，必须是采用npm安装的包，不能使用cnpm安装，因为cnpm会利用原有的缓存。</p> 
<p>（2）代码上传时，有时会报错，错误信息如下：</p> 

```bash
20003 'Error: {"errCode":-10008,"errMsg":"invalid ip: 101.32.177.136, reference: https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html"}'
(node:1877) UnhandledPromiseRejectionWarning: Error: Error: {"errCode":-10008,"errMsg":"invalid ip: 101.32.177.136, reference: https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html"}
``` 
<p>这是由于微信小程序上传服务器的原因，可直接再次构建直到解决，这里我使用了一个jenkins插件Naginator</p> 
<p><img alt="" height="60" src="https://img-blog.csdnimg.cn/20201023002037543.png" width="556"></p> 
<p>然后修改配置，在构建后操作勾选Retry build after failure，fix delay中设置延迟时间，我这里设置的是1s,执行3次</p> 
<p><img alt="" height="428" src="https://img-blog.csdnimg.cn/20201023002248428.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvYWlkb3V5YTEyMw==,size_16,color_FFFFFF,t_70" width="1200"></p> 
<p>（3）在小程序上传版本描述中增加代码提交信息</p> 
<p>jenkins可用的环境变量中并没有代码提交中的commit信息，想要获取变更的commit信息，需要使用插件Changelog</p> 
<p>下载地址<a href="https://github.com/KrisMarko/kr-changelog">https://github.com/KrisMarko/kr-changelog</a></p> 
<p>下载.hpi文件后在Jenkins——系统管理——插件管理——高级中上传.hpi文件即可</p> 
<p>修改配置如下图：</p> 
<p><img alt="" height="654" src="https://img-blog.csdnimg.cn/20201023003408500.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvYWlkb3V5YTEyMw==,size_16,color_FFFFFF,t_70" width="1200"></p> 
<p>之后在脚本中调用&nbsp;SCM_CHANGELOG 环境变量即可获取提交信息</p>
