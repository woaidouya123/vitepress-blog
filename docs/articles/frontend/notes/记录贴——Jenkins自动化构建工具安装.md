# [记录贴——Jenkins自动化构建工具安装](https://blog.csdn.net/woaidouya123/article/details/108988477)
2022-12-09 11:31:02 `jenkins` `自动化部署` `java`

---
<p>1.环境准备</p> 
<p>1.1centos7</p> 
<p>1.2jdk安装<a href="https://www.cnblogs.com/stulzq/p/9286878.html">可见链接</a></p> 
<p>2.安装</p> 

```bash
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
yum install jenkins
``` 
<p>&nbsp;修改配置文件</p> 

```
vim /etc/sysconfig/jenkins
``` 

```
#修改配置
$JENKINS_USER="root"
``` 
<p>修改目录权限</p> 

```
chown -R root:root /var/lib/jenkins
chown -R root:root /var/cache/jenkins
chown -R root:root /var/log/jenkins
``` 
<p>重启</p> 

```
service jenkins restart
ps -ef | grep jenkins
``` 
<p>启动</p> 

```
systemctl start jenkins
``` 
<p>访问jenkins地址 http:&lt;ip或者域名&gt;:8080，完毕</p> 
<p>记录一下安装过程中遇到的坑：</p> 
<p>1.java环境配置。jdk安装好之后要配好环境变量并建立到/usr/bin/java的软链接</p> 
<p>2.权限问题。jenkins启动失败可能是因为目录没有操作权限，需要修改目录权限，并重启jenkins</p> 
<p>3.内存溢出问题。由于我用的服务器内存很小遇到了内存溢出问题，可在jenkins配置文件中配置内存使用（根据情况调整）</p> 

```bash
JENKINS_JAVA_OPTIONS="-Djava.awt.headless=true -Xmx256m -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=256m -Xss2m"
``` 
<p>&nbsp;</p>
