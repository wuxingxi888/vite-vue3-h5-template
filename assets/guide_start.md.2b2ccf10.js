import{_ as s,c as n,o as a,d as e}from"./app.b5806255.js";const A=JSON.parse('{"title":"\u5FEB\u901F\u4E0A\u624B","description":"","frontmatter":{},"headers":[{"level":2,"title":"node \u7248\u672C\u8981\u6C42","slug":"node-\u7248\u672C\u8981\u6C42","link":"#node-\u7248\u672C\u8981\u6C42","children":[]},{"level":2,"title":"\u5305\u7BA1\u7406\u5668","slug":"\u5305\u7BA1\u7406\u5668","link":"#\u5305\u7BA1\u7406\u5668","children":[]},{"level":2,"title":"\u542F\u52A8\u9879\u76EE","slug":"\u542F\u52A8\u9879\u76EE","link":"#\u542F\u52A8\u9879\u76EE","children":[]}],"relativePath":"guide/start.md","lastUpdated":1676283827000}'),p={name:"guide/start.md"},l=e(`<h1 id="\u5FEB\u901F\u4E0A\u624B" tabindex="-1">\u5FEB\u901F\u4E0A\u624B <a class="header-anchor" href="#\u5FEB\u901F\u4E0A\u624B" aria-hidden="true">#</a></h1><h2 id="node-\u7248\u672C\u8981\u6C42" tabindex="-1">node \u7248\u672C\u8981\u6C42 <a class="header-anchor" href="#node-\u7248\u672C\u8981\u6C42" aria-hidden="true">#</a></h2><p>\u672C\u793A\u4F8B Node.js v16.6.0\uFF0C\u4F60\u4E5F\u53EF\u4EE5\u4F7F\u7528<a href="https://github.com/nvm-sh/nvm" target="_blank" rel="noreferrer">nvm</a>\u6216<a href="https://github.com/coreybutler/nvm-windows" target="_blank" rel="noreferrer">nvm-windows</a>\u5728\u540C\u4E00\u53F0\u7535\u8111\u4E0A\u7BA1\u7406\u591A\u4E2A node \u7248\u672C\u3002</p><h2 id="\u5305\u7BA1\u7406\u5668" tabindex="-1">\u5305\u7BA1\u7406\u5668 <a class="header-anchor" href="#\u5305\u7BA1\u7406\u5668" aria-hidden="true">#</a></h2><p>\u672C\u9879\u76EE\u91C7\u7528 pnpm \u5305\u7BA1\u7406\u5668,\u5982\u679C\u6CA1\u6709\u8BF7\u5148\u5B89\u88C5 pnpm\u3002</p><h2 id="\u542F\u52A8\u9879\u76EE" tabindex="-1">\u542F\u52A8\u9879\u76EE <a class="header-anchor" href="#\u542F\u52A8\u9879\u76EE" aria-hidden="true">#</a></h2><p>master \u5206\u652F\u4EE3\u7801\u4E3A\u7A33\u5B9A\u7248\u672C\uFF0Ctest \u5206\u652F\u4EE3\u7801\u662F\u6700\u65B0\u7248</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"></span>
<span class="line"><span style="color:#676E95;">// \u62C9\u53D6\u9879\u76EE</span></span>
<span class="line"><span style="color:#A6ACCD;">git clone </span><span style="color:#FFCB6B;">https</span><span style="color:#89DDFF;">:</span><span style="color:#676E95;">//github.com/wuxingxi888/vite-vue3-h5-template.git</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// \u8FDB\u5165\u9879\u76EE\u76EE\u5F55</span></span>
<span class="line"><span style="color:#A6ACCD;">cd vite</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">vue3</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">h5</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">template</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// \u5168\u5C40\u5B89\u88C5 pnpm</span></span>
<span class="line"><span style="color:#A6ACCD;">npm i </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">g pnpm</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// \u5B89\u88C5\u4F9D\u8D56</span></span>
<span class="line"><span style="color:#A6ACCD;">pnpm install</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// \u542F\u52A8\u9879\u76EE</span></span>
<span class="line"><span style="color:#A6ACCD;">pnpm dev</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// \u672C\u5730\u9884\u89C8\u6253\u5305\u7684\u9879\u76EE</span></span>
<span class="line"><span style="color:#A6ACCD;">pnpm preview</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// \u6253\u5305 test \u73AF\u5883</span></span>
<span class="line"><span style="color:#A6ACCD;">pnpm </span><span style="color:#FFCB6B;">build</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">test</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// \u6253\u5305 prod \u73AF\u5883</span></span>
<span class="line"><span style="color:#A6ACCD;">pnpm </span><span style="color:#FFCB6B;">build</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">prod</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div>`,8),t=[l];function o(c,r,i,d,h,y){return a(),n("div",null,t)}const D=s(p,[["render",o]]);export{A as __pageData,D as default};
