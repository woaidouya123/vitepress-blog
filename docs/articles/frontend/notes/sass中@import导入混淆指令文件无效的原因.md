# [sass中@import导入混淆指令文件无效的原因](https://blog.csdn.net/woaidouya123/article/details/108262501)
2023-02-23 17:48:13 `css` `sass` `混淆指令` `mixin`

---
<p>Sass 拓展了&nbsp;<code>@import</code>&nbsp;的功能，允许其导入 SCSS 或 Sass 文件。被导入的文件将合并编译到同一个 CSS 文件中，另外，被导入的文件中所包含的变量或者混合指令 (mixin) 都可以在导入的文件中使用。</p> 
<p><span style="color:#f33b45;">但在以下情况下，<code>@import</code>&nbsp;仅作为普通的 CSS 语句，不会导入任何 Sass 文件。</span></p> 
<ul><li><span style="color:#f33b45;">文件拓展名是&nbsp;<code>.css</code>；</span></li><li><span style="color:#f33b45;">文件名以&nbsp;<code>http://</code>&nbsp;开头；</span></li><li><span style="color:#f33b45;">文件名是&nbsp;<code>url()</code>；</span></li><li><span style="color:#f33b45;"><code>@import</code>&nbsp;包含 media queries。</span></li></ul> 
<p>如果不在上述情况内，文件的拓展名是&nbsp;<code>.scss</code>&nbsp;或&nbsp;<code>.sass</code>，则导入成功。没有指定拓展名，Sass 将会试着寻找文件名相同，拓展名为&nbsp;<code>.scss</code>&nbsp;或&nbsp;<code>.sass</code>&nbsp;的文件并将其导入。</p> 
<p><span style="color:#f33b45;">如果导入外部混淆指令文件无效，请检查导入格式是否正确。</span></p> 
<p>更多用法见<a href="https://www.sass.hk/docs/">https://www.sass.hk/docs/</a></p> 
<p>&nbsp;</p>
