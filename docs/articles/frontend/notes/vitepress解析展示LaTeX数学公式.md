# [vitepress解析展示LaTeX数学公式](https://blog.csdn.net/woaidouya123/article/details/127275642)
2022-10-12 10:18:10 `javascript` `前端` `vue.js` `vitepress`

---
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                        <path stroke-linecap="round" d="M5,0 0,2.5 5,5z" id="raphael-marker-block" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path>
                    </svg>
                    <h3><a id="_0"></a>前言</h3> 
<p>vitepress默认的md解析器<code>markdown-it</code>不支持LaTeX数学公式的解析展示，需要安装扩展插件，此处笔者介绍<code>markdown-it-katex</code>及<code>markdown-it-mathjax3</code>两种插件的配置方法</p> 
<p><mark>注：笔者当前使用最新vitepress及插件版本如下，随版本更新配置方法可能有改动，仅供参考</mark></p> 
<table><thead><tr><th align="center">vitepress</th><th align="center">markdown-it-katex</th><th align="center">markdown-it-mathjax3</th></tr></thead><tbody><tr><td align="center">1.0.0-alpha.19</td><td align="center">2.0.3</td><td align="center">4.3.2</td></tr></tbody></table> 
<hr> 
<h4><a id="markdownitkatex_9"></a>一、markdown-it-katex</h4> 
<p>一个支持 KaTeX 语法的数学公式渲染器</p> 
<h5><a id="1_11"></a>1.安装库</h5> 
<pre><code class="prism language-bash"><span class="token function">npm</span> <span class="token function">install</span> markdown-it-katex -D
</code></pre> 
<h5><a id="2_15"></a>2.配置插件</h5> 
<p>修改<code>.vitepress/config.js</code>配置文件<br> <strong>由于vitepress编译生成静态html文件时，无法识别插件生成的特殊标签，故需在编译时进行处理，将特殊标签标记为自定义标签，防止编译报错</strong></p> 
<pre><code class="prism language-js"><span class="token keyword">import</span> <span class="token punctuation">{<!-- --></span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vitepress'</span>
<span class="token keyword">import</span> markdownItKatex <span class="token keyword">from</span> <span class="token string">'markdown-it-katex'</span>
<span class="token keyword">const</span> customElements <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token string">'math'</span><span class="token punctuation">,</span>
  <span class="token string">'maction'</span><span class="token punctuation">,</span>
  <span class="token string">'maligngroup'</span><span class="token punctuation">,</span>
  <span class="token string">'malignmark'</span><span class="token punctuation">,</span>
  <span class="token string">'menclose'</span><span class="token punctuation">,</span>
  <span class="token string">'merror'</span><span class="token punctuation">,</span>
  <span class="token string">'mfenced'</span><span class="token punctuation">,</span>
  <span class="token string">'mfrac'</span><span class="token punctuation">,</span>
  <span class="token string">'mi'</span><span class="token punctuation">,</span>
  <span class="token string">'mlongdiv'</span><span class="token punctuation">,</span>
  <span class="token string">'mmultiscripts'</span><span class="token punctuation">,</span>
  <span class="token string">'mn'</span><span class="token punctuation">,</span>
  <span class="token string">'mo'</span><span class="token punctuation">,</span>
  <span class="token string">'mover'</span><span class="token punctuation">,</span>
  <span class="token string">'mpadded'</span><span class="token punctuation">,</span>
  <span class="token string">'mphantom'</span><span class="token punctuation">,</span>
  <span class="token string">'mroot'</span><span class="token punctuation">,</span>
  <span class="token string">'mrow'</span><span class="token punctuation">,</span>
  <span class="token string">'ms'</span><span class="token punctuation">,</span>
  <span class="token string">'mscarries'</span><span class="token punctuation">,</span>
  <span class="token string">'mscarry'</span><span class="token punctuation">,</span>
  <span class="token string">'mscarries'</span><span class="token punctuation">,</span>
  <span class="token string">'msgroup'</span><span class="token punctuation">,</span>
  <span class="token string">'mstack'</span><span class="token punctuation">,</span>
  <span class="token string">'mlongdiv'</span><span class="token punctuation">,</span>
  <span class="token string">'msline'</span><span class="token punctuation">,</span>
  <span class="token string">'mstack'</span><span class="token punctuation">,</span>
  <span class="token string">'mspace'</span><span class="token punctuation">,</span>
  <span class="token string">'msqrt'</span><span class="token punctuation">,</span>
  <span class="token string">'msrow'</span><span class="token punctuation">,</span>
  <span class="token string">'mstack'</span><span class="token punctuation">,</span>
  <span class="token string">'mstack'</span><span class="token punctuation">,</span>
  <span class="token string">'mstyle'</span><span class="token punctuation">,</span>
  <span class="token string">'msub'</span><span class="token punctuation">,</span>
  <span class="token string">'msup'</span><span class="token punctuation">,</span>
  <span class="token string">'msubsup'</span><span class="token punctuation">,</span>
  <span class="token string">'mtable'</span><span class="token punctuation">,</span>
  <span class="token string">'mtd'</span><span class="token punctuation">,</span>
  <span class="token string">'mtext'</span><span class="token punctuation">,</span>
  <span class="token string">'mtr'</span><span class="token punctuation">,</span>
  <span class="token string">'munder'</span><span class="token punctuation">,</span>
  <span class="token string">'munderover'</span><span class="token punctuation">,</span>
  <span class="token string">'semantics'</span><span class="token punctuation">,</span>
  <span class="token string">'math'</span><span class="token punctuation">,</span>
  <span class="token string">'mi'</span><span class="token punctuation">,</span>
  <span class="token string">'mn'</span><span class="token punctuation">,</span>
  <span class="token string">'mo'</span><span class="token punctuation">,</span>
  <span class="token string">'ms'</span><span class="token punctuation">,</span>
  <span class="token string">'mspace'</span><span class="token punctuation">,</span>
  <span class="token string">'mtext'</span><span class="token punctuation">,</span>
  <span class="token string">'menclose'</span><span class="token punctuation">,</span>
  <span class="token string">'merror'</span><span class="token punctuation">,</span>
  <span class="token string">'mfenced'</span><span class="token punctuation">,</span>
  <span class="token string">'mfrac'</span><span class="token punctuation">,</span>
  <span class="token string">'mpadded'</span><span class="token punctuation">,</span>
  <span class="token string">'mphantom'</span><span class="token punctuation">,</span>
  <span class="token string">'mroot'</span><span class="token punctuation">,</span>
  <span class="token string">'mrow'</span><span class="token punctuation">,</span>
  <span class="token string">'msqrt'</span><span class="token punctuation">,</span>
  <span class="token string">'mstyle'</span><span class="token punctuation">,</span>
  <span class="token string">'mmultiscripts'</span><span class="token punctuation">,</span>
  <span class="token string">'mover'</span><span class="token punctuation">,</span>
  <span class="token string">'mprescripts'</span><span class="token punctuation">,</span>
  <span class="token string">'msub'</span><span class="token punctuation">,</span>
  <span class="token string">'msubsup'</span><span class="token punctuation">,</span>
  <span class="token string">'msup'</span><span class="token punctuation">,</span>
  <span class="token string">'munder'</span><span class="token punctuation">,</span>
  <span class="token string">'munderover'</span><span class="token punctuation">,</span>
  <span class="token string">'none'</span><span class="token punctuation">,</span>
  <span class="token string">'maligngroup'</span><span class="token punctuation">,</span>
  <span class="token string">'malignmark'</span><span class="token punctuation">,</span>
  <span class="token string">'mtable'</span><span class="token punctuation">,</span>
  <span class="token string">'mtd'</span><span class="token punctuation">,</span>
  <span class="token string">'mtr'</span><span class="token punctuation">,</span>
  <span class="token string">'mlongdiv'</span><span class="token punctuation">,</span>
  <span class="token string">'mscarries'</span><span class="token punctuation">,</span>
  <span class="token string">'mscarry'</span><span class="token punctuation">,</span>
  <span class="token string">'msgroup'</span><span class="token punctuation">,</span>
  <span class="token string">'msline'</span><span class="token punctuation">,</span>
  <span class="token string">'msrow'</span><span class="token punctuation">,</span>
  <span class="token string">'mstack'</span><span class="token punctuation">,</span>
  <span class="token string">'maction'</span><span class="token punctuation">,</span>
  <span class="token string">'semantics'</span><span class="token punctuation">,</span>
  <span class="token string">'annotation'</span><span class="token punctuation">,</span>
  <span class="token string">'annotation-xml'</span>
<span class="token punctuation">]</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{<!-- --></span>
  <span class="token literal-property property">markdown</span><span class="token operator">:</span> <span class="token punctuation">{<!-- --></span>
    <span class="token function-variable function">config</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">md</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{<!-- --></span>
      md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>markdownItKatex<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 由于vitepress编译生成静态html文件时，无法识别插件生成的特殊标签，故需在编译时进行处理，将特殊标签定位自定义标签，防止编译报错</span>
  <span class="token literal-property property">vue</span><span class="token operator">:</span> <span class="token punctuation">{<!-- --></span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token punctuation">{<!-- --></span>
      <span class="token literal-property property">compilerOptions</span><span class="token operator">:</span> <span class="token punctuation">{<!-- --></span>
        <span class="token function-variable function">isCustomElement</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">tag</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> customElements<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>tag<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre> 
<h5><a id="3_126"></a>3.引入样式</h5> 
<p>前两步已经可以将数学公式转译成HTML标签，但此时样式是错乱的，需要引入插件附带的样式，可修改<code>.vitepress/config.js</code>配置文件，在<code>head</code>中添加需要的外置css文件，也可以下载css文件后放入项目内。</p> 
<pre><code class="prism language-javascript"><span class="token literal-property property">head</span><span class="token operator">:</span> <span class="token punctuation">[</span>
  <span class="token punctuation">[</span><span class="token string">'link'</span><span class="token punctuation">,</span> <span class="token punctuation">{<!-- --></span> <span class="token literal-property property">rel</span><span class="token operator">:</span> <span class="token string">'stylesheet'</span><span class="token punctuation">,</span> <span class="token literal-property property">href</span><span class="token operator">:</span> <span class="token string">'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css'</span><span class="token punctuation">,</span> <span class="token literal-property property">crossorigin</span><span class="token operator">:</span> <span class="token string">''</span> <span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token punctuation">]</span>
</code></pre> 
<p>此时，md文件中的数学公式就可以正常编译和显示了。</p> 
<h4><a id="markdownitmathjax3_135"></a>二、markdown-it-mathjax3</h4> 
<p>一个从 markdown-it-katex 改造而来、额外增加了 MathJax v3 和 SVG 渲染支持的插件</p> 
<h5><a id="1_137"></a>1.安装库</h5> 
<pre><code class="prism language-bash"><span class="token function">npm</span> <span class="token function">install</span> markdown-it-mathjax3 -D
</code></pre> 
<h5><a id="2_141"></a>2.配置插件</h5> 
<p>修改<code>.vitepress/config.js</code>配置文件<br> <strong>markdown-it-mathjax3的配置与markdown-it-katex基本相同，但由于markdown-it-mathjax3使用svg渲染，增加了一些自定义标签，配置时同样需要将这些标签标记为自定义标签，防止编译出错</strong></p> 
<pre><code class="prism language-js"><span class="token keyword">import</span> mathjax3 <span class="token keyword">from</span> <span class="token string">'markdown-it-mathjax3'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> customElements <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token string">'math'</span><span class="token punctuation">,</span>
  <span class="token string">'maction'</span><span class="token punctuation">,</span>
  <span class="token string">'maligngroup'</span><span class="token punctuation">,</span>
  <span class="token string">'malignmark'</span><span class="token punctuation">,</span>
  <span class="token string">'menclose'</span><span class="token punctuation">,</span>
  <span class="token string">'merror'</span><span class="token punctuation">,</span>
  <span class="token string">'mfenced'</span><span class="token punctuation">,</span>
  <span class="token string">'mfrac'</span><span class="token punctuation">,</span>
  <span class="token string">'mi'</span><span class="token punctuation">,</span>
  <span class="token string">'mlongdiv'</span><span class="token punctuation">,</span>
  <span class="token string">'mmultiscripts'</span><span class="token punctuation">,</span>
  <span class="token string">'mn'</span><span class="token punctuation">,</span>
  <span class="token string">'mo'</span><span class="token punctuation">,</span>
  <span class="token string">'mover'</span><span class="token punctuation">,</span>
  <span class="token string">'mpadded'</span><span class="token punctuation">,</span>
  <span class="token string">'mphantom'</span><span class="token punctuation">,</span>
  <span class="token string">'mroot'</span><span class="token punctuation">,</span>
  <span class="token string">'mrow'</span><span class="token punctuation">,</span>
  <span class="token string">'ms'</span><span class="token punctuation">,</span>
  <span class="token string">'mscarries'</span><span class="token punctuation">,</span>
  <span class="token string">'mscarry'</span><span class="token punctuation">,</span>
  <span class="token string">'mscarries'</span><span class="token punctuation">,</span>
  <span class="token string">'msgroup'</span><span class="token punctuation">,</span>
  <span class="token string">'mstack'</span><span class="token punctuation">,</span>
  <span class="token string">'mlongdiv'</span><span class="token punctuation">,</span>
  <span class="token string">'msline'</span><span class="token punctuation">,</span>
  <span class="token string">'mstack'</span><span class="token punctuation">,</span>
  <span class="token string">'mspace'</span><span class="token punctuation">,</span>
  <span class="token string">'msqrt'</span><span class="token punctuation">,</span>
  <span class="token string">'msrow'</span><span class="token punctuation">,</span>
  <span class="token string">'mstack'</span><span class="token punctuation">,</span>
  <span class="token string">'mstack'</span><span class="token punctuation">,</span>
  <span class="token string">'mstyle'</span><span class="token punctuation">,</span>
  <span class="token string">'msub'</span><span class="token punctuation">,</span>
  <span class="token string">'msup'</span><span class="token punctuation">,</span>
  <span class="token string">'msubsup'</span><span class="token punctuation">,</span>
  <span class="token string">'mtable'</span><span class="token punctuation">,</span>
  <span class="token string">'mtd'</span><span class="token punctuation">,</span>
  <span class="token string">'mtext'</span><span class="token punctuation">,</span>
  <span class="token string">'mtr'</span><span class="token punctuation">,</span>
  <span class="token string">'munder'</span><span class="token punctuation">,</span>
  <span class="token string">'munderover'</span><span class="token punctuation">,</span>
  <span class="token string">'semantics'</span><span class="token punctuation">,</span>
  <span class="token string">'math'</span><span class="token punctuation">,</span>
  <span class="token string">'mi'</span><span class="token punctuation">,</span>
  <span class="token string">'mn'</span><span class="token punctuation">,</span>
  <span class="token string">'mo'</span><span class="token punctuation">,</span>
  <span class="token string">'ms'</span><span class="token punctuation">,</span>
  <span class="token string">'mspace'</span><span class="token punctuation">,</span>
  <span class="token string">'mtext'</span><span class="token punctuation">,</span>
  <span class="token string">'menclose'</span><span class="token punctuation">,</span>
  <span class="token string">'merror'</span><span class="token punctuation">,</span>
  <span class="token string">'mfenced'</span><span class="token punctuation">,</span>
  <span class="token string">'mfrac'</span><span class="token punctuation">,</span>
  <span class="token string">'mpadded'</span><span class="token punctuation">,</span>
  <span class="token string">'mphantom'</span><span class="token punctuation">,</span>
  <span class="token string">'mroot'</span><span class="token punctuation">,</span>
  <span class="token string">'mrow'</span><span class="token punctuation">,</span>
  <span class="token string">'msqrt'</span><span class="token punctuation">,</span>
  <span class="token string">'mstyle'</span><span class="token punctuation">,</span>
  <span class="token string">'mmultiscripts'</span><span class="token punctuation">,</span>
  <span class="token string">'mover'</span><span class="token punctuation">,</span>
  <span class="token string">'mprescripts'</span><span class="token punctuation">,</span>
  <span class="token string">'msub'</span><span class="token punctuation">,</span>
  <span class="token string">'msubsup'</span><span class="token punctuation">,</span>
  <span class="token string">'msup'</span><span class="token punctuation">,</span>
  <span class="token string">'munder'</span><span class="token punctuation">,</span>
  <span class="token string">'munderover'</span><span class="token punctuation">,</span>
  <span class="token string">'none'</span><span class="token punctuation">,</span>
  <span class="token string">'maligngroup'</span><span class="token punctuation">,</span>
  <span class="token string">'malignmark'</span><span class="token punctuation">,</span>
  <span class="token string">'mtable'</span><span class="token punctuation">,</span>
  <span class="token string">'mtd'</span><span class="token punctuation">,</span>
  <span class="token string">'mtr'</span><span class="token punctuation">,</span>
  <span class="token string">'mlongdiv'</span><span class="token punctuation">,</span>
  <span class="token string">'mscarries'</span><span class="token punctuation">,</span>
  <span class="token string">'mscarry'</span><span class="token punctuation">,</span>
  <span class="token string">'msgroup'</span><span class="token punctuation">,</span>
  <span class="token string">'msline'</span><span class="token punctuation">,</span>
  <span class="token string">'msrow'</span><span class="token punctuation">,</span>
  <span class="token string">'mstack'</span><span class="token punctuation">,</span>
  <span class="token string">'maction'</span><span class="token punctuation">,</span>
  <span class="token string">'semantics'</span><span class="token punctuation">,</span>
  <span class="token string">'annotation'</span><span class="token punctuation">,</span>
  <span class="token string">'annotation-xml'</span><span class="token punctuation">,</span>
  <span class="token string">'mjx-container'</span><span class="token punctuation">,</span>
  <span class="token string">'mjx-assistive-mml'</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{<!-- --></span>
  <span class="token literal-property property">markdown</span><span class="token operator">:</span> <span class="token punctuation">{<!-- --></span>
    <span class="token function-variable function">config</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">md</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{<!-- --></span>
      md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>mathjax3<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">vue</span><span class="token operator">:</span> <span class="token punctuation">{<!-- --></span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token punctuation">{<!-- --></span>
      <span class="token literal-property property">compilerOptions</span><span class="token operator">:</span> <span class="token punctuation">{<!-- --></span>
        <span class="token function-variable function">isCustomElement</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">tag</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> customElements<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>tag<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre> 
<p>由于<code>markdown-it-mathjax3</code>使用<code>svg</code>渲染，不需要引入额外<code>css</code>文件。</p> 
<hr> 
<h3><a id="_256"></a>总结</h3> 
<p>本文章主要为记录一下为<code>vitepress</code>配置数学公式解析插件的过程，其中主要踩坑是由于插件生成的特殊标签不支持导致的编译报错，可通过修改<code>vitepress</code>配置对自定义标签进行单独配置进行解决。</p> 
<p>此处附上<a href="https://github.com/woaidouya123/vitepress-blog">github</a>及<a href="https://487lq34228.oicp.vip/blog/">vitepress博客</a>地址</p>
