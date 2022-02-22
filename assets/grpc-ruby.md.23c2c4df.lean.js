import{_ as n,c as s,o as a,a as t}from"./app.64b20f26.js";const b='{"title":"gRPC protoc Ruby Client","description":"","frontmatter":{"slug":"grpc-ruby","title":"gRPC protoc Ruby Client"},"headers":[{"level":2,"title":"Ruby protoc generated GrpcServicesStub Client TodoWorld Example","slug":"ruby-protoc-generated-grpcservicesstub-client-todoworld-example"},{"level":3,"title":"Ruby protoc gRPC insecure Example","slug":"ruby-protoc-grpc-insecure-example"},{"level":3,"title":"Ruby protoc gRPC SSL Example","slug":"ruby-protoc-grpc-ssl-example"},{"level":3,"title":"Ruby Local Development gRPC SSL CRUD Example","slug":"ruby-local-development-grpc-ssl-crud-example"}],"relativePath":"grpc-ruby.md","lastUpdated":1645506504352}',p={},o=t(`__VP_STATIC_START__<p><a href="https://youtu.be/yvLnqgXKYTI" target="_blank" rel="noopener noreferrer"><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/grpc/ruby.png" alt=""></a></p><div class="info custom-block"><p class="custom-block-title">YouTube</p><p><a href="https://youtu.be/yvLnqgXKYTI" target="_blank" rel="noopener noreferrer">youtu.be/yvLnqgXKYTI</a></p></div><h2 id="ruby-protoc-generated-grpcservicesstub-client-todoworld-example" tabindex="-1">Ruby protoc generated GrpcServicesStub Client TodoWorld Example <a class="header-anchor" href="#ruby-protoc-generated-grpcservicesstub-client-todoworld-example" aria-hidden="true">#</a></h2><p>Install <a href="https://docs.servicestack.net/dotnet-tool" target="_blank" rel="noopener noreferrer">x dotnet tool</a>:</p><div class="language-bash"><pre><code>$ dotnet tool <span class="token function">install</span> --global x 
</code></pre></div><p>Install required gems:</p><div class="language-bash"><pre><code>$ gem <span class="token function">install</span> grpc bundler 
</code></pre></div><p>Create <strong>todoworld.gemspec</strong>:</p><div class="language-ruby"><pre><code><span class="token comment"># -*- ruby -*-</span>
<span class="token comment"># encoding: utf-8</span>

<span class="token constant">Gem</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token constant">Specification</span><span class="token punctuation">.</span><span class="token keyword">new</span> <span class="token keyword">do</span> <span class="token operator">|</span>s<span class="token operator">|</span>
  s<span class="token punctuation">.</span>name          <span class="token operator">=</span> <span class="token string">&#39;todoworld&#39;</span>
  s<span class="token punctuation">.</span>version       <span class="token operator">=</span> <span class="token string">&#39;1.0.0&#39;</span>
  s<span class="token punctuation">.</span>summary       <span class="token operator">=</span> <span class="token string">&#39;gRPC Ruby TodoWorld Example&#39;</span>
  s<span class="token punctuation">.</span>description   <span class="token operator">=</span> <span class="token string">&#39;Simple TodoWorld demo of using gRPC from Ruby&#39;</span>

  s<span class="token punctuation">.</span>files         <span class="token operator">=</span> \`git ls<span class="token operator">-</span>files <span class="token operator">--</span> <span class="token operator">*</span>\`<span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span>
  s<span class="token punctuation">.</span>executables   <span class="token operator">=</span> \`git ls<span class="token operator">-</span>files <span class="token operator">--</span> client<span class="token punctuation">.</span>rb\`<span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>map <span class="token keyword">do</span> <span class="token operator">|</span>f<span class="token operator">|</span>
    <span class="token builtin">File</span><span class="token punctuation">.</span>basename<span class="token punctuation">(</span>f<span class="token punctuation">)</span>
  <span class="token keyword">end</span>
  s<span class="token punctuation">.</span>require_paths <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;lib&#39;</span><span class="token punctuation">]</span>
  s<span class="token punctuation">.</span>platform      <span class="token operator">=</span> <span class="token constant">Gem</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token constant">Platform</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token constant">RUBY</span>

  s<span class="token punctuation">.</span>add_dependency <span class="token string">&#39;grpc&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;~&gt; 1.0&#39;</span>
  s<span class="token punctuation">.</span>add_dependency <span class="token string">&#39;multi_json&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;~&gt; 1.13.1&#39;</span>
  s<span class="token punctuation">.</span>add_development_dependency <span class="token string">&#39;bundler&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;~&gt; 2.0&#39;</span>
<span class="token keyword">end</span>
</code></pre></div><p>Generate <code>Gemfile</code> and install dependencies:</p><div class="language-bash"><pre><code>$ bundle init
$ bundle <span class="token function">install</span>
</code></pre></div><p>Add protoc generated TodoWorld DTOs and gRPC Service Client:</p><div class="language-bash"><pre><code>$ <span class="token function">mkdir</span> lib
$ x proto-ruby https://todoworld.servicestack.net -out lib
</code></pre></div><h3 id="ruby-protoc-grpc-insecure-example" tabindex="-1">Ruby protoc gRPC insecure Example <a class="header-anchor" href="#ruby-protoc-grpc-insecure-example" aria-hidden="true">#</a></h3><p>Use protoc generated DTOs and <code>GrpcServicesStub</code> to call TodoWorld gRPC Service in <code>main.rb</code>:</p><div class="language-ruby"><pre><code><span class="token comment">#!/usr/bin/env ruby</span>

this_dir <span class="token operator">=</span> <span class="token builtin">File</span><span class="token punctuation">.</span>expand_path<span class="token punctuation">(</span><span class="token builtin">File</span><span class="token punctuation">.</span>dirname<span class="token punctuation">(</span>__FILE__<span class="token punctuation">)</span><span class="token punctuation">)</span>
lib_dir <span class="token operator">=</span> <span class="token builtin">File</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span>this_dir<span class="token punctuation">,</span> <span class="token string">&#39;lib&#39;</span><span class="token punctuation">)</span>
<span class="token variable">$LOAD_PATH</span><span class="token punctuation">.</span>unshift<span class="token punctuation">(</span>lib_dir<span class="token punctuation">)</span> <span class="token keyword">unless</span> <span class="token variable">$LOAD_PATH</span><span class="token punctuation">.</span><span class="token keyword">include</span><span class="token operator">?</span><span class="token punctuation">(</span>lib_dir<span class="token punctuation">)</span>

<span class="token keyword">require</span> <span class="token string">&#39;grpc&#39;</span>
<span class="token keyword">require</span> <span class="token string">&#39;services_pb&#39;</span>
<span class="token keyword">require</span> <span class="token string">&#39;services_services_pb&#39;</span>

<span class="token keyword">def</span> <span class="token method-definition"><span class="token function">main</span></span>
    client <span class="token operator">=</span> <span class="token constant">GrpcServices</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token constant">Stub</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token string">&#39;todoworld.servicestack.net:5054&#39;</span><span class="token punctuation">,</span> 
        <span class="token symbol">:this_channel_is_insecure</span><span class="token punctuation">)</span>

    response <span class="token operator">=</span> client<span class="token punctuation">.</span>get_hello<span class="token punctuation">(</span><span class="token constant">Hello</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token constant">Name</span><span class="token punctuation">:</span><span class="token string">&#39;gRPC Ruby&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    puts response<span class="token punctuation">.</span><span class="token constant">Result</span>
<span class="token keyword">end</span>

main
</code></pre></div><p>Create <code>main.rb</code> with the above Ruby Example:</p><div class="language-bash"><pre><code>$ x mix todoworld-ruby
</code></pre></div><p>Run example:</p><div class="language-bash"><pre><code>$ main.rb
</code></pre></div><h3 id="ruby-protoc-grpc-ssl-example" tabindex="-1">Ruby protoc gRPC SSL Example <a class="header-anchor" href="#ruby-protoc-grpc-ssl-example" aria-hidden="true">#</a></h3><p>Download TodoWorld SSL Certificate used for its gRPC HTTP/2 Services:</p><div class="language-bash"><pre><code>$ x get https://todoworld.servicestack.net/grpc.crt
</code></pre></div><p>Use certificate when initializing <code>GrpcServicesStub</code>:</p><div class="language-ruby"><pre><code><span class="token comment">#!/usr/bin/env ruby</span>

this_dir <span class="token operator">=</span> <span class="token builtin">File</span><span class="token punctuation">.</span>expand_path<span class="token punctuation">(</span><span class="token builtin">File</span><span class="token punctuation">.</span>dirname<span class="token punctuation">(</span>__FILE__<span class="token punctuation">)</span><span class="token punctuation">)</span>
lib_dir <span class="token operator">=</span> <span class="token builtin">File</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span>this_dir<span class="token punctuation">,</span> <span class="token string">&#39;lib&#39;</span><span class="token punctuation">)</span>
<span class="token variable">$LOAD_PATH</span><span class="token punctuation">.</span>unshift<span class="token punctuation">(</span>lib_dir<span class="token punctuation">)</span> <span class="token keyword">unless</span> <span class="token variable">$LOAD_PATH</span><span class="token punctuation">.</span><span class="token keyword">include</span><span class="token operator">?</span><span class="token punctuation">(</span>lib_dir<span class="token punctuation">)</span>

<span class="token keyword">require</span> <span class="token string">&#39;grpc&#39;</span>
<span class="token keyword">require</span> <span class="token string">&#39;services_pb&#39;</span>
<span class="token keyword">require</span> <span class="token string">&#39;services_services_pb&#39;</span>

<span class="token keyword">def</span> <span class="token method-definition"><span class="token function">main</span></span>
    credentials <span class="token operator">=</span> <span class="token constant">GRPC</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token constant">Core</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token constant">ChannelCredentials</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token builtin">File</span><span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token string">&#39;grpc.crt&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    client <span class="token operator">=</span> <span class="token constant">GrpcServices</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token constant">Stub</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token string">&#39;todoworld.servicestack.net:50051&#39;</span><span class="token punctuation">,</span> credentials<span class="token punctuation">)</span>

    response <span class="token operator">=</span> client<span class="token punctuation">.</span>get_hello<span class="token punctuation">(</span><span class="token constant">Hello</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token constant">Name</span><span class="token punctuation">:</span><span class="token string">&#39;gRPC Ruby&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    puts response<span class="token punctuation">.</span><span class="token constant">Result</span>
<span class="token keyword">end</span>

main
</code></pre></div><p>Override <code>main.rb</code> with the above Ruby Example:</p><div class="language-bash"><pre><code>$ x mix todoworld-ruby-ssl
</code></pre></div><p>Run example:</p><div class="language-bash"><pre><code>$ ruby main.rb
</code></pre></div><h3 id="ruby-local-development-grpc-ssl-crud-example" tabindex="-1">Ruby Local Development gRPC SSL CRUD Example <a class="header-anchor" href="#ruby-local-development-grpc-ssl-crud-example" aria-hidden="true">#</a></h3><div class="language-ruby"><pre><code><span class="token comment">#!/usr/bin/env ruby</span>

this_dir <span class="token operator">=</span> <span class="token builtin">File</span><span class="token punctuation">.</span>expand_path<span class="token punctuation">(</span><span class="token builtin">File</span><span class="token punctuation">.</span>dirname<span class="token punctuation">(</span>__FILE__<span class="token punctuation">)</span><span class="token punctuation">)</span>
lib_dir <span class="token operator">=</span> <span class="token builtin">File</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span>this_dir<span class="token punctuation">,</span> <span class="token string">&#39;lib&#39;</span><span class="token punctuation">)</span>
<span class="token variable">$LOAD_PATH</span><span class="token punctuation">.</span>unshift<span class="token punctuation">(</span>lib_dir<span class="token punctuation">)</span> <span class="token keyword">unless</span> <span class="token variable">$LOAD_PATH</span><span class="token punctuation">.</span><span class="token keyword">include</span><span class="token operator">?</span><span class="token punctuation">(</span>lib_dir<span class="token punctuation">)</span>

<span class="token keyword">require</span> <span class="token string">&#39;grpc&#39;</span>
<span class="token keyword">require</span> <span class="token string">&#39;services_pb&#39;</span>
<span class="token keyword">require</span> <span class="token string">&#39;services_services_pb&#39;</span>

<span class="token keyword">def</span> <span class="token method-definition"><span class="token function">main</span></span>
    credentials <span class="token operator">=</span> <span class="token constant">GRPC</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token constant">Core</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token constant">ChannelCredentials</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token builtin">File</span><span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token string">&#39;dev.crt&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    client <span class="token operator">=</span> <span class="token constant">GrpcServices</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token constant">Stub</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token string">&#39;localhost:5001&#39;</span><span class="token punctuation">,</span> credentials<span class="token punctuation">)</span>
    client<span class="token punctuation">.</span>post_reset_todos<span class="token punctuation">(</span><span class="token constant">ResetTodos</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    puts <span class="token string">&quot;TODO EXAMPLE&quot;</span>

    <span class="token comment"># POST /todos</span>
    todo <span class="token operator">=</span> client<span class="token punctuation">.</span>post_create_todo<span class="token punctuation">(</span><span class="token constant">CreateTodo</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token constant">Title</span><span class="token punctuation">:</span><span class="token string">&quot;ServiceStack&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token constant">Result</span>
    puts <span class="token string">&quot;new todo Id: <span class="token interpolation"><span class="token delimiter tag">#{</span>todo<span class="token punctuation">.</span><span class="token constant">Id</span><span class="token delimiter tag">}</span></span>, Title: <span class="token interpolation"><span class="token delimiter tag">#{</span>todo<span class="token punctuation">.</span><span class="token constant">Title</span><span class="token delimiter tag">}</span></span>&quot;</span>
    
    <span class="token comment"># GET /todos</span>
    all <span class="token operator">=</span> client<span class="token punctuation">.</span>call_get_todos<span class="token punctuation">(</span><span class="token constant">GetTodos</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    puts <span class="token string">&quot;todos: <span class="token interpolation"><span class="token delimiter tag">#{</span>all<span class="token punctuation">.</span><span class="token constant">Results</span><span class="token punctuation">.</span>length<span class="token delimiter tag">}</span></span>&quot;</span>
    
    <span class="token comment"># GET /todos/1</span>
    todo <span class="token operator">=</span> <span class="token punctuation">(</span>client<span class="token punctuation">.</span>call_get_todo<span class="token punctuation">(</span><span class="token constant">GetTodo</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token constant">Id</span><span class="token symbol">:todo</span><span class="token punctuation">.</span><span class="token constant">Id</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token constant">Result</span>
    puts <span class="token string">&quot;get todo Id: <span class="token interpolation"><span class="token delimiter tag">#{</span>todo<span class="token punctuation">.</span><span class="token constant">Id</span><span class="token delimiter tag">}</span></span>, Title: <span class="token interpolation"><span class="token delimiter tag">#{</span>todo<span class="token punctuation">.</span><span class="token constant">Title</span><span class="token delimiter tag">}</span></span>&quot;</span>
    
    <span class="token comment"># PUT /todos/1</span>
    client<span class="token punctuation">.</span>put_update_todo<span class="token punctuation">(</span><span class="token constant">UpdateTodo</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token constant">Id</span><span class="token symbol">:todo</span><span class="token punctuation">.</span><span class="token constant">Id</span><span class="token punctuation">,</span> <span class="token constant">Title</span><span class="token punctuation">:</span><span class="token string">&#39;gRPC&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    
    <span class="token comment"># GET /todos/1</span>
    todo <span class="token operator">=</span> <span class="token punctuation">(</span>client<span class="token punctuation">.</span>call_get_todo<span class="token punctuation">(</span><span class="token constant">GetTodo</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token constant">Id</span><span class="token symbol">:todo</span><span class="token punctuation">.</span><span class="token constant">Id</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token constant">Result</span>
    puts <span class="token string">&quot;get todo Id: <span class="token interpolation"><span class="token delimiter tag">#{</span>todo<span class="token punctuation">.</span><span class="token constant">Id</span><span class="token delimiter tag">}</span></span>, Title: <span class="token interpolation"><span class="token delimiter tag">#{</span>todo<span class="token punctuation">.</span><span class="token constant">Title</span><span class="token delimiter tag">}</span></span>&quot;</span>
    
    <span class="token comment"># DELETE /todos/1</span>
    client<span class="token punctuation">.</span>call_delete_todo<span class="token punctuation">(</span><span class="token constant">DeleteTodo</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token constant">Id</span><span class="token symbol">:todo</span><span class="token punctuation">.</span><span class="token constant">Id</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    
    <span class="token comment"># GET /todos</span>
    all <span class="token operator">=</span> client<span class="token punctuation">.</span>call_get_todos<span class="token punctuation">(</span><span class="token constant">GetTodos</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    puts <span class="token string">&quot;todos: <span class="token interpolation"><span class="token delimiter tag">#{</span>all<span class="token punctuation">.</span><span class="token constant">Results</span><span class="token punctuation">.</span>length<span class="token delimiter tag">}</span></span>&quot;</span>
    
<span class="token keyword">end</span>

main
</code></pre></div><p>Refer to <a href="https://github.com/NetCoreApps/todo-world/tree/master/src/clients/ruby" target="_blank" rel="noopener noreferrer">/src/clients/ruby</a> for a complete example project.</p>__VP_STATIC_END__`,32),e=[o];function c(l,i,u,r,k,d){return a(),s("div",null,e)}var m=n(p,[["render",c]]);export{b as __pageData,m as default};
