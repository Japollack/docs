import{_ as e,c as a,o as t,a as n}from"./app.64b20f26.js";const m=`{"title":"Complexity, Services and Role of DTOs","description":"","frontmatter":{"title":"Complexity, Services and Role of DTOs","slug":"service-complexity-and-dto-roles"},"headers":[{"level":2,"title":"Software's biggest enemy","slug":"software-s-biggest-enemy"},{"level":3,"title":"Avoid blanket rules","slug":"avoid-blanket-rules"},{"level":3,"title":"Be wary of invalid Rules and Patterns","slug":"be-wary-of-invalid-rules-and-patterns"},{"level":2,"title":"The Simple POCO Life","slug":"the-simple-poco-life"},{"level":3,"title":"Heavy ORM models are poor DTOs","slug":"heavy-orm-models-are-poor-dtos"},{"level":3,"title":"Clean POCOs","slug":"clean-pocos"},{"level":2,"title":"Data Transfer Objects - DTOs","slug":"data-transfer-objects-dtos"},{"level":2,"title":"Services","slug":"services"},{"level":3,"title":"Parallel Client development","slug":"parallel-client-development"},{"level":3,"title":"Request and Response DTOs","slug":"request-and-response-dtos"}],"relativePath":"service-complexity-and-dto-roles.md","lastUpdated":1645506505300}`,s={},o=n(`<p>The Software world has an overload of contrasting and competing knowledge that it can be daunting to know how to develop software, what tools and patterns we should use, which technical literature we should follow and when and how we should adopt patterns. The overarching theme that has served us well over the years is a relentless pursuit for simplicity and seeking out the simplest solutions, with minimal abstractions, concepts that best solves any given problem.</p><p>Since its inception in 2008, this philosophy has helped ServiceStack become the worlds most versatile Services Framework - supporting an unparalleled number of <a href="/why-servicestack#multiple-pluggable-formats">Pluggable Formats</a>, multitude of <a href="/why-servicestack#multiple-endpoints">HTTP, SOAP and MQ Endpoints</a> that can be hosted in a <a href="/why-servicestack#multiple-hosting-options">variety of hosting scenarios</a> whilst providing a productive succinct, end-to-end Typed API for the most popular <a href="https://docs.servicestack.net/add-servicestack-reference" target="_blank" rel="noopener noreferrer">native Mobile and Desktop</a> and <a href="https://github.com/ServiceStackApps/HelloMobile#client-applications" target="_blank" rel="noopener noreferrer">.NET platforms</a>. In the time other vendors have left a <a href="/advantages-of-message-based-web-services#the-many-webservice-frameworks-of-microsoft">number of abandoned frameworks</a> and failed HTTP abstractions behind for their next framework rewrite, ServiceStack has managed to stay lean, fast and continually enhance and evolve its single code-base to support every major HTTP Host delivered with .NET with an order of magnitude less resources. This is only achievable due to our relentness pursuit of simplicity, focus on underlying value, <a href="/architecture-overview">rewriting friction-encumbered providers</a> whilst actively rejecting <a href="https://www.infoq.com/articles/interview-servicestack" target="_blank" rel="noopener noreferrer">unnecessary complexity and abstractions</a> and slow <a href="/why-not-odata">bloated technologies promoting well-known anti-patterns</a> whose resulting value does not justify the level of investment and effort required to adopt it. We hope our experience can provide valuable insight and help with deciding what areas to focus on and which to avoid.</p><h2 id="software-s-biggest-enemy" tabindex="-1">Software&#39;s biggest enemy <a class="header-anchor" href="#software-s-biggest-enemy" aria-hidden="true">#</a></h2><p>We consider <a href="http://steve-yegge.blogspot.com/2007/12/codes-worst-enemy.html" target="_blank" rel="noopener noreferrer">Complexity and Large Code bases</a> the <strong>single worst enemy</strong> of software development, and that along with meeting the project requirements and deriving value from our software, managing complexity and maintaining a minimal and low friction, evolvable code-base should be at the forefront of our minds as we&#39;re continually enhancing our software with new features and requirements. Any guidelines, rules or processes we add to increase software quality should be directly focused on managing its essential complexity. One of the best things we can do to reduce complexity is to reduce code-base size, i.e. DRYing repeatable code and eliminating any unnecessary abstractions, indirection, concepts, types and friction that isn&#39;t absolutely essential to the software&#39;s function.</p><p>In this light, <a href="https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it" target="_blank" rel="noopener noreferrer">YAGNI</a> is one of the best principles to follow to ensure a simple and lean code-base by focusing on what&#39;s essential to delivering value.</p><h3 id="avoid-blanket-rules" tabindex="-1">Avoid blanket rules <a class="header-anchor" href="#avoid-blanket-rules" aria-hidden="true">#</a></h3><p>We recommend avoiding &quot;blanket rules&quot; which we consider one of the primary causes of unnecessary complexity in Software, where it&#39;s often liberally and thoughtlessly applied, infecting a code-base without justification. Every time you impose an artificial limitation, you&#39;re creating friction and inertia to develop within its bounds in order to satisfy it, which is why any rule you enforce should be thoughtfully and carefully applied and limited to places where it adds value.</p><h3 id="be-wary-of-invalid-rules-and-patterns" tabindex="-1">Be wary of invalid Rules and Patterns <a class="header-anchor" href="#be-wary-of-invalid-rules-and-patterns" aria-hidden="true">#</a></h3><p>Even Software Design Patterns are in many cases <a href="http://c2.com/cgi/wiki?AreDesignPatternsMissingLanguageFeatures" target="_blank" rel="noopener noreferrer">programming language deficiencies</a>, where what&#39;s a useful in one language is unnecessary and more elegantly solved in more expressive and powerful languages. Likewise with &quot;rules&quot;, what&#39;s a cautionary guideline in one domain may not be applicable in others. Therefore what&#39;s more important than &quot;the rule&quot; itself, is the value it actually provides and what concrete side-effect it&#39;s trying to prevent. Once we understand its true value, we can optimize to derive maximum value from it and together with YAGNI, know when to selectively apply it.</p><h2 id="the-simple-poco-life" tabindex="-1">The Simple POCO Life <a class="header-anchor" href="#the-simple-poco-life" aria-hidden="true">#</a></h2><p>ServiceStack achieves a lot of its simplicity and reuse by being able to reuse the same POCOs indiscriminately anywhere to interface and freely communicate between its different libraries and components. This enables maximum value and reuse of your Models and reduces the friction in mapping between different domains which typically require having purpose-specific types, each with its own unique configuration limiting its applicability and potential re-use.</p><h3 id="heavy-orm-models-are-poor-dtos" tabindex="-1">Heavy ORM models are poor DTOs <a class="header-anchor" href="#heavy-orm-models-are-poor-dtos" aria-hidden="true">#</a></h3><p>Not reusing data models as DTOs applies to Heavy ORM&#39;s which encourage Data Models with cyclical dependencies and proxied objects with tight coupling and embedded logic that can trigger unintended N+1 data access, making these models poor candidates for use as DTOs and why you should always copy them into purpose-specific DTOs that your Services can return so they&#39;re serializable without issue.</p><h3 id="clean-pocos" tabindex="-1">Clean POCOs <a class="header-anchor" href="#clean-pocos" aria-hidden="true">#</a></h3><p>The complex Data Models stored in <a href="https://github.com/ServiceStack/ServiceStack.OrmLite" target="_blank" rel="noopener noreferrer">OrmLite</a> or <a href="https://github.com/ServiceStack/ServiceStack.Redis" target="_blank" rel="noopener noreferrer">Redis</a> doesn&#39;t suffer from any of these issues which are able to use clean, disconnected POCOs. They&#39;re loosely-coupled, where only the &quot;Shape&quot; of the POCO is significant, i.e. moving projects and changing namespaces won&#39;t impact serialization, how it&#39;s stored in RDBMS tables, Redis data structures, Caching providers, etc. You&#39;re also not coupled to specific types, you can use a different type to insert data in OrmLite than what you use to read from it, nor does it need to be the &quot;exact Shape&quot;, as OrmLite can populate a DTO with only a subset of the fields available in the underlying table. There&#39;s also no distinction between Table, View or Stored procedure, OrmLite will happily map any result-set into any matching fields on the specified POCO, ignoring others.</p><p>Effectively this means POCOs in ServiceStack are extremely resilient and interoperable, so you can happily re-use the same DTOs in OrmLite and vice-versa without issue. If the DTO and Data models only deviate slightly, you can <a href="https://stackoverflow.com/a/14859968/85785" target="_blank" rel="noopener noreferrer">hide them from being serialized</a> or stored in OrmLite with the attributes below:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Poco</span>
<span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Ignore</span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> IgnoreInOrmLite <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">IgnoreDataMember</span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> IgnoreInSerialization <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Otherwise when you need to separate them, e.g. more fields were added to the RDBMS table than you want to return, the DTO includes additional fields populated from alternative sources, or you just want your Services to project them differently. At that point (YAGNI) you can take a copy of the DTO and add it to your Services Implementation so they can grow separately, unimpeded by their different concerns. You can then effortlessly convert between them using<br><a href="https://github.com/ServiceStack/ServiceStack/wiki/Auto-mapping" target="_blank" rel="noopener noreferrer">ServiceStack&#39;s built-in Auto Mapping</a>, e.g:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> dto <span class="token operator">=</span> dbPoco<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">ConvertTo</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Poco<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>The built-in Auto Mapping is also very tolerant and can co-erce properties with different types, e.g. to/from strings, different collection types, etc</p></div><h2 id="data-transfer-objects-dtos" tabindex="-1">Data Transfer Objects - DTOs <a class="header-anchor" href="#data-transfer-objects-dtos" aria-hidden="true">#</a></h2><p>So if you&#39;re using clean, serializable POCOs without external dependencies (e.g. from OrmLite, Redis or alt ServiceStack sources) you can happily re-use them as DTOs and freely refactor them out into different models as-and-when you need to. But when you are re-using Data Models as DTOs they should still be maintained in the <strong>ServiceModel</strong> project (aka DTO .dll) which should contain <strong>all the types</strong> that your Service returns. DTOs should be logic and dependency-free so the only dependency the ServiceModel project references is the impl-free <code>ServiceStack.Interfaces.dll</code> which as it&#39;s a .NET v4.5 and .NET Standard 2.0 .dll, can be freely referenced from all <a href="https://github.com/ServiceStackApps/HelloMobile" target="_blank" rel="noopener noreferrer">.NET Mobile and Desktop platforms</a>.</p><p>You want to ensure all types your Services return are in the DTO .dll since this, along with the base url of where your Services are hosted is <strong>all that&#39;s required</strong> for your Service Consumers to know in order to consume your Services. Which they can use with any of the <a href="/csharp-client">.NET Service Clients</a> to get an end-to-end Typed API without code-gen, tooling or any other artificial machinery. If clients prefer source code instead, they can use <a href="/add-servicestack-reference">Add ServiceStack Reference</a> to access the Servers typed DTOs in their preferred platform and language of choice.</p><h2 id="services" tabindex="-1">Services <a class="header-anchor" href="#services" aria-hidden="true">#</a></h2><p>Services are the ultimate form of encapsulating complexity and offers the highest level of software reuse. They package its capabilities and makes them available remotely to your consumers with never any more complexity than the cost of a Service call. They&#39;re also a vital tool in managing the complexity of large systems which when modelled correctly are able to divide Monoliths into cohesive, reusable and composable functionality at a macro-level.</p><p><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/dtos-role.png" alt="DTO Interface vs Service Implementation"></p><p>The DTOs are what defines your Services contract, keeping them isolated from any Server implementation is how your Service is able to encapsulate its capabilities (which can be of unbounded complexity) and make them available behind a remote facade. It separates what your Service provides from the complexity in how it realizes it. It defines the API for your Service and tells Service Consumers the minimum info they need to know to discover what functionality your Services provide and how to consume them (maintaining a similar role to Header files in C/C++ source code). Well-defined Service contracts decoupled from implementation, enforces interoperability ensuring that your Services don&#39;t mandate specific client implementations, ensuring they can be consumed by any HTTP Client on any platform. DTOs also define the shape and structure of your Services wire-format, ensuring they can be cleanly deserialized into native data structures, eliminating the effort in manually parsing Service Responses.</p><h3 id="parallel-client-development" tabindex="-1">Parallel Client development <a class="header-anchor" href="#parallel-client-development" aria-hidden="true">#</a></h3><p>Since they capture the entire contract it also enables clients to develop their applications before the Services are implemented as they&#39;re able to bind their application to its concrete DTO models and can easily mock their Service client to return test data until the back-end Services are implemented.</p><p>As far as rules go, ensuring a well-defined Service Contract (DTOs) decoupled from its implementation goes to the very essence of what a Service is and the value it provides.</p><h3 id="request-and-response-dtos" tabindex="-1">Request and Response DTOs <a class="header-anchor" href="#request-and-response-dtos" aria-hidden="true">#</a></h3><p>As for which DTOs make good candidates for re-use as Data Models, you don&#39;t want to use <strong>Request DTOs</strong> for anything other than defining your external Services API which is typically a <strong>Verb</strong> that&#39;s ideally <a href="https://stackoverflow.com/a/15941229/85785" target="_blank" rel="noopener noreferrer">grouped by Call Semantics and Response Types</a>, e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SearchProducts</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IReturn<span class="token punctuation">&lt;</span>SearchProductsResponse<span class="token punctuation">&gt;</span></span></span> 
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Category <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">decimal</span><span class="token punctuation">?</span></span> PriceGreaterThan <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Your RDBMS tables are normally entities defined as <strong>Nouns</strong>, i.e. what your Service returns:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SearchProductsResponse</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">List<span class="token punctuation">&lt;</span>Product<span class="token punctuation">&gt;</span></span> Results <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>        
    <span class="token keyword">public</span> <span class="token return-type class-name">ResponseStatus</span> ResponseStatus <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Even the containing <strong>Response DTO</strong> which defines what your Service returns isn&#39;t a good candidate for re-use as a Data Model. I&#39;d typically use discrete DTOs for Service Responses as it allows freely extending existing Services to return extra data or metadata without breaking existing clients.</p><p>Other than the Request and Response DTOs, all other the <strong>Types</strong> that your Service returns would be candidates for re-use as Data Models, keeping them in the <strong>ServiceModel</strong> project for the reasons above.</p>`,37),r=[o];function i(l,c,p,d,u,h){return t(),a("div",null,r)}var y=e(s,[["render",i]]);export{m as __pageData,y as default};
