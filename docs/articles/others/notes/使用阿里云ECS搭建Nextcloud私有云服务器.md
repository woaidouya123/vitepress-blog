# [使用阿里云ECS搭建Nextcloud私有云服务器](https://blog.csdn.net/woaidouya123/article/details/79748196)
2018-03-29 23:45:09 `私有云盘` `nextcloud`

---
<p>白天基本泡在机房，自己电脑基本用不到，到了晚上回去用还需要用U盘把自己的程序拷回去，又悲催的发现自己用的机房里的那台电脑所有的USB接口都不能用了，估计是USB模块与主板的接点断掉了，啥插上去都没反应。。。mmp。。。。</p>
<p>于是想到了用云盘同步代码，机房网速虽然不咋滴，同步代码还是可以的。</p>
<p>百度云盘有同步功能，但是要会员才能用，毕竟带宽是宝贵的，不花钱肯定不能分给你。。。</p>
<p>而玩游戏从来不花一分钱的我唯有自力更生，想要自己搭一个云盘，去阿里云上9块9租了一个学生机，又刚好看到论坛上有搭建nextcloud的教程<a href="http://https//yq.aliyun.com/articles/86550">点击打开链接</a>，便按照他的教程一步一步来，可能是软件版本升级的问题或者环境问题，有几步被卡住。又查了好多资料，终于搭建成功。</p>
<p>环境：centos7 64位</p>
<p>1.首先要安装nginx和php7-fpm</p>
<p><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">在开始安装 Nginx 和 php7-fpm 之前，我们还学要先添加 EPEL 包的仓库源。使用如下命令：</span><br></p>

```
yum -y install epel-release
```
<p style="margin-top:1.5em;margin-bottom:1.5em;color:rgb(51,51,51);background-color:rgb(255,255,255);line-height:32px;font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;">现在开始从 EPEL 仓库来安装 Nginx：</p>

```html
yum -y install nginx
```
<p><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">然后就是安装 PHP7-FPM 以及 Nextcloud 需要的一些包。</span></p>

```html
yum -y install php70w-fpm php70w-cli php70w-gd php70w-mcrypt php70w-mysql php70w-pear php70w-xml php70w-mbstring php70w-pdo php70w-json php70w-pecl-apcu php70w-pecl-apcu-devel
```
<p><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">最后，从服务器终端里查看 PHP 的版本号，以便验证 PHP 是否正确安装。</span></p>

```html
php -v
```
<p>2.配置php7-fpm</p>
<p><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">在这一个步骤中，我们将配置 php-fpm 与 Nginx 协同运行。Php7-fpm 将使用&nbsp;</span><code style="font-family:Menlo, Monaco, Consolas, 'Courier New', monospace;font-size:14.4px;color:rgb(184,255,184);background-color:rgb(22,27,32);padding:2px 4px;margin:0px 4px;">nginx</code><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">&nbsp;用户来运行，并监听</span><code style="font-family:Menlo, Monaco, Consolas, 'Courier New', monospace;font-size:14.4px;color:rgb(184,255,184);background-color:rgb(22,27,32);padding:2px 4px;margin:0px 4px;">9000</code><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">&nbsp;端口。</span><br></p>
<p><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);"><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">使用 vim 编辑默认的 php7-fpm 配置文件。</span><br></span></p>

```html
vim /etc/php-fpm.d/www.conf
```
<span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">在第 8 行和第 10行，</span>
<code style="font-family:Menlo, Monaco, Consolas, 'Courier New', monospace;font-size:14.4px;color:rgb(184,255,184);background-color:rgb(22,27,32);padding:2px 4px;margin:0px 4px;">user</code>
<span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">&nbsp;和&nbsp;</span>
<code style="font-family:Menlo, Monaco, Consolas, 'Courier New', monospace;font-size:14.4px;color:rgb(184,255,184);background-color:rgb(22,27,32);padding:2px 4px;margin:0px 4px;">group</code>
<span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">&nbsp;赋值为&nbsp;</span>
<code style="font-family:Menlo, Monaco, Consolas, 'Courier New', monospace;font-size:14.4px;color:rgb(184,255,184);background-color:rgb(22,27,32);padding:2px 4px;margin:0px 4px;">nginx</code>
<span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">。</span>

