import{_ as t,c as e,o as s,a as o}from"./app.64b20f26.js";const f='{"title":"Cross platform dotnet scripts","description":"","frontmatter":{"slug":"templates-dotnet-scripts","title":"Cross platform dotnet scripts"},"headers":[{"level":3,"title":"No formal task solution in dotnet projects","slug":"no-formal-task-solution-in-dotnet-projects"},{"level":3,"title":"Using npm scripts","slug":"using-npm-scripts"},{"level":3,"title":"What about .NET Apps?","slug":"what-about-net-apps"},{"level":3,"title":"Using dotnet tools to run package.json scripts","slug":"using-dotnet-tools-to-run-package-json-scripts"},{"level":3,"title":"Cross platform scripts","slug":"cross-platform-scripts"},{"level":3,"title":"Shell Script Methods","slug":"shell-script-methods"}],"relativePath":"templates-dotnet-scripts.md","lastUpdated":1645506505304}',r={},a=o(`<p>Often most of our <a href="/dotnet-new">Project Templates</a> need to include scripts to perform different tasks utilized in each project type, e.g. for generating DTOs, running a dev server, publishing release builds, etc.</p><p>To surface these common tasks to the developer we initially used Gulp and Grunt JS Tasks so they would show up in <a href="https://marketplace.visualstudio.com/items?itemName=MadsKristensen.TaskRunnerExplorer" target="_blank" rel="noopener noreferrer">VS .NET&#39;s Task Runner Explorer UI</a> however this has become dated over time with both Grunt &amp; Gulp.js seeing their usage decline in favor of more advanced build systems like <a href="https://webpack.js.org" target="_blank" rel="noopener noreferrer">Webpack</a> and <a href="https://rollupjs.org" target="_blank" rel="noopener noreferrer">rollup.js</a> and at the other end targeting to a single IDE like <a href="http://VS.NET" target="_blank" rel="noopener noreferrer">VS.NET</a> no longer makes sense in a post .NET 6 world which needs to support for multiple platforms and IDEs.</p><h3 id="no-formal-task-solution-in-dotnet-projects" tabindex="-1">No formal task solution in dotnet projects <a class="header-anchor" href="#no-formal-task-solution-in-dotnet-projects" aria-hidden="true">#</a></h3><p>Unfortunately .NET doesn&#39;t have a formal way to define common tasks for a project as custom XML MS Build tasks are to clunky and hidden to be useful and littering your project with multiple <code>.bat</code> and <code>.sh</code> scripts for each task is tacky in a modern development workflow.</p><h3 id="using-npm-scripts" tabindex="-1">Using npm scripts <a class="header-anchor" href="#using-npm-scripts" aria-hidden="true">#</a></h3><p>As this use-case is <a href="https://css-tricks.com/why-npm-scripts/" target="_blank" rel="noopener noreferrer">well covered in npm</a> using <a href="https://docs.npmjs.com/cli/v7/using-npm/scripts" target="_blank" rel="noopener noreferrer">npm scripts</a>, the natural choice for our <a href="/templates-single-page-apps">Single Page App Project Templates</a> (which require npm) is to use npm scripts in <a href="https://github.com/NetCoreTemplates/vue-spa/blob/master/MyApp/package.json" target="_blank" rel="noopener noreferrer">package.json</a>:</p><p><img src="https://docs.servicestack.net/images/templates/packagejson-scripts.png" alt=""></p><p>Thanks to Node.js&#39;s popularity this convention available in all node installations is both ubiquitous &amp; UX friendly as every developer knows where to look to find tasks available for each project, how each script is implemented, sorted in the order in which they&#39;re generally run and all executed the same way with <code>npm run</code>, e.g:</p><div class="language-bash"><pre><code>$ <span class="token function">npm</span> run dtos
</code></pre></div><p>As this default convention is so prevalent it has the advantage that modern IDEs like <a href="https://www.jetbrains.com/rider/" target="_blank" rel="noopener noreferrer">Rider</a> includes UI support where each task can be directly in the UI.</p><h3 id="what-about-net-apps" tabindex="-1">What about .NET Apps? <a class="header-anchor" href="#what-about-net-apps" aria-hidden="true">#</a></h3><p>Without a better alternative available to .NET projects we&#39;ve also resorted to using npm scripts for our project templates that don&#39;t use npm like our <a href="https://www.vuedesktop.com" target="_blank" rel="noopener noreferrer">vuedesktop.com</a> project template which only uses <a href="https://github.com/NetCoreTemplates/vue-desktop/blob/master/package.json" target="_blank" rel="noopener noreferrer">package.json</a> to maintain scripts of its built-in functionality:</p><p><img src="https://docs.servicestack.net/images/templates/packagejson-scripts-vuedesktop.png" alt=""></p><p>Where they can be run from Rider&#39;s IDE or using npm&#39;s <code>run</code>.</p><h3 id="using-dotnet-tools-to-run-package-json-scripts" tabindex="-1">Using dotnet tools to run package.json scripts <a class="header-anchor" href="#using-dotnet-tools-to-run-package-json-scripts" aria-hidden="true">#</a></h3><p>Whilst we can assume <strong>node</strong> to be a ubiquitous dependency installed on most Developer workstations, it may not be available in all environments like CI build agents, Docker containers, new VM workspaces, etc.</p><p>So if we&#39;re going to standardize on <strong>package.json</strong> scripts for encapsulating a project template&#39;s functionality we thought it also prudent to offer a .NET only solution to support environments where an npm dependency is not desirable, so we&#39;ve added support for executing npm package.json scripts in our <a href="/dotnet-tool">x</a> and <a href="/netcore-windows-desktop">app</a> dotnet tools using <code>x script</code>, e.g:</p><div class="language-bash"><pre><code>$ x scripts dtos
</code></pre></div><p>That&#39;s also available from the more wrist-friendly alias <code>x s</code>, e.g:</p><div class="language-bash"><pre><code>$ x s dtos
$ app s dtos
</code></pre></div><p>Which can be used interchangeably with <code>npm run</code> to execute command scripts on Windows and <code>bash</code> scripts on macOS and Linux or WSL.</p><h3 id="cross-platform-scripts" tabindex="-1">Cross platform scripts <a class="header-anchor" href="#cross-platform-scripts" aria-hidden="true">#</a></h3><p>Whilst we now have a pure .NET alternative for running <strong>package.json</strong> scripts should we need it, we still have the issue of maintaining scripts to support multiple platforms. Most of the time this isn&#39;t an issue when calling cross-platform tools like <code>x</code> or <code>tsc</code> which supports the same command syntax on all platforms, but it starts to become an issue if also needing to perform some file operations.</p><p>An example of this is the script to generate JS DTOs in our <a href="/create-your-first-webservice#dependency-free-jsonserviceclient--typed-dtos-in-web-pages">pure JS dep-free Project templates</a> which uses TypeScript to transpile the DTOs then needs to move the generated <code>dtos.js</code> to <code>wwwroot</code>. If only needing to support Windows the script would simply be:</p><div class="language-json"><pre><code><span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;dtos&quot;</span><span class="token operator">:</span> <span class="token string">&quot;x ts &amp;&amp; tsc -m umd dtos.ts &amp;&amp; move dtos.js wwwroot/dtos.js&quot;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>But we&#39;d need to have a different script that uses <code>mv</code> to support macOS &amp; Linux, we could maintain a separate script per platform, e.g:</p><div class="language-json"><pre><code><span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;dtos:win&quot;</span><span class="token operator">:</span>  <span class="token string">&quot;x ts &amp;&amp; tsc -m umd dtos.ts &amp;&amp; move dtos.js wwwroot/dtos.js&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;dtos:unix&quot;</span><span class="token operator">:</span> <span class="token string">&quot;x ts &amp;&amp; tsc -m umd dtos.ts &amp;&amp; mv dtos.js wwwroot/dtos.js&quot;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>But then anything calling it would also need to be platform specific including docs needing to having to differentiate between which platform-specific scripts to run.</p><p>One solution is to evaluate a node expression that performs the required file operations, e.g:</p><div class="language-json"><pre><code><span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;dtos&quot;</span><span class="token operator">:</span> <span class="token string">&quot;x ts &amp;&amp; tsc -m umd dtos.ts &amp;&amp; node -e \\&quot;require(&#39;fs&#39;).renameSync(&#39;dtos.js&#39;,&#39;wwwroot/dtos.js&#39;)\\&quot;&quot;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>In a similar vein we can also evaluate a <a href="https://sharpscript.net" target="_blank" rel="noopener noreferrer">#Script Expression</a> to perform the cross-platform operations, e.g:</p><div class="language-json"><pre><code><span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;dtos&quot;</span><span class="token operator">:</span> <span class="token string">&quot;x ts &amp;&amp; tsc -m umd dtos.ts &amp;&amp; x -e \\&quot;mv(&#39;dtos.js&#39;,&#39;wwwroot/dtos.js&#39;)\\&quot;&quot;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Which our latest templates have adopted, that can be run with either <code>npm run</code>, <code>x scripts</code> or its <code>x s</code> alias:</p><div class="language-bash"><pre><code>$ <span class="token function">npm</span> run dtos
$ x scripts dtos
$ x s dtos
</code></pre></div><h3 id="shell-script-methods" tabindex="-1">Shell Script Methods <a class="header-anchor" href="#shell-script-methods" aria-hidden="true">#</a></h3><p><code>#Script</code> lets you evaluate <a href="https://sharpscript.net/docs/scripts-reference" target="_blank" rel="noopener noreferrer">1000+ .NET #Script Methods</a> using <a href="https://sharpscript.net/docs/syntax" target="_blank" rel="noopener noreferrer">JavaScript syntax</a> including a number of common Windows and Bash shell commands:</p><table><thead><tr><th>#Script</th><th>Windows</th><th>Unix</th></tr></thead><tbody><tr><td>mv(from,to)</td><td>MOVE /Y from to</td><td>mv -f from to</td></tr><tr><td>cp(from,to)</td><td>COPY /Y from to</td><td>cp -f from to</td></tr><tr><td>xcopy(from,to)</td><td>XCOPY /E /H from to</td><td>cp -R from to</td></tr><tr><td>rm(from,to)</td><td>DEL /Y from to</td><td>rm -f from to</td></tr><tr><td>rmdir(target)</td><td>RMDIR /Q /S target</td><td>rm -rf target</td></tr><tr><td>mkdir(target)</td><td>MKDIR target</td><td>mkdir -p target</td></tr><tr><td>cat(target)</td><td>type target</td><td>cat target</td></tr><tr><td>touch(target)</td><td>CALL &gt;&gt; target</td><td>touch target</td></tr></tbody></table><p>Using Unix <code>/</code> Path separators are replaced to use <code>\\</code> in Windows commands.</p><h4 id="file-and-directory-apis" tabindex="-1">File and Directory APIs <a class="header-anchor" href="#file-and-directory-apis" aria-hidden="true">#</a></h4><p>Alternatively you can also call .NET&#39;s <a href="https://docs.microsoft.com/en-us/dotnet/api/system.io.file" target="_blank" rel="noopener noreferrer">File</a> and <a href="https://docs.microsoft.com/en-us/dotnet/api/system.io.directory" target="_blank" rel="noopener noreferrer">Directory</a> static methods, e.g:</p><div class="language-json"><pre><code><span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;dtos&quot;</span><span class="token operator">:</span> <span class="token string">&quot;x ts &amp;&amp; tsc -m umd dtos.ts &amp;&amp; x -e \\&quot;File.Move(&#39;dtos.js&#39;,&#39;wwwroot/dtos.js&#39;)\\&quot;&quot;</span>
<span class="token punctuation">}</span>
</code></pre></div><table><thead><tr><th>#Script</th></tr></thead><tbody><tr><td>File.Copy(from,to)</td></tr><tr><td>File.Create(path)</td></tr><tr><td>File.Decrypt(path)</td></tr><tr><td>File.Delete(path)</td></tr><tr><td>File.Encrypt(path)</td></tr><tr><td>File.Exists(path)</td></tr><tr><td>File.Move(from,to)</td></tr><tr><td>File.Replace(from,to,backup)</td></tr><tr><td>File.ReadAllBytes(path)</td></tr><tr><td>File.ReadAllLines(path)</td></tr><tr><td>File.ReadAllText(path)</td></tr><tr><td>File.WriteAllBytes(path,bytes)</td></tr><tr><td>File.WriteAllLines(path,lines)</td></tr><tr><td>File.WriteAllText(path,text)</td></tr><tr><td>File.AppendAllLines(path,lines)</td></tr><tr><td>File.AppendAllText(path,text)</td></tr><tr><td>Directory.CreateDirectory(path)</td></tr><tr><td>Directory.Delete(path)</td></tr><tr><td>Directory.Exists(path)</td></tr><tr><td>Directory.GetDirectories(path)</td></tr><tr><td>Directory.GetFiles(path)</td></tr><tr><td>Directory.GetLogicalDrives()</td></tr><tr><td>Directory.GetFileSystemEntries(path)</td></tr><tr><td>Directory.GetParent(path)</td></tr><tr><td>Directory.GetCurrentDirectory()</td></tr><tr><td>Directory.GetDirectoryRoot(path)</td></tr><tr><td>Directory.Move(from,to)</td></tr><tr><td>Directory.Copy(from,to)</td></tr></tbody></table>`,42),n=[a];function p(i,d,c,l,u,h){return s(),e("div",null,n)}var g=t(r,[["render",p]]);export{f as __pageData,g as default};
