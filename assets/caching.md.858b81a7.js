import{_ as n,c as a,o as s,a as e}from"./app.64b20f26.js";const g='{"title":"Caching Providers","description":"","frontmatter":{"slug":"caching","title":"Caching Providers"},"headers":[{"level":3,"title":"Async Cache Clients","slug":"async-cache-clients"},{"level":3,"title":"Configure Caching Providers","slug":"configure-caching-providers"},{"level":3,"title":"Memory cache:","slug":"memory-cache"},{"level":3,"title":"Redis","slug":"redis"},{"level":3,"title":"OrmLite","slug":"ormlite"},{"level":3,"title":"Memcached:","slug":"memcached"},{"level":3,"title":"AWS DynamoDB:","slug":"aws-dynamodb"},{"level":3,"title":"Azure:","slug":"azure"},{"level":3,"title":"Multi CacheClient","slug":"multi-cacheclient"},{"level":2,"title":"Cache a response of a service","slug":"cache-a-response-of-a-service"},{"level":2,"title":"Delete cached responses","slug":"delete-cached-responses"},{"level":3,"title":"LocalCache","slug":"localcache"},{"level":2,"title":"ICacheClientExtended","slug":"icacheclientextended"},{"level":3,"title":"CacheClient with Prefix","slug":"cacheclient-with-prefix"},{"level":2,"title":"Live Example and code","slug":"live-example-and-code"}],"relativePath":"caching.md","lastUpdated":1645506504348}',t={},c=e(`<p>As caching is an essential technology in the development of high-performance web services, ServiceStack has a number of different caching options available that each share the same <a href="https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack.Interfaces/Caching/ICacheClient.cs" target="_blank" rel="noopener noreferrer">common client interface (ICacheClient)</a> for the following cache providers:</p><ul><li><a href="https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack/Caching/MemoryCacheClient.cs" target="_blank" rel="noopener noreferrer">Memory Cache</a> - Useful for single host web services without needing any infrastructure dependencies.</li><li><a href="https://github.com/ServiceStack/ServiceStack.Redis" target="_blank" rel="noopener noreferrer">Redis</a> - A fast key-value store with non-volatile persistent storage and support for rich comp-sci data structures.</li><li><a href="https://www.nuget.org/packages/ServiceStack.Server" target="_blank" rel="noopener noreferrer">OrmLiteCacheClient</a> - Supports all <a href="https://github.com/ServiceStack/ServiceStack.OrmLite/#download" target="_blank" rel="noopener noreferrer">OrmLite&#39;s RDBMS providers</a> for using an existing RDBMS as a distributed cache.</li><li><a href="https://nuget.org/packages/ServiceStack.Caching.Memcached" target="_blank" rel="noopener noreferrer">Memcached</a> - The original, tried and tested distributed memory caching provider.</li><li><a href="https://www.nuget.org/packages/ServiceStack.Aws/" target="_blank" rel="noopener noreferrer">Aws DynamoDB</a> - Uses Amazon&#39;s Dynamo DB backend hosted on Amazon Web Services</li><li><a href="/azure#virtual-filesystem-backed-by-azure-blob-storage">Azure Table Storage</a> - Uses Azure Table Storage for when your application is hosted on Azure.</li></ul><h3 id="async-cache-clients" tabindex="-1">Async Cache Clients <a class="header-anchor" href="#async-cache-clients" aria-hidden="true">#</a></h3><p>All remote Caching Providers also implement the <a href="https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack.Interfaces/Caching/ICacheClientAsync.cs" target="_blank" rel="noopener noreferrer">ICacheClientAsync</a> async APIs whilst any other <code>ICacheClient</code> only providers like the local in-memory <code>MemoryCacheClient</code> are still able to use the <code>ICacheClientAsync</code> interface as they&#39;ll return an <a href="https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack/Caching/CacheClientAsyncWrapper.cs" target="_blank" rel="noopener noreferrer">Async Wrapper</a> over the underlying sync APIs.</p><p>So even if you&#39;re currently only using <code>MemoryCacheClient</code> or your own <code>ICacheClient</code> sync implementation, you can still use the async Caching Provider API now and easily switch to an async caching provider in future without code changes.</p><p>The Async Caching Provider APIs are accessible via the <code>CacheAsync</code> property in ServiceStack <code>Service</code> or <code>ServiceStackController</code> classes, e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span><span class="token keyword">object</span><span class="token punctuation">&gt;</span></span> <span class="token function">Any</span><span class="token punctuation">(</span><span class="token class-name">MyRequest</span> request<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> item <span class="token operator">=</span> <span class="token keyword">await</span> CacheAsync<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetAsync</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Item<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token string">&quot;key&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//....</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HomeController</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">ServiceStackController</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>ActionResult<span class="token punctuation">&gt;</span></span> <span class="token function">Index</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">var</span></span> item <span class="token operator">=</span> <span class="token keyword">await</span> CacheAsync<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetAsync</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Item<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token string">&quot;key&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Whilst outside of ServiceStack you can <code>AppHost.GetCacheClientAsync()</code>, e.g:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> cache <span class="token operator">=</span> HostContext<span class="token punctuation">.</span>AppHost<span class="token punctuation">.</span><span class="token function">GetCacheClientAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> item <span class="token operator">=</span> <span class="token keyword">await</span> cache<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetAsync</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Item<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token string">&quot;key&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="configure-caching-providers" tabindex="-1">Configure Caching Providers <a class="header-anchor" href="#configure-caching-providers" aria-hidden="true">#</a></h3><p>To configure which cache should be used, the particular client has to be registered in the IoC container against the <code>ICacheClient</code> interface:</p><h3 id="memory-cache" tabindex="-1">Memory cache: <a class="header-anchor" href="#memory-cache" aria-hidden="true">#</a></h3><p>By default ServiceStack registers an MemoryCacheClient by default when no <code>ICacheClient</code> is registered so no registration is necessary.</p><div class="language-csharp"><pre><code><span class="token comment">//container.Register&lt;ICacheClient&gt;(new MemoryCacheClient());</span>
</code></pre></div><p>Even if you have an alternative <code>ICacheClient</code> registered you can still access the in memory cache via the <code>LocalCache</code> property in your Services and ServiceStack MVC Controllers or anywhere else via the <code>HostContext.AppHost.GetMemoryCacheClient()</code> singleton as well as <code>[CacheResponse(UseLocalCache=true)]</code> when using the <a href="/cacheresponse-attribute">Cache Response Attribute</a>.</p><h3 id="redis" tabindex="-1">Redis <a class="header-anchor" href="#redis" aria-hidden="true">#</a></h3><div class="language-csharp"><pre><code>container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Register</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IRedisClientsManager<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>c <span class="token operator">=&gt;</span> 
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">RedisManagerPool</span><span class="token punctuation">(</span><span class="token string">&quot;localhost:6379&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

container<span class="token punctuation">.</span><span class="token function">Register</span><span class="token punctuation">(</span>c <span class="token operator">=&gt;</span> c<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Resolve</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IRedisClientsManager<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GetCacheClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h5 id="nuget-package-servicestack-redis" tabindex="-1">NuGet Package: <a href="http://www.nuget.org/packages/ServiceStack.Redis" target="_blank" rel="noopener noreferrer">ServiceStack.Redis</a> <a class="header-anchor" href="#nuget-package-servicestack-redis" aria-hidden="true">#</a></h5><h3 id="ormlite" tabindex="-1">OrmLite <a class="header-anchor" href="#ormlite" aria-hidden="true">#</a></h3><div class="language-csharp"><pre><code><span class="token comment">//Register OrmLite Db Factory if not already</span>
container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Register</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IDbConnectionFactory<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>c <span class="token operator">=&gt;</span> 
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">OrmLiteConnectionFactory</span><span class="token punctuation">(</span>connString<span class="token punctuation">,</span> SqlServerDialect<span class="token punctuation">.</span>Provider<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 

container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">RegisterAs</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>OrmLiteCacheClient<span class="token punctuation">,</span> ICacheClient<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//Create &#39;CacheEntry&#39; RDBMS table if it doesn&#39;t exist already</span>
container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Resolve</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>ICacheClient<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">InitSchema</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
</code></pre></div><h4 id="sql-server-memory-optimized-cache" tabindex="-1">SQL Server Memory Optimized Cache <a class="header-anchor" href="#sql-server-memory-optimized-cache" aria-hidden="true">#</a></h4><p>SQL Server&#39;s Memory Optimized support can be used to improve the performance of <code>OrmLiteCacheClient</code> by configuring it to use the above In Memory Table Schema instead, e.g:</p><div class="language-csharp"><pre><code>container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Register</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>ICacheClient<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>c <span class="token operator">=&gt;</span> 
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">OrmLiteCacheClient<span class="token punctuation">&lt;</span>SqlServerMemoryOptimizedCacheEntry<span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h5 id="nuget-package-servicestack-server" tabindex="-1">NuGet Package: <a href="http://www.nuget.org/packages/ServiceStack.Server" target="_blank" rel="noopener noreferrer">ServiceStack.Server</a> <a class="header-anchor" href="#nuget-package-servicestack-server" aria-hidden="true">#</a></h5><h3 id="memcached" tabindex="-1">Memcached: <a class="header-anchor" href="#memcached" aria-hidden="true">#</a></h3><div class="language-csharp"><pre><code>container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Register</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>ICacheClient<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MemcachedClientCache</span><span class="token punctuation">(</span><span class="token keyword">new</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;127.0.0.0&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//Add Memcached hosts</span>
</code></pre></div><h5 id="nuget-package-servicestack-caching-memcached" tabindex="-1">NuGet Package: <a href="http://www.nuget.org/packages/ServiceStack.Caching.Memcached" target="_blank" rel="noopener noreferrer">ServiceStack.Caching.Memcached</a> <a class="header-anchor" href="#nuget-package-servicestack-caching-memcached" aria-hidden="true">#</a></h5><h3 id="aws-dynamodb" tabindex="-1">AWS DynamoDB: <a class="header-anchor" href="#aws-dynamodb" aria-hidden="true">#</a></h3><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> awsDb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">AmazonDynamoDBClient</span><span class="token punctuation">(</span>
    AWS_ACCESS_KEY<span class="token punctuation">,</span> AWS_SECRET_KEY<span class="token punctuation">,</span> RegionEndpoint<span class="token punctuation">.</span>USEast1<span class="token punctuation">)</span><span class="token punctuation">;</span>

container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Register</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IPocoDynamo<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">PocoDynamo</span><span class="token punctuation">(</span>awsDb<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Register</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>ICacheClient<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>c <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DynamoDbCacheClient</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Resolve</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IPocoDynamo<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> cache <span class="token operator">=</span> container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Resolve</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>ICacheClient<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
cache<span class="token punctuation">.</span><span class="token function">InitSchema</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h5 id="nuget-package-servicestack-aws" tabindex="-1">NuGet Package: <a href="http://www.nuget.org/packages/ServiceStack.Aws" target="_blank" rel="noopener noreferrer">ServiceStack.Aws</a> <a class="header-anchor" href="#nuget-package-servicestack-aws" aria-hidden="true">#</a></h5><h3 id="azure" tabindex="-1">Azure: <a class="header-anchor" href="#azure" aria-hidden="true">#</a></h3><div class="language-csharp"><pre><code>container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Register</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>ICacheClient<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">AzureTableCacheClient</span><span class="token punctuation">(</span>cacheConnStr<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h5 id="nuget-package-servicestack-azure" tabindex="-1">NuGet Package: <a href="http://www.nuget.org/packages/ServiceStack.Azure" target="_blank" rel="noopener noreferrer">ServiceStack.Azure</a> <a class="header-anchor" href="#nuget-package-servicestack-azure" aria-hidden="true">#</a></h5><h3 id="multi-cacheclient" tabindex="-1">Multi CacheClient <a class="header-anchor" href="#multi-cacheclient" aria-hidden="true">#</a></h3><p>The <code>MultiCacheClient</code> can be used to utilize a write-through multi-tiered cache client where all &quot;writes&quot; are made to all registered cache providers whilst &quot;reads&quot; are only accessed until a value exists. E.g. you can register a local memory and redis server backed Cache Client with:</p><div class="language-csharp"><pre><code>container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Register</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>ICacheClient<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>c <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MultiCacheClient</span><span class="token punctuation">(</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MemoryCacheClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    c<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Resolve</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IRedisClientsManager<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GetCacheClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="cache-a-response-of-a-service" tabindex="-1">Cache a response of a service <a class="header-anchor" href="#cache-a-response-of-a-service" aria-hidden="true">#</a></h2><p>To cache a response you simply have to call <code>ToOptimizedResultUsingCache</code> which is an extension method existing in <code>ServiceStack.ServiceHost</code>.</p><p>In your service:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrdersService</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Service</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">object</span></span> <span class="token function">Get</span><span class="token punctuation">(</span><span class="token class-name">CachedOrders</span> request<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">var</span></span> cacheKey <span class="token operator">=</span> <span class="token string">&quot;unique_key_for_this_request&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">base</span><span class="token punctuation">.</span>Request<span class="token punctuation">.</span><span class="token function">ToOptimizedResultUsingCache</span><span class="token punctuation">(</span><span class="token keyword">base</span><span class="token punctuation">.</span>Cache<span class="token punctuation">,</span>cacheKey<span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span> 
            <span class="token punctuation">{</span>
                <span class="token comment">//Delegate is executed if item doesn&#39;t exist in cache </span>
                <span class="token comment">//Any response DTO returned here will be cached automatically</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="info custom-block"><p class="custom-block-title">Tip</p><p>There exists a class named <a href="https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack.Common/UrnId.cs" target="_blank" rel="noopener noreferrer">UrnId</a> which provides helper methods to create unique keys for an object</p></div><p><code>ToOptimizedResultUsingCache</code> also has an overload which provides a parameter to set the timespan when the cache should be deleted (marked as expired). If now a client calls the same service method a second time and the cache expired, the provided delegate, which returns the response DTO, will be executed a second time.</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> cacheKey <span class="token operator">=</span> <span class="token string">&quot;some_unique_key&quot;</span><span class="token punctuation">;</span>
<span class="token comment">//Cache should be deleted in 1h</span>
<span class="token class-name"><span class="token keyword">var</span></span> expireInTimespan <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TimeSpan</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">return</span> <span class="token keyword">base</span><span class="token punctuation">.</span>Request<span class="token punctuation">.</span><span class="token function">ToOptimizedResultUsingCache</span><span class="token punctuation">(</span>
    <span class="token keyword">base</span><span class="token punctuation">.</span>Cache<span class="token punctuation">,</span> cacheKey<span class="token punctuation">,</span> expireInTimespan<span class="token punctuation">,</span> <span class="token range operator">..</span><span class="token punctuation">.</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="delete-cached-responses" tabindex="-1">Delete cached responses <a class="header-anchor" href="#delete-cached-responses" aria-hidden="true">#</a></h2><p>If now for example an order gets updated and the order was cached before the update, the webservice will still return the same result, because the cache doesn&#39;t know that the order has been updated.</p><p>So there are two options:</p><ul><li>Use <strong>time based</strong> caching (and expire cache earlier)</li><li>Cache on <strong>validity</strong></li></ul><div class="info custom-block"><p class="custom-block-title">INFO</p><p>When the cache is based on <strong>validity</strong> the caches are invalidated manually (e.g. when a user modified his profile, &gt; clear his cache) which means you always get the latest version and you never need to hit the database again to rehydrate the cache if it hasn&#39;t changed, which will save resources</p></div><p>So if the order gets updated, you should delete the cache manually:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CachedOrdersService</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Service</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task</span> <span class="token function">Put</span><span class="token punctuation">(</span><span class="token class-name">CachedOrders</span> request<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//The order gets updated...</span>
        <span class="token class-name"><span class="token keyword">var</span></span> cacheKey <span class="token operator">=</span> <span class="token string">&quot;some_unique_key_for_order&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">await</span> CacheAsync<span class="token punctuation">.</span><span class="token function">ClearCachesAsync</span><span class="token punctuation">(</span>cacheKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>If now the client calls the webservice to request the order, he&#39;ll get the latest version.</p><h3 id="localcache" tabindex="-1">LocalCache <a class="header-anchor" href="#localcache" aria-hidden="true">#</a></h3><p>As it sometimes beneficial to have access to a local in-memory Cache in addition to your registered <code>ICacheClient</code><a href="/caching">Caching Provider</a> we also pre-register a <code>MemoryCacheClient</code> that all your Services now have access to from the <code>LocalCache</code> property, i.e:</p><div class="language-csharp"><pre><code><span class="token return-type class-name">MemoryCacheClient</span> LocalCache <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre></div><p>This doesn&#39;t affect any existing functionality that utilizes a cache like Sessions which continue to use your registered <code>ICacheClient</code>, but it does let you change which cache you want different responses to use, e.g:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> cacheKey <span class="token operator">=</span> <span class="token string">&quot;unique_key_for_this_request&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">return</span> <span class="token keyword">base</span><span class="token punctuation">.</span>Request<span class="token punctuation">.</span><span class="token function">ToOptimizedResultUsingCache</span><span class="token punctuation">(</span>LocalCache<span class="token punctuation">,</span> cacheKey<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">//Delegate is executed if item doesn&#39;t exist in cache </span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Or if you&#39;re using the <a href="/cacheresponse-attribute">CacheResponse</a> attribute you can specify to cache responses in the local cache with:</p><div class="language-csharp"><pre><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">CacheResponse</span><span class="token attribute-arguments"><span class="token punctuation">(</span>LocalCache <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">object</span></span> <span class="token function">Any</span><span class="token punctuation">(</span><span class="token class-name">MyRequest</span> request<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token range operator">..</span><span class="token punctuation">.</span> <span class="token punctuation">}</span>
</code></pre></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>If you don&#39;t register a <code>ICacheClient</code> ServiceStack automatically registers a <code>MemoryCacheClient</code> for you which will also refer to the same instance registered for <code>LocalCache</code></p></div><h2 id="icacheclientextended" tabindex="-1"><a href="https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack.Interfaces/Caching/ICacheClientExtended.cs" target="_blank" rel="noopener noreferrer">ICacheClientExtended</a> <a class="header-anchor" href="#icacheclientextended" aria-hidden="true">#</a></h2><p>The <a href="https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack.Interfaces/Caching/ICacheClientExtended.cs" target="_blank" rel="noopener noreferrer">ICacheClientExtended</a> API is used to to provide additional non-core functionality to our most popular <a href="/caching">Caching providers</a>:</p><ul><li>Redis</li><li>OrmLite RDBMS</li><li>In Memory</li><li>AWS</li><li>Azure</li></ul><p>The new API&#39;s are added as Extension methods on <code>ICacheClient</code> so they&#39;re easily accessible without casting, the new API&#39;s available include:</p><ul><li>GetKeysByPattern(pattern) - return keys matching a wildcard pattern</li><li>GetAllKeys() - return all keys in the caching provider</li><li>GetKeysStartingWith() - Streaming API to return all keys Starting with a prefix</li></ul><p>With these new API&#39;s you can now easily get all active User Sessions using any of the supported Caching providers above with:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> sessionPattern <span class="token operator">=</span> IdUtils<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">CreateUrn</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IAuthSession<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//= urn:iauthsession:</span>
<span class="token class-name"><span class="token keyword">var</span></span> sessionKeys <span class="token operator">=</span> Cache<span class="token punctuation">.</span><span class="token function">GetKeysStartingWith</span><span class="token punctuation">(</span>sessionPattern<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> allSessions <span class="token operator">=</span> Cache<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetAll</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IAuthSession<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>sessionKeys<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="cacheclient-with-prefix" tabindex="-1">CacheClient with Prefix <a class="header-anchor" href="#cacheclient-with-prefix" aria-hidden="true">#</a></h3><p>The <code>CacheClientWithPrefix</code> class lets you decorate any <code>ICacheClient</code> to prefix all cache keys using the <code>.WithPrefix()</code> extension method. This could be used to easily enable multi-tenant usage of a single redis instance, e.g:</p><div class="language-csharp"><pre><code>container<span class="token punctuation">.</span><span class="token function">Register</span><span class="token punctuation">(</span>c <span class="token operator">=&gt;</span> 
    c<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Resolve</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IRedisClientsManager<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GetCacheClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">WithPrefix</span><span class="token punctuation">(</span><span class="token string">&quot;site1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="live-example-and-code" tabindex="-1">Live Example and code <a class="header-anchor" href="#live-example-and-code" aria-hidden="true">#</a></h2><p>A live demo of the ICacheClient is available in <a href="http://northwind.netcore.io/" target="_blank" rel="noopener noreferrer">The ServiceStack.Northwind&#39;s example project</a>. Here are some requests to cached services:</p><ul><li><a href="http://northwind.netcore.io/cached/customers" target="_blank" rel="noopener noreferrer">/customers</a></li><li><a href="http://northwind.netcore.io/cached/customers/ALFKI" target="_blank" rel="noopener noreferrer">/customers/ALFKI</a></li><li><a href="http://northwind.netcore.io/cached/customers/ALFKI/orders" target="_blank" rel="noopener noreferrer">/customers/ALFKI/orders</a></li></ul><p>Which are simply existing web services wrapped using <strong>ICacheClient</strong> that are contained in <a href="https://github.com/ServiceStack/ServiceStack.Examples/blob/master/src/ServiceStack.Northwind/ServiceStack.Northwind.ServiceInterface/CachedServices.cs" target="_blank" rel="noopener noreferrer">CachedServices.cs</a></p>`,73),o=[c];function p(i,l,r,u,k,h){return s(),a("div",null,o)}var m=n(t,[["render",p]]);export{g as __pageData,m as default};