```html
user = nginx
group = nginx
```
<p><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">在第 22 行，确保 php-fpm 运行在指定端口。</span></p>

```html
listen = 127.0.0.1:9000
```

```html
env[HOSTNAME] = $HOSTNAME
env[PATH] = /usr/local/bin:/usr/bin:/bin
env[TMP] = /tmp
env[TMPDIR] = /tmp
env[TEMP] = /tmp
```
<p style="margin-top:1.5em;margin-bottom:1.5em;color:rgb(51,51,51);background-color:rgb(255,255,255);line-height:32px;font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;">保存文件并退出 vim 编辑器。</p>
<p style="margin-top:1.5em;margin-bottom:1.5em;color:rgb(51,51,51);background-color:rgb(255,255,255);line-height:32px;font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;">下一步，就是在&nbsp;<code style="font-family:Menlo, Monaco, Consolas, 'Courier New', monospace;font-size:14.4px;color:rgb(184,255,184);background-color:rgb(22,27,32);padding:2px 4px;margin:0px 4px;">/var/lib/</code>&nbsp;目录下创建一个新的文件夹&nbsp;<code style="font-family:Menlo, Monaco, Consolas, 'Courier New', monospace;font-size:14.4px;color:rgb(184,255,184);background-color:rgb(22,27,32);padding:2px 4px;margin:0px 4px;">session</code>，并将其拥有者变更为&nbsp;<code style="font-family:Menlo, Monaco, Consolas, 'Courier New', monospace;font-size:14.4px;color:rgb(184,255,184);background-color:rgb(22,27,32);padding:2px 4px;margin:0px 4px;">nginx</code>&nbsp;用户。</p>

```html
mkdir -p /var/lib/php/session
chown nginx:nginx -R /var/lib/php/session/
```
<p><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">然后启动 php-fpm 和 Nginx，并且将它们设置为随开机启动的服务。</span></p>

```html
sudo systemctl start php-fpm
sudo systemctl start nginx
sudo systemctl enable php-fpm
sudo systemctl enable nginx
```
<p><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">PHP7-FPM 配置完成</span></p>
<p><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">3.安装和配置MariaDB(之前没用过这个数据库，查了查资料 ，说是开发mysql的团队开发的，使用起来与mysql并无太大差别，看其他教程也有使用mysql安装)</span></p>
<p><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);"><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">可以直接使用&nbsp;</span><code style="font-family:Menlo, Monaco, Consolas, 'Courier New', monospace;font-size:14.4px;color:rgb(184,255,184);background-color:rgb(22,27,32);padding:2px 4px;margin:0px 4px;">yum</code><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">&nbsp;命令从 CentOS 默认远程仓库中安装</span><code style="font-family:Menlo, Monaco, Consolas, 'Courier New', monospace;font-size:14.4px;color:rgb(184,255,184);background-color:rgb(22,27,32);padding:2px 4px;margin:0px 4px;">mariadb-server</code><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">&nbsp;包。</span><br></span></p>

```html
yum -y install mariadb mariadb-server
```
<span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">启动 MariaDB，并将其添加到随系统启动的服务中去。</span>

```html
systemctl start mariadb
systemctl enable mariadb
```
<p><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">现在开始配置 MariaDB 的 root 用户密码。</span></p>

```html
mysql_secure_installation
```
<p><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">键入&nbsp;</span><code style="font-family:Menlo, Monaco, Consolas, 'Courier New', monospace;font-size:14.4px;color:rgb(184,255,184);background-color:rgb(22,27,32);padding:2px 4px;margin:0px 4px;">Y</code><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">&nbsp;，然后设置 MariaDB 的 root 密码。（注意这一块要先按一下Y，之前没用过mariadb,还以为要我输入密码<img alt="难过" src="https://static-blog.csdn.net/xheditor/xheditor_emot/default/sad.gif">，愣是搞了半天<img alt="尴尬" src="https://static-blog.csdn.net/xheditor/xheditor_emot/default/awkward.gif">）</span></p>

