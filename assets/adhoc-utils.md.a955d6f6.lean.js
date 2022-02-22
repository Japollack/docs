import{_ as n,c as s,o as a,a as t}from"./app.64b20f26.js";const g='{"title":"Adhoc Utils","description":"","frontmatter":{"slug":"adhoc-utils","title":"Adhoc Utils"},"headers":[{"level":2,"title":"Image Utils","slug":"image-utils"},{"level":2,"title":"Enum Utils","slug":"enum-utils"}],"relativePath":"adhoc-utils.md","lastUpdated":1645506504344}',p={},e=t(`__VP_STATIC_START__<h2 id="image-utils" tabindex="-1">Image Utils <a class="header-anchor" href="#image-utils" aria-hidden="true">#</a></h2><p>The <code>Image.ResizeToPng()</code> and <code>Image.CropToPng()</code> <a href="https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack/ImageExtensions.cs" target="_blank" rel="noopener noreferrer">extension methods</a> can be used to resize and crop <code>System.Drawing</code> Images, e.g:</p><div class="language-csharp"><pre><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">AddHeader</span><span class="token attribute-arguments"><span class="token punctuation">(</span>ContentType <span class="token operator">=</span> <span class="token string">&quot;image/png&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token return-type class-name">Stream</span> <span class="token function">Get</span><span class="token punctuation">(</span><span class="token class-name">Resize</span> request<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> imageFile <span class="token operator">=</span> VirtualFiles<span class="token punctuation">.</span><span class="token function">GetFile</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>Path<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>imageFile <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token keyword">throw</span> HttpError<span class="token punctuation">.</span><span class="token function">NotFound</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>Path <span class="token operator">+</span> <span class="token string">&quot; was not found&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> stream <span class="token operator">=</span> imageFile<span class="token punctuation">.</span><span class="token function">OpenRead</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> img <span class="token operator">=</span> Image<span class="token punctuation">.</span><span class="token function">FromStream</span><span class="token punctuation">(</span>stream<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> img<span class="token punctuation">.</span><span class="token function">ResizeToPng</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>Width<span class="token punctuation">,</span> request<span class="token punctuation">.</span>Height<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">AddHeader</span><span class="token attribute-arguments"><span class="token punctuation">(</span>ContentType <span class="token operator">=</span> <span class="token string">&quot;image/png&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token return-type class-name">Stream</span> <span class="token function">Get</span><span class="token punctuation">(</span><span class="token class-name">Crop</span> request<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> imageFile <span class="token operator">=</span> VirtualFiles<span class="token punctuation">.</span><span class="token function">GetFile</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>Path<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>imageFile <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token keyword">throw</span> HttpError<span class="token punctuation">.</span><span class="token function">NotFound</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>Path <span class="token operator">+</span> <span class="token string">&quot; was not found&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> stream <span class="token operator">=</span> imageFile<span class="token punctuation">.</span><span class="token function">OpenRead</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> img <span class="token operator">=</span> Image<span class="token punctuation">.</span><span class="token function">FromStream</span><span class="token punctuation">(</span>stream<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> img<span class="token punctuation">.</span><span class="token function">CropToPng</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>Width<span class="token punctuation">,</span> request<span class="token punctuation">.</span>Height<span class="token punctuation">,</span> request<span class="token punctuation">.</span>StartX<span class="token punctuation">,</span> request<span class="token punctuation">.</span>StartY<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="enum-utils" tabindex="-1">Enum Utils <a class="header-anchor" href="#enum-utils" aria-hidden="true">#</a></h2><p>The <code>EnumUtils.GetValues()</code>, <code>IEnumerable&lt;Enum&gt;.ToKeyValuePairs()</code> and <code>Enum.ToDescription()</code> extension methods makes it easy to create data sources from Enums that can be annotated with <code>[ApiMember]</code> and <code>[Description]</code> attributes:</p><div class="language-csharp"><pre><code><span class="token return-type class-name">List<span class="token punctuation">&lt;</span>KeyValuePair<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> <span class="token keyword">string</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> Titles <span class="token operator">=&gt;</span> EnumUtils<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetValues</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Title<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">Where</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span> x <span class="token operator">!=</span> Title<span class="token punctuation">.</span>Unspecified<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">ToKeyValuePairs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token return-type class-name">List<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">&gt;</span></span> FilmGenres <span class="token operator">=&gt;</span> EnumUtils<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetValues</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>FilmGenres<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">Map</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span> x<span class="token punctuation">.</span><span class="token function">ToDescription</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div>__VP_STATIC_END__`,6),o=[e];function c(u,l,i,k,r,d){return a(),s("div",null,o)}var h=n(p,[["render",c]]);export{g as __pageData,h as default};
