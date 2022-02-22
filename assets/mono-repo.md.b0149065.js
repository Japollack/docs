import{_ as e,c as r,o as t,a}from"./app.64b20f26.js";const v='{"title":"ServiceStack Mono Repo","description":"","frontmatter":{"title":"ServiceStack Mono Repo"},"headers":[{"level":3,"title":"Mono repo project structure","slug":"mono-repo-project-structure"},{"level":3,"title":"Debugging ServiceStack","slug":"debugging-servicestack"},{"level":3,"title":"Building All ServiceStack Projects","slug":"building-all-servicestack-projects"},{"level":3,"title":"Preserved source code links","slug":"preserved-source-code-links"},{"level":3,"title":"Switching to main branch","slug":"switching-to-main-branch"},{"level":3,"title":"Why?","slug":"why"},{"level":3,"title":"Legacy Branches and Releases","slug":"legacy-branches-and-releases"}],"relativePath":"mono-repo.md","lastUpdated":1645506505252}',o={},c=a('<p>All active ServiceStack libraries and NuGet packages are now being developed and maintained in ServiceStack&#39;s mono repo:</p><p><a class="block my-8 font-medium text-center text-2xl" href="https://github.com/ServiceStack/ServiceStack">github.com/ServiceStack/ServiceStack</a></p><p>The new Mono repo has greatly simplified all maintenance efforts around ServiceStack&#39;s code base, including building, contributing and debugging, where there&#39;s now only 1 repo that needs to be checked out to make changes to any ServiceStack package.</p><h3 id="mono-repo-project-structure" tabindex="-1">Mono repo project structure <a class="header-anchor" href="#mono-repo-project-structure" aria-hidden="true">#</a></h3><p>Whilst all projects are contained within the same repo, they continue to be independently maintained in isolated top-level solution folders, containing only the references and test projects each need:</p><ul><li><a href="https://github.com/ServiceStack/ServiceStack/tree/main/ServiceStack" target="_blank" rel="noopener noreferrer">/ServiceStack</a></li><li><a href="https://github.com/ServiceStack/ServiceStack/tree/main/ServiceStack.Text" target="_blank" rel="noopener noreferrer">/ServiceStack.Text</a></li><li><a href="https://github.com/ServiceStack/ServiceStack/tree/main/ServiceStack.OrmLite" target="_blank" rel="noopener noreferrer">/ServiceStack.OrmLite</a></li><li><a href="https://github.com/ServiceStack/ServiceStack/tree/main/ServiceStack.Redis" target="_blank" rel="noopener noreferrer">/ServiceStack.Redis</a></li><li><a href="https://github.com/ServiceStack/ServiceStack/tree/main/ServiceStack.Aws" target="_blank" rel="noopener noreferrer">/ServiceStack.Aws</a></li><li><a href="https://github.com/ServiceStack/ServiceStack/tree/main/ServiceStack.Azure" target="_blank" rel="noopener noreferrer">/ServiceStack.Azure</a></li><li><a href="https://github.com/ServiceStack/ServiceStack/tree/main/ServiceStack.Blazor" target="_blank" rel="noopener noreferrer">/ServiceStack.Blazor</a></li><li><a href="https://github.com/ServiceStack/ServiceStack/tree/main/ServiceStack.Stripe" target="_blank" rel="noopener noreferrer">/ServiceStack.Stripe</a></li><li><a href="https://github.com/ServiceStack/ServiceStack/tree/main/ServiceStack.Logging" target="_blank" rel="noopener noreferrer">/ServiceStack.Logging</a></li></ul><p>All top-level solutions follow the same uniform project structure which require no other external build tools or scripts other than a default VS .NET install, you can open the <strong>.sln</strong> in each folder and start utilizing projects immediately.</p><h3 id="debugging-servicestack" tabindex="-1">Debugging ServiceStack <a class="header-anchor" href="#debugging-servicestack" aria-hidden="true">#</a></h3><p>It also dramatically improves the debuggability of ServiceStack source code from your App where you can choose to replace binary package references with source project references. Or for small projects, a simpler alternative is to attach your projects to the main <a href="https://github.com/ServiceStack/ServiceStack/tree/main/ServiceStack/src" target="_blank" rel="noopener noreferrer">ServiceStack.sln</a> where most ServiceStack projects are readably available for quick reference.</p><h3 id="building-all-servicestack-projects" tabindex="-1">Building All ServiceStack Projects <a class="header-anchor" href="#building-all-servicestack-projects" aria-hidden="true">#</a></h3><p>Building all projects have also been simplified and can be run locally in both Windows and Unix platforms with the scripts below:</p><ul><li><a href="https://github.com/ServiceStack/ServiceStack/blob/main/build/build-all.bat" target="_blank" rel="noopener noreferrer">build-all.bat</a></li><li><a href="https://github.com/ServiceStack/ServiceStack/blob/main/build/build-all.sh" target="_blank" rel="noopener noreferrer">build-all.sh</a></li></ul><p>Which runs the <strong>build.proj</strong> MS Build task in the <code>/build</code> folder of each top-level project. The difference between <strong>build.proj</strong> vs the <strong>.sln</strong> is that <strong>build.proj</strong> only builds the library projects deployed to NuGet which it locally copies into a <code>/NuGet</code> folder for easy access to locally modified packages.</p><h3 id="preserved-source-code-links" tabindex="-1">Preserved source code links <a class="header-anchor" href="#preserved-source-code-links" aria-hidden="true">#</a></h3><p>We&#39;ve fortuitously been able to benefit from GitHub&#39;s <a href="https://github.com/github/renaming/" target="_blank" rel="noopener noreferrer">renaming of their main branch</a> since all our repos were created before the change which allowed us to keep the existing structure in the earlier <strong>master</strong> branch untouched, preserving existing links whilst the new mono repo structure has been added in the new <strong>main</strong> branch which has now been switched over and become the <strong>default</strong> branch.</p><h3 id="switching-to-main-branch" tabindex="-1">Switching to main branch <a class="header-anchor" href="#switching-to-main-branch" aria-hidden="true">#</a></h3><p>If you&#39;ve previously checked out <a href="https://github.com/ServiceStack/ServiceStack/tree/main/ServiceStack" target="_blank" rel="noopener noreferrer">github.com/ServiceStack/ServiceStack</a> you will need to change the <strong>origin</strong> branch to use <strong>main</strong> however for simplicity we&#39;d recommend performing a clean checkout. You can also delete all other ServiceStack repos which are no longer maintained.</p><h3 id="why" tabindex="-1">Why? <a class="header-anchor" href="#why" aria-hidden="true">#</a></h3><p>After dropping v4.5 .NET Framework support, deleting platform specific .NET 4.5 implementations &amp; removing legacy projects in our last major <a href="/releases/v6#breaking-changes">v6 Release</a>, we continued embarking on a journey to improve the health and approachability of our code base which up to this point was maintained across multiple repos, each encapsulating a stand-alone library that can be used independently. To enable much of its high level functionality the libraries make usage of core functionality in ServiceStack&#39;s common libraries.</p><h4 id="poor-cross-dependency-support" tabindex="-1">Poor cross dependency support <a class="header-anchor" href="#poor-cross-dependency-support" aria-hidden="true">#</a></h4><p>Actively developing cross-repo dependencies has always been a source of friction where previously to debug and maintain changes across all packages we&#39;ve had to maintain parallel <code>*.Source.csproj</code> for each project that used Project Source references instead of binary references which needed to be checked out and maintained in a separate physical location since .NET doesn&#39;t properly handle multiple <code>.csproj&#39;s</code> in the same folder. We were hoping support for source references for development and binary references for release would improve in time, however we gave up on this ever improving when the .NET team moved to a mono repo themselves.</p><h3 id="legacy-branches-and-releases" tabindex="-1">Legacy Branches and Releases <a class="header-anchor" href="#legacy-branches-and-releases" aria-hidden="true">#</a></h3><p>For preservation should you need to make changes to support Legacy applications we&#39;ve included direct links to the previous states of ServiceStack code bases before the migration to its Mono repo:</p><table><thead><tr><th>fx45 branch</th><th>v5.14</th><th>v6.0.2</th><th>master</th></tr></thead><tbody><tr><td><a href="https://github.com/ServiceStack/ServiceStack/tree/fx45" target="_blank" rel="noopener noreferrer">ServiceStack</a></td><td><a href="https://github.com/ServiceStack/ServiceStack/releases/tag/v5.14" target="_blank" rel="noopener noreferrer">v5.14 Release</a></td><td><a href="https://github.com/ServiceStack/ServiceStack/releases/tag/v6.0.2" target="_blank" rel="noopener noreferrer">v6.0.2 Release</a></td><td><a href="https://github.com/ServiceStack/ServiceStack/tree/master" target="_blank" rel="noopener noreferrer">master</a></td></tr><tr><td><a href="https://github.com/ServiceStack/ServiceStack.Text/tree/fx45" target="_blank" rel="noopener noreferrer">ServiceStack.Text</a></td><td><a href="https://github.com/ServiceStack/ServiceStack.Text/releases/tag/v5.14" target="_blank" rel="noopener noreferrer">v5.14 Release</a></td><td><a href="https://github.com/ServiceStack/ServiceStack.Text/releases/tag/v6.0.2" target="_blank" rel="noopener noreferrer">v6.0.2 Release</a></td><td><a href="https://github.com/ServiceStack/ServiceStack.Text/tree/master" target="_blank" rel="noopener noreferrer">master</a></td></tr><tr><td><a href="https://github.com/ServiceStack/ServiceStack.Redis/tree/fx45" target="_blank" rel="noopener noreferrer">ServiceStack.Redis</a></td><td><a href="https://github.com/ServiceStack/ServiceStack.Redis/releases/tag/v5.14" target="_blank" rel="noopener noreferrer">v5.14 Release</a></td><td><a href="https://github.com/ServiceStack/ServiceStack.Redis/releases/tag/v6.0.2" target="_blank" rel="noopener noreferrer">v6.0.2 Release</a></td><td><a href="https://github.com/ServiceStack/ServiceStack.Redis/tree/master" target="_blank" rel="noopener noreferrer">master</a></td></tr><tr><td><a href="https://github.com/ServiceStack/ServiceStack.OrmLite/tree/fx45" target="_blank" rel="noopener noreferrer">ServiceStack.OrmLite</a></td><td><a href="https://github.com/ServiceStack/ServiceStack.OrmLite/releases/tag/v5.14" target="_blank" rel="noopener noreferrer">v5.14 Release</a></td><td><a href="https://github.com/ServiceStack/ServiceStack.OrmLite/releases/tag/v6.0.2" target="_blank" rel="noopener noreferrer">v6.0.2 Release</a></td><td><a href="https://github.com/ServiceStack/ServiceStack.OrmLite/tree/master" target="_blank" rel="noopener noreferrer">master</a></td></tr><tr><td><a href="https://github.com/ServiceStack/ServiceStack.Aws/tree/fx45" target="_blank" rel="noopener noreferrer">ServiceStack.Aws</a></td><td><a href="https://github.com/ServiceStack/ServiceStack.Aws/releases/tag/v5.14" target="_blank" rel="noopener noreferrer">v5.14 Release</a></td><td><a href="https://github.com/ServiceStack/ServiceStack.Aws/releases/tag/v6.0.2" target="_blank" rel="noopener noreferrer">v6.0.2 Release</a></td><td><a href="https://github.com/ServiceStack/ServiceStack.Aws/tree/master" target="_blank" rel="noopener noreferrer">master</a></td></tr><tr><td><a href="https://github.com/ServiceStack/ServiceStack.Azure/tree/fx45" target="_blank" rel="noopener noreferrer">ServiceStack.Azure</a></td><td><a href="https://github.com/ServiceStack/ServiceStack.Azure/releases/tag/v5.14" target="_blank" rel="noopener noreferrer">v5.14 Release</a></td><td><a href="https://github.com/ServiceStack/ServiceStack.Azure/releases/tag/v6.0.2" target="_blank" rel="noopener noreferrer">v6.0.2 Release</a></td><td><a href="https://github.com/ServiceStack/ServiceStack.Azure/tree/master" target="_blank" rel="noopener noreferrer">master</a></td></tr><tr><td><a href="https://github.com/ServiceStack/Admin/tree/fx45" target="_blank" rel="noopener noreferrer">ServiceStack.Admin</a></td><td><a href="https://github.com/ServiceStack/Admin/releases/tag/v5.14" target="_blank" rel="noopener noreferrer">v5.14 Release</a></td><td><a href="https://github.com/ServiceStack/Admin/releases/tag/v6.0.2" target="_blank" rel="noopener noreferrer">v6.0.2 Release</a></td><td><a href="https://github.com/ServiceStack/Admin/tree/master" target="_blank" rel="noopener noreferrer">master</a></td></tr><tr><td><a href="https://github.com/ServiceStack/Stripe/tree/fx45" target="_blank" rel="noopener noreferrer">ServiceStack.Stripe</a></td><td><a href="https://github.com/ServiceStack/Stripe/releases/tag/v5.14" target="_blank" rel="noopener noreferrer">v5.14 Release</a></td><td><a href="https://github.com/ServiceStack/Stripe/releases/tag/v6.0.2" target="_blank" rel="noopener noreferrer">v6.0.2 Release</a></td><td><a href="https://github.com/ServiceStack/Stripe/tree/master" target="_blank" rel="noopener noreferrer">master</a></td></tr><tr><td><a href="https://github.com/ServiceStack/ServiceStack.CefGlue/tree/fx45" target="_blank" rel="noopener noreferrer">ServiceStack.CefGlue</a></td><td><a href="https://github.com/ServiceStack/ServiceStack.CefGlue/releases/tag/v5.14" target="_blank" rel="noopener noreferrer">v5.14 Release</a></td><td><a href="https://github.com/ServiceStack/ServiceStack.CefGlue/releases/tag/v6.0.2" target="_blank" rel="noopener noreferrer">v6.0.2 Release</a></td><td><a href="https://github.com/ServiceStack/ServiceStack.CefGlue/tree/master" target="_blank" rel="noopener noreferrer">master</a></td></tr></tbody></table><ul><li><strong>fx45</strong> branch contains the state of ServiceStack before support for v4.5 .NET Framework &amp; legacy projects was removed</li><li><strong>v5.14</strong> contains the source code for the last v4.5 .NET Framework release published to NuGet</li><li><strong>v6.0.2</strong> contains the source code for the last NuGet release before moving to the Mono Repo</li><li><strong>master</strong> branch contains the source code before moving to the master branch</li></ul><p>Currently <strong>fx45</strong> is effectively equivalent to <strong>v5.14</strong> release and <strong>master</strong> equivalent to <strong>v6.0.2</strong> release, but can change in time if new fixes to legacy projects are contributed.</p>',26),n=[c];function i(s,l,h,S,d,p){return t(),r("div",null,n)}var k=e(o,[["render",i]]);export{v as __pageData,k as default};