```html
Set root password? [Y/n] Y
New password:
Re-enter new password:
Remove anonymous users? [Y/n] Y
Disallow root login remotely? [Y/n] Y
Remove test database and access to it? [Y/n] Y
Reload privilege tables now? [Y/n] Y
```
<p><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">这样就设置好了密码，现在登录到 mysql shell 并为 Nextcloud 创建一个新的数据库和用户。这里我创建名为</span><code style="font-family:Menlo, Monaco, Consolas, 'Courier New', monospace;font-size:14.4px;color:rgb(184,255,184);background-color:rgb(22,27,32);padding:2px 4px;margin:0px 4px;">nextcloud_db</code><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">&nbsp;的数据库以及名为&nbsp;</span><code style="font-family:Menlo, Monaco, Consolas, 'Courier New', monospace;font-size:14.4px;color:rgb(184,255,184);background-color:rgb(22,27,32);padding:2px 4px;margin:0px 4px;">nextclouduser</code><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">&nbsp;的用户，用户密码为&nbsp;</span><code style="font-family:Menlo, Monaco, Consolas, 'Courier New', monospace;font-size:14.4px;color:rgb(184,255,184);background-color:rgb(22,27,32);padding:2px 4px;margin:0px 4px;">nextclouduser@</code><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">。当然了，要给你自己的系统选用一个更安全的密码。（建议直接改为自己设置的用户名和密码）</span></p>

```html
mysql -u root -p
```
<p style="margin-top:1.5em;margin-bottom:1.5em;color:rgb(51,51,51);background-color:rgb(255,255,255);line-height:32px;font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;">输入 MariaDB 的 root 密码，即可登录 mysql shell。</p>
<p style="margin-top:1.5em;margin-bottom:1.5em;color:rgb(51,51,51);background-color:rgb(255,255,255);line-height:32px;font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;">输入以下 mysql 查询语句来创建新的数据库和用户。</p>

```html
create database nextcloud_db;
create user nextclouduser@localhost identified by 'nextclouduser@';
grant all privileges on nextcloud_db.* to nextclouduser@localhost identified by 'nextclouduser@';
flush privileges;
```
<p><code style="font-family:Menlo, Monaco, Consolas, 'Courier New', monospace;font-size:14.4px;color:rgb(184,255,184);background-color:rgb(22,27,32);padding:2px 4px;margin:0px 4px;">nextcloud_db</code><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">&nbsp;数据库和&nbsp;</span><code style="font-family:Menlo, Monaco, Consolas, 'Courier New', monospace;font-size:14.4px;color:rgb(184,255,184);background-color:rgb(22,27,32);padding:2px 4px;margin:0px 4px;">nextclouduser</code><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">&nbsp;数据库用户创建完成。</span></p>
<p><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">4.为 Nextcloud 生成一个自签名 SSL 证书<br></span></p>
<p><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">注意这里的SSL证书是自签名的，所以当你使用https连接时，会提醒你该站点证书不合法，勾选忽略或选择信任继续前往该站点就可以了。如果想要获取合法的证书，可以在阿里云上免费申请。</span></p>
<p><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);"><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">这里我使用 OpenSSL 来创建自己的自签名 SSL 证书。</span><br></span></p>
<p><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);"><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);"><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">为 SSL 文件创建新目录：</span><br></span></span></p>

```html
mkdir -p /etc/nginx/cert/
```
<p><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">如下，使用&nbsp;</span><code style="font-family:Menlo, Monaco, Consolas, 'Courier New', monospace;font-size:14.4px;color:rgb(184,255,184);background-color:rgb(22,27,32);padding:2px 4px;margin:0px 4px;">openssl</code><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">&nbsp;生成一个新的 SSL 证书。</span></p>

```html
openssl req -new -x509 -days 365 -nodes -out /etc/nginx/cert/nextcloud.crt -keyout /etc/nginx/cert/nextcloud.key
```
<p><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">最后使用&nbsp;</span><code style="font-family:Menlo, Monaco, Consolas, 'Courier New', monospace;font-size:14.4px;color:rgb(184,255,184);background-color:rgb(22,27,32);padding:2px 4px;margin:0px 4px;">chmod</code><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">&nbsp;命令将所有证书文件的权限设置为&nbsp;</span><code style="font-family:Menlo, Monaco, Consolas, 'Courier New', monospace;font-size:14.4px;color:rgb(184,255,184);background-color:rgb(22,27,32);padding:2px 4px;margin:0px 4px;">600</code><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">。</span></p>

