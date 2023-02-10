import{_ as s,o as a,c as n,d as l}from"./app.0ed445b7.js";const A=JSON.parse('{"title":"Sass \u5168\u5C40\u6837\u5F0F","description":"","frontmatter":{},"headers":[],"relativePath":"guide/vue2/sass.md","lastUpdated":1676022250000}'),p={name:"guide/vue2/sass.md"},o=l(`<h1 id="sass-\u5168\u5C40\u6837\u5F0F" tabindex="-1">Sass \u5168\u5C40\u6837\u5F0F <a class="header-anchor" href="#sass-\u5168\u5C40\u6837\u5F0F" aria-hidden="true">#</a></h1><p>\u9996\u5148 \u4F60\u53EF\u80FD\u4F1A\u9047\u5230 <code>node-sass</code> \u5B89\u88C5\u4E0D\u6210\u529F\uFF0C\u522B\u653E\u5F03\u591A\u8BD5\u51E0\u6B21\uFF01\uFF01\uFF01</p><p>\u6BCF\u4E2A\u9875\u9762\u81EA\u5DF1\u5BF9\u5E94\u7684\u6837\u5F0F\u90FD\u5199\u5728\u81EA\u5DF1\u7684 .vue \u6587\u4EF6\u4E4B\u4E2D <code>scoped</code> \u5B83\u987E\u540D\u601D\u4E49\u7ED9 css \u52A0\u4E86\u4E00\u4E2A\u57DF\u7684\u6982\u5FF5\u3002</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">lang</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">scss</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;">/* global styles */</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">lang</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">scss</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">scoped</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;">/* local styles */</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><h4 id="\u76EE\u5F55\u7ED3\u6784" tabindex="-1">\u76EE\u5F55\u7ED3\u6784 <a class="header-anchor" href="#\u76EE\u5F55\u7ED3\u6784" aria-hidden="true">#</a></h4><p>vue-h5-template \u6240\u6709\u5168\u5C40\u6837\u5F0F\u90FD\u5728 <code>@/src/assets/css</code> \u76EE\u5F55\u4E0B\u8BBE\u7F6E</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">\u251C\u2500\u2500 assets</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502   \u251C\u2500\u2500 css</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502   \u2502   \u251C\u2500\u2500 index.scss               </span><span style="color:#676E95;"># \u5168\u5C40\u901A\u7528\u6837\u5F0F</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502   \u2502   \u251C\u2500\u2500 mixin.scss               </span><span style="color:#676E95;"># \u5168\u5C40mixin</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502   \u2502   \u2514\u2500\u2500 variables.scss           </span><span style="color:#676E95;"># \u5168\u5C40\u53D8\u91CF</span></span>
<span class="line"></span></code></pre></div><h4 id="\u81EA\u5B9A\u4E49-vant-ui-\u6837\u5F0F" tabindex="-1">\u81EA\u5B9A\u4E49 vant-ui \u6837\u5F0F <a class="header-anchor" href="#\u81EA\u5B9A\u4E49-vant-ui-\u6837\u5F0F" aria-hidden="true">#</a></h4><p>\u73B0\u5728\u6211\u4EEC\u6765\u8BF4\u8BF4\u600E\u4E48\u91CD\u5199 <code>vant-ui</code> \u6837\u5F0F\u3002\u7531\u4E8E <code>vant-ui</code> \u7684\u6837\u5F0F\u6211\u4EEC\u662F\u5728\u5168\u5C40\u5F15\u5165\u7684\uFF0C\u6240\u4EE5\u4F60\u60F3\u5728\u67D0\u4E2A\u9875\u9762\u91CC\u9762\u8986\u76D6\u5B83\u7684\u6837\u5F0F\u5C31\u4E0D\u80FD\u52A0 <code>scoped</code>\uFF0C\u4F46\u4F60\u53C8\u60F3\u53EA\u8986\u76D6\u8FD9\u4E2A\u9875\u9762\u7684 <code>vant</code> \u6837\u5F0F\uFF0C\u4F60\u5C31\u53EF\u5728\u5B83\u7684\u7236\u7EA7\u52A0\u4E00\u4E2A <code>class</code>\uFF0C\u7528\u547D\u540D\u7A7A\u95F4\u6765\u89E3\u51B3\u95EE\u9898\u3002</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">about-container</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;">/* \u4F60\u7684\u547D\u540D\u7A7A\u95F4 */</span></span>
<span class="line"><span style="color:#A6ACCD;">  .van-button {</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;">/* vant-ui \u5143\u7D20*/</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">margin-right</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span></code></pre></div><h4 id="\u7236\u7EC4\u4EF6\u6539\u53D8\u5B50\u7EC4\u4EF6\u6837\u5F0F-\u6DF1\u5EA6\u9009\u62E9\u5668" tabindex="-1">\u7236\u7EC4\u4EF6\u6539\u53D8\u5B50\u7EC4\u4EF6\u6837\u5F0F \u6DF1\u5EA6\u9009\u62E9\u5668 <a class="header-anchor" href="#\u7236\u7EC4\u4EF6\u6539\u53D8\u5B50\u7EC4\u4EF6\u6837\u5F0F-\u6DF1\u5EA6\u9009\u62E9\u5668" aria-hidden="true">#</a></h4><p>\u5F53\u4F60\u5B50\u7EC4\u4EF6\u4F7F\u7528\u4E86 <code>scoped</code> \u4F46\u5728\u7236\u7EC4\u4EF6\u53C8\u60F3\u4FEE\u6539\u5B50\u7EC4\u4EF6\u7684\u6837\u5F0F\u53EF\u4EE5 \u901A\u8FC7 <code>&gt;&gt;&gt;</code> \u6765\u5B9E\u73B0\uFF1A</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">&lt;</span><span style="color:#FFCB6B;">style</span><span style="color:#A6ACCD;"> scoped</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">a</span><span style="color:#A6ACCD;"> &gt;&gt;&gt; </span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">b</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">/* ... */</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/</span><span style="color:#FFCB6B;">style</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><h4 id="\u5168\u5C40\u53D8\u91CF" tabindex="-1">\u5168\u5C40\u53D8\u91CF <a class="header-anchor" href="#\u5168\u5C40\u53D8\u91CF" aria-hidden="true">#</a></h4><p><code>vue.config.js</code> \u914D\u7F6E\u4F7F\u7528 <code>css.loaderOptions</code> \u9009\u9879,\u6CE8\u5165 <code>sass</code> \u7684 <code>mixin</code> <code>variables</code> \u5230\u5168\u5C40\uFF0C\u4E0D\u9700\u8981\u624B\u52A8\u5F15\u5165 ,\u914D\u7F6E<code>$cdn</code>\u901A\u8FC7\u53D8\u91CF\u5F62\u5F0F\u5F15\u5165 cdn \u5730\u5740,\u8FD9\u6837\u5411\u6240\u6709 Sass/Less \u6837\u5F0F\u4F20\u5165\u5171\u4EAB\u7684\u5168\u5C40\u53D8\u91CF\uFF1A</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> IS_PROD </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">production</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">prod</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">includes</span><span style="color:#A6ACCD;">(process</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">env</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">NODE_ENV)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> defaultSettings </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./src/config/index.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">css</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">extract</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> IS_PROD</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">sourceMap</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">loaderOptions</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;">// \u7ED9 scss-loader \u4F20\u9012\u9009\u9879</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">scss</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;">// \u6CE8\u5165 \`sass\` \u7684 \`mixin\` \`variables\` \u5230\u5168\u5C40, $cdn\u53EF\u4EE5\u914D\u7F6E\u56FE\u7247cdn</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;">// \u8BE6\u60C5: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">prependData</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#C3E88D;">                @import &quot;assets/css/mixin.scss&quot;;</span></span>
<span class="line"><span style="color:#C3E88D;">                @import &quot;assets/css/variables.scss&quot;;</span></span>
<span class="line"><span style="color:#C3E88D;">                $cdn: &quot;</span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">defaultSettings</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">$cdn</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">&quot;;</span></span>
<span class="line"><span style="color:#C3E88D;">                 </span><span style="color:#89DDFF;">\`</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre></div><p>\u8BBE\u7F6E js \u4E2D\u53EF\u4EE5\u8BBF\u95EE <code>$cdn</code>,<code>.vue</code> \u6587\u4EF6\u4E2D\u4F7F\u7528<code>this.$cdn</code>\u8BBF\u95EE</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">// \u5F15\u5165\u5168\u5C40\u6837\u5F0F</span></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@/assets/css/index.scss</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// \u8BBE\u7F6E js\u4E2D\u53EF\u4EE5\u8BBF\u95EE $cdn</span></span>
<span class="line"><span style="color:#676E95;">// \u5F15\u5165cdn</span></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">$cdn</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@/config</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#FFCB6B;">Vue</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">$cdn </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> $cdn</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p>\u5728 css \u548C js \u4F7F\u7528</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">$cdn)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">lang</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">scss</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">scoped</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">logo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">120px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">120px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">background</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">url</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">$cdn</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/weapp/logo.png</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> center / contain no-repeat</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div>`,20),e=[o];function c(t,r,D,y,F,C){return a(),n("div",null,e)}const d=s(p,[["render",c]]);export{A as __pageData,d as default};
