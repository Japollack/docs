import{_ as n,c as a,o as s,a as e}from"./app.64b20f26.js";const h=`{"title":"v4.0.11 Release Notes","description":"","frontmatter":{"title":"v4.0.11 Release Notes","slug":"v4-0-11"},"headers":[{"level":2,"title":"OrmLite","slug":"ormlite"},{"level":3,"title":"Pluggable Complex Type Serializers","slug":"pluggable-complex-type-serializers"},{"level":3,"title":"New Global Insert / Update Filters","slug":"new-global-insert-update-filters"},{"level":3,"title":"Validation","slug":"validation"},{"level":3,"title":"Custom SQL Customizations","slug":"custom-sql-customizations"},{"level":3,"title":"Re-factoring OrmLite's SQLite NuGet Packages","slug":"re-factoring-ormlite-s-sqlite-nuget-packages"},{"level":2,"title":".NET Service Clients","slug":"net-service-clients"},{"level":2,"title":"Authentication","slug":"authentication"},{"level":3,"title":"New IManageRoles API","slug":"new-imanageroles-api"},{"level":2,"title":"Messaging","slug":"messaging"},{"level":3,"title":"Flexible Queue Name strategies","slug":"flexible-queue-name-strategies"}],"relativePath":"releases/v4_0_11.md","lastUpdated":1645506505280}`,t={},o=e(`__VP_STATIC_START__<h2 id="ormlite" tabindex="-1">OrmLite <a class="header-anchor" href="#ormlite" aria-hidden="true">#</a></h2><p>This release saw a lot of effort towards adding new features to OrmLite:</p><h3 id="pluggable-complex-type-serializers" tabindex="-1">Pluggable Complex Type Serializers <a class="header-anchor" href="#pluggable-complex-type-serializers" aria-hidden="true">#</a></h3><p>One of the <a href="http://servicestack.uservoice.com/forums/176786-feature-requests/suggestions/4738945-allow-ormlite-to-store-complex-blobs-as-json" target="_blank" rel="noopener noreferrer">most requested features</a> to enable pluggable serialization for complex types in OrmLite is now supported. This can be used to specify different serialization strategies for each available RDBMS provider, e.g:</p><div class="language-csharp"><pre><code><span class="token comment">//ServiceStack&#39;s JSON and JSV Format</span>
SqliteDialect<span class="token punctuation">.</span>Provider<span class="token punctuation">.</span>StringSerializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">JsvStringSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>       
PostgreSqlDialect<span class="token punctuation">.</span>Provider<span class="token punctuation">.</span>StringSerializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">JsonStringSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//.NET&#39;s XML and JSON DataContract serializers</span>
SqlServerDialect<span class="token punctuation">.</span>Provider<span class="token punctuation">.</span>StringSerializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DataContractSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
MySqlDialect<span class="token punctuation">.</span>Provider<span class="token punctuation">.</span>StringSerializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">JsonDataContractSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//.NET XmlSerializer</span>
OracleDialect<span class="token punctuation">.</span>Provider<span class="token punctuation">.</span>StringSerializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">XmlSerializableSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>You can also provide a custom serialization strategy by implementing <a href="https://github.com/ServiceStack/ServiceStack.Text/blob/master/src/ServiceStack.Text/IStringSerializer.cs" target="_blank" rel="noopener noreferrer">IStringSerializer</a>.</p><p>By default all dialects use the existing JsvStringSerializer, except for PostgreSQL which due to its built-in support for JSON, now uses the JSON format by default.</p><h4 id="breaking-change" tabindex="-1">Breaking Change <a class="header-anchor" href="#breaking-change" aria-hidden="true">#</a></h4><p>Using JSON as a default for PostgreSQL may cause issues if you already have complex types blobbed with the previous JSV Format. You can revert back to the old behavior by resetting it back to the JSV format with:</p><div class="language-csharp"><pre><code>PostgreSqlDialect<span class="token punctuation">.</span>Provider<span class="token punctuation">.</span>StringSerializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">JsvStringSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="new-global-insert-update-filters" tabindex="-1">New Global Insert / Update Filters <a class="header-anchor" href="#new-global-insert-update-filters" aria-hidden="true">#</a></h3><p>Similar to interceptors in some heavy ORM&#39;s, new Insert and Update filters were added which get fired just before any <strong>insert</strong> or <strong>update</strong> operation using OrmLite&#39;s typed API&#39;s (i.e. not dynamic SQL or partial updates using anon types). This functionality can be used for easily auto-maintaining Audit information for your POCO data models, e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IAudit</span> 
<span class="token punctuation">{</span>
    <span class="token return-type class-name">DateTime</span> CreatedDate <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token return-type class-name">DateTime</span> ModifiedDate <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token return-type class-name"><span class="token keyword">string</span></span> ModifiedBy <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

OrmLiteConfig<span class="token punctuation">.</span>InsertFilter <span class="token operator">=</span> <span class="token punctuation">(</span>dbCmd<span class="token punctuation">,</span> row<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> auditRow <span class="token operator">=</span> row <span class="token keyword">as</span> <span class="token class-name">IAudit</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>auditRow <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        auditRow<span class="token punctuation">.</span>CreatedDate <span class="token operator">=</span> auditRow<span class="token punctuation">.</span>ModifiedDate <span class="token operator">=</span> DateTime<span class="token punctuation">.</span>UtcNow<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

OrmLiteConfig<span class="token punctuation">.</span>UpdateFilter <span class="token operator">=</span> <span class="token punctuation">(</span>dbCmd<span class="token punctuation">,</span> row<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> auditRow <span class="token operator">=</span> row <span class="token keyword">as</span> <span class="token class-name">IAudit</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>auditRow <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        auditRow<span class="token punctuation">.</span>ModifiedDate <span class="token operator">=</span> DateTime<span class="token punctuation">.</span>UtcNow<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><p>Which will ensure that the <code>CreatedDate</code> and <code>ModifiedDate</code> fields are populated on every insert and update.</p><h3 id="validation" tabindex="-1">Validation <a class="header-anchor" href="#validation" aria-hidden="true">#</a></h3><p>The filters can also be used for validation where throwing an exception will prevent the operation and bubble the exception, e.g:</p><div class="language-csharp"><pre><code>OrmLiteConfig<span class="token punctuation">.</span>InsertFilter <span class="token operator">=</span> OrmLiteConfig<span class="token punctuation">.</span>UpdateFilter <span class="token operator">=</span> <span class="token punctuation">(</span>dbCmd<span class="token punctuation">,</span> row<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> auditRow <span class="token operator">=</span> row <span class="token keyword">as</span> <span class="token class-name">IAudit</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>auditRow <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> auditRow<span class="token punctuation">.</span>ModifiedBy <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArgumentNullException</span><span class="token punctuation">(</span><span class="token string">&quot;ModifiedBy&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">try</span>
<span class="token punctuation">{</span>
    db<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">AuditTable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ArgumentNullException</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token comment">//throws ArgumentNullException</span>
<span class="token punctuation">}</span>

db<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">AuditTable</span> <span class="token punctuation">{</span> ModifiedBy <span class="token operator">=</span> <span class="token string">&quot;Me!&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//succeeds</span>
</code></pre></div><h3 id="custom-sql-customizations" tabindex="-1">Custom SQL Customizations <a class="header-anchor" href="#custom-sql-customizations" aria-hidden="true">#</a></h3><p>A number of new hooks were added to provide more flexibility when creating and dropping your RDBMS tables.</p><h4 id="custom-field-declarations" tabindex="-1">Custom Field Declarations <a class="header-anchor" href="#custom-field-declarations" aria-hidden="true">#</a></h4><p>The new <code>[CustomField]</code> can be used for specifying custom field declarations in the generated Create table DDL statements, e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PocoTable</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">CustomField</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;CHAR(20)&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> CharColumn <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">CustomField</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;DECIMAL(18,4)&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">decimal</span><span class="token punctuation">?</span></span> DecimalColumn <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">CreateTable</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>PocoTable<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
</code></pre></div><p>Generates and executes the following SQL:</p><div class="language-sql"><pre><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token string">&quot;PocoTable&quot;</span> 
<span class="token punctuation">(</span>
  <span class="token string">&quot;Id&quot;</span> <span class="token keyword">INTEGER</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span> 
  <span class="token string">&quot;CharColumn&quot;</span> <span class="token keyword">CHAR</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span> 
  <span class="token string">&quot;DecimalColumn&quot;</span> <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">18</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">)</span> <span class="token boolean">NULL</span> 
<span class="token punctuation">)</span><span class="token punctuation">;</span>  
</code></pre></div><h4 id="pre-post-custom-sql-hooks-when-creating-and-dropping-tables" tabindex="-1">Pre / Post Custom SQL Hooks when Creating and Dropping tables <a class="header-anchor" href="#pre-post-custom-sql-hooks-when-creating-and-dropping-tables" aria-hidden="true">#</a></h4><p>A number of custom SQL hooks were added that allow you to inject custom SQL before and after tables are created or dropped, e.g:</p><div class="language-csharp"><pre><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">PostCreateTable</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;INSERT INTO TableWithSeedData (Name) VALUES (&#39;Foo&#39;);&quot;</span> <span class="token operator">+</span>
                 <span class="token string">&quot;INSERT INTO TableWithSeedData (Name) VALUES (&#39;Bar&#39;);&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TableWithSeedData</span>
<span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">AutoIncrement</span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Name <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>And just like other ServiceStack attributes, they can also be added dynamically, e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">TableWithSeedData</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">AddAttributes</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">PostCreateTableAttribute</span><span class="token punctuation">(</span>
        <span class="token string">&quot;INSERT INTO TableWithSeedData (Name) VALUES (&#39;Foo&#39;);&quot;</span> <span class="token operator">+</span>
        <span class="token string">&quot;INSERT INTO TableWithSeedData (Name) VALUES (&#39;Bar&#39;);&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Custom SQL Hooks are now available to execute custom SQL before and after a table has been created or dropped, i.e:</p><div class="language-csharp"><pre><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">PreCreateTable</span><span class="token attribute-arguments"><span class="token punctuation">(</span>runSqlBeforeTableCreated<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">PostCreateTable</span><span class="token attribute-arguments"><span class="token punctuation">(</span>runSqlAfterTableCreated<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">PreDropTable</span><span class="token attribute-arguments"><span class="token punctuation">(</span>runSqlBeforeTableDropped<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">PostDropTable</span><span class="token attribute-arguments"><span class="token punctuation">(</span>runSqlAfterTableDropped<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Table</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre></div><h3 id="re-factoring-ormlite-s-sqlite-nuget-packages" tabindex="-1">Re-factoring OrmLite&#39;s SQLite NuGet Packages <a class="header-anchor" href="#re-factoring-ormlite-s-sqlite-nuget-packages" aria-hidden="true">#</a></h3><p>In their latest release, the SQLite dev team maintaining the <a href="https://www.nuget.org/profiles/mistachkin/" target="_blank" rel="noopener noreferrer">core SQLite NuGet packages</a> have added a dependency to Entity Framework on their existing Sqlite NuGet packages forcing the installation of Entity Framework for users of OrmLite Sqlite. This change also caused some users to see invalid web.config sections after applying the new web.config.transforms. After speaking to the maintainers they&#39;ve created a new <a href="http://www.nuget.org/packages/System.Data.SQLite.Core" target="_blank" rel="noopener noreferrer">System.Data.SQLite.Core</a> NuGet package without the entity framework dependency and the problematic web.config.transforms.</p><p>Unfortunately this was only added for their bundled x86/x64 NuGet package and not their other <a href="http://www.nuget.org/packages/System.Data.SQLite.x86/" target="_blank" rel="noopener noreferrer">System.Data.SQLite.x86</a> and <a href="http://www.nuget.org/packages/System.Data.SQLite.x64/" target="_blank" rel="noopener noreferrer">System.Data.SQLite.x64</a> which the team have indicated should be deprecated in favor of the x86/x64 bundled <strong>System.Data.SQLite.Core</strong> package.</p><p>As a result of this we&#39;re removing the dependency to the Sqlite NuGet packages in both architecture specific <a href="http://www.nuget.org/packages/ServiceStack.OrmLite.Sqlite32/" target="_blank" rel="noopener noreferrer">ServiceStack.OrmLite.Sqlite32</a> and <a href="http://www.nuget.org/packages/ServiceStack.OrmLite.Sqlite64/" target="_blank" rel="noopener noreferrer">ServiceStack.OrmLite.Sqlite64</a> packages and have instead embedded the Sqlite binaries directly, which will solve the current issues and shield them from any future changes/updates from the upstream Sqlite packages.</p><h4 id="new-servicestack-ormlite-sqlite-windows-nuget-package" tabindex="-1">New ServiceStack.OrmLite.Sqlite.Windows NuGet package <a class="header-anchor" href="#new-servicestack-ormlite-sqlite-windows-nuget-package" aria-hidden="true">#</a></h4><p>Both these arch-specific packages should now be deprecated in favour of a new Sqlite NuGet package supporting both x86/x64 architectures on Windows:</p><pre><code>PM&gt; Install-Package ServiceStack.OrmLite.Sqlite.Windows
</code></pre><p>Which should now be used for future (or existing) projects previously using the old <a href="http://www.nuget.org/packages/ServiceStack.OrmLite.Sqlite32/" target="_blank" rel="noopener noreferrer">OrmLite.Sqlite32</a> and <a href="http://www.nuget.org/packages/ServiceStack.OrmLite.Sqlite64/" target="_blank" rel="noopener noreferrer">OrmLite.Sqlite64</a> packages.</p><p>The Windows-specific package was added in addition to our existing Mono and Windows compatible release:</p><pre><code>PM&gt; Install-Package ServiceStack.OrmLite.Sqlite.Mono
</code></pre><p>Which works cross-platform on Windows and Linux/OSX with Mono should you need cross-platform support.</p><h2 id="net-service-clients" tabindex="-1">.NET Service Clients <a class="header-anchor" href="#net-service-clients" aria-hidden="true">#</a></h2><p>New async API&#39;s were added for requests marked with returning <code>IReturnVoid</code>. This provides a typed API for executing services with no response that was previously missing, e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Request</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IReturnVoid</span></span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">PostAsync</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Request</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>The API&#39;s for all sync and async REST operations have been changed to return <code>HttpWebResponse</code> which now lets you query the returned HTTP Response, e.g:</p><div class="language-csharp"><pre><code><span class="token class-name">HttpWebResponse</span> response <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">PostAsync</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Request</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> api <span class="token operator">=</span> response<span class="token punctuation">.</span>Headers<span class="token punctuation">[</span><span class="token string">&quot;X-Api&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="authentication" tabindex="-1">Authentication <a class="header-anchor" href="#authentication" aria-hidden="true">#</a></h2><h3 id="new-imanageroles-api" tabindex="-1">New IManageRoles API <a class="header-anchor" href="#new-imanageroles-api" aria-hidden="true">#</a></h3><p>A new <a href="https://github.com/ServiceStack/ServiceStack/blob/4398438e058851847033f2da923fe0221a75d3b3/src/ServiceStack/Auth/IAuthRepository.cs#L72" target="_blank" rel="noopener noreferrer">IManageRoles API</a> was added that IAuthRepository&#39;s can implement in order to provide an alternative strategy for querying and managing Users&#39; Roles and permissions.</p><p>This new API is being used in the <code>OrmLiteAuthRepository</code> to provide an alternative way to store Roles and Permission in their own distinct table rather than being blobbed with the rest of the User Auth data. You can enable this new behavior by specifying <code>UseDistinctRoleTables=true</code> when registering the OrmLiteAuthRepository, e.g:</p><div class="language-csharp"><pre><code>container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Register</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IAuthRepository<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>c <span class="token operator">=&gt;</span>
<span class="token keyword">new</span> <span class="token constructor-invocation class-name">OrmLiteAuthRepository</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Resolve</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IDbConnectionFactory<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    UseDistinctRoleTables <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>When enabled, roles and permissions are persisted in the distinct <strong>UserAuthRole</strong> table. This behavior is integrated with the rest of ServiceStack including the Users Session, RequiredRole/RequiredPermission attributes and the AssignRoles/UnAssignRoles authentication services. Examples of this can be seen in <a href="https://github.com/ServiceStack/ServiceStack/blob/master/tests/ServiceStack.Common.Tests/ManageRolesTests.cs" target="_blank" rel="noopener noreferrer">ManageRolesTests.cs</a>.</p><h2 id="messaging" tabindex="-1"><a href="/messaging">Messaging</a> <a class="header-anchor" href="#messaging" aria-hidden="true">#</a></h2><h3 id="flexible-queue-name-strategies" tabindex="-1">Flexible Queue Name strategies <a class="header-anchor" href="#flexible-queue-name-strategies" aria-hidden="true">#</a></h3><p>There are now more flexible options for specifying the Queue Names used in <a href="/messaging">ServiceStack&#39;s MQ Servers</a>. You can categorize queue names or avoid conflicts with other MQ services by specifying a global prefix to be used for all Queue Names, e.g:</p><div class="language-csharp"><pre><code>QueueNames<span class="token punctuation">.</span><span class="token function">SetQueuePrefix</span><span class="token punctuation">(</span><span class="token string">&quot;site1.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

QueueNames<span class="token operator">&lt;</span>Hello<span class="token operator">&gt;</span><span class="token punctuation">.</span>In <span class="token comment">//= site1.mq:Hello.inq</span>
</code></pre></div><p>Or to gain complete control of each queue name used, provide a custom QueueName strategy, e.g:</p><div class="language-csharp"><pre><code>QueueNames<span class="token punctuation">.</span>ResolveQueueNameFn <span class="token operator">=</span> <span class="token punctuation">(</span>typeName<span class="token punctuation">,</span> suffix<span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
    <span class="token interpolation-string"><span class="token string">$&quot;SITE.</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">typeName<span class="token punctuation">.</span><span class="token function">ToLower</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span><span class="token punctuation">}</span></span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">suffix<span class="token punctuation">.</span><span class="token function">ToUpper</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">;</span>

QueueNames<span class="token operator">&lt;</span>Hello<span class="token operator">&gt;</span><span class="token punctuation">.</span>In  <span class="token comment">//= SITE.hello.INQ</span>
</code></pre></div><blockquote><p>Note: Custom QueueNames need to be declared on both MQ Client in addition to ServiceStack Hosts.</p></blockquote>__VP_STATIC_END__`,60),p=[o];function c(i,l,r,u,k,d){return s(),a("div",null,p)}var m=n(t,[["render",c]]);export{h as __pageData,m as default};
