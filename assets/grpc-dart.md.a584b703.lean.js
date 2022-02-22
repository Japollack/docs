import{_ as n,c as s,o as a,a as t}from"./app.64b20f26.js";const m='{"title":"gRPC protoc Dart Client","description":"","frontmatter":{"slug":"grpc-dart","title":"gRPC protoc Dart Client"},"headers":[{"level":2,"title":"Dart protoc generated GrpcServiceClient TodoWorld Example","slug":"dart-protoc-generated-grpcserviceclient-todoworld-example"},{"level":3,"title":"Generate protoc Dart gRPC Client","slug":"generate-protoc-dart-grpc-client"},{"level":3,"title":"Dart protoc gRPC insecure Example","slug":"dart-protoc-grpc-insecure-example"},{"level":3,"title":"Dart protoc gRPC SSL Example","slug":"dart-protoc-grpc-ssl-example"},{"level":3,"title":"Dart Local Development gRPC SSL CRUD Example","slug":"dart-local-development-grpc-ssl-crud-example"},{"level":3,"title":"Dart Server Events gRPC Server Stream Example","slug":"dart-server-events-grpc-server-stream-example"},{"level":3,"title":"Dart gRPC Server Stream Files Example","slug":"dart-grpc-server-stream-files-example"},{"level":3,"title":"Dart gRPC Authenticated Request Example","slug":"dart-grpc-authenticated-request-example"}],"relativePath":"grpc-dart.md","lastUpdated":1645506504352}',p={},e=t(`__VP_STATIC_START__<p><a href="https://youtu.be/fDARSMNlt50" target="_blank" rel="noopener noreferrer"><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/grpc/dart.png" alt=""></a></p><div class="info custom-block"><p class="custom-block-title">YouTube</p><p><a href="https://youtu.be/fDARSMNlt50" target="_blank" rel="noopener noreferrer">youtu.be/fDARSMNlt50</a></p></div><h2 id="dart-protoc-generated-grpcserviceclient-todoworld-example" tabindex="-1">Dart protoc generated GrpcServiceClient TodoWorld Example <a class="header-anchor" href="#dart-protoc-generated-grpcserviceclient-todoworld-example" aria-hidden="true">#</a></h2><p>Install <a href="https://docs.servicestack.net/dotnet-tool" target="_blank" rel="noopener noreferrer">x dotnet tool</a>:</p><div class="language-bash"><pre><code>$ dotnet tool <span class="token function">install</span> --global x 
</code></pre></div><p>Install <a href="https://pub.dev/packages/stagehand" target="_blank" rel="noopener noreferrer">stagehand</a>:</p><div class="language-bash"><pre><code>$ pub global activate stagehand
</code></pre></div><p>Create a new Dart Console App:</p><div class="language-bash"><pre><code>$ stagehand console-full
</code></pre></div><p>Add required dependencies to <strong>pubspec.yaml</strong>:</p><div class="language-yaml"><pre><code><span class="token key atrule">dependencies</span><span class="token punctuation">:</span>
  <span class="token key atrule">fixnum</span><span class="token punctuation">:</span> ^0.10.11
  <span class="token key atrule">async</span><span class="token punctuation">:</span> ^2.2.0
  <span class="token key atrule">protobuf</span><span class="token punctuation">:</span> ^1.0.1
  <span class="token key atrule">grpc</span><span class="token punctuation">:</span> ^2.1.3
</code></pre></div><p>Install dependencies:</p><div class="language-bash"><pre><code>$ pub get
</code></pre></div><h3 id="generate-protoc-dart-grpc-client" tabindex="-1">Generate protoc Dart gRPC Client <a class="header-anchor" href="#generate-protoc-dart-grpc-client" aria-hidden="true">#</a></h3><p>Add protoc generated TodoWorld DTOs and gRPC GrpcServiceClient to <code>lib/</code> folder:</p><div class="language-bash"><pre><code>$ x proto-dart https://todoworld.servicestack.net -out lib
</code></pre></div><h3 id="dart-protoc-grpc-insecure-example" tabindex="-1">Dart protoc gRPC insecure Example <a class="header-anchor" href="#dart-protoc-grpc-insecure-example" aria-hidden="true">#</a></h3><p>Use protoc generated DTOs and <code>GrpcServiceClient</code> to call TodoWorld gRPC Service in <code>bin/main.dart</code>:</p><div class="language-dart"><pre><code><span class="token keyword">import</span> <span class="token string">&#39;dart:io&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">&#39;package:grpc/grpc.dart&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">&#39;package:TodoWorld/services.pb.dart&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">&#39;package:TodoWorld/services.pbgrpc.dart&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> args<span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token punctuation">{</span>

  <span class="token keyword">var</span> client <span class="token operator">=</span> <span class="token class-name">GrpcServicesClient</span><span class="token punctuation">(</span><span class="token class-name">ClientChannel</span><span class="token punctuation">(</span><span class="token string">&#39;todoworld.servicestack.net&#39;</span><span class="token punctuation">,</span> port<span class="token punctuation">:</span><span class="token number">5054</span><span class="token punctuation">,</span>
    options<span class="token punctuation">:</span><span class="token class-name">ChannelOptions</span><span class="token punctuation">(</span>credentials<span class="token punctuation">:</span> <span class="token class-name">ChannelCredentials</span><span class="token punctuation">.</span><span class="token function">insecure</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">var</span> response <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">getHello</span><span class="token punctuation">(</span><span class="token class-name">Hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;gRPC Dart&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">print</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">exit</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Override <code>bin/main.dart</code> with the above Dart Example:</p><div class="language-bash"><pre><code>$ x mix todoworld-dart -out bin
</code></pre></div><p>Run example:</p><div class="language-bash"><pre><code>$ dart run
</code></pre></div><h3 id="dart-protoc-grpc-ssl-example" tabindex="-1">Dart protoc gRPC SSL Example <a class="header-anchor" href="#dart-protoc-grpc-ssl-example" aria-hidden="true">#</a></h3><p>Download TodoWorld SSL Certificate used for its gRPC HTTP/2 Services:</p><div class="language-bash"><pre><code>$ x get https://todoworld.servicestack.net/grpc.crt
</code></pre></div><p>Use certificate when initializing <code>GrpcServicesClient</code>:</p><div class="language-dart"><pre><code><span class="token keyword">import</span> <span class="token string">&#39;dart:io&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">&#39;package:grpc/grpc.dart&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">&#39;package:TodoWorld/services.pb.dart&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">&#39;package:TodoWorld/services.pbgrpc.dart&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> args<span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token punctuation">{</span>

  <span class="token keyword">var</span> client <span class="token operator">=</span> <span class="token class-name">GrpcServicesClient</span><span class="token punctuation">(</span><span class="token class-name">ClientChannel</span><span class="token punctuation">(</span><span class="token string">&#39;todoworld.servicestack.net&#39;</span><span class="token punctuation">,</span> port<span class="token punctuation">:</span><span class="token number">50051</span><span class="token punctuation">,</span>
    options<span class="token punctuation">:</span><span class="token class-name">ChannelOptions</span><span class="token punctuation">(</span>credentials<span class="token punctuation">:</span> <span class="token class-name">ChannelCredentials</span><span class="token punctuation">.</span><span class="token function">secure</span><span class="token punctuation">(</span>
        certificates<span class="token punctuation">:</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">&#39;grpc.crt&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">readAsBytesSync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        authority<span class="token punctuation">:</span> <span class="token string">&#39;todoworld.servicestack.net&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">var</span> response <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">getHello</span><span class="token punctuation">(</span><span class="token class-name">Hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;gRPC Dart&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">print</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">exit</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Override <code>bin/main.dart</code> with the above Dart Example:</p><div class="language-bash"><pre><code>$ x mix todoworld-dart-ssl -out bin
</code></pre></div><p>Run example:</p><div class="language-bash"><pre><code>$ dart run
</code></pre></div><h3 id="dart-local-development-grpc-ssl-crud-example" tabindex="-1">Dart Local Development gRPC SSL CRUD Example <a class="header-anchor" href="#dart-local-development-grpc-ssl-crud-example" aria-hidden="true">#</a></h3><div class="language-dart"><pre><code><span class="token keyword">import</span> <span class="token string">&#39;dart:convert&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">&#39;dart:io&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">&#39;package:grpc/grpc.dart&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">&#39;package:todoworld/services.pb.dart&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">&#39;package:todoworld/services.pbgrpc.dart&#39;</span><span class="token punctuation">;</span>

<span class="token class-name">GrpcServicesClient</span> <span class="token function">createClient</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">CallOptions</span> options<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token class-name">GrpcServicesClient</span><span class="token punctuation">(</span><span class="token class-name">ClientChannel</span><span class="token punctuation">(</span><span class="token string">&#39;localhost&#39;</span><span class="token punctuation">,</span> port<span class="token punctuation">:</span><span class="token number">5001</span><span class="token punctuation">,</span>
    options<span class="token punctuation">:</span><span class="token class-name">ChannelOptions</span><span class="token punctuation">(</span>credentials<span class="token punctuation">:</span> <span class="token class-name">ChannelCredentials</span><span class="token punctuation">.</span><span class="token function">secure</span><span class="token punctuation">(</span>
        certificates<span class="token punctuation">:</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">&#39;../certs/dev.crt&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">readAsBytesSync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        authority<span class="token punctuation">:</span> <span class="token string">&#39;localhost&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> options<span class="token punctuation">:</span>options<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> args<span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token punctuation">{</span>

  <span class="token keyword">var</span> client <span class="token operator">=</span> <span class="token function">createClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">postResetTodos</span><span class="token punctuation">(</span><span class="token class-name">ResetTodos</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">//POST /todos</span>
  <span class="token keyword">var</span> todo <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">postCreateTodo</span><span class="token punctuation">(</span><span class="token class-name">CreateTodo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token string">&#39;ServiceStack&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>result<span class="token punctuation">;</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&#39;new todo Id: \${todo.id}, Title: \${todo.title}&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">//GET /todos</span>
  <span class="token keyword">var</span> all <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">callGetTodos</span><span class="token punctuation">(</span><span class="token class-name">GetTodos</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&#39;todos: \${all.results.length}&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">//GET /todos/1</span>
  todo <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">callGetTodo</span><span class="token punctuation">(</span><span class="token class-name">GetTodo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">.</span>id <span class="token operator">=</span> todo<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>result<span class="token punctuation">;</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&#39;get todo Id: \${todo.id}, Title: \${todo.title}&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">//PUT /todos/1</span>
  <span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">putUpdateTodo</span><span class="token punctuation">(</span><span class="token class-name">UpdateTodo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">.</span>id <span class="token operator">=</span> todo<span class="token punctuation">.</span>id<span class="token punctuation">.</span><span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token string">&#39;gRPC&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">//GET /todos/1</span>
  todo <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">callGetTodo</span><span class="token punctuation">(</span><span class="token class-name">GetTodo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">.</span>id <span class="token operator">=</span> todo<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>result<span class="token punctuation">;</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&#39;get todo Id: \${todo.id}, Title: \${todo.title}&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">//DELETE /todos/1</span>
  <span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">callDeleteTodo</span><span class="token punctuation">(</span><span class="token class-name">DeleteTodo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">.</span>id <span class="token operator">=</span> todo<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">//GET /todos</span>
  all <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">callGetTodos</span><span class="token punctuation">(</span><span class="token class-name">GetTodos</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&#39;todos: \${all.results.length}&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token punctuation">}</span>
</code></pre></div><h3 id="dart-server-events-grpc-server-stream-example" tabindex="-1">Dart Server Events gRPC Server Stream Example <a class="header-anchor" href="#dart-server-events-grpc-server-stream-example" aria-hidden="true">#</a></h3><p>Consume <a href="https://docs.servicestack.net/server-events" target="_blank" rel="noopener noreferrer">ServiceStack Server Events</a> from gRPC Server Stream API:</p><div class="language-dart"><pre><code><span class="token keyword">var</span> stream <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">serverStreamServerEvents</span><span class="token punctuation">(</span><span class="token class-name">StreamServerEvents</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">.</span>channels<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&#39;todos&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">await</span> <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> r <span class="token keyword">in</span> stream<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token function">jsonDecode</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span>json<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>r<span class="token punctuation">.</span>selector<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">&#39;todos&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>obj <span class="token operator">is</span> <span class="token class-name">Map</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&#39;EVENT \${r.selector} [\${r.channel}]: #\${obj[&#39;</span>id<span class="token string">&#39;]} \${obj[&#39;</span>title<span class="token string">&#39;]}&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&#39;EVENT \${r.selector} [\${r.channel}]: \${obj}&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&#39;EVENT \${r.selector} \${r.channels}: #\${obj[&#39;</span>userId<span class="token string">&#39;]} \${obj[&#39;</span>displayName<span class="token string">&#39;]}&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="dart-grpc-server-stream-files-example" tabindex="-1">Dart gRPC Server Stream Files Example <a class="header-anchor" href="#dart-grpc-server-stream-files-example" aria-hidden="true">#</a></h3><div class="language-dart"><pre><code><span class="token keyword">var</span> stream <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">serverStreamFiles</span><span class="token punctuation">(</span><span class="token class-name">StreamFiles</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">.</span>paths<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
  <span class="token string">&#39;/js/ss-utils.js&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;/js/hot-loader.js&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;/js/hot-fileloader.js&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">await</span> <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> file <span class="token keyword">in</span> stream<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> text <span class="token operator">=</span> utf8<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span>body<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&#39;FILE \${file.name} (\${file.length}): \${text.substring(0, text.length &lt; 50 ? text.length : 50)} ...&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="dart-grpc-authenticated-request-example" tabindex="-1">Dart gRPC Authenticated Request Example <a class="header-anchor" href="#dart-grpc-authenticated-request-example" aria-hidden="true">#</a></h3><p>Depending on what Authentication Providers are available will determine how you can Authenticate and whether the <code>AuthenticateResponse</code> will return a <a href="/authentication-and-authorization#authentication-per-request-auth-providers">stateless Bearer Token</a> that can be used to Authenticate instead of a Server Session Id.</p><p>Here&#39;s an example of authenticating with the common Credentials Auth and authenticating with either the <a href="/sessions">Session Id</a> or JWT Bearer Token (if <a href="/jwt-authprovider">JWT is enabled</a>):</p><div class="language-dart"><pre><code><span class="token comment">// Authenticate user Username/Password Credentials Auth</span>
<span class="token keyword">var</span> authResponse <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">postAuthenticate</span><span class="token punctuation">(</span><span class="token class-name">Authenticate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">.</span>provider<span class="token operator">=</span><span class="token string">&#39;credentials&#39;</span>
  <span class="token punctuation">.</span><span class="token punctuation">.</span>userName<span class="token operator">=</span>userOrEmail<span class="token punctuation">.</span><span class="token punctuation">.</span>password<span class="token operator">=</span>password<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// If using Session Auth</span>
<span class="token keyword">var</span> authClient <span class="token operator">=</span> <span class="token function">createClient</span><span class="token punctuation">(</span>options<span class="token punctuation">:</span><span class="token class-name">CallOptions</span><span class="token punctuation">(</span>metadata<span class="token punctuation">:</span><span class="token punctuation">{</span> <span class="token string">&#39;X-ss-id&#39;</span><span class="token punctuation">:</span> authResponse<span class="token punctuation">.</span>sessionId <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// If using Bearer Token stateless Auth Providers (e.g. JWT or API Key):</span>
<span class="token keyword">const</span> bearerToken <span class="token operator">=</span> authResponse<span class="token punctuation">.</span>bearerToken<span class="token punctuation">;</span> <span class="token comment">// or JWT or API Key</span>
<span class="token keyword">var</span> authClient <span class="token operator">=</span> <span class="token function">createClient</span><span class="token punctuation">(</span>options<span class="token punctuation">:</span><span class="token class-name">CallOptions</span><span class="token punctuation">(</span>metadata<span class="token punctuation">:</span><span class="token punctuation">{</span> <span class="token string">&#39;Authorization&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;Bearer \${bearerToken}&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Use authClient to make Authenticated Requests:</span>
<span class="token keyword">var</span> response <span class="token operator">=</span> <span class="token keyword">await</span> authClient<span class="token punctuation">.</span><span class="token function">getHelloSecure</span><span class="token punctuation">(</span><span class="token class-name">HelloSecure</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;Authenticated gRPC Dart!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">print</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Refer to <a href="https://github.com/NetCoreApps/todo-world/tree/master/src/clients/dart" target="_blank" rel="noopener noreferrer">/src/clients/dart</a> for a complete example project.</p>__VP_STATIC_END__`,44),o=[e];function c(l,u,i,r,k,d){return a(),s("div",null,o)}var h=n(p,[["render",c]]);export{m as __pageData,h as default};
