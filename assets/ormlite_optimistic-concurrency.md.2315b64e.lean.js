import{_ as n,c as s,o as a,a as t}from"./app.64b20f26.js";const h='{"title":"Optimistic Concurrency","description":"","frontmatter":{"title":"Optimistic Concurrency"},"headers":[{"level":2,"title":"RowVersion Byte Array","slug":"rowversion-byte-array"},{"level":2,"title":"Conflict Resolution using commandFilter","slug":"conflict-resolution-using-commandfilter"}],"relativePath":"ormlite/optimistic-concurrency.md","lastUpdated":1645506505256}',e={},o=t(`__VP_STATIC_START__<p>Optimistic concurrency can be added to any table by adding the <code>ulong RowVersion { get; set; }</code> property, e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Poco</span>
<span class="token punctuation">{</span>
    <span class="token range operator">..</span><span class="token punctuation">.</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">ulong</span></span> RowVersion <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>RowVersion is implemented efficiently in all major RDBMS&#39;s, i.e:</p><ul><li>Uses <code>rowversion</code> datatype in SqlServer</li><li>Uses PostgreSql&#39;s <code>xmin</code> system column (no column on table required)</li><li>Uses UPDATE triggers on MySql, Sqlite and Oracle whose lifetime is attached to Create/Drop tables APIs</li></ul><p>Despite their differing implementations each provider works the same way where the <code>RowVersion</code> property is populated when the record is selected and only updates the record if the RowVersion matches with what&#39;s in the database, e.g:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> rowId <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Poco</span> <span class="token punctuation">{</span> Text <span class="token operator">=</span> <span class="token string">&quot;Text&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token named-parameter punctuation">selectIdentity</span><span class="token punctuation">:</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> row <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">SingleById</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Poco<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>rowId<span class="token punctuation">)</span><span class="token punctuation">;</span>
row<span class="token punctuation">.</span>Text <span class="token operator">+=</span> <span class="token string">&quot; Updated&quot;</span><span class="token punctuation">;</span>
db<span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span>row<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//success!</span>

row<span class="token punctuation">.</span>Text <span class="token operator">+=</span> <span class="token string">&quot;Attempting to update stale record&quot;</span><span class="token punctuation">;</span>

<span class="token comment">//Can&#39;t update stale record</span>
Assert<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Throws</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>OptimisticConcurrencyException<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
    db<span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span>row<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//Can update latest version</span>
<span class="token class-name"><span class="token keyword">var</span></span> updatedRow <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">SingleById</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Poco<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>rowId<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// fresh version</span>
updatedRow<span class="token punctuation">.</span>Text <span class="token operator">+=</span> <span class="token string">&quot;Update Success!&quot;</span><span class="token punctuation">;</span>
db<span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span>updatedRow<span class="token punctuation">)</span><span class="token punctuation">;</span>

updatedRow <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">SingleById</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Poco<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>rowId<span class="token punctuation">)</span><span class="token punctuation">;</span>
db<span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span>updatedRow<span class="token punctuation">)</span><span class="token punctuation">;</span>                        <span class="token comment">// can delete fresh version</span>
</code></pre></div><p>Optimistic concurrency is only verified on API&#39;s that update or delete an entire entity, i.e. it&#39;s not enforced in partial updates. There&#39;s also an Alternative API available for DELETE&#39;s:</p><div class="language-csharp"><pre><code>db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">DeleteById</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Poco<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token named-parameter punctuation">id</span><span class="token punctuation">:</span>updatedRow<span class="token punctuation">.</span>Id<span class="token punctuation">,</span> <span class="token named-parameter punctuation">rowversion</span><span class="token punctuation">:</span>updatedRow<span class="token punctuation">.</span>RowVersion<span class="token punctuation">)</span>
</code></pre></div><h2 id="rowversion-byte-array" tabindex="-1">RowVersion Byte Array <a class="header-anchor" href="#rowversion-byte-array" aria-hidden="true">#</a></h2><p>To improve reuse of OrmLite&#39;s Data Models in Dapper, OrmLite also supports <code>byte[] RowVersion</code> which lets you use OrmLite Data Models with <code>byte[] RowVersion</code> properties in Dapper queries.</p><h2 id="conflict-resolution-using-commandfilter" tabindex="-1">Conflict Resolution using commandFilter <a class="header-anchor" href="#conflict-resolution-using-commandfilter" aria-hidden="true">#</a></h2><p>An optional <code>Func&lt;IDbCommand&gt; commandFilter</code> is available in all <code>INSERT</code> and <code>UPDATE</code> APIs to allow customization and inspection of the populated <code>IDbCommand</code> before it&#39;s run. This feature is utilized in the <a href="https://github.com/ServiceStack/ServiceStack.OrmLite/blob/master/src/ServiceStack.OrmLite/OrmLiteConflictResolutions.cs" target="_blank" rel="noopener noreferrer">Conflict Resolution Extension methods</a> where you can specify the conflict resolution strategy when a Primary Key or Unique constraint violation occurs:</p><div class="language-csharp"><pre><code>db<span class="token punctuation">.</span><span class="token function">InsertAll</span><span class="token punctuation">(</span>rows<span class="token punctuation">,</span> dbCmd <span class="token operator">=&gt;</span> dbCmd<span class="token punctuation">.</span><span class="token function">OnConflictIgnore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//Equivalent to: </span>
db<span class="token punctuation">.</span><span class="token function">InsertAll</span><span class="token punctuation">(</span>rows<span class="token punctuation">,</span> dbCmd <span class="token operator">=&gt;</span> dbCmd<span class="token punctuation">.</span><span class="token function">OnConflict</span><span class="token punctuation">(</span>ConflictResolution<span class="token punctuation">.</span>Ignore<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>In this case it will ignore any conflicts that occur and continue inserting the remaining rows in SQLite, MySql and PostgreSQL, whilst in SQL Server it&#39;s a NOOP.</p><p>SQLite offers <a href="https://sqlite.org/lang_conflict.html" target="_blank" rel="noopener noreferrer">additional fine-grained behavior</a> that can be specified for when a conflict occurs:</p><ul><li>ROLLBACK</li><li>ABORT</li><li>FAIL</li><li>IGNORE</li><li>REPLACE</li></ul>__VP_STATIC_END__`,16),p=[o];function c(i,l,u,r,d,k){return a(),s("div",null,p)}var g=n(e,[["render",c]]);export{h as __pageData,g as default};
