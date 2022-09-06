# [在Centos上搭建jupyter服务](https://blog.csdn.net/woaidouya123/article/details/103358228)
<ul><li>初衷</li></ul>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 方便在服务器上跑一些python爬虫脚本</p> 
<ul><li>环境准备</li></ul>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; Centos × 64 服务器</p> 
<ul><li>开始</li></ul>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 由于Centos预装的是2.×版本的python,而jupyter需要3.4以上的python版本，所以需要再安装python3.4或以上的版本。（注意不要将之前2.×版本的python删掉，否则会出现系统异常）</p> 
<p>要安装python3,首先要安装一系列安装包。</p> 

```
yum -y groupinstall "Development tools"
yum -y install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel 
``` 
<p>然后去python官网上下载python3的安装包，具体版本按自己的需求来</p> 

```
wget https://www.python.org/ftp/python/3.6.2/Python-3.6.2.tar.xz
``` 
<p>然后在下创建一个空的文件夹用来当做安装目录</p> 

```
mkdir /usr/local/python3 
``` 
<p>之后解压下载的安装包，进入该文件夹进行安装</p> 

```
tar -xvJf  Python-3.6.2.tar.xz
cd Python-3.6.2
./configure --prefix=/usr/local/python3
make && make install
``` 
<p>最后创建软连接用来在任意目录下使用python3&nbsp;命令</p> 

```
ln -s /usr/local/python3/bin/python3 /usr/bin/python3
ln -s /usr/local/python3/bin/pip3 /usr/bin/pip3
``` 
<p>至此，python3安装完毕。</p> 
<p>接下来进行jupyter安装：</p> 
<ol><li>&nbsp;安装jupyter</li></ol>

```
pip3 install  jupyter  
``` 
<p>&nbsp; &nbsp; &nbsp;2. &nbsp;生成配置文件</p> 

```
jupyter notebook --generate-config --allow-root
``` 
<p>配置文件生成在：~/.jupyter/jupyter_notebook_config.py</p> 
<p>&nbsp; &nbsp; 3. &nbsp;生成密码</p> 

```
jupyter notebook password
``` 
<p>&nbsp; &nbsp; 4. &nbsp;修改配置文件</p> 

```
# 设置监听地址，一般改为当前主机的ip
sed -ie "s/#c.NotebookApp.ip = 'localhost'/c.NotebookApp.ip = '0.0.0.0'/g" ~/.jupyter/jupyter_notebook_config.py
# 设置监听端口
sed -ie 's/#c.NotebookApp.port = 8888/c.NotebookApp.port = 8000/g' ~/.jupyter/jupyter_notebook_config.py
# 禁用自动打开浏览器
sed -ie 's/#c.NotebookApp.open_browser = True/c.NotebookApp.open_browser = False/g' ~/.jupyter/jupyter_notebook_config.py
``` 
<p>&nbsp; &nbsp; 5. &nbsp;启动jupyter</p> 

```
jupyter notebook --allow-root
``` 
<p>6. &nbsp;访问</p> 
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; 在访问前，检查防火墙规则是否允许8000（自己设置的jupyter端口）是否允许被访问。</p> 
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; 在浏览器地址栏输入服务器的地址和端口。</p> 
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; 进入登录页面后，用刚刚设置的密码登录。</p> 
<p>&nbsp;</p> 
<p>配置完成。开心的玩耍吧！</p>
