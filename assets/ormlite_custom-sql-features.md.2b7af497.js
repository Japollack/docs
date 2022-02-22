import{_ as s,c as n,o as a,a as t}from"./app.64b20f26.js";const g='{"title":"Customized SQL Features","description":"","frontmatter":{"title":"Customized SQL Features"},"headers":[{"level":2,"title":"CustomSelect Attribute","slug":"customselect-attribute"},{"level":2,"title":"Order by dynamic expressions","slug":"order-by-dynamic-expressions"},{"level":2,"title":"Custom SQL Fragments","slug":"custom-sql-fragments"},{"level":2,"title":"Custom Field Declarations","slug":"custom-field-declarations"},{"level":2,"title":"Custom Insert and Update Expressions","slug":"custom-insert-and-update-expressions"},{"level":2,"title":"Custom SqlExpression Filter","slug":"custom-sqlexpression-filter"},{"level":2,"title":"Ignoring DTO Properties","slug":"ignoring-dto-properties"}],"relativePath":"ormlite/custom-sql-features.md","lastUpdated":1645506505256}',p={},e=t(`<p>A number of new hooks are available to provide more flexibility when creating and dropping your RDBMS tables.</p><h2 id="customselect-attribute" tabindex="-1">CustomSelect Attribute <a class="header-anchor" href="#customselect-attribute" aria-hidden="true">#</a></h2><p>The new <code>[CustomSelect]</code> can be used to define properties you want populated from a Custom SQL Function or Expression instead of a normal persisted column, e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Block</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Width <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Height <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">CustomSelect</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;Width * Height&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Area <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Default</span><span class="token attribute-arguments"><span class="token punctuation">(</span>OrmLiteVariables<span class="token punctuation">.</span>SystemUtc<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">DateTime</span> CreatedDate <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">CustomSelect</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;FORMAT(CreatedDate, &#39;yyyy-MM-dd&#39;)&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> DateFormat <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

db<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Block</span> <span class="token punctuation">{</span> Id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> Width <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">,</span> Height <span class="token operator">=</span> <span class="token number">5</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> block <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">SingleById</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Block<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

block<span class="token punctuation">.</span>Area<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//= 50</span>

block<span class="token punctuation">.</span>DateFormat<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//= 2016-06-08 (SQL Server)</span>
</code></pre></div><h2 id="order-by-dynamic-expressions" tabindex="-1">Order by dynamic expressions <a class="header-anchor" href="#order-by-dynamic-expressions" aria-hidden="true">#</a></h2><p>The <code>[CustomSelect]</code> attribute can be used to populate a property with a dynamic SQL Expression instead of an existing column, e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FeatureRequest</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Up <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Down <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">CustomSelect</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;1 + Up - Down&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Points <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>You can also order by the SQL Expression by referencing the property as you would a normal column. By extension this feature now also works in AutoQuery where you can <a href="http://docs.servicestack.net/autoquery-rdbms#custom-fields" target="_blank" rel="noopener noreferrer">select it in a partial result set</a> and order the results by using its property name, e.g:</p><div class="language-"><pre><code>/features?fields=id,points&amp;orderBy=points
</code></pre></div><h2 id="custom-sql-fragments" tabindex="-1">Custom SQL Fragments <a class="header-anchor" href="#custom-sql-fragments" aria-hidden="true">#</a></h2><p>The <code>Sql.Custom()</code> API lets you use raw SQL Fragments in Custom <code>.Select()</code> expressions, e.g:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> q <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">From</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Table<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">Select</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token punctuation">{</span>
        FirstName <span class="token operator">=</span> x<span class="token punctuation">.</span>FirstName<span class="token punctuation">,</span>
        LastName <span class="token operator">=</span> x<span class="token punctuation">.</span>LastName<span class="token punctuation">,</span>
        Initials <span class="token operator">=</span> Sql<span class="token punctuation">.</span><span class="token function">Custom</span><span class="token punctuation">(</span><span class="token string">&quot;CONCAT(LEFT(FirstName,1), LEFT(LastName,1))&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="custom-field-declarations" tabindex="-1">Custom Field Declarations <a class="header-anchor" href="#custom-field-declarations" aria-hidden="true">#</a></h2><p>The <code>[CustomField]</code> attribute can be used for specifying custom field declarations in the generated Create table DDL statements, e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PocoTable</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">CustomField</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;CHAR(20)&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> CharColumn <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">CustomField</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;DECIMAL(18,4)&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">decimal</span><span class="token punctuation">?</span></span> DecimalColumn <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">CustomField</span><span class="token attribute-arguments"><span class="token punctuation">(</span>OrmLiteVariables<span class="token punctuation">.</span>MaxText<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>        <span class="token comment">//= {MAX_TEXT}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> MaxText <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">CustomField</span><span class="token attribute-arguments"><span class="token punctuation">(</span>OrmLiteVariables<span class="token punctuation">.</span>MaxTextUnicode<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span> <span class="token comment">//= {NMAX_TEXT}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> MaxUnicodeText <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">CreateTable</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>PocoTable<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
</code></pre></div><p>Generates and executes the following SQL in SQL Server:</p><div class="language-sql"><pre><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token string">&quot;PocoTable&quot;</span> 
<span class="token punctuation">(</span>
  <span class="token string">&quot;Id&quot;</span> <span class="token keyword">INTEGER</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span> 
  <span class="token string">&quot;CharColumn&quot;</span> <span class="token keyword">CHAR</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span> 
  <span class="token string">&quot;DecimalColumn&quot;</span> <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">18</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">)</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span> 
  <span class="token string">&quot;MaxText&quot;</span> <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span>MAX<span class="token punctuation">)</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span> 
  <span class="token string">&quot;MaxUnicodeText&quot;</span> NVARCHAR<span class="token punctuation">(</span>MAX<span class="token punctuation">)</span> <span class="token boolean">NULL</span> 
<span class="token punctuation">)</span><span class="token punctuation">;</span> 
</code></pre></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>OrmLite replaces any variable placeholders with the value in each RDBMS DialectProvider&#39;s <code>Variables</code> Dictionary.</p></div><h2 id="custom-insert-and-update-expressions" tabindex="-1">Custom Insert and Update Expressions <a class="header-anchor" href="#custom-insert-and-update-expressions" aria-hidden="true">#</a></h2><p>The <code>[CustomInsert]</code> and <code>[CustomUpdate]</code> attributes can be used to override what values rows are inserted during INSERT&#39;s and UPDATE&#39;s.</p><p>We can use this to insert a salted and hashed password using PostgreSQL native functions:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomSqlUser</span>
<span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">AutoIncrement</span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Email <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">CustomInsert</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;crypt({0}, gen_salt(&#39;bf&#39;))&quot;</span><span class="token punctuation">)</span></span><span class="token punctuation">,</span>
     <span class="token class-name">CustomUpdate</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;crypt({0}, gen_salt(&#39;bf&#39;))&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Password <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token class-name"><span class="token keyword">var</span></span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CustomSqlUser</span> <span class="token punctuation">{</span>
    Email <span class="token operator">=</span> <span class="token string">&quot;user@email.com&quot;</span><span class="token punctuation">,</span> 
    Password <span class="token operator">=</span> <span class="token string">&quot;secret&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
db<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>We can then use <code>Sql.Custom()</code> to create a partially typed custom query to match on the hashed password, e.g:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> quotedSecret <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">Dialect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GetQuotedValue</span><span class="token punctuation">(</span><span class="token string">&quot;secret&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> q <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">From</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>CustomSqlUser<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">Where</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span> x<span class="token punctuation">.</span>Password <span class="token operator">==</span> Sql<span class="token punctuation">.</span><span class="token function">Custom</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$&quot;crypt(</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">quotedSecret</span><span class="token punctuation">}</span></span><span class="token string">, password)&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> row <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">Single</span><span class="token punctuation">(</span>q<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="pre-post-custom-sql-hooks-when-creating-and-dropping-tables" tabindex="-1">Pre / Post Custom SQL Hooks when Creating and Dropping tables <a class="header-anchor" href="#pre-post-custom-sql-hooks-when-creating-and-dropping-tables" aria-hidden="true">#</a></h4><p>Pre / Post Custom SQL Hooks allow you to inject custom SQL before and after tables are created or dropped, e.g:</p><div class="language-csharp"><pre><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">PostCreateTable</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;INSERT INTO TableWithSeedData (Name) VALUES (&#39;Foo&#39;);&quot;</span> <span class="token operator">+</span>
                 <span class="token string">&quot;INSERT INTO TableWithSeedData (Name) VALUES (&#39;Bar&#39;);&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TableWithSeedData</span>
<span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">AutoIncrement</span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Name <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Which like other ServiceStack attributes, can also be added dynamically, e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">TableWithSeedData</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">AddAttributes</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">PostCreateTableAttribute</span><span class="token punctuation">(</span>
        <span class="token string">&quot;INSERT INTO TableWithSeedData (Name) VALUES (&#39;Foo&#39;);&quot;</span> <span class="token operator">+</span>
        <span class="token string">&quot;INSERT INTO TableWithSeedData (Name) VALUES (&#39;Bar&#39;);&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Custom SQL Hooks also allow executing custom SQL before and after a table has been created or dropped, i.e:</p><div class="language-csharp"><pre><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">PreCreateTable</span><span class="token attribute-arguments"><span class="token punctuation">(</span>runSqlBeforeTableCreated<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">PostCreateTable</span><span class="token attribute-arguments"><span class="token punctuation">(</span>runSqlAfterTableCreated<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">PreDropTable</span><span class="token attribute-arguments"><span class="token punctuation">(</span>runSqlBeforeTableDropped<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">PostDropTable</span><span class="token attribute-arguments"><span class="token punctuation">(</span>runSqlAfterTableDropped<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Table</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre></div><h2 id="custom-sqlexpression-filter" tabindex="-1">Custom SqlExpression Filter <a class="header-anchor" href="#custom-sqlexpression-filter" aria-hidden="true">#</a></h2><p>The generated SQL from a Typed <code>SqlExpression</code> can also be customized using <code>.WithSqlFilter()</code>, e.g:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> q <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">From</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Table<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">Where</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span> x<span class="token punctuation">.</span>Age <span class="token operator">==</span> <span class="token number">27</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">WithSqlFilter</span><span class="token punctuation">(</span>sql <span class="token operator">=&gt;</span> sql <span class="token operator">+</span> <span class="token string">&quot; option (recompile)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> q <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">From</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Table<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">Where</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span> x<span class="token punctuation">.</span>Age <span class="token operator">==</span> <span class="token number">27</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">WithSqlFilter</span><span class="token punctuation">(</span>sql <span class="token operator">=&gt;</span> sql <span class="token operator">+</span> <span class="token string">&quot; WITH UPDLOCK&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> results <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">Select</span><span class="token punctuation">(</span>q<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="ignoring-dto-properties" tabindex="-1">Ignoring DTO Properties <a class="header-anchor" href="#ignoring-dto-properties" aria-hidden="true">#</a></h2><p>You may use the <code>[Ignore]</code> attribute to denote DTO properties that are not fields in the table. This will force the SQL generation to ignore that property.</p>`,36),o=[e];function c(l,u,k,i,r,d){return a(),n("div",null,o)}var y=s(p,[["render",c]]);export{g as __pageData,y as default};
