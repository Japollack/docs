import{_ as n,c as s,o as a,a as t}from"./app.64b20f26.js";const m='{"title":"AutoQuery Memory Data Source","description":"","frontmatter":{"slug":"autoquery-memory","title":"AutoQuery Memory Data Source"},"headers":[{"level":2,"title":"Queryable PocoDataSource","slug":"queryable-pocodatasource"},{"level":3,"title":"In Memory AutoQuery","slug":"in-memory-autoquery"},{"level":3,"title":"Cacheable Data Sources","slug":"cacheable-data-sources"}],"relativePath":"autoquery-memory.md","lastUpdated":1645506504348}',p={},o=t(`<p>The simplest data source we can query is an in-memory .NET collection registered with <code>ctx.MemorySource()</code>. But how the collection is populated remains up to you. The example below shows registering collections from multiple sources inc. <strong>in-line code</strong>, populated <strong>from a CSV file</strong> (utilizing ServiceStack&#39;s CSV deserialization support) and populated <strong>from a 3rd Party API</strong> using <a href="/http-utils">HTTP Utils</a>:</p><div class="language-csharp"><pre><code><span class="token comment">//Declaration in code</span>
<span class="token class-name"><span class="token keyword">var</span></span> countries <span class="token operator">=</span> <span class="token keyword">new</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Country</span> <span class="token punctuation">{</span> <span class="token range operator">..</span><span class="token punctuation">.</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Country</span> <span class="token punctuation">{</span> <span class="token range operator">..</span><span class="token punctuation">.</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">//From CSV File</span>
<span class="token class-name">List<span class="token punctuation">&lt;</span>Currency<span class="token punctuation">&gt;</span></span> currencies <span class="token operator">=</span> File<span class="token punctuation">.</span><span class="token function">ReadAllText</span><span class="token punctuation">(</span><span class="token string">&quot;currencies.csv&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">FromCsv</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>List<span class="token punctuation">&lt;</span>Currency<span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//From 3rd Party API</span>
<span class="token class-name">List<span class="token punctuation">&lt;</span>GithubRepo<span class="token punctuation">&gt;</span></span> repos <span class="token operator">=</span> <span class="token string">&quot;https://api.github.com/orgs/ServiceStack/repos&quot;</span>
    <span class="token punctuation">.</span><span class="token function">GetJsonFromUrl</span><span class="token punctuation">(</span>req <span class="token operator">=&gt;</span> req<span class="token punctuation">.</span>UserAgent<span class="token operator">=</span><span class="token string">&quot;AutoQuery&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">FromJson</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>List<span class="token punctuation">&lt;</span>GithubRepo<span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//AutoQuery Data Plugin</span>
Plugins<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">AutoQueryDataFeature</span> <span class="token punctuation">{</span> MaxLimit <span class="token operator">=</span> <span class="token number">100</span> <span class="token punctuation">}</span>
    <span class="token punctuation">.</span><span class="token function">AddDataSource</span><span class="token punctuation">(</span>ctx <span class="token operator">=&gt;</span> ctx<span class="token punctuation">.</span><span class="token function">MemorySource</span><span class="token punctuation">(</span>countries<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">AddDataSource</span><span class="token punctuation">(</span>ctx <span class="token operator">=&gt;</span> ctx<span class="token punctuation">.</span><span class="token function">MemorySource</span><span class="token punctuation">(</span>currencies<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">AddDataSource</span><span class="token punctuation">(</span>ctx <span class="token operator">=&gt;</span> ctx<span class="token punctuation">.</span><span class="token function">MemorySource</span><span class="token punctuation">(</span>repos<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>After data sources are registered, you can then create AutoQuery Data Services to query them:</p><div class="language-csharp"><pre><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Route</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;/countries&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">QueryCountries</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">QueryData<span class="token punctuation">&lt;</span>Country<span class="token punctuation">&gt;</span></span></span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Route</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;/currencies&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">QueryCurrencies</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">QueryData<span class="token punctuation">&lt;</span>Currency<span class="token punctuation">&gt;</span></span></span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Route</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;/repos&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">QueryGithubRepos</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">QueryData<span class="token punctuation">&lt;</span>GithubRepo<span class="token punctuation">&gt;</span></span></span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre></div><p>With just the empty Request DTO&#39;s above they&#39;re now queryable like any other AutoQuery Service, e.g:</p><ul><li>/countries?code=AU</li><li>/currencies.json?code=AUD</li><li>/repos.csv?watchers_count&gt;=100&amp;orderBy=-watchers_count,name&amp;fields=name,homepage,language</li></ul><h2 id="queryable-pocodatasource" tabindex="-1">Queryable PocoDataSource <a class="header-anchor" href="#queryable-pocodatasource" aria-hidden="true">#</a></h2><p><strong>PocoDataSource</strong> is useful for quickly creating an In Memory Queryable Data Source as done in the <a href="/templates-jamstack#todos-mvc">TODOs MVC Jamstack Examples</a>:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TodosServices</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Service</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">IAutoQueryData</span> AutoQuery <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token keyword">static</span> <span class="token keyword">readonly</span> <span class="token class-name">PocoDataSource<span class="token punctuation">&lt;</span>Todo<span class="token punctuation">&gt;</span></span> Todos <span class="token operator">=</span> PocoDataSource<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Todo<span class="token punctuation">[</span><span class="token punctuation">]</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">new</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> Id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> Text <span class="token operator">=</span> <span class="token string">&quot;Learn&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token keyword">new</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> Id <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">,</span> Text <span class="token operator">=</span> <span class="token string">&quot;Blazor&quot;</span><span class="token punctuation">,</span> IsFinished <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token keyword">new</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> Id <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">,</span> Text <span class="token operator">=</span> <span class="token string">&quot;WASM!&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token named-parameter punctuation">nextId</span><span class="token punctuation">:</span> x <span class="token operator">=&gt;</span> x<span class="token punctuation">.</span><span class="token function">Select</span><span class="token punctuation">(</span>e <span class="token operator">=&gt;</span> e<span class="token punctuation">.</span>Id<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Max</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">object</span></span> <span class="token function">Get</span><span class="token punctuation">(</span><span class="token class-name">QueryTodos</span> query<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">var</span></span> db <span class="token operator">=</span> Todos<span class="token punctuation">.</span><span class="token function">ToDataSource</span><span class="token punctuation">(</span>query<span class="token punctuation">,</span> Request<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> AutoQuery<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>query<span class="token punctuation">,</span> AutoQuery<span class="token punctuation">.</span><span class="token function">CreateQuery</span><span class="token punctuation">(</span>query<span class="token punctuation">,</span> Request<span class="token punctuation">,</span> db<span class="token punctuation">)</span><span class="token punctuation">,</span> db<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name">Todo</span> <span class="token function">Post</span><span class="token punctuation">(</span><span class="token class-name">CreateTodo</span> request<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">var</span></span> newTodo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Todo</span> <span class="token punctuation">{</span> Id <span class="token operator">=</span> Todos<span class="token punctuation">.</span><span class="token function">NextId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> Text <span class="token operator">=</span> request<span class="token punctuation">.</span>Text <span class="token punctuation">}</span><span class="token punctuation">;</span>
        Todos<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>newTodo<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> newTodo<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name">Todo</span> <span class="token function">Put</span><span class="token punctuation">(</span><span class="token class-name">UpdateTodo</span> request<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">var</span></span> todo <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">ConvertTo</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Todo<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Todos<span class="token punctuation">.</span><span class="token function">TryUpdateById</span><span class="token punctuation">(</span>todo<span class="token punctuation">,</span> todo<span class="token punctuation">.</span>Id<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> todo<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Handles Deleting the Todo item</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Delete</span><span class="token punctuation">(</span><span class="token class-name">DeleteTodo</span> request<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> Todos<span class="token punctuation">.</span><span class="token function">TryDeleteById</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>Id<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Delete</span><span class="token punctuation">(</span><span class="token class-name">DeleteTodos</span> request<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> Todos<span class="token punctuation">.</span><span class="token function">TryDeleteByIds</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>Ids<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Where it provides ThreadSafe CRUD operations to manage a collection of In Memory POCOs.</p><h3 id="in-memory-autoquery" tabindex="-1">In Memory AutoQuery <a class="header-anchor" href="#in-memory-autoquery" aria-hidden="true">#</a></h3><p>The <code>QueryTodos</code> implementation utilizes an <a href="/autoquery-memory">AutoQuery Memory Source</a> with the full capabilities of AutoQuery&#39;s <a href="/autoquery-rdbms#implicit-conventions">Implicit Conventions</a>:</p><ul><li><a href="https://blazor-wasm-api.jamstacks.net/api/QueryTodos?Id%3E=1" target="_blank" rel="noopener noreferrer">/api/QueryTodos?Id&gt;=1</a></li><li><a href="https://blazor-wasm-api.jamstacks.net/api/QueryTodos?TextContains=Blazor" target="_blank" rel="noopener noreferrer">/api/QueryTodos?TextContains=Blazor</a></li><li><a href="https://blazor-wasm-api.jamstacks.net/api/QueryTodos?IsFinished=false" target="_blank" rel="noopener noreferrer">/api/QueryTodos?IsFinished=false</a></li></ul><p>Where it can be used to iteratively prototype new data models under a productive <strong>dotnet watch</strong> workflow until it satisfies all your requirements where it could be easily converted to <a href="/autoquery-crud">AutoQuery CRUD</a> APIs and integrated with your Systems configured RDBMS - which would require even less code.</p><h3 id="cacheable-data-sources" tabindex="-1">Cacheable Data Sources <a class="header-anchor" href="#cacheable-data-sources" aria-hidden="true">#</a></h3><p>The examples above provides a nice demonstration of querying static memory collections. But Data Sources offers even more flexibility where you&#39;re also able to query and cache dynamic .NET collections that are customizable per-request.</p><p>The registration below shows an example of this where results are dynamically fetched from <strong>GitHub&#39;s API</strong> and persisted in the <strong>local in-memory cache</strong> for <strong>5 minutes</strong> - throttling the number of requests made to the external 3rd Party API:</p><div class="language-csharp"><pre><code><span class="token punctuation">.</span><span class="token function">AddDataSource</span><span class="token punctuation">(</span>ctx <span class="token operator">=&gt;</span> ctx<span class="token punctuation">.</span><span class="token function">MemorySource</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> 
 <span class="token interpolation-string"><span class="token string">$&quot;https://api.github.com/repos/ServiceStack/</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">ctx<span class="token punctuation">.</span>Request<span class="token punctuation">.</span><span class="token function">GetParam</span><span class="token punctuation">(</span><span class="token string">&quot;repo&quot;</span><span class="token punctuation">)</span></span><span class="token punctuation">}</span></span><span class="token string">/contributors&quot;</span></span>
   <span class="token punctuation">.</span><span class="token function">GetJsonFromUrl</span><span class="token punctuation">(</span>req <span class="token operator">=&gt;</span> req<span class="token punctuation">.</span>UserAgent<span class="token operator">=</span><span class="token string">&quot;AutoQuery&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">FromJson</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>List<span class="token punctuation">&lt;</span>GithubContributor<span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  HostContext<span class="token punctuation">.</span>LocalCache<span class="token punctuation">,</span> 
  TimeSpan<span class="token punctuation">.</span><span class="token function">FromMinutes</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>We can now create an AutoQuery Data Service to query the above cached <code>GithubContributor</code> Memory Source:</p><div class="language-csharp"><pre><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Route</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;/contributors&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">QueryContributors</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">QueryData<span class="token punctuation">&lt;</span>GithubContributor<span class="token punctuation">&gt;</span></span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Repo <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Thanks to the Typed Request DTO we also get an end-to-end Typed API for free which we can use to query the contributors result-set returned from GitHub&#39;s API. As an example we can view the <strong>Top 20 Contributors</strong> for the <strong>ServiceStack</strong> Project with:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> top20Contributors <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">QueryContributors</span> <span class="token punctuation">{</span>
    Repo <span class="token operator">=</span> <span class="token string">&quot;ServiceStack&quot;</span><span class="token punctuation">,</span>
    OrderByDesc <span class="token operator">=</span> <span class="token string">&quot;Contributions&quot;</span><span class="token punctuation">,</span>
    Take <span class="token operator">=</span> <span class="token number">20</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

top20Contributors<span class="token punctuation">.</span><span class="token function">PrintDump</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Pretty print results to Console</span>
</code></pre></div>`,22),e=[o];function c(u,l,r,i,k,d){return a(),s("div",null,e)}var g=n(p,[["render",c]]);export{m as __pageData,g as default};