```html
chmod 700 /etc/nginx/cert
chmod 600 /etc/nginx/cert/*
```
<p>&nbsp;5.下载和安装 Nextcloud</p>
<p><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">我直接使用&nbsp;</span><code style="font-family:Menlo, Monaco, Consolas, 'Courier New', monospace;font-size:14.4px;color:rgb(184,255,184);background-color:rgb(22,27,32);padding:2px 4px;margin:0px 4px;">wget</code><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">&nbsp;命令下载 Nextcloud 到服务器上，因此需要先行安装&nbsp;</span><code style="font-family:Menlo, Monaco, Consolas, 'Courier New', monospace;font-size:14.4px;color:rgb(184,255,184);background-color:rgb(22,27,32);padding:2px 4px;margin:0px 4px;">wget</code><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">。此外，还需要安装&nbsp;</span><code style="font-family:Menlo, Monaco, Consolas, 'Courier New', monospace;font-size:14.4px;color:rgb(184,255,184);background-color:rgb(22,27,32);padding:2px 4px;margin:0px 4px;">unzip</code><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">&nbsp;来进行解压。使用&nbsp;</span><code style="font-family:Menlo, Monaco, Consolas, 'Courier New', monospace;font-size:14.4px;color:rgb(184,255,184);background-color:rgb(22,27,32);padding:2px 4px;margin:0px 4px;">yum</code><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">&nbsp;命令来安装这两个程序。</span><br></p>

```html
yum -y install wget unzip
```
<p><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">先进入&nbsp;</span><code style="font-family:Menlo, Monaco, Consolas, 'Courier New', monospace;font-size:14.4px;color:rgb(184,255,184);background-color:rgb(22,27,32);padding:2px 4px;margin:0px 4px;">/tmp</code><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">&nbsp;目录，然后使用&nbsp;</span><code style="font-family:Menlo, Monaco, Consolas, 'Courier New', monospace;font-size:14.4px;color:rgb(184,255,184);background-color:rgb(22,27,32);padding:2px 4px;margin:0px 4px;">wget</code><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">&nbsp;从官网下载最新的 Nextcloud 10。(注：现在最新的是nextcloud 13版本)</span></p>

```html
cd /tmp
wget https://download.nextcloud.com/server/releases/nextcloud-10.0.2.zip
```
<p><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">解压 Nextcloud，并将其移动到&nbsp;</span><code style="font-family:Menlo, Monaco, Consolas, 'Courier New', monospace;font-size:14.4px;color:rgb(184,255,184);background-color:rgb(22,27,32);padding:2px 4px;margin:0px 4px;">/usr/share/nginx/html/</code><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">&nbsp;目录。</span></p>

```html
unzip nextcloud-10.0.2.zip
mv nextcloud/ /usr/share/nginx/html/
```
<p><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">下一步，转到 Nginx 的 web 根目录为 Nextcloud 创建一个&nbsp;</span><code style="font-family:Menlo, Monaco, Consolas, 'Courier New', monospace;font-size:14.4px;color:rgb(184,255,184);background-color:rgb(22,27,32);padding:2px 4px;margin:0px 4px;">data</code><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);">&nbsp;文件夹。</span></p>

```html
cd /usr/share/nginx/html/
mkdir -p nextcloud/data/
```
<p>变更&nbsp;<code style="padding:2px 4px;margin:0px 4px;color:rgb(184,255,184);background-color:rgb(22,27,32);">nextcloud</code>&nbsp;目录的拥有者为&nbsp;<code style="padding:2px 4px;margin:0px 4px;color:rgb(184,255,184);background-color:rgb(22,27,32);">nginx</code>&nbsp;用户和组。</p>

```html
chown nginx:nginx -R nextcloud/

```
<p>6.在NGINX上为nextcloud配置虚拟主机</p>
<p>在步骤 5 我们已经下载好了 Nextcloud 源码，并配置好了让它运行于 Nginx 服务器中，但我们还需要为它配置一个虚拟主机。在 Nginx 的&nbsp;<code style="padding:2px 4px;margin:0px 4px;color:rgb(184,255,184);background-color:rgb(22,27,32);">conf.d</code>&nbsp;目录下创建一个新的虚拟主机配置文件&nbsp;<code style="padding:2px 4px;margin:0px 4px;color:rgb(184,255,184);background-color:rgb(22,27,32);">nextcloud.conf</code>。</p>

