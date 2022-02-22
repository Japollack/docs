import{_ as a,c as e,o as n,a as t}from"./app.64b20f26.js";const k='{"title":"AutoQuery Data","description":"","frontmatter":{"slug":"autoquery-data","title":"AutoQuery Data"},"headers":[{"level":3,"title":"Getting Started","slug":"getting-started"},{"level":3,"title":"Learn Once, Query Everywhere","slug":"learn-once-query-everywhere"},{"level":3,"title":"Use AutoQuery Viewer","slug":"use-autoquery-viewer"},{"level":2,"title":"AutoQuery Data Sources","slug":"autoquery-data-sources"}],"relativePath":"autoquery-data.md","lastUpdated":1645506504344}',s={},o=t(`<p>AutoQuery Data is a new implementation that closely follows the dev model you&#39;re used to with <a href="/autoquery-rdbms">AutoQuery RDBMS</a> where any experience gained in creating RDBMS AutoQuery Services previously are now also applicable to Querying alternative data sources as well.</p><h3 id="getting-started" tabindex="-1">Getting Started <a class="header-anchor" href="#getting-started" aria-hidden="true">#</a></h3><p>The AutoQuery Data Feature is enabled by registering:</p><div class="language-csharp"><pre><code>Plugins<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">AutoQueryDataFeature</span> <span class="token punctuation">{</span> MaxLimit <span class="token operator">=</span> <span class="token number">100</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="learn-once-query-everywhere" tabindex="-1">Learn Once, Query Everywhere <a class="header-anchor" href="#learn-once-query-everywhere" aria-hidden="true">#</a></h3><p>All features from <a href="/autoquery-rdbms">AutoQuery RDBMS</a> except for the RDBMS-specific <a href="/autoquery#joining-tables">Joining Tables</a> and <a href="/autoquery#raw-sql-filters">Raw SQL Filters</a> features also have an equivalent in AutoQuery Data as well.</p><p>Like AutoQuery you can declaratively create AutoQuery Data Services using just Request DTO&#39;s but instead of inheriting from <code>QueryDb&lt;T&gt;</code> you&#39;d instead inherit from <code>QueryData&lt;T&gt;</code>, e.g:</p><div class="language-csharp"><pre><code><span class="token comment">//AutoQuery RDBMS</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">QueryCustomers</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">QueryDb<span class="token punctuation">&lt;</span>Customer<span class="token punctuation">&gt;</span></span></span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">//AutoQuery Data - Multiple / Open Data Sources </span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">QueryCustomers</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">QueryData<span class="token punctuation">&lt;</span>Customer<span class="token punctuation">&gt;</span></span></span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre></div><p>The API to call and consume both RDBMS AutoQuery and AutoQuery Data Services are indistinguishable to external clients where both are queried using the same <a href="/autoquery#implicit-conventions">implicit</a> and <a href="/autoquery#explicit-conventions">explicit conventions</a> and both return the same <code>QueryResponse&lt;T&gt;</code> Response DTO.</p><h3 id="use-autoquery-viewer" tabindex="-1">Use AutoQuery Viewer <a class="header-anchor" href="#use-autoquery-viewer" aria-hidden="true">#</a></h3><p>A direct result of this means you can reuse <a href="https://github.com/ServiceStack/Admin" target="_blank" rel="noopener noreferrer">AutoQuery Viewer</a> to access a rich auto UI for querying all AutoQuery implementations together in the same UI, whether queries are served from an RDBMS or an alternative data source.</p><p><a href="https://github.com/ServiceStack/Admin" target="_blank" rel="noopener noreferrer"><img src="https://raw.githubusercontent.com/ServiceStack/Admin/master/img/query-default-values.png" alt=""></a></p><h2 id="autoquery-data-sources" tabindex="-1">AutoQuery Data Sources <a class="header-anchor" href="#autoquery-data-sources" aria-hidden="true">#</a></h2><p>AutoQuery Data supports an Open Data provider model requiring an extra piece of configuration Services need to function - the Data Source that it will query. Data Sources are registered with the <code>AutoQueryDataFeature</code> plugin by calling using its fluent <code>AddDataSource()</code> API to register all Data Sources you want available to query.</p><p>At launch there are 3 different data sources that are available - all of which are accessible as extension methods on the <code>QueryDataContext</code> parameter for easy discoverability:</p><div class="language-csharp"><pre><code>Plugins<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">AutoQueryDataFeature</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">AddDataSource</span><span class="token punctuation">(</span>ctx <span class="token operator">=&gt;</span> ctx<span class="token punctuation">.</span><span class="token function">MemorySource</span><span class="token punctuation">(</span><span class="token range operator">..</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">AddDataSource</span><span class="token punctuation">(</span>ctx <span class="token operator">=&gt;</span> ctx<span class="token punctuation">.</span><span class="token function">ServiceSource</span><span class="token punctuation">(</span><span class="token range operator">..</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">AddDataSource</span><span class="token punctuation">(</span>ctx <span class="token operator">=&gt;</span> ctx<span class="token punctuation">.</span><span class="token function">DynamoDBSource</span><span class="token punctuation">(</span><span class="token range operator">..</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>AutoQuery Data Open Provider model supports querying of multiple data source back-ends. The 3 data source providers available include:</p><ul><li><a href="/autoquery-memory">AutoQuery Memory</a> - for querying static or dynamic in-memory .NET collections, some example uses include showing querying a flat-file <strong>.csv</strong> file and querying a throttled 3rd Party API with it&#39;s built-in configurable caching.</li><li><a href="/autoquery-service">AutoQuery Service</a> - a step higher than <code>MemorySource</code> where you can decorate the response of existing Services with AutoQuery&#39;s rich querying capabilities.</li><li><a href="/autoquery-dynamodb">AutoQuery DynamoDB</a> - adds rich querying capabilities over an AWS DynamoDB Table, offering a leap of greater productivity than constructing DynamoDB queries manually.</li></ul>`,18),r=[o];function u(c,p,i,l,d,y){return n(),e("div",null,r)}var g=a(s,[["render",u]]);export{k as __pageData,g as default};
