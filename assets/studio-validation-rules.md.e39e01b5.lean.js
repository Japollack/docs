import{_ as a,c as n,o as s,a as t}from"./app.64b20f26.js";const g='{"title":"Studio - Validation Rules","description":"","frontmatter":{"slug":"studio-validation-rules","title":"Studio - Validation Rules"},"headers":[{"level":2,"title":"DB Validation UI","slug":"db-validation-ui"},{"level":3,"title":"Verified Rules","slug":"verified-rules"},{"level":3,"title":"Metadata App Export / Discovery","slug":"metadata-app-export-discovery"}],"relativePath":"studio-validation-rules.md","lastUpdated":1645506505304}',e={},o=t(`__VP_STATIC_START__<p>As an <strong>Admin</strong> you have access to the <a href="https://forums.servicestack.net/t/autocrud-preview/8298/29?u=mythz" target="_blank" rel="noopener noreferrer">DB Validation Source</a> Admin UI which will let you add declarative Type and Property Validators for each Request DTO in Studio. This is enabled in NorthwindCrud in <a href="https://github.com/NetCoreApps/NorthwindCrud/blob/master/Configure.Validation.cs" target="_blank" rel="noopener noreferrer">Configure.Validation.cs</a>:</p><div class="language-csharp"><pre><code><span class="token comment">// Add support for dynamically generated db rules</span>
services<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">AddSingleton</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IValidationSource<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>c <span class="token operator">=&gt;</span> 
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">OrmLiteValidationSource</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Resolve</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IDbConnectionFactory<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//...</span>
appHost<span class="token punctuation">.</span>Plugins<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ValidationFeature</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
appHost<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Resolve</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IValidationSource<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">InitSchema</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>Management of this feature is limited to users in the <code>ValidationFeature.AccessRole</code> (default: <strong>Admin</strong>)</p></div><h2 id="db-validation-ui" tabindex="-1">DB Validation UI <a class="header-anchor" href="#db-validation-ui" aria-hidden="true">#</a></h2><p>Clicking on the Validation <strong>Lock Icon</strong> on the top right will take you to the Validation Editor for that AutoQuery Request DTO which will include quick links to jump to different AutoQuery/Crud Services for the same Data Model.</p><p>In the validation editor you&#39;ll be able to create <strong>Type</strong> and <strong>Property</strong> Validation Rules that either make use of an existing <strong>Validator</strong> or you can enter a custom <code>#Script</code> expression that must validate to <code>true</code>. The Validator UI is smart and will list all built-in and Custom Script Methods returning <code>ITypeValidator</code> or <code>IPropertyValidator</code> that&#39;s registered in the remote instance. The pre-defined list of validators are displayed in a list of &quot;quick pick&quot; buttons that enables fast adding/editing of validation rules.</p><h3 id="verified-rules" tabindex="-1">Verified Rules <a class="header-anchor" href="#verified-rules" aria-hidden="true">#</a></h3><p>The <code>ModifyValidationRules</code> Service that Studio calls performs a lot of validation to ensure the Validation rule is accurate including executing the validator to make sure it returns the appropriate validator type and checking the syntax on any <strong>Script</strong> validation rules to ensure it&#39;s valid.</p><p><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/release-notes/v5.9/studio-validator-property.png" alt=""></p><p><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/release-notes/v5.9/studio-db-validators.png" alt=""></p><p>The <code>ModifyValidationRules</code> back-end Service also takes care of invalidating the validation rule cache so that any saved Validators are immediately applied.</p><p>Despite being sourced from a DB, after the first access the validation rules are cached in memory where they&#39;d have similar performance to validators declaratively added on Request DTOs in code.</p><p>After you add your validation rules you will be able to click the <strong>AutoQuery</strong> icon on the top right to return to the AutoQuery editor. Be mindful of what Validation Rule you&#39;re adding to which DTO, e.g. a validation rule added to <strong>CreateCategory</strong> Service will only be applied to that Service which is used when creating entities, e,g. not for full entity or partial field updates.</p><p><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/release-notes/v5.9/studio-validators-create.png" alt=""></p><h3 id="metadata-app-export-discovery" tabindex="-1">Metadata App Export / Discovery <a class="header-anchor" href="#metadata-app-export-discovery" aria-hidden="true">#</a></h3><p>The way a generic capability-based Admin UI&#39;s like Studio is possible is via the <code>/metadata/app</code> API descriptor which describes what plugins and features are enabled on the remote ServiceStack instance. All built-in plugins which provide functionality that can be remotely accessed add their info to the App&#39;s metadata.</p><p>This functionality is also available to your own plugins should you wish to attach info about your plugin where you can use the <code>AddToAppMetadata</code> extension method to return a populated <code>CustomPlugin</code> DTO describing the features made available by your plugin:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyPlugin</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IPlugin</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Register</span><span class="token punctuation">(</span><span class="token class-name">IAppHost</span> appHost<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        appHost<span class="token punctuation">.</span><span class="token function">AddToAppMetadata</span><span class="token punctuation">(</span>meta <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            meta<span class="token punctuation">.</span>CustomPlugins<span class="token punctuation">[</span><span class="token keyword">nameof</span><span class="token punctuation">(</span>MyPlugin<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CustomPlugin</span> <span class="token punctuation">{</span>
                AccessRole <span class="token operator">=</span> RoleNames<span class="token punctuation">.</span>AllowAnyUser<span class="token punctuation">,</span>                   <span class="token comment">// Required Role to access Services</span>
                ServiceRoutes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Dictionary<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> <span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
                    <span class="token punctuation">{</span> <span class="token keyword">nameof</span><span class="token punctuation">(</span>MyPluginService<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;/myplugin/{Id}&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Available Plugin Services</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                Enabled <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span> <span class="token string">&quot;feature1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;feature2&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// What plugin features are enabled</span>
                Meta <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Dictionary<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> <span class="token keyword">string</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
                    <span class="token punctuation">[</span><span class="token string">&quot;custom&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;meta&quot;</span> <span class="token comment">// additional custom metadata you want returned for this plugin</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>__VP_STATIC_END__`,18),p=[o];function c(i,l,u,r,d,k){return s(),n("div",null,p)}var m=a(e,[["render",c]]);export{g as __pageData,m as default};