```html
cd /etc/nginx/conf.d/
vim nextcloud.conf

```
<p>将以下内容粘贴到虚拟主机配置文件中：</p>

```html
upstream php-handler {
    server 127.0.0.1:9000;
    #server unix:/var/run/php5-fpm.sock;
}
server {
    listen 80;
    server_name cloud.nextcloud.co;
    # enforce https
    return 301 https://$server_name$request_uri;
}
server {
    listen 443 ssl;
    server_name cloud.nextcloud.co;
    ssl_certificate /etc/nginx/cert/nextcloud.crt;
    ssl_certificate_key /etc/nginx/cert/nextcloud.key;
    # Add headers to serve security related headers
    # Before enabling Strict-Transport-Security headers please read into this
    # topic first.
    add_header Strict-Transport-Security "max-age=15768000;
    includeSubDomains; preload;";
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Robots-Tag none;
    add_header X-Download-Options noopen;
    add_header X-Permitted-Cross-Domain-Policies none;
    # Path to the root of your installation
    root /usr/share/nginx/html/nextcloud/;
    location = /robots.txt {
        allow all;
        log_not_found off;
        access_log off;
    }
    # The following 2 rules are only needed for the user_webfinger app.
    # Uncomment it if you're planning to use this app.
    #rewrite ^/.well-known/host-meta /public.php?service=host-meta last;
    #rewrite ^/.well-known/host-meta.json /public.php?service=host-meta-json
    # last;
    location = /.well-known/carddav {
      return 301 $scheme://$host/remote.php/dav;
    }
    location = /.well-known/caldav {
      return 301 $scheme://$host/remote.php/dav;
    }
    # set max upload size
    client_max_body_size 512M;
    fastcgi_buffers 64 4K;
    # Disable gzip to avoid the removal of the ETag header
    gzip off;
    # Uncomment if your server is build with the ngx_pagespeed module
    # This module is currently not supported.
    #pagespeed off;
    error_page 403 /core/templates/403.php;
    error_page 404 /core/templates/404.php;
    location / {
        rewrite ^ /index.php$uri;
    }
    location ~ ^/(?:build|tests|config|lib|3rdparty|templates|data)/ {
        deny all;
    }
    location ~ ^/(?:\.|autotest|occ|issue|indie|db_|console) {
        deny all;
    }
    location ~ ^/(?:index|remote|public|cron|core/ajax/update|status|ocs/v[12]|updater/.+|ocs-provider/.+|core/templates/40[34])\.php(?:$|/) {
        include fastcgi_params;
        fastcgi_split_path_info ^(.+\.php)(/.*)$;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
        fastcgi_param HTTPS on;
        #Avoid sending the security headers twice
        fastcgi_param modHeadersAvailable true;
        fastcgi_param front_controller_active true;
        fastcgi_pass php-handler;
        fastcgi_intercept_errors on;
        fastcgi_request_buffering off;
    }
    location ~ ^/(?:updater|ocs-provider)(?:$|/) {
        try_files $uri/ =404;
        index index.php;
    }
    # Adding the cache control header for js and css files
    # Make sure it is BELOW the PHP block
    location ~* \.(?:css|js)$ {
        try_files $uri /index.php$uri$is_args$args;
        add_header Cache-Control "public, max-age=7200";
        # Add headers to serve security related headers (It is intended to
        # have those duplicated to the ones above)
        # Before enabling Strict-Transport-Security headers please read into
        # this topic first.
        add_header Strict-Transport-Security "max-age=15768000;
        includeSubDomains; preload;";
        add_header X-Content-Type-Options nosniff;
        add_header X-Frame-Options "SAMEORIGIN";
        add_header X-XSS-Protection "1; mode=block";
        add_header X-Robots-Tag none;
        add_header X-Download-Options noopen;
        add_header X-Permitted-Cross-Domain-Policies none;
        # Optional: Don't log access to assets
        access_log off;
    }
    location ~* \.(?:svg|gif|png|html|ttf|woff|ico|jpg|jpeg)$ {
        try_files $uri /index.php$uri$is_args$args;
        # Optional: Don't log access to other assets
        access_log off;
    }
}

```
<p>保存文件并退出 vim。测试一下该 Nginx 配置文件是否有错误，没有的话就可以重启服务了。</p>
<p>此处注意虚拟主机的配置需要遵守一定的规则，如果测试不通过，请查看一下配置是否正确，我直接复制上面的代码，运行是正确的。</p>
<p>7.为nextcloud配置SElinux和firewallD规则</p>
<p>我们将以强制模式运行 SELinux，因此需要一个 SELinux 管理工具来为 Nextcloud 配置 SELinux。<br></p>

