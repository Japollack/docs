import{_ as n,c as s,o as a,a as t}from"./app.64b20f26.js";const m='{"title":"Dynamic Result Sets","description":"","frontmatter":{"title":"Dynamic Result Sets"},"headers":[{"level":2,"title":"Dynamic Results Examples","slug":"dynamic-results-examples"},{"level":2,"title":"C# 7 Value Tuples","slug":"c-7-value-tuples"},{"level":2,"title":"Selecting from multiple tables","slug":"selecting-from-multiple-tables"}],"relativePath":"ormlite/dynamic-result-sets.md","lastUpdated":1645506505256}',p={},o=t(`<p>In addition to populating Typed POCOs, OrmLite has a number of flexible options for accessing dynamic resultsets with adhoc schemas:</p><h2 id="dynamic-results-examples" tabindex="-1">Dynamic Results Examples <a class="header-anchor" href="#dynamic-results-examples" aria-hidden="true">#</a></h2><div class="language-csharp"><pre><code>
<span class="token class-name"><span class="token keyword">var</span></span> aggregates <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Select</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>List<span class="token punctuation">&lt;</span><span class="token keyword">object</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>
    db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">From</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Track<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Select</span><span class="token punctuation">(</span><span class="token string">&quot;COUNT(*), MIN(Year), MAX(Year)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">First</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> keyValuePairs <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Select</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Dictionary<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> <span class="token keyword">object</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>
    db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">From</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Track<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Select</span><span class="token punctuation">(</span><span class="token string">&quot;COUNT(*) Total, MIN(Year) Min, MAX(Year)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">First</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> q <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">From</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Track<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Select</span><span class="token punctuation">(</span><span class="token string">&quot;COUNT(*) Total, MIN(Year) Min, MAX(Year) Max&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> customPoco <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Select</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Poco<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>q<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">First</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> dynamicResult <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Select</span><span class="token generic class-name"><span class="token punctuation">&lt;</span><span class="token keyword">dynamic</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>q<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">First</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">long</span></span> total <span class="token operator">=</span> dynamicResult<span class="token punctuation">.</span>Total<span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">long</span></span> min <span class="token operator">=</span> dynamicResult<span class="token punctuation">.</span>Min<span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">long</span></span> max <span class="token operator">=</span> dynamicResult<span class="token punctuation">.</span>Max<span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> artistsWithTracksFrom93 <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">SelectMulti</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Track<span class="token punctuation">,</span>Artist<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">From</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Track<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Join</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Artist<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">Where</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span> x<span class="token punctuation">.</span>Year <span class="token operator">==</span> <span class="token number">1993</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token interpolation-string"><span class="token string">$&quot;\\nArtists with Tracks from 1993:&quot;</span></span><span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> tuple <span class="token keyword">in</span> artistsWithTracksFrom93<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token interpolation-string"><span class="token string">$&quot;\\nTrack/Artist: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp"><span class="token keyword">new</span> <span class="token punctuation">{</span>track<span class="token operator">=</span>tuple<span class="token punctuation">.</span>Item1<span class="token punctuation">,</span> artist<span class="token operator">=</span>tuple<span class="token punctuation">.</span>Item2</span><span class="token punctuation">}</span></span><span class="token string">.Dump()}&quot;</span></span><span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="c-7-value-tuples" tabindex="-1">C# 7 Value Tuples <a class="header-anchor" href="#c-7-value-tuples" aria-hidden="true">#</a></h2><p>The C# 7 Value Tuple support enables a terse, clean and typed API for accessing the Dynamic Result Sets returned when using a custom Select expression:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> query <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">From</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Employee<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Join</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Department<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">OrderBy</span><span class="token punctuation">(</span>e <span class="token operator">=&gt;</span> e<span class="token punctuation">.</span>Id<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Select</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Employee<span class="token punctuation">,</span> Department<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>
        <span class="token punctuation">(</span>e<span class="token punctuation">,</span> d<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token punctuation">{</span> e<span class="token punctuation">.</span>Id<span class="token punctuation">,</span> e<span class="token punctuation">.</span>LastName<span class="token punctuation">,</span> d<span class="token punctuation">.</span>Name <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
<span class="token class-name"><span class="token keyword">var</span></span> results <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Select</span><span class="token generic class-name"><span class="token punctuation">&lt;</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">,</span> <span class="token keyword">string</span> lastName<span class="token punctuation">,</span> <span class="token keyword">string</span> deptName<span class="token punctuation">)</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>query<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
<span class="token class-name"><span class="token keyword">var</span></span> row <span class="token operator">=</span> results<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token interpolation-string"><span class="token string">$&quot;row: $</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">row<span class="token punctuation">.</span>id</span><span class="token punctuation">}</span></span><span class="token string">, $</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">row<span class="token punctuation">.</span>lastName</span><span class="token punctuation">}</span></span><span class="token string">, $</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">row<span class="token punctuation">.</span>deptName</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Full Custom SQL Example:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> results <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">SqlList</span><span class="token generic class-name"><span class="token punctuation">&lt;</span><span class="token punctuation">(</span><span class="token keyword">int</span> count<span class="token punctuation">,</span> <span class="token keyword">string</span> min<span class="token punctuation">,</span> <span class="token keyword">string</span> max<span class="token punctuation">,</span> <span class="token keyword">int</span> sum<span class="token punctuation">)</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>
    <span class="token string">&quot;SELECT COUNT(*), MIN(Word), MAX(Word), Sum(Total) FROM Table&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Partial Custom SQL Select Example:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> query <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">From</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Table<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">Select</span><span class="token punctuation">(</span><span class="token string">&quot;COUNT(*), MIN(Word), MAX(Word), Sum(Total)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
<span class="token class-name"><span class="token keyword">var</span></span> result <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Single</span><span class="token generic class-name"><span class="token punctuation">&lt;</span><span class="token punctuation">(</span><span class="token keyword">int</span> count<span class="token punctuation">,</span> <span class="token keyword">string</span> min<span class="token punctuation">,</span> <span class="token keyword">string</span> max<span class="token punctuation">,</span> <span class="token keyword">int</span> sum<span class="token punctuation">)</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>query<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Same as above, but using Typed APIs:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> result <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Single</span><span class="token generic class-name"><span class="token punctuation">&lt;</span><span class="token punctuation">(</span><span class="token keyword">int</span> count<span class="token punctuation">,</span> <span class="token keyword">string</span> min<span class="token punctuation">,</span> <span class="token keyword">string</span> max<span class="token punctuation">,</span> <span class="token keyword">int</span> sum<span class="token punctuation">)</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>
    db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">From</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Table<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">Select</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token punctuation">{</span>
            Count <span class="token operator">=</span> Sql<span class="token punctuation">.</span><span class="token function">Count</span><span class="token punctuation">(</span><span class="token string">&quot;*&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            Min <span class="token operator">=</span> Sql<span class="token punctuation">.</span><span class="token function">Min</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span>Word<span class="token punctuation">)</span><span class="token punctuation">,</span>
            Max <span class="token operator">=</span> Sql<span class="token punctuation">.</span><span class="token function">Max</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span>Word<span class="token punctuation">)</span><span class="token punctuation">,</span>
            Sum <span class="token operator">=</span> Sql<span class="token punctuation">.</span><span class="token function">Sum</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span>Total<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>There&#39;s also support for returning unstructured resultsets in <code>List&lt;object&gt;</code>, e.g:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> results <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Select</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>List<span class="token punctuation">&lt;</span><span class="token keyword">object</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">From</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Poco<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">Select</span><span class="token punctuation">(</span><span class="token string">&quot;COUNT(*), MIN(Id), MAX(Id)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

results<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">PrintDump</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Output of objects in the returned <code>List&lt;object&gt;</code>:</p><div class="language-"><pre><code>[
    10,
    1,
    10
]
</code></pre></div><p>You can also Select <code>Dictionary&lt;string,object&gt;</code> to return a dictionary of column names mapped with their values, e.g:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> results <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Select</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Dictionary<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span><span class="token keyword">object</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">From</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Poco<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">Select</span><span class="token punctuation">(</span><span class="token string">&quot;COUNT(*) Total, MIN(Id) MinId, MAX(Id) MaxId&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

results<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">PrintDump</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Output of objects in the returned <code>Dictionary&lt;string,object&gt;</code>:</p><div class="language-"><pre><code>{
    Total: 10,
    MinId: 1,
    MaxId: 10
}
</code></pre></div><p>and can be used for API&#39;s returning a <strong>Single</strong> row result:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> result <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Single</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>List<span class="token punctuation">&lt;</span><span class="token keyword">object</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">From</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Poco<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">Select</span><span class="token punctuation">(</span><span class="token string">&quot;COUNT(*) Total, MIN(Id) MinId, MAX(Id) MaxId&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>or use <code>object</code> to fetch an unknown <strong>Scalar</strong> value:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">object</span></span> result <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Scalar</span><span class="token generic class-name"><span class="token punctuation">&lt;</span><span class="token keyword">object</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">From</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Poco<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Select</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span> x<span class="token punctuation">.</span>Id<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="selecting-from-multiple-tables" tabindex="-1">Selecting from multiple tables <a class="header-anchor" href="#selecting-from-multiple-tables" aria-hidden="true">#</a></h2><p>You can also select data from multiple tables into <a href="./dynamic-result-sets">dynamic result sets</a> which provide <a href="http://stackoverflow.com/a/37443162/85785" target="_blank" rel="noopener noreferrer">several Convenience APIs</a> for accessing data from an unstructured queries.</p><p>Using dynamic:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> q <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">From</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Employee<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Join</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Department<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Select</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Employee<span class="token punctuation">,</span> Department<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">(</span>e<span class="token punctuation">,</span> d<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token punctuation">{</span> e<span class="token punctuation">.</span>FirstName<span class="token punctuation">,</span> d<span class="token punctuation">.</span>Name <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
<span class="token class-name">List<span class="token punctuation">&lt;</span><span class="token keyword">dynamic</span><span class="token punctuation">&gt;</span></span> results <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Select</span><span class="token generic class-name"><span class="token punctuation">&lt;</span><span class="token keyword">dynamic</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>q<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">dynamic</span></span> result <span class="token keyword">in</span> results<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span></span> firstName <span class="token operator">=</span> result<span class="token punctuation">.</span>FirstName<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">string</span></span> deptName <span class="token operator">=</span> result<span class="token punctuation">.</span>Name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Dictionary of Objects:</p><div class="language-csharp"><pre><code><span class="token class-name">List<span class="token punctuation">&lt;</span>Dictionary<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span><span class="token keyword">object</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> rows <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Select</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Dictionary<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span><span class="token keyword">object</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>q<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>List of Objects:</p><div class="language-csharp"><pre><code><span class="token class-name">List<span class="token punctuation">&lt;</span>List<span class="token punctuation">&lt;</span><span class="token keyword">object</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> rows <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Select</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Dictionary<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span><span class="token keyword">object</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>q<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Custom Key/Value Dictionary:</p><div class="language-csharp"><pre><code><span class="token class-name">Dictionary<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span><span class="token keyword">string</span><span class="token punctuation">&gt;</span></span> rows <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Dictionary</span><span class="token generic class-name"><span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span><span class="token keyword">string</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>q<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div>`,34),e=[o];function c(l,u,i,k,r,d){return a(),s("div",null,e)}var y=n(p,[["render",c]]);export{m as __pageData,y as default};
