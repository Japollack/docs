import{_ as a,c as s,o as t,a as n,b as e}from"./app.64b20f26.js";const S=`{"title":"v4.0.24 Release Notes","description":"","frontmatter":{"title":"v4.0.24 Release Notes","slug":"v4-0-24"},"headers":[{"level":2,"title":"Server Events","slug":"server-events"},{"level":3,"title":"Registering","slug":"registering"},{"level":3,"title":"ServiceStack Chat (beta)","slug":"servicestack-chat-beta"},{"level":3,"title":"Remote control","slug":"remote-control"},{"level":2,"title":"ServiceStackVS - ServiceStack's VS.NET Extension","slug":"servicestackvs-servicestack-s-vs-net-extension"},{"level":3,"title":"Get the Learning AngularJS for .NET Developers Book!","slug":"get-the-learning-angularjs-for-net-developers-book"},{"level":3,"title":"Download ServiceStackVS","slug":"download-servicestackvs"},{"level":3,"title":"VS.NET 2012 Prerequisites","slug":"vs-net-2012-prerequisites"},{"level":3,"title":"Feedback","slug":"feedback"},{"level":2,"title":"Authentication","slug":"authentication"},{"level":3,"title":"Saving User Profile Images","slug":"saving-user-profile-images"},{"level":3,"title":"New IAuthMetadataProvider","slug":"new-iauthmetadataprovider"},{"level":3,"title":"Saving OAuth Metadata","slug":"saving-oauth-metadata"},{"level":2,"title":"OrmLite","slug":"ormlite"},{"level":3,"title":"Loading of References in Multi-Select Queries","slug":"loading-of-references-in-multi-select-queries"},{"level":3,"title":"Self References","slug":"self-references"},{"level":3,"title":"Support Foreign Key Attributes to specify Reference Fields","slug":"support-foreign-key-attributes-to-specify-reference-fields"},{"level":3,"title":"Support for Stored Procedures with out params","slug":"support-for-stored-procedures-with-out-params"},{"level":3,"title":"Minor OrmLite Features","slug":"minor-ormlite-features"},{"level":2,"title":"AutoQuery","slug":"autoquery"},{"level":3,"title":"Support for loading References","slug":"support-for-loading-references"},{"level":3,"title":"Improved OrderBy","slug":"improved-orderby"},{"level":2,"title":"ServiceStack.Text","slug":"servicestack-text"},{"level":2,"title":"Other Features","slug":"other-features"}],"relativePath":"releases/v4_0_24.md","lastUpdated":1645506505284}`,o={},r=n(`__VP_STATIC_START__<h2 id="server-events" tabindex="-1"><a href="https://github.com/ServiceStackApps/Chat" target="_blank" rel="noopener noreferrer">Server Events</a> <a class="header-anchor" href="#server-events" aria-hidden="true">#</a></h2><p>In keeping with our quest to provide a simple, lean and deep integrated technology stack for all your web framework needs we&#39;ve added support in this release for Server push communications with our initial support for <a href="http://www.html5rocks.com/en/tutorials/eventsource/basics/" target="_blank" rel="noopener noreferrer">Server Sent Events</a>.</p><p><a href="http://www.html5rocks.com/en/tutorials/eventsource/basics/" target="_blank" rel="noopener noreferrer">Server Sent Events</a> (SSE) is an elegant <a href="http://dev.w3.org/html5/eventsource/" target="_blank" rel="noopener noreferrer">web technology</a> for efficiently receiving push notifications from any HTTP Server. It can be thought of as a mix between long polling and one-way WebSockets and contains many benefits over each:</p><ul><li><strong>Simple</strong> - Server Sent Events is just a single long-lived HTTP Request that any HTTP Server and Web Framework can support</li><li><strong>Efficient</strong> - Each client uses a single TCP connection and each message avoids the overhead of HTTP Connections and Headers that&#39;s <a href="http://matthiasnehlsen.com/blog/2013/05/01/server-sent-events-vs-websockets/" target="_blank" rel="noopener noreferrer">often faster than Web Sockets</a>.</li><li><strong>Resilient</strong> - Browsers automatically detect when a connection is broken and automatically reconnects</li><li><strong>Interoperable</strong> - As it&#39;s just plain-old HTTP, it&#39;s introspectable with your favorite HTTP Tools and even works through HTTP proxies (with buffering and checked-encoding off).</li><li><strong>Well Supported</strong> - As a Web Standard it&#39;s supported in all major browsers except for IE which <a href="http://html5doctor.com/server-sent-events/#yaffle" target="_blank" rel="noopener noreferrer">can be enabled with polyfills</a>.</li></ul><p>Server Events provides a number of API&#39;s that allow sending messages to:</p><ul><li>All Users</li><li>All Users subscribed to a channel</li><li>A Single Users Subscription</li></ul><p>It also includes deep integration with ServiceStack&#39;s <a href="/sessions">Sessions</a> and <a href="/authentication-and-authorization">Authentication Providers</a> which also sending messages to uses using either:</p><ul><li>UserAuthId</li><li>UserName</li><li>Permanent Session Id (ss-pid)</li></ul><h3 id="registering" tabindex="-1">Registering <a class="header-anchor" href="#registering" aria-hidden="true">#</a></h3><p>List most other <a href="/plugins">modular functionality</a> in ServiceStack, Server Sent Events is encapsulated in a single Plugin that can be registered in your AppHost with:</p><div class="language-csharp"><pre><code>Plugins<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ServerEventsFeature</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="servicestack-chat-beta" tabindex="-1"><a href="https://github.com/ServiceStackApps/Chat" target="_blank" rel="noopener noreferrer">ServiceStack Chat (beta)</a> <a class="header-anchor" href="#servicestack-chat-beta" aria-hidden="true">#</a></h3><p><a href="https://github.com/ServiceStackApps/Chat" target="_blank" rel="noopener noreferrer"><img src="https://raw.githubusercontent.com/ServiceStack/Assets/master/img/apps/Chat/chat-overview.gif" alt="Chat Overview"></a></p><p>To demonstrate how to make use Server Events we&#39;ve created a cursory Chat web app for showcasing server push notifications packed with a number of features including:</p><ul><li>Anonymous or Authenticated access with Twitter, Facebook or GitHub OAuth</li><li>Joining any arbitrary user-defined channel</li><li>Private messaging</li><li>Command history</li><li>Autocomplete of user names</li><li>Highlighting of mentions</li><li>Grouping messages by user</li><li>Active list of users, kept live with: <ul><li>Periodic Heartbeats</li><li>Automatic unregistration on page unload</li></ul></li><li>Remote Control <ul><li>Send a global announcement to all users</li><li>Toggle on/off channel controls</li><li>Change the CSS style of any element</li><li>Change the HTML document&#39;s title</li><li>Redirect users to any url</li><li>Play a youtube video</li><li>Display an image url</li><li>Raise DOM events</li></ul></li></ul>__VP_STATIC_END__`,15),p=e("img",{src:"https://github.com/ServiceStack/Assets/blob/master/img/apps/Chat/vs-sln.png",width:"257",align:"right",hspace:"10"},null,-1),c=n('',13),i=e("p",null,[e("a",{href:"http://www.packtpub.com/learning-angularjs-for-net-developers/book"},[e("img",{src:"https://raw.githubusercontent.com/ServiceStack/Assets/master/img/community/learning-angularjs.jpg",width:"175",align:"right",hspace:"10"})])],-1),l=n(`__VP_STATIC_START__<h3 id="get-the-learning-angularjs-for-net-developers-book" tabindex="-1">Get the <a href="http://www.packtpub.com/learning-angularjs-for-net-developers/book" target="_blank" rel="noopener noreferrer">Learning AngularJS for .NET Developers</a> Book! <a class="header-anchor" href="#get-the-learning-angularjs-for-net-developers-book" aria-hidden="true">#</a></h3><p>On ServiceStack and AngularJS front, we also have great content coming from the ServiceStack community as <strong><a href="http://www.packtpub.com/learning-angularjs-for-net-developers/book" target="_blank" rel="noopener noreferrer">Learning AngularJS for .NET Developers</a></strong>, a new book by <a href="https://twitter.com/AlexandruVPop" target="_blank" rel="noopener noreferrer">Alex Pop</a> has just been made available.</p><p>More details about the book as well as downloadable code-samples is available on <a href="http://alexvpop.blogspot.co.uk/2014/06/announcing-learning-angularjs-dotnet.html" target="_blank" rel="noopener noreferrer">Alex&#39;s announcement blog post</a>.</p><h3 id="download-servicestackvs" tabindex="-1">Download ServiceStackVS <a class="header-anchor" href="#download-servicestackvs" aria-hidden="true">#</a></h3><p>ServiceStackVS supports both <a href="http://VS.NET" target="_blank" rel="noopener noreferrer">VS.NET</a> 2013 and 2012 and can be <a href="http://visualstudiogallery.msdn.microsoft.com/5bd40817-0986-444d-a77d-482e43a48da7" target="_blank" rel="noopener noreferrer">downloaded from the Visual Studio Gallery</a></p><p><a href="http://visualstudiogallery.msdn.microsoft.com/5bd40817-0986-444d-a77d-482e43a48da7" target="_blank" rel="noopener noreferrer"><img src="https://raw.githubusercontent.com/ServiceStack/Assets/master/img/servicestackvs/vsgallery-download.png" alt="VS.NET Gallery Download"></a></p><h3 id="vs-net-2012-prerequisites" tabindex="-1"><a href="http://VS.NET" target="_blank" rel="noopener noreferrer">VS.NET</a> 2012 Prerequisites <a class="header-anchor" href="#vs-net-2012-prerequisites" aria-hidden="true">#</a></h3><ul><li><a href="http://VS.NET" target="_blank" rel="noopener noreferrer">VS.NET</a> 2012 Users must install the <a href="http://www.microsoft.com/en-au/download/details.aspx?id=40764" target="_blank" rel="noopener noreferrer">Microsoft Visual Studio Shell Redistributable</a></li><li>It&#39;s also highly recommended to <a href="http://docs.nuget.org/docs/start-here/installing-nuget" target="_blank" rel="noopener noreferrer">Update to the latest NuGet</a>.</li></ul><blockquote><p>Alternatively if continuing to use an older version of the <strong>NuGet Package Manager</strong> you will need to click on <strong>Enable NuGet Package Restore</strong> after creating a new project to ensure its NuGet dependencies are installed.</p></blockquote><h3 id="feedback" tabindex="-1">Feedback <a class="header-anchor" href="#feedback" aria-hidden="true">#</a></h3><p>We hope <strong>ServiceStackVS</strong> helps make ServiceStack developers more productive than ever and we&#39;ll look at continue improving it with new features in future. <a href="http://servicestack.uservoice.com/forums/176786-feature-requests" target="_blank" rel="noopener noreferrer">Suggestions and feedback are welcome</a>.</p><h2 id="authentication" tabindex="-1"><a href="/authentication-and-authorization">Authentication</a> <a class="header-anchor" href="#authentication" aria-hidden="true">#</a></h2><h3 id="saving-user-profile-images" tabindex="-1">Saving User Profile Images <a class="header-anchor" href="#saving-user-profile-images" aria-hidden="true">#</a></h3><p>To make it easier to build Social Apps like <a href="https://github.com/ServiceStackApps/Chat" target="_blank" rel="noopener noreferrer">Chat</a> with ServiceStack we&#39;ve started saving profile image urls (aka avatars) for the following popular OAuth providers:</p><ul><li>Twitter</li><li>Facebook</li><li>GitHub</li><li>Google OAuth2</li><li>LinkedIn OAuth2</li></ul><p>The users profile url can be accessed in your services using the <code>IAuthSession.GetProfileUrl()</code> extension method which goes through the new <code>IAuthMetadataProvider</code> which by default looks in <code>UserAuthDetails.Items[&quot;profileUrl&quot;]</code>.</p><h3 id="new-iauthmetadataprovider" tabindex="-1">New IAuthMetadataProvider <a class="header-anchor" href="#new-iauthmetadataprovider" aria-hidden="true">#</a></h3><p>A new <a href="https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack/Auth/AuthMetadataProvider.cs" target="_blank" rel="noopener noreferrer">IAuthMetadataProvider</a> has been added that provides a way to customize the <code>authInfo</code> in all AuthProviders. It also allows overriding of how extended Auth metadata like <code>profileUrl</code> is returned.</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IAuthMetadataProvider</span>
<span class="token punctuation">{</span>
    <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">AddMetadata</span><span class="token punctuation">(</span><span class="token class-name">IAuthTokens</span> tokens<span class="token punctuation">,</span> <span class="token class-name">Dictionary<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> <span class="token keyword">string</span><span class="token punctuation">&gt;</span></span> authInfo<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetProfileUrl</span><span class="token punctuation">(</span><span class="token class-name">IAuthSession</span> authSession<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> defaultUrl <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>To override with a custom implementation, register <code>IAuthMetadataProvider</code> in the IOC</p></blockquote><h3 id="saving-oauth-metadata" tabindex="-1">Saving OAuth Metadata <a class="header-anchor" href="#saving-oauth-metadata" aria-hidden="true">#</a></h3><p>The new <code>SaveExtendedUserInfo</code> property (enabled by default) on all OAuth providers let you control whether to save the extended OAuth metadata available (into <code>UserAuthDetails.Items</code>) when logging in via OAuth.</p><h2 id="ormlite" tabindex="-1"><a href="https://github.com/ServiceStack/ServiceStack.OrmLite/" target="_blank" rel="noopener noreferrer">OrmLite</a> <a class="header-anchor" href="#ormlite" aria-hidden="true">#</a></h2><h3 id="loading-of-references-in-multi-select-queries" tabindex="-1">Loading of References in Multi-Select Queries <a class="header-anchor" href="#loading-of-references-in-multi-select-queries" aria-hidden="true">#</a></h3><p>Previous support of pre-loading of references were limited to a single entity using <code>LoadSingleById</code> to automatically fetch all child references, e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Customer</span>
<span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">AutoIncrement</span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Name <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Reference</span></span><span class="token punctuation">]</span> <span class="token comment">// Save in CustomerAddress table</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">CustomerAddress</span> PrimaryAddress <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Reference</span></span><span class="token punctuation">]</span> <span class="token comment">// Save in Order table</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">List<span class="token punctuation">&lt;</span>Order<span class="token punctuation">&gt;</span></span> Orders <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token class-name"><span class="token keyword">var</span></span> customer <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">LoadSingleById</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Customer<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>Id<span class="token punctuation">)</span><span class="token punctuation">;</span>
customer<span class="token punctuation">.</span>PrimaryAddress   <span class="token comment">// Loads 1:1 CustomerAddress record </span>
customer<span class="token punctuation">.</span>Orders           <span class="token comment">// Loads 1:M Order records </span>
</code></pre></div><p>We&#39;ve now also added support for pre-loading of references for multiple resultsets as well with <code>LoadSelect</code> which loads references for all results, e.g:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> customers <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">LoadSelect</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Customer<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>q <span class="token operator">=&gt;</span> q<span class="token punctuation">.</span>Name<span class="token punctuation">.</span><span class="token function">StartsWith</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>This is implemented efficiently behind the scenes where only 1 additional SQL Query is performed for each defined reference.</p><blockquote><p>As a design goal none of OrmLite Query API&#39;s perform N+1 queries.</p></blockquote><h3 id="self-references" tabindex="-1">Self References <a class="header-anchor" href="#self-references" aria-hidden="true">#</a></h3><p>We&#39;ve extended OrmLite <a href="https://github.com/ServiceStack/ServiceStack.OrmLite/#reference-support-poco-style" target="_blank" rel="noopener noreferrer">References support</a> to support Self References for <strong>1:1</strong> relations where the foreign key property can be on the parent table, e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Customer</span>
<span class="token punctuation">{</span>
    <span class="token range operator">..</span><span class="token punctuation">.</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> CustomerAddressId <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Reference</span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">CustomerAddress</span> PrimaryAddress <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Which maintains the same relationship as having the Foreign Key column on the child table instead, i,e:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomerAddress</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> CustomerId <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="support-foreign-key-attributes-to-specify-reference-fields" tabindex="-1">Support Foreign Key Attributes to specify Reference Fields <a class="header-anchor" href="#support-foreign-key-attributes-to-specify-reference-fields" aria-hidden="true">#</a></h3><p>Previously definitions of references relied on <a href="https://github.com/ServiceStack/ServiceStack.OrmLite/#reference-conventions" target="_blank" rel="noopener noreferrer">Reference Conventions</a> using either the C# Property Name or Property Aliases. You can now also use the <a href="https://github.com/ServiceStack/ServiceStack.OrmLite/#new-foreign-key-attribute-for-referential-actions-on-updatedeletes" target="_blank" rel="noopener noreferrer">References and ForeignKey attributes</a> to specify Reference Properties, e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Customer</span>
<span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Reference</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">CustomerAddress</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> PrimaryAddressId <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Reference</span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">CustomerAddress</span> PrimaryAddress <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>Reference Attributes take precedence over naming conventions</p></blockquote><h3 id="support-for-stored-procedures-with-out-params" tabindex="-1">Support for Stored Procedures with out params <a class="header-anchor" href="#support-for-stored-procedures-with-out-params" aria-hidden="true">#</a></h3><p>A new <code>SqlProc</code> API was added returning an <code>IDbCommand</code> which can be used to customize the Stored Procedure call letting you add custom out parameters. The example below shows</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">string</span></span> spSql <span class="token operator">=</span> <span class="token string">@&quot;DROP PROCEDURE IF EXISTS spSearchLetters;
    CREATE PROCEDURE spSearchLetters (IN pLetter varchar(10), OUT pTotal int)
    BEGIN
        SELECT COUNT(*) FROM LetterFrequency WHERE Letter = pLetter INTO pTotal;
        SELECT * FROM LetterFrequency WHERE Letter = pLetter;
    END&quot;</span><span class="token punctuation">;</span>

db<span class="token punctuation">.</span><span class="token function">ExecuteSql</span><span class="token punctuation">(</span>spSql<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> cmd <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">SqlProc</span><span class="token punctuation">(</span><span class="token string">&quot;spSearchLetters&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token punctuation">{</span> pLetter <span class="token operator">=</span> <span class="token string">&quot;C&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> pTotal <span class="token operator">=</span> cmd<span class="token punctuation">.</span><span class="token function">AddParam</span><span class="token punctuation">(</span><span class="token string">&quot;pTotal&quot;</span><span class="token punctuation">,</span> <span class="token named-parameter punctuation">direction</span><span class="token punctuation">:</span> ParameterDirection<span class="token punctuation">.</span>Output<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> results <span class="token operator">=</span> cmd<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">ConvertToList</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>LetterFrequency<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> total <span class="token operator">=</span> pTotal<span class="token punctuation">.</span>Value<span class="token punctuation">;</span>
</code></pre></div><p>An alternative approach is to use the new overload added to the raw SQL API <code>SqlList</code> that lets you customize the Stored Procedure using a filter, e.g:</p><div class="language-csharp"><pre><code><span class="token class-name">IDbDataParameter</span> pTotal <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> results <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">SqlList</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>LetterFrequency<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token string">&quot;spSearchLetters&quot;</span><span class="token punctuation">,</span> cmd <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        cmd<span class="token punctuation">.</span>CommandType <span class="token operator">=</span> CommandType<span class="token punctuation">.</span>StoredProcedure<span class="token punctuation">;</span>
        cmd<span class="token punctuation">.</span><span class="token function">AddParam</span><span class="token punctuation">(</span><span class="token string">&quot;pLetter&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;C&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        pTotal <span class="token operator">=</span> cmd<span class="token punctuation">.</span><span class="token function">AddParam</span><span class="token punctuation">(</span><span class="token string">&quot;pTotal&quot;</span><span class="token punctuation">,</span> <span class="token named-parameter punctuation">direction</span><span class="token punctuation">:</span> ParameterDirection<span class="token punctuation">.</span>Output<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> total <span class="token operator">=</span> pTotal<span class="token punctuation">.</span>Value<span class="token punctuation">;</span>
</code></pre></div><h3 id="minor-ormlite-features" tabindex="-1">Minor OrmLite Features <a class="header-anchor" href="#minor-ormlite-features" aria-hidden="true">#</a></h3><ul><li>Use <code>OrmLiteConfig.DisableColumnGuessFallback=false</code> to disable fallback matching heuristics</li><li>Added <a href="https://github.com/ServiceStack/ServiceStack.OrmLite/blob/master/tests/ServiceStack.OrmLite.Tests/Expression/GenericTableExpressions.cs" target="_blank" rel="noopener noreferrer">GenericTableExpressions</a> example showing how to extend OrmLite to support different runtime table names on a single schema type.</li></ul><h2 id="autoquery" tabindex="-1"><a href="/autoquery">AutoQuery</a> <a class="header-anchor" href="#autoquery" aria-hidden="true">#</a></h2><h3 id="support-for-loading-references" tabindex="-1">Support for loading References <a class="header-anchor" href="#support-for-loading-references" aria-hidden="true">#</a></h3><p>AutoQuery now takes advantage of OrmLite&#39;s new support for loading child references where marking your Query DTO with <code>[Reference]</code> will automatically load its related data, e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Rockstar</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> FirstName <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> LastName <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span><span class="token punctuation">?</span></span> Age <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Reference</span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">List<span class="token punctuation">&lt;</span>RockstarAlbum<span class="token punctuation">&gt;</span></span> Albums <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span> 
<span class="token punctuation">}</span>
</code></pre></div><h3 id="improved-orderby" tabindex="-1">Improved OrderBy <a class="header-anchor" href="#improved-orderby" aria-hidden="true">#</a></h3><p>Add support for inverting sort direction of individual orderBy fields using &#39;-&#39; prefix e.g:</p><div class="language-csharp"><pre><code><span class="token comment">// ?orderBy=Rating,-ImdbId</span>
<span class="token class-name"><span class="token keyword">var</span></span> movies <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">SearchMovies</span> <span class="token punctuation">{</span> OrderBy <span class="token operator">=</span> <span class="token string">&quot;Rating,-ImdbId&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// ?orderByDesc=-Rating,ImdbId</span>
<span class="token class-name"><span class="token keyword">var</span></span> movies <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">SearchMovies</span> <span class="token punctuation">{</span> OrderByDesc <span class="token operator">=</span> <span class="token string">&quot;-Rating,ImdbId&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="servicestack-text" tabindex="-1">ServiceStack.Text <a class="header-anchor" href="#servicestack-text" aria-hidden="true">#</a></h2><ul><li>Added support for <code>OrderedDictionary</code> and other uncommon <code>IDictionary</code> types</li><li>WCF-style <code>JsConfig.OnSerializedFn</code> custom hook has been added</li><li><code>JsConfig.ReuseStringBuffer</code> is enabled by default for faster JSON/JSV text serialization</li><li>Properties can also be ignored with <code>[JsonIgnore]</code> attribute</li></ul><h2 id="other-features" tabindex="-1">Other Features <a class="header-anchor" href="#other-features" aria-hidden="true">#</a></h2><ul><li>New <code>[Exclude(Feature.Soap)]</code> attribute can be used to exclude types from XSD/WSDL&#39;s</li><li>XSD/WSDL&#39;s no longer including open generic types</li><li>Added <code>$.ss.getSelection()</code>, <code>$.ss.queryString()</code>, <code>$.ss.splitOnFirst()</code>, <code>$.ss.splitOnLast()</code> to /ss-utils.js</li><li><code>TwitterAuthProvider</code> now makes authenticated v1.1 API requests to fetch user metadata</li></ul>__VP_STATIC_END__`,57),u=[r,p,c,i,l];function d(k,h,g,m,f,v){return t(),s("div",null,u)}var w=a(o,[["render",d]]);export{S as __pageData,w as default};
