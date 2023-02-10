import{_ as s,o as a,c as n,d as o}from"./app.0ed445b7.js";const C=JSON.parse('{"title":"\u914D\u7F6E\u591A\u73AF\u5883\u53D8\u91CF","description":"","frontmatter":{},"headers":[],"relativePath":"guide/vue2/env.md","lastUpdated":1676022250000}'),p={name:"guide/vue2/env.md"},l=o(`<h1 id="\u914D\u7F6E\u591A\u73AF\u5883\u53D8\u91CF" tabindex="-1">\u914D\u7F6E\u591A\u73AF\u5883\u53D8\u91CF <a class="header-anchor" href="#\u914D\u7F6E\u591A\u73AF\u5883\u53D8\u91CF" aria-hidden="true">#</a></h1><p><code>package.json</code> \u91CC\u7684 <code>scripts</code> \u914D\u7F6E <code>serve</code> <code>stage</code> <code>build</code>\uFF0C\u901A\u8FC7 <code>--mode xxx</code> \u6765\u6267\u884C\u4E0D\u540C\u73AF\u5883</p><ul><li>\u901A\u8FC7 <code>npm run serve</code> \u542F\u52A8\u672C\u5730 , \u6267\u884C <code>development</code></li><li>\u901A\u8FC7 <code>npm run stage</code> \u6253\u5305\u6D4B\u8BD5 , \u6267\u884C <code>staging</code></li><li>\u901A\u8FC7 <code>npm run build</code> \u6253\u5305\u6B63\u5F0F , \u6267\u884C <code>production</code></li></ul><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">scripts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">serve</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">vue-cli-service serve --open</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">stage</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">vue-cli-service build --mode staging</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">build</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">vue-cli-service build</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h5 id="\u914D\u7F6E\u4ECB\u7ECD" tabindex="-1">\u914D\u7F6E\u4ECB\u7ECD <a class="header-anchor" href="#\u914D\u7F6E\u4ECB\u7ECD" aria-hidden="true">#</a></h5><p>\u2003\u2003\u4EE5 <code>VUE_APP_</code> \u5F00\u5934\u7684\u53D8\u91CF\uFF0C\u5728\u4EE3\u7801\u4E2D\u53EF\u4EE5\u901A\u8FC7 <code>p<wbr>rocess.env.VUE_APP_</code> \u8BBF\u95EE\u3002<br> \u2003\u2003\u6BD4\u5982,<code>VUE_APP_ENV = &#39;development&#39;</code> \u901A\u8FC7<code>p<wbr>rocess.env.VUE_APP_ENV</code> \u8BBF\u95EE\u3002<br> \u2003\u2003\u9664\u4E86 <code>VUE_APP_*</code> \u53D8\u91CF\u4E4B\u5916\uFF0C\u5728\u4F60\u7684\u5E94\u7528\u4EE3\u7801\u4E2D\u59CB\u7EC8\u53EF\u7528\u7684\u8FD8\u6709\u4E24\u4E2A\u7279\u6B8A\u7684\u53D8\u91CF<code>NODE_ENV</code> \u548C<code>BASE_URL</code></p><p>\u5728\u9879\u76EE\u6839\u76EE\u5F55\u4E2D\u65B0\u5EFA<code>.env.*</code></p><ul><li>.env.development \u672C\u5730\u5F00\u53D1\u73AF\u5883\u914D\u7F6E</li></ul><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">NODE_ENV=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">development</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#676E95;"># must start with VUE_APP_</span></span>
<span class="line"><span style="color:#A6ACCD;">VUE_APP_ENV = </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">development</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><ul><li>.env.staging \u6D4B\u8BD5\u73AF\u5883\u914D\u7F6E</li></ul><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">NODE_ENV=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">production</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#676E95;"># must start with VUE_APP_</span></span>
<span class="line"><span style="color:#A6ACCD;">VUE_APP_ENV = </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">staging</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span></code></pre></div><ul><li>.env.production \u6B63\u5F0F\u73AF\u5883\u914D\u7F6E</li></ul><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;"> NODE_ENV=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">production</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#676E95;"># must start with VUE_APP_</span></span>
<span class="line"><span style="color:#A6ACCD;">VUE_APP_ENV = </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">production</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span></code></pre></div><p>\u8FD9\u91CC\u6211\u4EEC\u5E76\u6CA1\u6709\u5B9A\u4E49\u5F88\u591A\u53D8\u91CF\uFF0C\u53EA\u5B9A\u4E49\u4E86\u57FA\u7840\u7684 VUE_APP_ENV <code>development</code> <code>staging</code> <code>production</code><br> \u53D8\u91CF\u6211\u4EEC\u7EDF\u4E00\u5728 <code>src/config/env.*.js</code> \u91CC\u8FDB\u884C\u7BA1\u7406\u3002</p><p>\u8FD9\u91CC\u6709\u4E2A\u95EE\u9898\uFF0C\u65E2\u7136\u8FD9\u91CC\u6709\u4E86\u6839\u636E\u4E0D\u540C\u73AF\u5883\u8BBE\u7F6E\u53D8\u91CF\u7684\u6587\u4EF6\uFF0C\u4E3A\u4EC0\u4E48\u8FD8\u8981\u53BB config \u4E0B\u65B0\u5EFA\u4E09\u4E2A\u5BF9\u5E94\u7684\u6587\u4EF6\u5462\uFF1F<br><strong>\u4FEE\u6539\u8D77\u6765\u65B9\u4FBF\uFF0C\u4E0D\u9700 \u8981\u91CD\u542F\u9879\u76EE\uFF0C\u7B26\u5408\u5F00\u53D1\u4E60\u60EF\u3002</strong></p><p>config/index.js</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">// \u6839\u636E\u73AF\u5883\u5F15\u5165\u4E0D\u540C\u914D\u7F6E p<wbr>rocess.env.NODE_ENV</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> config </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./env.</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> process</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">env</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">VUE_APP_ENV)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> config</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p>\u914D\u7F6E\u5BF9\u5E94\u73AF\u5883\u7684\u53D8\u91CF\uFF0C\u62FF\u672C\u5730\u73AF\u5883\u6587\u4EF6 <code>env.development.js</code> \u4E3E\u4F8B\uFF0C\u7528\u6237\u53EF\u4EE5\u6839\u636E\u9700\u6C42\u4FEE\u6539</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">// \u672C\u5730\u73AF\u5883\u914D\u7F6E</span></span>
<span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">title</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">vue-h5-template</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">baseUrl</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">http://localhost:9018</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// \u9879\u76EE\u5730\u5740</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">baseApi</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">https://test.xxx.com/api</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// \u672C\u5730api\u8BF7\u6C42\u5730\u5740</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">APPID</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">xxx</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">APPSECRET</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">xxx</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre></div><p>\u6839\u636E\u73AF\u5883\u4E0D\u540C\uFF0C\u53D8\u91CF\u5C31\u4F1A\u4E0D\u540C\u4E86</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">// \u6839\u636E\u73AF\u5883\u4E0D\u540C\u5F15\u5165\u4E0D\u540CbaseApi\u5730\u5740</span></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">baseApi</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@/config</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(baseApi)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div>`,21),e=[l];function c(t,r,D,y,F,i){return a(),n("div",null,e)}const A=s(p,[["render",c]]);export{C as __pageData,A as default};
