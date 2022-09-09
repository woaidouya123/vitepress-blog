# [关于npm依赖包全局安装后报依赖包找不到的解决方法](https://blog.csdn.net/woaidouya123/article/details/103690638)
*2019-12-24 22:36:26*

---
<p>npm全局安装命令</p> 

```bash
npm install -g <package_name>
``` 
<p>如果安装之后仍然报依赖包找不到，原因大概率是未配置npm依赖包的环境变量</p> 
<p>配置方法：</p> 
<p>1.Windows环境</p> 
<p>增加环境变量 NODE_PATH 指向到全局包的安装路径</p> 
<p>关于全局包的安装路径，默认路径为C盘用户目录下C:\Users\用户名\AppData\Roaming\npm\node_modules</p> 
<p>你也可以通过命令更改安装路径</p> 

```bash
npm config set prefix "E:/Developer/nodejs/npm_global"
npm config set cache "E:/Developer/nodejs/npm_cache"
``` 
<p>2.Linux环境</p> 
<p>同样需要配置环境变量，修改/etc/profile文件，在文件尾部添加以下几行</p> 

```bash
export NODE_HOME=/root/node #node的安装路径
export PATH=$PATH:$NODE_HOME/bin
export NODE_PATH=$NODE_HOME/lib/node_modules
``` 
<p>修改完之后记得使用</p> 

```bash
source /etc/profile
``` 
<p>使之生效就可以了。</p>
