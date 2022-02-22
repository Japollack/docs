import{_ as n,c as s,o as a,a as t}from"./app.64b20f26.js";const m=`{"title":"Auto Mapping","description":"","frontmatter":{"slug":"auto-mapping","title":"Auto Mapping"},"headers":[{"level":2,"title":"Using ServiceStack's Built-in Auto-mapping","slug":"using-servicestack-s-built-in-auto-mapping"},{"level":3,"title":"Advanced mapping using Converters","slug":"advanced-mapping-using-converters"},{"level":3,"title":"Intercept AutoMapping Conversions","slug":"intercept-automapping-conversions"},{"level":3,"title":"Advanced mapping using custom extension methods","slug":"advanced-mapping-using-custom-extension-methods"},{"level":3,"title":"Ignore Mapping","slug":"ignore-mapping"},{"level":3,"title":"Support for Implicit / Explicit Type Casts","slug":"support-for-implicit-explicit-type-casts"},{"level":3,"title":"Powerful and Capable","slug":"powerful-and-capable"},{"level":3,"title":"Populating Types from an Object Dictionary","slug":"populating-types-from-an-object-dictionary"}],"relativePath":"auto-mapping.md","lastUpdated":1645506504344}`,p={},e=t(`__VP_STATIC_START__<h2 id="using-servicestack-s-built-in-auto-mapping" tabindex="-1">Using ServiceStack&#39;s Built-in Auto-mapping <a class="header-anchor" href="#using-servicestack-s-built-in-auto-mapping" aria-hidden="true">#</a></h2><p>Although <a href="http://stackoverflow.com/a/15369736/85785" target="_blank" rel="noopener noreferrer">we encourage keeping separate DTO models</a>, you don&#39;t need to maintain your own manual mapping as you can use ServiceStack&#39;s built-in Auto Mapping support. It&#39;s quite comprehensive and resilient and does a good job in being able to co-erce one type into another, e.g. you can convert between different Enum types with the same name, between Enums and any value type and Strings, between properties and fields, POCOs and strings and many things in between - some of which can be seen in these <a href="https://github.com/ServiceStack/ServiceStack.Text/blob/master/tests/ServiceStack.Text.Tests/AutoMappingTests.cs" target="_blank" rel="noopener noreferrer">Auto Mapping tests</a>.</p><p>Here are some typical common use-cases you&#39;re likely to hit in your web service development travels:</p><p>Create a new DTO instance, populated with matching properties on viewModel:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> dto <span class="token operator">=</span> viewModel<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">ConvertTo</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>MyDto<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> dto <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token punctuation">{</span> Anon <span class="token operator">=</span> <span class="token string">&quot;Object&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">ConvertTo</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>MyDto<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Initialize DTO and populate it with matching properties on a view model:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> dto <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyDto</span> <span class="token punctuation">{</span> A <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> B <span class="token operator">=</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">PopulateWith</span><span class="token punctuation">(</span>viewModel<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Initialize DTO and populate it with <strong>non-default</strong> matching properties on a view model:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> dto <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyDto</span> <span class="token punctuation">{</span> A <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> B <span class="token operator">=</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">PopulateWithNonDefaultValues</span><span class="token punctuation">(</span>viewModel<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Initialize DTO and populate it with matching properties that are annotated with the <strong>Attr</strong> Attribute on a view model:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> dto <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyDto</span> <span class="token punctuation">{</span> A<span class="token operator">=</span><span class="token number">1</span> <span class="token punctuation">}</span>
    <span class="token punctuation">.</span><span class="token function">PopulateFromPropertiesWithAttribute</span><span class="token punctuation">(</span>viewModel<span class="token punctuation">,</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">CopyAttribute</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>There is also the inverse for mapping all properties that don&#39;t include a specific attribute:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> safeUpdate <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">SingleById</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>MyTable<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">PopulateFromPropertiesWithoutAttribute</span><span class="token punctuation">(</span>dto<span class="token punctuation">,</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">ReadOnlyAttribute</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="advanced-mapping-using-converters" tabindex="-1">Advanced mapping using Converters <a class="header-anchor" href="#advanced-mapping-using-converters" aria-hidden="true">#</a></h3><p>You can register a custom Converter mapping using the <code>AutoMapping.RegisterConverter()</code> APIs, e.g:</p><div class="language-csharp"><pre><code><span class="token comment">// Data.User -&gt; DTO User</span>
AutoMapping<span class="token punctuation">.</span><span class="token function">RegisterConverter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">Data<span class="token punctuation">.</span>User</span> from<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> to <span class="token operator">=</span> from<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">ConvertTo</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>User<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token named-parameter punctuation">skipConverters</span><span class="token punctuation">:</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// avoid infinite recursion</span>
    to<span class="token punctuation">.</span>FirstName <span class="token operator">=</span> from<span class="token punctuation">.</span>GivenName<span class="token punctuation">;</span>
    to<span class="token punctuation">.</span>LastName <span class="token operator">=</span> from<span class="token punctuation">.</span>Surname<span class="token punctuation">;</span>
    <span class="token keyword">return</span> to<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Car -&gt; String</span>
AutoMapping<span class="token punctuation">.</span><span class="token function">RegisterConverter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">Car</span> from<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token interpolation-string"><span class="token string">$&quot;</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">from<span class="token punctuation">.</span>Model</span><span class="token punctuation">}</span></span><span class="token string"> (</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">from<span class="token punctuation">.</span>Year</span><span class="token punctuation">}</span></span><span class="token string">)&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// WrappedDate -&gt; DateTime</span>
AutoMapping<span class="token punctuation">.</span><span class="token function">RegisterConverter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">WrappedDate</span> from<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> from<span class="token punctuation">.</span><span class="token function">ToDateTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// DateTime    -&gt; WrappedDate</span>
AutoMapping<span class="token punctuation">.</span><span class="token function">RegisterConverter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">DateTime</span> from<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">WrappedDate</span><span class="token punctuation">(</span>from<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Where it will be called whenever a conversion between <code>Data.User -&gt; User</code> or <code>Car -&gt; String</code> is needed, inc. nested types and collections.</p><p>Converters can also be used when you want to &quot;take over&quot; and override the default conversion behavior.</p><h3 id="intercept-automapping-conversions" tabindex="-1">Intercept AutoMapping Conversions <a class="header-anchor" href="#intercept-automapping-conversions" aria-hidden="true">#</a></h3><p>The <code>RegisterPopulator</code> AutoMapping API can be used to run custom logic after an Auto Mapping Conversion, e.g. after a <code>T.ConvertTo&lt;T&gt;()</code> or <code>T.PopulateWith(obj)</code> is performed.</p><p>This is useful when you need to intercept Auto Mapping conversions in external libraries, e.g. you can use this to populate the UserSession&#39;s <code>UserAuthId</code> with a different field from your Custom UserAuth:</p><div class="language-csharp"><pre><code>AutoMapping<span class="token punctuation">.</span><span class="token function">RegisterPopulator</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">IAuthSession</span> session<span class="token punctuation">,</span> <span class="token class-name">IUserAuth</span> userAuth<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> 
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>userAuth <span class="token keyword">is</span> <span class="token class-name">RavenUserAuth</span> ravenUserAuth<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        session<span class="token punctuation">.</span>UserAuthId <span class="token operator">=</span> ravenUserAuth<span class="token punctuation">.</span>Key<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="advanced-mapping-using-custom-extension-methods" tabindex="-1">Advanced mapping using custom extension methods <a class="header-anchor" href="#advanced-mapping-using-custom-extension-methods" aria-hidden="true">#</a></h3><p>When mapping logic becomes more complicated we like to use extension methods to keep code DRY and maintain the mapping in one place that&#39;s easily consumable from within your application, e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">ConvertExtensions</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">MyDto</span> <span class="token function">ToDto</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token class-name">MyViewModel</span> from<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">var</span></span> to <span class="token operator">=</span> from<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">ConvertTo</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>MyDto<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        to<span class="token punctuation">.</span>Items <span class="token operator">=</span> from<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">ConvertAll</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span> x<span class="token punctuation">.</span><span class="token function">ToDto</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        to<span class="token punctuation">.</span>CalculatedProperty <span class="token operator">=</span> <span class="token function">Calculate</span><span class="token punctuation">(</span>from<span class="token punctuation">.</span>Seed<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> to<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Which is now easily consumable with just:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> dto <span class="token operator">=</span> viewModel<span class="token punctuation">.</span><span class="token function">ToDto</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Using C# methods ensures conversion is explicit, discoverable, debuggable, fast and flexible with access to the full C# language at your disposal whose conversion logic can be further DRY&#39;ed behind reusable extension methods.</p><p>If you find you need to call this extension method manually in many places you may want to consider registering a Custom Converter instead.</p><h3 id="ignore-mapping" tabindex="-1">Ignore Mapping <a class="header-anchor" href="#ignore-mapping" aria-hidden="true">#</a></h3><p>Use the <code>AutoMapping.IgnoreMapping()</code> API to specify mappings you want to skip entirely, e.g:</p><div class="language-csharp"><pre><code><span class="token comment">// Ignore Data.User -&gt; User</span>
AutoMapping<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">IgnoreMapping</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Data<span class="token punctuation">.</span>User<span class="token punctuation">,</span> User<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Ignore List&lt;Data.User&gt; -&gt; List&lt;User&gt;</span>
AutoMapping<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">IgnoreMapping</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>List<span class="token punctuation">&lt;</span>Data<span class="token punctuation">.</span>User<span class="token punctuation">&gt;</span><span class="token punctuation">,</span> List<span class="token punctuation">&lt;</span>User<span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="support-for-implicit-explicit-type-casts" tabindex="-1">Support for Implicit / Explicit Type Casts <a class="header-anchor" href="#support-for-implicit-explicit-type-casts" aria-hidden="true">#</a></h3><p>The built-in Auto Mapping also supports using any <code>implicit</code> or <code>explicit</code> Value Type Casts when they exists, e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">struct</span> <span class="token class-name">A</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token function">A</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> id<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> Id <span class="token operator">=</span> id<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">implicit</span> <span class="token keyword">operator</span> <span class="token function">B</span><span class="token punctuation">(</span><span class="token class-name">A</span> from<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">B</span><span class="token punctuation">(</span>from<span class="token punctuation">.</span>Id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">struct</span> <span class="token class-name">B</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token function">B</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> id<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> Id <span class="token operator">=</span> id<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">implicit</span> <span class="token keyword">operator</span> <span class="token function">A</span><span class="token punctuation">(</span><span class="token class-name">B</span> from<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">A</span><span class="token punctuation">(</span>from<span class="token punctuation">.</span>Id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name"><span class="token keyword">var</span></span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">A</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">ConvertTo</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>B<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="powerful-and-capable" tabindex="-1">Powerful and Capable <a class="header-anchor" href="#powerful-and-capable" aria-hidden="true">#</a></h3><p>Due to its heavy reliance in <a href="https://sharpscript.net" target="_blank" rel="noopener noreferrer">#Script</a> and other parts in ServiceStack, the built-in Auto Mapping is a sophisticated implementation that covers a large number of use-cases and corner cases when they can be intuitively mapped.</p><p>To see a glimpse of its available capabilities check out some of the examples in the docs where it&#39;s able to <a href="/reflection-utils#call-any-method-dynamically">call any method or construct any type dynamically</a> using different Types.</p><p>Or how it&#39;s able to <a href="/reflection-utils#converting-instances-from-an-object-dictionary">convert any Reference Type into and out of an Object Dictionary</a>, providing a simple approach to dynamically manipulating Types.</p><h3 id="populating-types-from-an-object-dictionary" tabindex="-1">Populating Types from an Object Dictionary <a class="header-anchor" href="#populating-types-from-an-object-dictionary" aria-hidden="true">#</a></h3><p>The <code>ToObjectDictionary</code> and <code>FromObjectDictionary</code> extension methods are also useful in trying to convert loosely-typed data structures into a Typed POCO&#39;s, e.g:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> dto <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">User</span>
<span class="token punctuation">{</span>
    FirstName <span class="token operator">=</span> <span class="token string">&quot;First&quot;</span><span class="token punctuation">,</span>
    LastName <span class="token operator">=</span> <span class="token string">&quot;Last&quot;</span><span class="token punctuation">,</span>
    Car <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Car</span> <span class="token punctuation">{</span> Age <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">,</span> Name <span class="token operator">=</span> <span class="token string">&quot;ZCar&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token class-name">Dictionary<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span><span class="token keyword">object</span><span class="token punctuation">&gt;</span></span> map <span class="token operator">=</span> dtoUser<span class="token punctuation">.</span><span class="token function">ToObjectDictionary</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

map<span class="token punctuation">[</span><span class="token string">&quot;LastName&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;Updated&quot;</span><span class="token punctuation">;</span>

<span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token punctuation">(</span>User<span class="token punctuation">)</span>map<span class="token punctuation">.</span><span class="token function">FromObjectDictionary</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">User</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div>__VP_STATIC_END__`,42),o=[e];function c(i,l,u,r,k,d){return a(),s("div",null,o)}var h=n(p,[["render",c]]);export{m as __pageData,h as default};
