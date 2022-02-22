import{_ as a,c as e,o as t,a as s,b as n}from"./app.64b20f26.js";const w=`{"title":"Install RabbitMQ on Windows and .NET","description":"","frontmatter":{"title":"Install RabbitMQ on Windows and .NET"},"headers":[{"level":2,"title":"Installing on Windows","slug":"installing-on-windows"},{"level":3,"title":"Enable Rabbit MQ's Management Plugin","slug":"enable-rabbit-mq-s-management-plugin"},{"level":2,"title":"Usage from .NET","slug":"usage-from-net"},{"level":3,"title":"Declare durable Exchange and Queue","slug":"declare-durable-exchange-and-queue"},{"level":3,"title":"Publishing a persistent message to a queue","slug":"publishing-a-persistent-message-to-a-queue"},{"level":3,"title":"Receiving Messages","slug":"receiving-messages"},{"level":3,"title":"Processing multiple messages using a subscription","slug":"processing-multiple-messages-using-a-subscription"}],"relativePath":"install-rabbitmq-windows.md","lastUpdated":1645506505248}`,p={},o=s(`<p><a href="http://www.rabbitmq.com" target="_blank" rel="noopener noreferrer">Rabbit MQ</a> is a popular industrial strength open source implementation of the <a href="http://www.amqp.org" target="_blank" rel="noopener noreferrer">AMQP messaging protocol</a> for communicating with message queue middleware that runs on all major operating systems.</p><h2 id="installing-on-windows" tabindex="-1">Installing on Windows <a class="header-anchor" href="#installing-on-windows" aria-hidden="true">#</a></h2><p>Rabbit MQ is built on the robust Erlang OTP platform which is a prerequisite for installing Rabbit MQ Server, both are downloadable at:</p><ol><li>Download and install <a href="http://www.erlang.org/download/otp_win32_R16B03.exe" target="_blank" rel="noopener noreferrer">Erlang OTP For Windows</a> (vR16B03)</li><li>Run the <a href="http://www.rabbitmq.com/releases/rabbitmq-server/v3.2.3/rabbitmq-server-3.2.3.exe" target="_blank" rel="noopener noreferrer">Rabbit MQ Server Windows Installer</a> (v3.2.3)</li></ol><p>The windows installer will download, install and run the Rabbit MQ Server Windows Service listening for AMQP clients at the default port: <strong>5672</strong>.</p><h3 id="enable-rabbit-mq-s-management-plugin" tabindex="-1">Enable <a href="http://www.rabbitmq.com/management.html" target="_blank" rel="noopener noreferrer">Rabbit MQ&#39;s Management Plugin</a> <a class="header-anchor" href="#enable-rabbit-mq-s-management-plugin" aria-hidden="true">#</a></h3><p>To provide better visibility of the state of the Rabbit MQ Server instance it&#39;s highly recommended to enable <a href="http://www.rabbitmq.com/management.html" target="_blank" rel="noopener noreferrer">Rabbit MQ&#39;s Management Plugin</a> which you can do on the command line with:</p><div class="language-bash"><pre><code><span class="token string">&quot;C:\\Program Files (x86)\\RabbitMQ Server<span class="token entity" title="\\r">\\r</span>abbitmq_server-3.2.3\\sbin<span class="token entity" title="\\r">\\r</span>abbitmq-plugins.bat&quot;</span> <span class="token builtin class-name">enable</span> rabbitmq_management
</code></pre></div><p>To see the new changes you need to restart the <strong>RabbitMQ</strong> Windows Service which can be done on the command line with:</p><div class="language-bash"><pre><code>$ net stop RabbitMQ <span class="token operator">&amp;&amp;</span> net start RabbitMQ
</code></pre></div><p>Or by restarting the service from the <strong>services.msc</strong> MMC applet UI:</p><ol><li>Open Windows Run dialog by pressing the <strong>Windows + R</strong> key:</li></ol><p><img src="https://raw.github.com/mythz/rabbitmq-windows/master/img/run-services.png" alt="Windows Run Dialog"></p><ol start="2"><li>Select the <strong>RabbitMQ</strong> Windows Service and click the Restart Icon:</li></ol><p><img src="https://raw.github.com/mythz/rabbitmq-windows/master/img/rabbitmq-service.png" alt="RabbitMQ Windows Service"></p><p>Once restarted, open the Rabbit MQ&#39;s management UI with a web browser at: <code>http://localhost:15672</code> to see an overview of the state of the Rabbit MQ server instance:</p><p><img src="https://raw.github.com/mythz/rabbitmq-windows/master/img/rabbitmq-management-ui.png" alt="RabbitMQ Management UI"></p><h2 id="usage-from-net" tabindex="-1">Usage from .NET <a class="header-anchor" href="#usage-from-net" aria-hidden="true">#</a></h2><p>To use Rabbit MQ from .NET get Rabbit MQ&#39;s <a href="https://www.nuget.org/packages/RabbitMQ.Client" target="_blank" rel="noopener noreferrer">.NET client bindings from NuGet</a>:</p>`,19),c=n("div",{class:"nuget-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[n("div",{class:"flex-grow bg-gray-700"},[n("div",{class:"pl-4 py-1 pb-1.5 align-middle text-lg text-white"},[n("p",null,[n("code",null,'<PackageReference Include="RabbitMQ.Client" Version="6.*" />')])])]),n("div",{class:"flex"},[n("div",{class:"bg-sky-500 text-white p-1.5 pb-0"},[n("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[n("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),n("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[n("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),u=s(`<p>With the package installed, we can go through a common scenario of sending and receiving durable messages with Rabbit MQ.</p><p>See <a href="https://github.com/mythz/rabbitmq-windows/blob/master/src/RabbitMq.Tests/RabbitMqTests.cs" target="_blank" rel="noopener noreferrer">RabbitMqTests.cs</a> in this repo, for runnable samples of this walkthru below:</p><h3 id="declare-durable-exchange-and-queue" tabindex="-1">Declare durable Exchange and Queue <a class="header-anchor" href="#declare-durable-exchange-and-queue" aria-hidden="true">#</a></h3><p>Firstly, you will need to register the type of Exchange and Queue before you can use them. To create a durable work queue, create a durable &quot;direct&quot; exchange and bind a durable queue to it, e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">string</span></span> ExchangeName <span class="token operator">=</span> <span class="token string">&quot;test.exchange&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">string</span></span> QueueName <span class="token operator">=</span> <span class="token string">&quot;test.queue&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name">IConnection</span> conn <span class="token operator">=</span> rabbitMqFactory<span class="token punctuation">.</span><span class="token function">CreateConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name">IModel</span> channel <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">CreateModel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    channel<span class="token punctuation">.</span><span class="token function">ExchangeDeclare</span><span class="token punctuation">(</span>ExchangeName<span class="token punctuation">,</span> <span class="token string">&quot;direct&quot;</span><span class="token punctuation">,</span> <span class="token named-parameter punctuation">durable</span><span class="token punctuation">:</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token named-parameter punctuation">autoDelete</span><span class="token punctuation">:</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token named-parameter punctuation">arguments</span><span class="token punctuation">:</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                
    channel<span class="token punctuation">.</span><span class="token function">QueueDeclare</span><span class="token punctuation">(</span>QueueName<span class="token punctuation">,</span> <span class="token named-parameter punctuation">durable</span><span class="token punctuation">:</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token named-parameter punctuation">exclusive</span><span class="token punctuation">:</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token named-parameter punctuation">autoDelete</span><span class="token punctuation">:</span><span class="token boolean">false</span><span class="token punctuation">,</span><span class="token named-parameter punctuation">arguments</span><span class="token punctuation">:</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    channel<span class="token punctuation">.</span><span class="token function">QueueBind</span><span class="token punctuation">(</span>QueueName<span class="token punctuation">,</span> ExchangeName<span class="token punctuation">,</span> <span class="token named-parameter punctuation">routingKey</span><span class="token punctuation">:</span> QueueName<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>In this example we&#39;ll also reuse the QueueName for the <strong>routing key</strong> which will enable directly sending messages to a specific queue.</p><p>The registration code only needs to be run once to register and configure the Exchange and Queue we&#39;ll be using in the remaining examples. Once run, go back to the Management UI to see the new <strong>test.exchange</strong> Exchange with a binding to the newly created <strong>test.queue</strong>:</p><p><img src="https://raw.github.com/mythz/rabbitmq-windows/master/img/ui-testexchange.png" alt="UI - Test Exchange"></p><h3 id="publishing-a-persistent-message-to-a-queue" tabindex="-1">Publishing a persistent message to a queue <a class="header-anchor" href="#publishing-a-persistent-message-to-a-queue" aria-hidden="true">#</a></h3><p>Once the exchange and queue is setup we can start publishing messages to it. Rabbit MQ lets you send messages with any arbitrary <code>byte[]</code> body, for text messages you should send them as UTF8 bytes. To ensure the message is persistent across Rabbit MQ Server starts you will want to mark the message as persistent as seen below:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> props <span class="token operator">=</span> channel<span class="token punctuation">.</span><span class="token function">CreateBasicProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
props<span class="token punctuation">.</span><span class="token function">SetPersistent</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> msgBody <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
channel<span class="token punctuation">.</span><span class="token function">BasicPublish</span><span class="token punctuation">(</span>ExchangeName<span class="token punctuation">,</span> <span class="token named-parameter punctuation">routingKey</span><span class="token punctuation">:</span>QueueName<span class="token punctuation">,</span> <span class="token named-parameter punctuation">basicProperties</span><span class="token punctuation">:</span>props<span class="token punctuation">,</span> <span class="token named-parameter punctuation">body</span><span class="token punctuation">:</span>msgBody<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>The routing key will ensure that a copy of the message is delievered to the <strong>test.queue</strong> which you can see in the Admin UI:</p><p><img src="https://raw.github.com/mythz/rabbitmq-windows/master/img/ui-testqueue.png" alt="UI - Test Queue"></p><h3 id="receiving-messages" tabindex="-1">Receiving Messages <a class="header-anchor" href="#receiving-messages" aria-hidden="true">#</a></h3><p>There are a couple of different ways you can read published messages from the queue, the most straightforward way is to use <code>BasicGet</code>:</p><div class="language-csharp"><pre><code><span class="token class-name">BasicGetResult</span> msgResponse <span class="token operator">=</span> channel<span class="token punctuation">.</span><span class="token function">BasicGet</span><span class="token punctuation">(</span>QueueName<span class="token punctuation">,</span> <span class="token named-parameter punctuation">noAck</span><span class="token punctuation">:</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> msgBody <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>msgResponse<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span>
msgBody <span class="token comment">//Hello, World!</span>
</code></pre></div><p>The <code>noAck:true</code> flag tells Rabbit MQ to immediately remove the message from the queue.</p><p>Another popular use-case is to only send acknowledgement (and remove it from the queue) after you&#39;ve successfully accepted the message, which can be done with a separate call to <code>BasicAck</code>:</p><div class="language-csharp"><pre><code><span class="token class-name">BasicGetResult</span> msgResponse <span class="token operator">=</span> channel<span class="token punctuation">.</span><span class="token function">BasicGet</span><span class="token punctuation">(</span>QueueName<span class="token punctuation">,</span> <span class="token named-parameter punctuation">noAck</span><span class="token punctuation">:</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//process message ...</span>

channel<span class="token punctuation">.</span><span class="token function">BasicAck</span><span class="token punctuation">(</span>msgResponse<span class="token punctuation">.</span>DeliveryTag<span class="token punctuation">,</span> <span class="token named-parameter punctuation">multiple</span><span class="token punctuation">:</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>An alternate way to consume messages is via a push-based event subscription. You can use the built-in <code>QueueingBasicConsumer</code> to provide a simplified programming model by allowing you to block on a Shared Queue until a message is received, e.g:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> consumer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">QueueingBasicConsumer</span><span class="token punctuation">(</span>channel<span class="token punctuation">)</span><span class="token punctuation">;</span>
channel<span class="token punctuation">.</span><span class="token function">BasicConsume</span><span class="token punctuation">(</span>QueueName<span class="token punctuation">,</span> <span class="token named-parameter punctuation">noAck</span><span class="token punctuation">:</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token named-parameter punctuation">consumer</span><span class="token punctuation">:</span>consumer<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> msgResponse <span class="token operator">=</span> consumer<span class="token punctuation">.</span>Queue<span class="token punctuation">.</span><span class="token function">Dequeue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//blocking</span>

<span class="token class-name"><span class="token keyword">var</span></span> msgBody <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>msgResponse<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span>
msgBody <span class="token comment">//Hello, World!</span>
</code></pre></div><h3 id="processing-multiple-messages-using-a-subscription" tabindex="-1">Processing multiple messages using a subscription <a class="header-anchor" href="#processing-multiple-messages-using-a-subscription" aria-hidden="true">#</a></h3><p>The Shared Queue will block until it receives a message or the channel it&#39;s assigned to is closed which causes it to throw an <code>EndOfStreamException</code>. With this, you can setup a long-running background thread to continually process multiple messages in an infinite loop until the Queue is closed.</p><p>The sample below shows an example of this in action which publishes 5 messages on a separate thread before closing the channel the subscription is bound to causing an <strong>EndOfStreamException</strong> to be thrown, ending the subscription and exiting the loop:</p><div class="language-csharp"><pre><code><span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name">IConnection</span> conn <span class="token operator">=</span> rabbitMqFactory<span class="token punctuation">.</span><span class="token function">CreateConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name">IModel</span> channel <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">CreateModel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> consumer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">QueueingBasicConsumer</span><span class="token punctuation">(</span>channel<span class="token punctuation">)</span><span class="token punctuation">;</span>
    channel<span class="token punctuation">.</span><span class="token function">BasicConsume</span><span class="token punctuation">(</span>QueueName<span class="token punctuation">,</span> <span class="token named-parameter punctuation">noAck</span><span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token named-parameter punctuation">consumer</span><span class="token punctuation">:</span> consumer<span class="token punctuation">)</span><span class="token punctuation">;</span>

    ThreadPool<span class="token punctuation">.</span><span class="token function">QueueUserWorkItem</span><span class="token punctuation">(</span>_ <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">var</span></span> now <span class="token operator">=</span> DateTime<span class="token punctuation">.</span>UtcNow<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>DateTime<span class="token punctuation">.</span>UtcNow <span class="token operator">-</span> now <span class="token operator">&lt;</span> TimeSpan<span class="token punctuation">.</span><span class="token function">FromSeconds</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">var</span></span> props <span class="token operator">=</span> channel<span class="token punctuation">.</span><span class="token function">CreateBasicProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            props<span class="token punctuation">.</span><span class="token function">SetPersistent</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name"><span class="token keyword">var</span></span> msgBody <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            channel<span class="token punctuation">.</span><span class="token function">BasicPublish</span><span class="token punctuation">(</span>ExchangeName<span class="token punctuation">,</span> <span class="token named-parameter punctuation">routingKey</span><span class="token punctuation">:</span>QueueName<span class="token punctuation">,</span> <span class="token named-parameter punctuation">basicProperties</span><span class="token punctuation">:</span>props<span class="token punctuation">,</span> 
                <span class="token named-parameter punctuation">body</span><span class="token punctuation">:</span>msgBody<span class="token punctuation">)</span><span class="token punctuation">;</span>

            Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        channel<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">var</span></span> msgResponse <span class="token operator">=</span> consumer<span class="token punctuation">.</span>Queue<span class="token punctuation">.</span><span class="token function">Dequeue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//blocking</span>

            <span class="token class-name"><span class="token keyword">var</span></span> msgBody <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>msgResponse<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span>

            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Received Message: &quot;</span> <span class="token operator">+</span> msgBody<span class="token punctuation">)</span><span class="token punctuation">;</span>

            Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">EndOfStreamException</span> ex<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Channel was closed, Exiting...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>The complete source of these examples are available in the stand-alone <a href="https://github.com/mythz/rabbitmq-windows/blob/master/src/RabbitMq.Tests/RabbitMqTests.cs" target="_blank" rel="noopener noreferrer">RabbitMqTests.cs</a>.</p>`,26),i=[o,c,u];function l(r,k,d,m,g,h){return t(),e("div",null,i)}var f=a(p,[["render",l]]);export{w as __pageData,f as default};
