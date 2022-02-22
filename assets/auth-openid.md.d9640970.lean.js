import{_ as s,c as t,o as e,a,b as n}from"./app.64b20f26.js";const w=`{"title":"OpenId 2.0 Auth Providers","description":"","frontmatter":{"slug":"openid","title":"OpenId 2.0 Auth Providers"},"headers":[{"level":2,"title":"Install via NuGet","slug":"install-via-nuget"},{"level":2,"title":"Easy configuration, plugs into ServiceStack's Auth Provider model","slug":"easy-configuration-plugs-into-servicestack-s-auth-provider-model"},{"level":3,"title":"Creating a Custom OpenId Provider","slug":"creating-a-custom-openid-provider"},{"level":3,"title":"Automatically Merges Registration and Authentication information from multiple Auth Providers","slug":"automatically-merges-registration-and-authentication-information-from-multiple-auth-providers"}],"relativePath":"auth-openid.md","lastUpdated":1645506504344}`,o={},p=a('',3),c=n("div",{class:"nuget-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[n("div",{class:"flex-grow bg-gray-700"},[n("div",{class:"pl-4 py-1 pb-1.5 align-middle text-lg text-white"},[n("p",null,[n("code",null,'<PackageReference Include="ServiceStack.Authentication.OpenId" Version="5.*" />')])])]),n("div",{class:"flex"},[n("div",{class:"bg-sky-500 text-white p-1.5 pb-0"},[n("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[n("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),n("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[n("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),i=a(`__VP_STATIC_START__<h2 id="easy-configuration-plugs-into-servicestack-s-auth-provider-model" tabindex="-1">Easy configuration, plugs into ServiceStack&#39;s Auth Provider model <a class="header-anchor" href="#easy-configuration-plugs-into-servicestack-s-auth-provider-model" aria-hidden="true">#</a></h2><p>As you might expect adding OpenId support works seamlessly with ServiceStack&#39;s existing <a href="/authentication-and-authorization">Auth Providers</a> where you can enable support for any Specific OpenId 2.0 provider with just <strong>1-line of registration</strong> each. Below is the example taken from <a href="https://github.com/ServiceStack/SocialBootstrapApi/blob/master/src/SocialBootstrapApi/AppHost.cs#L171" target="_blank" rel="noopener noreferrer">SocialBootstrapApi&#39;s AppHost</a> showing how to extend their existing Auth Providers with new OpenId 2.0 options:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> appSettings <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">AppSettings</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//Access Web.Config AppSettings</span>
Plugins<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">AuthFeature</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CustomUserSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> 
    <span class="token comment">//Add all the Auth Providers you want to allow registration with</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IAuthProvider<span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span>
        <span class="token comment">//Existing Auth Providers</span>
        <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CredentialsAuthProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>              <span class="token comment">//HTML Form post of UserName/Password credentials</span>
        <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TwitterAuthProvider</span><span class="token punctuation">(</span>appSettings<span class="token punctuation">)</span><span class="token punctuation">,</span>       <span class="token comment">//Sign-in with Twitter</span>
        <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FacebookAuthProvider</span><span class="token punctuation">(</span>appSettings<span class="token punctuation">)</span><span class="token punctuation">,</span>      <span class="token comment">//Sign-in with Facebook</span>
        <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DigestAuthProvider</span><span class="token punctuation">(</span>appSettings<span class="token punctuation">)</span><span class="token punctuation">,</span>        <span class="token comment">//Sign-in with Digest Auth</span>
        <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BasicAuthProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>                    <span class="token comment">//Sign-in with Basic Auth</span>

        <span class="token comment">//Register new OpenId providers you want to allow authentication with</span>
        <span class="token keyword">new</span> <span class="token constructor-invocation class-name">GoogleOpenIdOAuthProvider</span><span class="token punctuation">(</span>appSettings<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">//Sign-in with Google OpenId</span>
        <span class="token keyword">new</span> <span class="token constructor-invocation class-name">YahooOpenIdOAuthProvider</span><span class="token punctuation">(</span>appSettings<span class="token punctuation">)</span><span class="token punctuation">,</span>  <span class="token comment">//Sign-in with Yahoo OpenId</span>
        <span class="token keyword">new</span> <span class="token constructor-invocation class-name">OpenIdOAuthProvider</span><span class="token punctuation">(</span>appSettings<span class="token punctuation">)</span><span class="token punctuation">,</span>       <span class="token comment">//Sign-in with any Custom OpenId Provider</span>

        <span class="token comment">//Register new OAuth2 providers you want to allow authentication with</span>
        <span class="token keyword">new</span> <span class="token constructor-invocation class-name">GoogleOAuth2Provider</span><span class="token punctuation">(</span>appSettings<span class="token punctuation">)</span><span class="token punctuation">,</span>      <span class="token comment">//Sign-in with Google OAuth2        </span>
        <span class="token keyword">new</span> <span class="token constructor-invocation class-name">LinkedInOAuth2Provider</span><span class="token punctuation">(</span>appSettings<span class="token punctuation">)</span><span class="token punctuation">,</span>    <span class="token comment">//Sign-in with LinkedIn OAuth2        </span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p><a href="https://github.com/ServiceStack/ServiceStack/blob/master/tests/ServiceStack.AuthWeb.Tests/" target="_blank" rel="noopener noreferrer">AuthWebTests</a> is a simple project that shows all Auth Providers configured and working in the same app. See the <a href="https://github.com/ServiceStack/ServiceStack/blob/master/tests/ServiceStack.AuthWeb.Tests/AppHost.cs" target="_blank" rel="noopener noreferrer">AppHost</a> for an example of the code and the <a href="https://github.com/ServiceStack/ServiceStack/blob/master/tests/ServiceStack.AuthWeb.Tests/Web.config" target="_blank" rel="noopener noreferrer">Web.config</a> for an example of the configuration required to enable each Auth Provider.</p><h3 id="creating-a-custom-openid-provider" tabindex="-1">Creating a Custom OpenId Provider <a class="header-anchor" href="#creating-a-custom-openid-provider" aria-hidden="true">#</a></h3><p>Creating a custom OpenId provider is trivially done by just inheriting from <code>OpenIdOAuthProvider</code> and providing a unique Id and Auth Realm Url for the provider. This is the source code for <a href="https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack.Authentication.OpenId/GoogleOpenIdOAuthProvider.cs" target="_blank" rel="noopener noreferrer">GoogleOpenIdOAuthProvider</a>:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GoogleOpenIdOAuthProvider</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">OpenIdOAuthProvider</span></span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">string</span></span> Name <span class="token operator">=</span> <span class="token string">&quot;GoogleOpenId&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">string</span></span> Realm <span class="token operator">=</span> <span class="token string">&quot;https://www.google.com/accounts/o8/id&quot;</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token function">GoogleOpenIdOAuthProvider</span><span class="token punctuation">(</span><span class="token class-name">IResourceManager</span> appSettings<span class="token punctuation">)</span>
        <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span>appSettings<span class="token punctuation">,</span> Name<span class="token punctuation">,</span> Realm<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>With just <code>GoogleOpenIdOAuthProvider</code> class and it&#39;s registration above we can now enable authentication for our websites by just adding a HTML Form to <strong>POST</strong> to the <code>/auth/{AuthProviderName}</code> AuthService, e.g:</p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/api/auth/googleopenid<span class="token punctuation">&quot;</span></span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>POST<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>image<span class="token punctuation">&quot;</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/Content/img/sign-in-with-google.png<span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Sign in with Google<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>Any other custom OpenId provider can be added in the same way, here is the HTML Form for Yahoo OpenId:</p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/api/auth/yahooopenid<span class="token punctuation">&quot;</span></span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>POST<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>image<span class="token punctuation">&quot;</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/Content/img/sign-in-with-yahoo.png<span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Sign in with Yahoo!<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>Finally you can allow registration of any other OpenId 2.0 provider at run-time by including their Url in the <strong>OpenIdUrl</strong> Form POST variable, e.g:</p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/api/auth/openid<span class="token punctuation">&quot;</span></span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>POST<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text<span class="token punctuation">&quot;</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>OpenIdUrl<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://myopenid.com<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>submit<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>btn<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Sign In<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>The above sample markup from the <a href="https://github.com/ServiceStack/SocialBootstrapApi/blob/master/src/SocialBootstrapApi/Views/Shared/Index.cshtml#L366" target="_blank" rel="noopener noreferrer">Bootstrap Api project Index.cshtml</a> page, which when rendered looks like:</p><p><a href="http://bootstrapapi.apphb.com" target="_blank" rel="noopener noreferrer"><img src="https://raw.githubusercontent.com/ServiceStackV3/Mono/master/src/Mono/files/openid-form.png" alt="ServiceStack OpenId 2.0 Providers"></a></p><p>For a live demo of ServiceStack&#39;s Auth Providers in action check out the MVC + ServiceStack enabled <a href="http://bootstrapapi.apphb.com" target="_blank" rel="noopener noreferrer">Bootstrap API project</a>.</p><h3 id="automatically-merges-registration-and-authentication-information-from-multiple-auth-providers" tabindex="-1">Automatically Merges Registration and Authentication information from multiple Auth Providers <a class="header-anchor" href="#automatically-merges-registration-and-authentication-information-from-multiple-auth-providers" aria-hidden="true">#</a></h3><p>One of the benefits of using <a href="/authentication-and-authorization">ServiceStack&#39;s Auth Providers</a> is that it allows a single user to login via multiple Auth Providers and it takes care of merging authentication and registration info from multiple Authentication sources into the same UserAuth Account. It also automatically maintains updates of users latest registration information on each login and their session is automatically populated with all of their previously authenticated providers, e.g. If a user logs in the 2nd time with Facebook, their session is also populated with their earlier Twitter account information.</p>__VP_STATIC_END__`,18),r=[p,c,i];function l(u,k,d,h,g,m){return e(),t("div",null,r)}var S=s(o,[["render",l]]);export{w as __pageData,S as default};
