import{_ as s,c as e,o as t,a as n,b as a}from"./app.64b20f26.js";const b='{"title":"Creating a WebService from scratch","description":"","frontmatter":{"slug":"create-webservice-from-scratch","title":"Creating a WebService from scratch"},"headers":[{"level":2,"title":"Step 1: Create an application","slug":"step-1-create-an-application"},{"level":2,"title":"Step 2: Install ServiceStack","slug":"step-2-install-servicestack"},{"level":3,"title":"Register ServiceStack Handler","slug":"register-servicestack-handler"},{"level":2,"title":"Step 3: Create your first webservice","slug":"step-3-create-your-first-webservice"},{"level":2,"title":"Step 4: Registering your web services and starting your application","slug":"step-4-registering-your-web-services-and-starting-your-application"},{"level":2,"title":"ServiceStack is now Ready!","slug":"servicestack-is-now-ready"},{"level":2,"title":"Troubleshooting","slug":"troubleshooting"},{"level":2,"title":"Explore ServiceStack Documented Demo","slug":"explore-servicestack-documented-demo"}],"relativePath":"create-webservice-from-scratch.md","lastUpdated":1645506504348}',o={},p=n('',5),c=a("div",{class:"nuget-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[a("div",{class:"flex-grow bg-gray-700"},[a("div",{class:"pl-4 py-1 pb-1.5 align-middle text-lg text-white"},[a("p",null,[a("code",null,'<PackageReference Include="ServiceStack" Version="5.12.0" />')])])]),a("div",{class:"flex"},[a("div",{class:"bg-sky-500 text-white p-1.5 pb-0"},[a("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[a("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),a("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[a("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),r=n(`__VP_STATIC_START__<div class="info custom-block"><p class="custom-block-title">Tip</p><p>You can find an explanation about all NuGet packages which ServiceStack offers <a href="/nuget">here</a>. The package above only adds the binaries, but there also exist some packages which add the required configurations etc</p></div><h3 id="register-servicestack-handler" tabindex="-1">Register ServiceStack Handler <a class="header-anchor" href="#register-servicestack-handler" aria-hidden="true">#</a></h3><p>After you&#39;ve added the binaries, you need to register ServiceStack in <code>web.config</code>:</p><p>If you want to host ServiceStack at root path (<code>/</code>), you should use this configuration:</p><div class="language-xml"><pre><code><span class="token comment">&lt;!-- For IIS 6.0/Mono --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>system.web</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>httpHandlers</span><span class="token punctuation">&gt;</span></span>    
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>add</span> <span class="token attr-name">path</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>*<span class="token punctuation">&quot;</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ServiceStack.HttpHandlerFactory, ServiceStack<span class="token punctuation">&quot;</span></span> <span class="token attr-name">verb</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>*<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>httpHandlers</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>system.web</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- For IIS 7.0+ --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>system.webServer</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>validation</span> <span class="token attr-name">validateIntegratedModeConfiguration</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>false<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>handlers</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>add</span> <span class="token attr-name">path</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>*<span class="token punctuation">&quot;</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ServiceStack.Factory<span class="token punctuation">&quot;</span></span> <span class="token attr-name">preCondition</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>integratedMode<span class="token punctuation">&quot;</span></span> 
         <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ServiceStack.HttpHandlerFactory, ServiceStack<span class="token punctuation">&quot;</span></span> 
         <span class="token attr-name">verb</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>*<span class="token punctuation">&quot;</span></span> <span class="token attr-name">resourceType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Unspecified<span class="token punctuation">&quot;</span></span> <span class="token attr-name">allowPathInfo</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>handlers</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>system.webServer</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><div class="info custom-block"><p class="custom-block-title">Tip</p><p>If you want to host your webservice on a custom path to avoid conflicts with another web framework (eg <a href="http://ASP.Net" target="_blank" rel="noopener noreferrer">ASP.Net</a> MVC), see <a href="/servicestack-side-by-side-with-another-web-framework">Run ServiceStack side-by-side with another web framework</a></p></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Due to limitations in IIS 6 - host <a href="/mvc-integration#enabling-servicestack-in-webconfig">ServiceStack at a /custompath</a> which must end with <code>.ashx</code>, e.g: <code>path=&quot;api.ashx&quot;</code></p></div><h2 id="step-3-create-your-first-webservice" tabindex="-1">Step 3: Create your first webservice <a class="header-anchor" href="#step-3-create-your-first-webservice" aria-hidden="true">#</a></h2><p>If <code>Global.asax.cs</code> doesn&#39;t already exist you have to add it manually. To do this <strong>Right-click</strong> on your project and go <strong>Add -&gt; New Item</strong>, then select the <strong>Global Application</strong> class.</p><p>Each service in ServiceStack consists of three parts:</p><ul><li>Request DTO</li><li>Service implementation</li><li>Response DTO</li></ul><p>That&#39;s the core philosophy in ServiceStack. Each service has a strongly-typed, code-first (normal POCOs) request DTO and response DTO. You can read a detailed explanation what advantages exist if you&#39;re using DTOs in the <a href="https://github.com/ServiceStack/ServiceStack/blob/master/README.md" target="_blank" rel="noopener noreferrer">ReadMe</a> or in [Why should I use ServiceStack?] (/why-servicestack).</p><ol><li>Create the name of your Web Service (i.e. the Request DTO)</li></ol><div class="language-csharp"><pre><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Route</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;/hello&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Route</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;/hello/{Name}&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Hello</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Name <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><ol start="2"><li>Define what your Web Service will return (i.e. Response DTO)</li></ol><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloResponse</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Result <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><ol start="3"><li>Create your Web Service implementation</li></ol><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloService</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Service</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">object</span></span> <span class="token function">Any</span><span class="token punctuation">(</span><span class="token class-name">Hello</span> request<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">HelloResponse</span> <span class="token punctuation">{</span> Result <span class="token operator">=</span> <span class="token string">&quot;Hello, &quot;</span> <span class="token operator">+</span> request<span class="token punctuation">.</span>Name <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre></div><h2 id="step-4-registering-your-web-services-and-starting-your-application" tabindex="-1">Step 4: Registering your web services and starting your application <a class="header-anchor" href="#step-4-registering-your-web-services-and-starting-your-application" aria-hidden="true">#</a></h2><p>The final step is to configure setup to tell ServiceStack where to find your web services. To do that, add this code to your <code>Global.asax.cs</code>:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Global</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>HttpApplication</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AppHost</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">AppHostBase</span></span>
    <span class="token punctuation">{</span>
        <span class="token comment">//Tell ServiceStack the name of your application and where to find your services</span>
        <span class="token keyword">public</span> <span class="token function">AppHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span><span class="token string">&quot;Hello Web Services&quot;</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">HelloService</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Assembly<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Configure</span><span class="token punctuation">(</span><span class="token class-name">Funq<span class="token punctuation">.</span>Container</span> container<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//register any dependencies your services use, e.g:</span>
            <span class="token comment">//container.Register&lt;ICacheClient&gt;(new MemoryCacheClient());</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//Initialize your application singleton</span>
    <span class="token keyword">protected</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Application_Start</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">new</span> <span class="token constructor-invocation class-name">AppHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Done! You now have a working application \u{1F603}</p><p>As you can see, you have created an <code>AppHost</code>. Mainly all configuration related to ServiceStack is made in the <code>AppHost</code>. It&#39;s the starting point in your application.</p><h4 id="disable-webapi-from-the-default-mvc4-vs-net-template" tabindex="-1">Disable WebApi from the default MVC4 <a href="http://VS.NET" target="_blank" rel="noopener noreferrer">VS.NET</a> template <a class="header-anchor" href="#disable-webapi-from-the-default-mvc4-vs-net-template" aria-hidden="true">#</a></h4><p>If you are using MVC4 then you need to comment line in global.asax.cs to disable WebApi</p><div class="language-cs"><pre><code><span class="token comment">//WebApiConfig.Register(GlobalConfiguration.Configuration);</span>
</code></pre></div><h2 id="servicestack-is-now-ready" tabindex="-1">ServiceStack is now Ready! <a class="header-anchor" href="#servicestack-is-now-ready" aria-hidden="true">#</a></h2><p>Now that you have a working Web Service lets see what ServiceStack does for you out of the box:</p><p>If everything is configured correctly you can go to <code>http://&lt;root_path&gt;/metadata</code> to see a list of your web services and the various end points its available on.</p><p><img src="https://raw.githubusercontent.com/ServiceStack/Assets/master/img/wikis/metadata-chat.png" alt="Metadata page"></p><div class="info custom-block"><p class="custom-block-title">Tip</p><p>In the screenshot the root path is <code>http://localhost/ServiceStack.Hello/servicestack</code>. On your development box the root path might be something like <code>http://localhost:60335</code> (ie the URL on which your webservice is hosted).</p></div><p>Let&#39;s access the HelloWorld service you created in your browser, so write the following URL in your address bar:</p><div class="language-"><pre><code>GET http://&lt;root_path&gt;/hello/YourName
</code></pre></div><blockquote><p>E.g. <a href="http://example.org/hello/Max" target="_blank" rel="noopener noreferrer">http://example.org/hello/Max</a></p></blockquote><p>As you can see after clicking on this link, ServiceStack also contains a HTML response format, which makes the XML/Json (...) output human-readable. To change the return format to Json, simply add <code>?format=json</code> to the end of the URL. You&#39;ll learn more about formats, endpoints (URLs, etc) when you continue reading the documentation.</p><h2 id="troubleshooting" tabindex="-1">Troubleshooting <a class="header-anchor" href="#troubleshooting" aria-hidden="true">#</a></h2><p>If you happen to generate requests from the wsdls with a tool like soapUI you may end up with an incorrectly generated request like this:</p><div class="language-xml"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">soap:</span>Envelope</span> <span class="token attr-name"><span class="token namespace">xmlns:</span>soap</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://www.w3.org/2003/05/soap-envelope<span class="token punctuation">&quot;</span></span> <span class="token attr-name"><span class="token namespace">xmlns:</span>typ</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://schemas.servicestack.net/types<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">soap:</span>Header</span><span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">soap:</span>Body</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">typ:</span>Hello</span><span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">soap:</span>Body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">soap:</span>Envelope</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>You can resolve this issue by adding the following line to your AssemblyInfo file</p><div class="language-csharp"><pre><code><span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">ContractNamespace</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;http://schemas.servicestack.net/types&quot;</span><span class="token punctuation">,</span> 
           ClrNamespace <span class="token operator">=</span> <span class="token string">&quot;&lt;YOUR NAMESPACE&gt;&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
</code></pre></div><p>Rebuild and regenerate the request from the updated wsdl. You should get a correct request this time.</p><div class="language-xml"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">soap:</span>Envelope</span> <span class="token attr-name"><span class="token namespace">xmlns:</span>soap</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://www.w3.org/2003/05/soap-envelope<span class="token punctuation">&quot;</span></span> <span class="token attr-name"><span class="token namespace">xmlns:</span>typ</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://schemas.servicestack.net/types<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">soap:</span>Header</span><span class="token punctuation">/&gt;</span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">soap:</span>Body</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">typ:</span>Hello</span><span class="token punctuation">&gt;</span></span>
         <span class="token comment">&lt;!--Optional:--&gt;</span>
         <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">typ:</span>Name</span><span class="token punctuation">&gt;</span></span>?<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">typ:</span>Name</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">typ:</span>Hello</span><span class="token punctuation">&gt;</span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">soap:</span>Body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">soap:</span>Envelope</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h2 id="explore-servicestack-documented-demo" tabindex="-1">Explore ServiceStack Documented Demo <a class="header-anchor" href="#explore-servicestack-documented-demo" aria-hidden="true">#</a></h2><p>The <a href="https://github.com/ServiceStackApps/EmailContacts/" target="_blank" rel="noopener noreferrer">EmailContacts solution</a> is a new guidance available that walks through the recommended setup and physical layout structure of typical medium-sized ServiceStack projects, including complete documentation of how to create the solution from scratch, whilst explaining all the ServiceStack features it makes use of along the way.</p><h1 id="community-resources" tabindex="-1">Community Resources <a class="header-anchor" href="#community-resources" aria-hidden="true">#</a></h1><ul><li><a href="http://shashijeevan.net/2015/09/20/creating-a-simple-service-using-servicestack/" target="_blank" rel="noopener noreferrer">Creating A Simple Service Using ServiceStack</a> by <a href="http://shashijeevan.net/author/shashijeevan/" target="_blank" rel="noopener noreferrer">Shashi Jeevan</a></li><li><a href="http://www.dotnetcurry.com/showarticle.aspx?ID=1056" target="_blank" rel="noopener noreferrer">Introducing ServiceStack</a> by <a href="https://twitter.com/DotNetCurry" target="_blank" rel="noopener noreferrer">@dotnetcurry</a></li><li><a href="http://www.techrepublic.com/article/create-web-services-in-net-in-a-snap-with-servicestack/" target="_blank" rel="noopener noreferrer">Create web services in .NET in a snap with ServiceStack</a> by <a href="https://twitter.com/techrepublic" target="_blank" rel="noopener noreferrer">@techrepublic</a></li><li><a href="http://kborra.wordpress.com/2014/07/29/how-to-build-web-services-in-ms-net-using-service-stack/" target="_blank" rel="noopener noreferrer">How to build web services in MS.Net using ServiceStack</a> by <a href="http://kborra.wordpress.com/about/" target="_blank" rel="noopener noreferrer">@kishoreborra</a></li><li><a href="http://dilanperera.wordpress.com/2014/02/22/getting-started-with-servicestack-creating-a-service/" target="_blank" rel="noopener noreferrer">Getting started with ServiceStack \u2013 Creating a service</a></li><li><a href="http://nilsnaegele.com/codeedge/servicestack.html" target="_blank" rel="noopener noreferrer">Fantastic Step-by-step walk-thru into ServiceStack with Screenshots!</a> by <a href="https://twitter.com/nilsnagele" target="_blank" rel="noopener noreferrer">@nilsnagele</a></li><li><a href="http://tech.pro/tutorial/1148/your-first-rest-service-with-servicestack" target="_blank" rel="noopener noreferrer">Your first REST service with ServiceStack</a> by <a href="https://twitter.com/cyberzeddk" target="_blank" rel="noopener noreferrer">@cyberzeddk</a></li><li><a href="http://blog.pluralsight.com/2012/11/29/new-course-using-servicestack-to-build-apis/" target="_blank" rel="noopener noreferrer">New course: Using ServiceStack to Build APIs</a> by <a href="http://twitter.com/pluralsight" target="_blank" rel="noopener noreferrer">@pluralsight</a></li><li><a href="http://tonyonsoftware.blogspot.co.uk/2012/09/lessons-learned-whilst-using.html" target="_blank" rel="noopener noreferrer">ServiceStack the way I like it</a> by <a href="https://twitter.com/tonydenyer" target="_blank" rel="noopener noreferrer">@tonydenyer</a></li><li><a href="http://www.mattjcowan.com/funcoding/2013/03/10/rest-api-with-llblgen-and-servicestack/" target="_blank" rel="noopener noreferrer">Generating a RESTful Api and UI from a database with LLBLGen</a> by <a href="https://twitter.com/mattjcowan" target="_blank" rel="noopener noreferrer">@mattjcowan</a></li><li><a href="http://korneliuk.blogspot.com/2012/08/servicestack-reusing-dtos.html" target="_blank" rel="noopener noreferrer">ServiceStack: Reusing DTOs</a> by <a href="https://twitter.com/korneliuk" target="_blank" rel="noopener noreferrer">@korneliuk</a></li><li><a href="http://blogs.lessthandot.com/index.php/WebDev/ServerProgramming/servicestack-restservice-and-easyhttp" target="_blank" rel="noopener noreferrer">ServiceStack, Rest Service and EasyHttp</a> by <a href="https://twitter.com/chrissie1" target="_blank" rel="noopener noreferrer">@chrissie1</a></li><li><a href="http://www.mattjcowan.com/funcoding/2012/05/04/building-a-web-api-in-sharepoint-2010-with-servicestack" target="_blank" rel="noopener noreferrer">Building a Web API in SharePoint 2010 with ServiceStack</a></li><li><a href="http://paymentnetworks.wordpress.com/2012/04/24/jquerymobile-and-service-stack-eventsmanager-tutorial-post-3/" target="_blank" rel="noopener noreferrer">JQueryMobile and ServiceStack: EventsManager tutorial part #3</a> by Kyle Hodgson</li><li><a href="http://dgondotnet.blogspot.de/2012/04/rest-raiding-servicestack.html" target="_blank" rel="noopener noreferrer">REST Raiding. ServiceStack</a> by <a href="http://www.blogger.com/profile/13468563783321963413" target="_blank" rel="noopener noreferrer">Daniel Gonzalez</a></li><li><a href="http://kylehodgson.com/2012/04/21/jquerymobile-and-service-stack-eventsmanager-tutorial-post-2/" target="_blank" rel="noopener noreferrer">JQueryMobile and ServiceStack: EventsManager tutorial</a> / <a href="http://kylehodgson.com/2012/04/23/jquerymobile-and-service-stack-eventsmanager-tutorial-post-3/" target="_blank" rel="noopener noreferrer">Part 3</a> by Kyle Hodgson</li><li><a href="http://kylehodgson.com/2012/04/18/like-wcf-only-cleaner-9/" target="_blank" rel="noopener noreferrer">Like WCF: Only cleaner!</a> by Kyle Hodgson</li><li><a href="http://codealoc.wordpress.com/2012/03/24/service-stack-vs-wcf-data-services/" target="_blank" rel="noopener noreferrer">ServiceStack vs WCF Data Services</a></li><li><a href="http://www.curlette.com/?p=161" target="_blank" rel="noopener noreferrer">Buildi\uF729ng a Tridion WebService with jQuery and ServiceStack</a> by <a href="https://twitter.com/robrtc" target="_blank" rel="noopener noreferrer">@robrtc</a></li><li><a href="http://www.ienablemuch.com/2012/05/anonymous-type-dynamic-servicestack.html" target="_blank" rel="noopener noreferrer">Anonymous type + Dynamic + ServiceStack == Consuming cloud has never been easier</a> by <a href="https://twitter.com/ienablemuch" target="_blank" rel="noopener noreferrer">@ienablemuch</a></li><li><a href="https://github.com/jfoshee/TryServiceStack" target="_blank" rel="noopener noreferrer">Handful of examples of using ServiceStack based on the ServiceStack.Hello Tutorial</a> by <a href="https://twitter.com/82unpluggd" target="_blank" rel="noopener noreferrer">@82unpluggd</a></li></ul>__VP_STATIC_END__`,46),l=[p,c,r];function i(u,k,h,d,g,m){return t(),e("div",null,l)}var y=s(o,[["render",i]]);export{b as __pageData,y as default};