```html
yum -y install policycoreutils-python
```
<p>然后以 root 用户来运行以下命令，以便让 Nextcloud 运行于 SELinux 环境之下。如果你是用的其他名称的目录，记得将&nbsp;<code style="padding:2px 4px;margin:0px 4px;color:rgb(184,255,184);background-color:rgb(22,27,32);">nextcloud</code>&nbsp;替换掉。</p>

```html
semanage fcontext -a -t httpd_sys_rw_content_t '/usr/share/nginx/html/nextcloud/data(/.*)?'
semanage fcontext -a -t httpd_sys_rw_content_t '/usr/share/nginx/html/nextcloud/config(/.*)?'
semanage fcontext -a -t httpd_sys_rw_content_t '/usr/share/nginx/html/nextcloud/apps(/.*)?'
semanage fcontext -a -t httpd_sys_rw_content_t '/usr/share/nginx/html/nextcloud/assets(/.*)?'
semanage fcontext -a -t httpd_sys_rw_content_t '/usr/share/nginx/html/nextcloud/.htaccess'
semanage fcontext -a -t httpd_sys_rw_content_t '/usr/share/nginx/html/nextcloud/.user.ini'
restorecon -Rv '/usr/share/nginx/html/nextcloud/'

```
<p>此处若出现问题，请检查一下selinux的配置文件，查看selinux是否开启，若没开启，则开启后再尝试。</p>
<p></p>
<p style="margin-top:1.5em;margin-bottom:1.5em;padding:0px;line-height:32px;font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;font-size:16px;">接下来，我们要启用 firewalld 服务，同时为 Nextcloud 开启 http 和 https 端口。</p>
<p style="margin-top:1.5em;margin-bottom:1.5em;padding:0px;line-height:32px;font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;font-size:16px;">启动 firewalld 并设置随系统启动。</p>

```html
systemctl start firewalld
systemctl enable firewalld

```现在使用&nbsp;
<code style="padding:2px 4px;margin:0px 4px;color:rgb(184,255,184);background-color:rgb(22,27,32);">firewall-cmd</code>&nbsp;命令来开启 http 和 https 端口，然后重新加载防火墙。
<br>
<br>

```html
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --reload

```
<p>至此，服务器配置完成。</p>
<p>8.nextcloud安装</p>
<p></p>
<p style="margin-top:1.5em;margin-bottom:1.5em;padding:0px;line-height:32px;font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;font-size:16px;">打开你的 Web 浏览器，输入你为 Nextcloud 设置的域名，我这里设置为&nbsp;<code style="padding:2px 4px;margin:0px 4px;color:rgb(184,255,184);background-color:rgb(22,27,32);">cloud.nextcloud.co</code>，然后会重定向到安全性更好的 https 连接。（这里要注意一下，输入网址的时候要使用https,否则打开的是nginx的页面，如果没有域名，直接访问https://ip地址 就可以了）</p>
<p style="margin-top:1.5em;margin-bottom:1.5em;padding:0px;line-height:32px;font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;font-size:16px;">设置你的管理员用户名和密码，然后输入数据验证信息，点击 '完成安装 (Finish Setup)'。</p>
<img src="https://img-blog.csdn.net/20180329234121302?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvYWlkb3V5YTEyMw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt="">
<br>
<p>Nextcloud 管理面板大致如下：</p>
<p><img src="https://img-blog.csdn.net/201803292341575?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvYWlkb3V5YTEyMw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt=""><br></p>
<p><span style="font-family:'Lantinghei SC', 'Helvetica Neue', 'Microsoft YaHei', '微软雅黑', Arial, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;color:#333333;background-color:rgb(255,255,255);"><br></span></p>
<p><br></p>
