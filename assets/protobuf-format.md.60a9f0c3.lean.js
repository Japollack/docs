import{_ as a,c as e,o as t,a as s,b as n}from"./app.64b20f26.js";const m='{"title":"ProtoBuf Format","description":"","frontmatter":{"slug":"protobuf-format","title":"ProtoBuf Format"},"headers":[{"level":2,"title":"Installing via NuGet","slug":"installing-via-nuget"},{"level":2,"title":"Registering ProtoBuf Manually","slug":"registering-protobuf-manually"},{"level":2,"title":"End to End happiness","slug":"end-to-end-happiness"}],"relativePath":"protobuf-format.md","lastUpdated":1645506505256}',o={},p=s('',6),c=n("div",{class:"nuget-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[n("div",{class:"flex-grow bg-gray-700"},[n("div",{class:"pl-4 py-1 pb-1.5 align-middle text-lg text-white"},[n("p",null,[n("code",null,'<PackageReference Include="ServiceStack.ProtoBuf" Version="6.*" />')])])]),n("div",{class:"flex"},[n("div",{class:"bg-sky-500 text-white p-1.5 pb-0"},[n("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[n("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),n("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[n("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),r=s(`__VP_STATIC_START__<p>After the NuGet Package is added to your Project, enable the ProtoBuf format in your <code>AppHost</code> with:</p><div class="language-cs"><pre><code>Plugins<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ProtoBufFormat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>The NuGet plugin also includes the <strong>ProtoBufServiceClient</strong> client below so you can easily call it from any C# Client.</p><h2 id="registering-protobuf-manually" tabindex="-1">Registering ProtoBuf Manually <a class="header-anchor" href="#registering-protobuf-manually" aria-hidden="true">#</a></h2><p>The API for adding custom Formats and Content Types in ServiceStack is so easy we use it ourselves \u{1F603} Where the CSV, HTML, Markdown and now ProtoBuf format are all registered in the same way by registering the new ContentType with your AppHost&#39;s <strong>ContentTypeFilters</strong>.</p><p>Adding support for ProtoBuf is equally simple. It can be added by calling a single method:</p><div class="language-csharp"><pre><code>appHost<span class="token punctuation">.</span>ContentTypeFilters<span class="token punctuation">.</span><span class="token function">Register</span><span class="token punctuation">(</span>ContentType<span class="token punctuation">.</span>ProtoBuf<span class="token punctuation">,</span>
    <span class="token punctuation">(</span>reqCtx<span class="token punctuation">,</span> res<span class="token punctuation">,</span> stream<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> ProtoBuf<span class="token punctuation">.</span>Serializer<span class="token punctuation">.</span>NonGeneric<span class="token punctuation">.</span><span class="token function">Serialize</span><span class="token punctuation">(</span>stream<span class="token punctuation">,</span> res<span class="token punctuation">)</span><span class="token punctuation">,</span>
    ProtoBuf<span class="token punctuation">.</span>Serializer<span class="token punctuation">.</span>NonGeneric<span class="token punctuation">.</span>Deserialize<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>This makes the ProtoBuf format available in all of ServiceStack:</p><ul><li>A new <strong>X-PROTOBUF</strong> column added for all services on the metadata pages</li><li>New <code>/x-protobuf/syncreply/{Service}</code> and <code>/x-protobuf/asynconeway/{Service}</code> pre-defined routes</li><li>Clients can request it with <code>Accept: application/x-protobuf</code> HTTP Header or <strong>?format=x-protobuf</strong> query string</li></ul><h2 id="end-to-end-happiness" tabindex="-1">End to End happiness <a class="header-anchor" href="#end-to-end-happiness" aria-hidden="true">#</a></h2><p>However simply registering ProtoBuf is not enough to ensure end-to-end happiness so we also make it easy to create your own generic strong-typed ProtoBuf ServiceClient with the following code:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProtoBufServiceClient</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">ServiceClientBase</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Format
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token string">&quot;x-protobuf&quot;</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token function">ProtoBufServiceClient</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> baseUri<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">SetBaseUri</span><span class="token punctuation">(</span>baseUri<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token function">ProtoBufServiceClient</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> syncReplyBaseUri<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> asyncOneWayBaseUri<span class="token punctuation">)</span>
        <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span>syncReplyBaseUri<span class="token punctuation">,</span> asyncOneWayBaseUri<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SerializeToStream</span><span class="token punctuation">(</span><span class="token class-name">IRequest</span> req<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">object</span></span> request<span class="token punctuation">,</span> <span class="token class-name">Stream</span> stream<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Serializer<span class="token punctuation">.</span>NonGeneric<span class="token punctuation">.</span><span class="token function">Serialize</span><span class="token punctuation">(</span>stream<span class="token punctuation">,</span> request<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name">T</span> <span class="token generic-method"><span class="token function">DeserializeFromStream</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token class-name">Stream</span> stream<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> Serializer<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Deserialize</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>stream<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> ContentType
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> MimeTypes<span class="token punctuation">.</span>ProtoBuf<span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name">StreamDeserializerDelegate</span> StreamDeserializer
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> Deserialize<span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">object</span></span> <span class="token function">Deserialize</span><span class="token punctuation">(</span><span class="token class-name">Type</span> type<span class="token punctuation">,</span> <span class="token class-name">Stream</span> source<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> Serializer<span class="token punctuation">.</span>NonGeneric<span class="token punctuation">.</span><span class="token function">Deserialize</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span> source<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>This now lets you call each of your services with a Strong Typed service client of your very own:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ProtoBufServiceClient</span><span class="token punctuation">(</span>BaseUri<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> response <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Send</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>HelloResponse<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Hello</span> <span class="token punctuation">{</span> Name <span class="token operator">=</span> <span class="token string">&quot;ProtoBuf&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>The above ProtoBufServiceClient works like all the other strong-typed ServiceClients in ServiceStack where it also implements <code>IServiceClient</code> and <code>IRestClient</code> interfaces so you can easily swap out your existing clients to take advantage of the performance boost offered by ProtoBuf with minimal effort!</p><h1 id="community-resources" tabindex="-1">Community Resources <a class="header-anchor" href="#community-resources" aria-hidden="true">#</a></h1><ul><li><a href="http://stevenhollidge.blogspot.com/2012/04/servicestack-rest-with-protobuf.html" target="_blank" rel="noopener noreferrer">REST with ProtoBuf - Web Services in 5 easy steps</a> by <a href="https://twitter.com/stevenhollidge" target="_blank" rel="noopener noreferrer">@stevenhollidge</a></li></ul>__VP_STATIC_END__`,17),l=[p,c,r];function i(u,k,d,g,h,f){return t(),e("div",null,l)}var w=a(o,[["render",i]]);export{m as __pageData,w as default};
