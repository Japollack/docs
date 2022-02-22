import{_ as e,c as t,o as n,a as o}from"./app.64b20f26.js";const k='{"title":"Jupyter Notebooks for Reporting","description":"","frontmatter":{"slug":"jupyter-notebooks-reporting","title":"Jupyter Notebooks for Reporting"},"headers":[{"level":2,"title":"MyBinder","slug":"mybinder"},{"level":2,"title":"Combining local and MyBinder workflow","slug":"combining-local-and-mybinder-workflow"},{"level":3,"title":"Things you will need","slug":"things-you-will-need"},{"level":3,"title":"Setup","slug":"setup"},{"level":3,"title":"Create a new GitHub repository","slug":"create-a-new-github-repository"},{"level":3,"title":"Build the Docker image locally","slug":"build-the-docker-image-locally"},{"level":2,"title":"Example notebook report","slug":"example-notebook-report"},{"level":3,"title":"Creating a new notebook using the x tool","slug":"creating-a-new-notebook-using-the-x-tool"},{"level":3,"title":"HTML Output","slug":"html-output"},{"level":3,"title":"Using MyBinder.org","slug":"using-mybinder-org"}],"relativePath":"jupyter-notebooks-reporting.md","lastUpdated":1645506505252}',a={},s=o(`__VP_STATIC_START__<p>Jupyter Notebooks provide a rich set of interactive computing tools that can be used for many different use cases. Incorporating data from web services means you can rerun/update your notebooks for ease of reuse for things like generating reports and testing.</p><p>For reporting tasks, we want to have the ability to save the output of our notebooks as a PDF, so there are a few setup steps that are needed to get Jupyter working with PDF using LaTeX. LaTeX has quite a few implicit dependencies that need to be installed locally to get this output to work. One way to make this a bit easier to repeat your results is by using a Docker environment setup to be used by the hosted <a href="http://MyBinder.org" target="_blank" rel="noopener noreferrer">MyBinder.org</a> service.</p><h2 id="mybinder" tabindex="-1">MyBinder <a class="header-anchor" href="#mybinder" aria-hidden="true">#</a></h2><p>The JupyterHub team maintain their public Jupyter notebooks service at <a href="https://mybinder.org" target="_blank" rel="noopener noreferrer">mybinder.org</a> for anyone who wants to share their interactive GitHub repositories publicly. Behind the scenes Notebooks are executed on a collection of <a href="https://mybinder.readthedocs.io/en/latest/about/federation.html" target="_blank" rel="noopener noreferrer">BinderHub Federated services</a> using resources donated by <a href="https://cloud.google.com" target="_blank" rel="noopener noreferrer">Google Cloud</a>, <a href="https://www.ovh.com" target="_blank" rel="noopener noreferrer">OVH</a>, <a href="https://notebooks.gesis.org" target="_blank" rel="noopener noreferrer">GESIS Notebooks</a> and the <a href="https://turing.ac.uk" target="_blank" rel="noopener noreferrer">Turing Institute</a>.</p><p>To run your Notebooks on Binder head over to <a href="https://mybinder.org" target="_blank" rel="noopener noreferrer">https://mybinder.org</a> and paste the URL of your public GitHub repo containing your Jupyter Notebooks to retrieve the generated URL for your repo.</p><p>E.g. our <a href="https://github.com/ServiceStack/jupyter-notebooks" target="_blank" rel="noopener noreferrer">ServiceStack/jupyter-notebooks</a> GitHub repo is available from:</p><h4 id="https-mybinder-org-v2-gh-servicestack-jupyter-notebooks-head" tabindex="-1"><a href="https://mybinder.org/v2/gh/ServiceStack/jupyter-notebooks/HEAD" target="_blank" rel="noopener noreferrer">https://mybinder.org/v2/gh/ServiceStack/jupyter-notebooks/HEAD</a> <a class="header-anchor" href="#https-mybinder-org-v2-gh-servicestack-jupyter-notebooks-head" aria-hidden="true">#</a></h4><p>Where behind-the-scenes Binder will build and host a Docker image of your repo and launch a dedicated <code>notebook</code> Web App instance to view an execute your repo&#39;s Notebooks. This Docker image is built has on a <code>Dockerfile</code> in the root of the repository. Starting with a <a href="https://jupyter-docker-stacks.readthedocs.io/en/latest/using/selecting.html" target="_blank" rel="noopener noreferrer">base image from the Jupyter Docker docs</a></p><div class="language-dockerfile"><pre><code><span class="token comment"># LaTeX dependencies (as root)</span>
<span class="token instruction"><span class="token keyword">RUN</span> apt-get install -y texlive-xetex <span class="token operator">\\</span>
        texlive-fonts-recommended <span class="token operator">\\</span>
        texlive-latex-recommended <span class="token operator">\\</span>
        texlive-latex-extra <span class="token operator">\\</span>
        texlive-plain-generic</span>

<span class="token comment"># Install nbconvert (as user)</span>
<span class="token instruction"><span class="token keyword">RUN</span> pip install nbconvert</span>
</code></pre></div><p>A full example of a <code>Dockerfile</code> which also includes support for .NET notebooks can be found in <a href="#get-link">our <code>mix</code> repository</a>, this can be built and run locally as well as used with MyBinder by creating a new GitHub repository and committing it in the root of the repository.</p><p>To run this locally, build the Dockerfile first using <code>docker build . -t &lt;my-tag&gt;</code>, followed by running the docker image using <code>docker run</code>.</p><p>Running locally, it is most useful to edit notebooks on the local host machine rather than the docker containers storage. To do this, we want to use a few options when using <code>docker run</code>. For example, the following command can run and expose local notebooks within <code>/mnt/c/projects/my-notebooks</code>.</p><div class="language-shell"><pre><code>docker run -it --rm -p <span class="token number">8888</span>:8888 -v /mnt/c/projects/my-notebooks:/home/jovyan/Notebooks -e <span class="token assign-left variable">CHOWN_HOME</span><span class="token operator">=</span>yes <span class="token operator">&lt;</span>my-tag<span class="token operator">&gt;</span>
</code></pre></div><p>Once running, use the <code>127.0.0.1</code> url in the command line output and open the full link with your browser. Editing and saving notebooks will update your notebooks on your host file system allowing you to iterate quickly.</p><h2 id="combining-local-and-mybinder-workflow" tabindex="-1">Combining local and MyBinder workflow <a class="header-anchor" href="#combining-local-and-mybinder-workflow" aria-hidden="true">#</a></h2><p>Being able to run the same Docker container locally to iterate on host notebooks that are in the same GitHub repository and then commit those changes to share with others and to run on MyBinder creates a great way of getting the most out of the repeatability that is a part of the Binder solution as well as having the same functionality locally to generate reports and share as PDF without needing to regularly rebuild the docker image which will slow down iteration.</p><h3 id="things-you-will-need" tabindex="-1">Things you will need <a class="header-anchor" href="#things-you-will-need" aria-hidden="true">#</a></h3><ul><li>ServiceStack dotnet tool <code>x</code>.</li><li>Docker</li><li>GitHub Account</li></ul><h3 id="setup" tabindex="-1">Setup <a class="header-anchor" href="#setup" aria-hidden="true">#</a></h3><p>We&#39;ve created a <code>mix</code> template to setup this workflow more straight forward.</p><p>All command line utils used are available in the latest <a href="/dotnet-tool">dotnet tool</a> which can be installed from:</p><div class="language-bash"><pre><code>$ dotnet tool <span class="token function">install</span> --global x 
</code></pre></div><p>Or if you had a previous version installed, update with:</p><div class="language-bash"><pre><code>$ dotnet tool update -g x
</code></pre></div><h3 id="create-a-new-github-repository" tabindex="-1">Create a new GitHub repository <a class="header-anchor" href="#create-a-new-github-repository" aria-hidden="true">#</a></h3><p>To work with <a href="http://MyBinder.org" target="_blank" rel="noopener noreferrer">MyBinder.org</a> service, you will need to create a <em>public</em> GitHub repository so the service can build and host your notebook environment.</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>For private repositories to work, you will need to host and run your own infrastructure for your BinderHub environment. More information can be found on the steps required for this on the BinderHub docs &quot;<a href="https://binderhub.readthedocs.io/en/latest/zero-to-binderhub/index.html" target="_blank" rel="noopener noreferrer">Zero to BinderHub</a>&quot;</p></div><p>Clone your newly created <em>public</em> GitHub repository locally and run the following command in the root directory of the repository.</p><div class="language-bash"><pre><code>$ x mix docker-jupyter-reports
</code></pre></div><p>Commit the generated <code>Dockerfile</code> and push your changes to GitHub.</p><h3 id="build-the-docker-image-locally" tabindex="-1">Build the Docker image locally <a class="header-anchor" href="#build-the-docker-image-locally" aria-hidden="true">#</a></h3><p>Since we want to be able to work on notebook reports both locally and on MyBinder, we will need to build the Docker image locally.</p><p>From the root of your local git repository, run the following command where <code>jupyter-reports</code> can be replaced with your preferred tag.</p><div class="language-bash"><pre><code>$ docker build <span class="token builtin class-name">.</span> -t jupyter-reports
</code></pre></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>This will likely take a few minutes locally due to all the required packages and size of the numerous dependencies</p></div><div class="language-"><pre><code>[+] Building 572.3s (25/25) FINISHED
 =&gt; [internal] load build definition from Dockerfile                                                               0.1s
 =&gt; =&gt; transferring dockerfile: 3.68kB                                                                             0.0s
 =&gt; [internal] load .dockerignore                                                                                  0.0s
 =&gt; =&gt; transferring context: 2B                                                                                    0.0s
 =&gt; [internal] load metadata for docker.io/jupyter/base-notebook:latest                                            7.2s
 =&gt; [auth] jupyter/base-notebook:pull token for registry-1.docker.io                                               0.0s
 =&gt; [ 1/19] FROM docker.io/jupyter/base-notebook:latest@sha256:5a942551e592d9ee167c353dec8015f5781fa69fece97a093  15.6s
 =&gt; =&gt; resolve docker.io/jupyter/base-notebook:latest@sha256:5a942551e592d9ee167c353dec8015f5781fa69fece97a0934f6  0.0s
...
 =&gt; =&gt; extracting sha256:67bf56c81c699383f5a229fdc62a2664c94a7798d35511454e29df1c6a1afd05                          0.0s
 =&gt; [internal] load build context                                                                                  0.0s
 =&gt; =&gt; transferring context: 3.67kB                                                                                0.0s
 =&gt; [ 2/19] WORKDIR /home/jovyan                                                                                   1.4s
 =&gt; [ 3/19] RUN apt-get update                                                                                    73.9s
 =&gt; [ 4/19] RUN apt-get install -y curl                                                                           22.2s
 =&gt; [ 5/19] RUN apt-get install -y texlive-xetex         texlive-fonts-recommended         texlive-latex-recomm  375.2s
 =&gt; [ 6/19] RUN apt-get update     &amp;&amp; DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends    5.1s
 =&gt; [ 7/19] RUN dotnet_sdk_version=5.0.102     &amp;&amp; curl -SL --output dotnet.tar.gz https://dotnetcli.azureedge.net  8.2s
 =&gt; [ 8/19] COPY ./ /home/jovyan/Notebooks/                                                                        0.3s
 =&gt; [ 9/19] RUN echo &quot;&lt;configuration&gt;  &lt;solution&gt;    &lt;add key=&quot;disableSourceControlIntegration&quot; value=&quot;true&quot; /&gt;    0.5s
 =&gt; [10/19] RUN echo &quot;&lt;Project Sdk=&quot;Microsoft.NET.Sdk.Web&quot;&gt;  &lt;PropertyGroup&gt;    &lt;TargetFramework&gt;net5.0&lt;/TargetFr  0.6s
 =&gt; [11/19] RUN chown -R 1000 /home/jovyan                                                                         1.0s
 =&gt; [12/19] RUN pip install nteract_on_jupyter                                                                    14.6s
 =&gt; [13/19] RUN dotnet tool install -g Microsoft.dotnet-interactive                                               12.8s
 =&gt; [14/19] RUN dotnet tool install -g x                                                                           6.5s
 =&gt; [15/19] RUN dotnet restore /home/jovyan/preload.csproj                                                        16.4s
 =&gt; [16/19] RUN echo &quot;/opt/conda/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/home/jovyan/.d  0.3s
 =&gt; [17/19] RUN dotnet interactive jupyter install                                                                 2.7s
 =&gt; [18/19] RUN pip install nbconvert                                                                              1.1s
 =&gt; [19/19] WORKDIR /home/jovyan/Notebooks/                                                                        0.0s
 =&gt; exporting to image                                                                                             6.2s
 =&gt; =&gt; exporting layers                                                                                            6.2s
 =&gt; =&gt; writing image sha256:ab54b9fd600007d3badbd7e99927e4c2bfa2dcc2334586c1e76619d1a0e56cbd                       0.0s
</code></pre></div><p>To run your newly built Docker image, use the following command where <code>&lt;absolute-path-of-git-repo&gt;</code> is the location of your local git repository. This can&#39;t be a relative.</p><div class="language-shell"><pre><code>docker run -it --rm -p <span class="token number">8888</span>:8888 -v <span class="token operator">&lt;</span>absolute-path-of-git-repo<span class="token operator">&gt;</span>:/home/jovyan/Notebooks -e <span class="token assign-left variable">CHOWN_HOME</span><span class="token operator">=</span>yes jupyter-reports
</code></pre></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>Jupyter will generate working directory called <code>.ipynb_checkpoints</code> which you can add to your .gitignore</p></div><p>Running this will output a local <code>127.0.0.1</code> address to use in your browser with an authentication toke you will need to copy and paste to your preferred browser.</p><p><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/jupyter/reports-and-testing/docker-run.png" alt=""></p><h2 id="example-notebook-report" tabindex="-1">Example notebook report <a class="header-anchor" href="#example-notebook-report" aria-hidden="true">#</a></h2><p>Now that we have our environment built and running, we want to create a report that is sharable in multiple ways. That is a nice <code>PDF</code> output we can attach and share as well as a working notebook so others can see and run the full version of our report to review or make changes themselves.</p><h3 id="creating-a-new-notebook-using-the-x-tool" tabindex="-1">Creating a new notebook using the <code>x</code> tool <a class="header-anchor" href="#creating-a-new-notebook-using-the-x-tool" aria-hidden="true">#</a></h3><p>To jump start the process of getting the data you need to create your report in a notebook, we can use the ServiceStack <code>x</code> tool to generate the plumbing code we need to fetch data from a specific ServiceStack host and service.</p><p>For example, working with the <a href="https://chinook.netcore.io" target="_blank" rel="noopener noreferrer">Chinook sample application</a> which has details of orders from all over the world, we can produce a report based on invoice data.</p><p><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/jupyter/reports-and-testing/chinook-metadata.png" alt="Metadata page of the Chinook sample application hosted at chinook.netcore.io"></p><p>Running the following command from a new <code>notebooks</code> directory in our local git repository, we can generate a working notebook that already integrates with the Chinook sample web services, specifically the <code>QueryInvoices</code> service.</p><div class="language-shell"><pre><code>x jupyter-python https://chinook.netcore.io QueryInvoices
</code></pre></div><p>Once generated, we can navigate to this notebook in the jupyter environment using our browser.</p><p><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/jupyter/reports-and-testing/jupyter-notebook.png" alt=""></p><p>The first cell contains all the typed code for our integration with the Chinook service and initializes the <code>JsonServiceClient</code> with the ServiceStack host.</p><p>The second cell performs the query, we can provide more details here based on the specific service. If you are unsure of how you can use a specific service you can use <a href="https://apps.servicestack.net" target="_blank" rel="noopener noreferrer">Instant Client Apps</a> to explore the service or use <code>x inspect &lt;host&gt; &lt;api name&gt;</code>.</p><div class="language-python"><pre><code>response <span class="token operator">=</span> client<span class="token punctuation">.</span>send<span class="token punctuation">(</span>QueryInvoices<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre></div><p>In our example, we are going to query all invoices and filter locally to generate some different visuals.</p><p>The last two cells display the data is the response in different ways. Since we will want to visualize the data ourselves to produce a report, we can delete these cells and install some dependencies we will need to generate some more useful plots.</p><div class="language-python"><pre><code><span class="token operator">%</span>pip install pandas
<span class="token operator">%</span>pip install matplotlib
<span class="token keyword">import</span> pandas <span class="token keyword">as</span> pd
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
</code></pre></div><p>The above code will use the <code>pip</code> <a href="https://ipython.readthedocs.io/en/stable/interactive/magics.html#magic-pip" target="_blank" rel="noopener noreferrer">magic</a> to install <code>pandas</code> and <code>matplotlib</code> libraries and import them for use.</p><p>We know the structure of the data returning from the service based on the response Data Transfer Objects (DTOs) declared in the first cell.</p><div class="language-python"><pre><code><span class="token decorator annotation punctuation">@dataclass_json</span><span class="token punctuation">(</span>letter_case<span class="token operator">=</span>LetterCase<span class="token punctuation">.</span>CAMEL<span class="token punctuation">,</span> undefined<span class="token operator">=</span>Undefined<span class="token punctuation">.</span>EXCLUDE<span class="token punctuation">)</span>
<span class="token decorator annotation punctuation">@dataclass</span>
<span class="token keyword">class</span> <span class="token class-name">Invoices</span><span class="token punctuation">:</span>
    invoice_id<span class="token punctuation">:</span> <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">0</span>
    customer_id<span class="token punctuation">:</span> <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">0</span>
    invoice_date<span class="token punctuation">:</span> datetime<span class="token punctuation">.</span>datetime <span class="token operator">=</span> datetime<span class="token punctuation">.</span>datetime<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
    billing_address<span class="token punctuation">:</span> Optional<span class="token punctuation">[</span><span class="token builtin">str</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">None</span>
    billing_city<span class="token punctuation">:</span> Optional<span class="token punctuation">[</span><span class="token builtin">str</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">None</span>
    billing_state<span class="token punctuation">:</span> Optional<span class="token punctuation">[</span><span class="token builtin">str</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">None</span>
    billing_country<span class="token punctuation">:</span> Optional<span class="token punctuation">[</span><span class="token builtin">str</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">None</span>
    billing_postal_code<span class="token punctuation">:</span> Optional<span class="token punctuation">[</span><span class="token builtin">str</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">None</span>
    total<span class="token punctuation">:</span> Decimal <span class="token operator">=</span> decimal<span class="token punctuation">.</span>Decimal<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
</code></pre></div><p>Next, we want to load our response data into a pandas DataFrame for ease of plotting.</p><div class="language-python"><pre><code>df <span class="token operator">=</span> pd<span class="token punctuation">.</span>DataFrame<span class="token punctuation">(</span>response<span class="token punctuation">.</span>results<span class="token punctuation">)</span>
</code></pre></div><p>And since we will be looking at sales over time, we will create an index column to our data for <code>year</code> based on the existing <code>invoice_date</code> column.</p><div class="language-python"><pre><code>df<span class="token punctuation">[</span><span class="token string">&#39;year&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> pd<span class="token punctuation">.</span>DatetimeIndex<span class="token punctuation">(</span>df<span class="token punctuation">[</span><span class="token string">&#39;invoice_date&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span>year
</code></pre></div><p>Jupyter Notebooks have different types of cells that change the way they behave when they are run. Markdown cells can be used for presentation of code results, making the notebook ideal for generating output that has a clean layout and is well described.</p><div class="language-markdown"><pre><code><span class="token title important"><span class="token punctuation">#</span> Sales by year</span>
Looking at the sales across 5 years of data we have small dips in 2009 and 2013.
</code></pre></div><p>Now we have given the context for a visual, lets generate the visual itself by using the following code.</p><div class="language-python"><pre><code>df<span class="token punctuation">.</span>groupby<span class="token punctuation">(</span><span class="token string">&#39;year&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token string">&#39;total&#39;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token builtin">sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>astype<span class="token punctuation">(</span><span class="token builtin">float</span><span class="token punctuation">)</span><span class="token punctuation">.</span>plot<span class="token punctuation">.</span>bar<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>For statements generating plots, remember to end the statement with a semicolon as to avoid unwanted metadata about the statement return type</p></div><p><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/jupyter/reports-and-testing/sales-by-year.png" alt="Sales by year example"></p><p>Working through the breakdown of data by generating additional plots with headings we end up with a basic report we can present to someone not familiar with python development. To export to PDF we can use the web UI of Jupyter by going to <code>File</code>-&gt;<code>Download as</code>-&gt;<code>PDF via LaTeX (.pdf)</code>.</p><p><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/jupyter/reports-and-testing/download-pdf-menu.png" alt="Download PDF menu"></p><p><a href="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/public/jupyter-samples/jupyter-reports-standard.pdf" target="_blank" rel="noopener noreferrer">Looking at the resultant PDF</a>, we can see we can still see the code related input and output.</p><p><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/jupyter/reports-and-testing/pdf-standard.png" alt="Output PDF"></p><p>If this was something we would present to people not familiar with software development or python, this is unnecessary noise that we can filter out while still leaving the notebook in a state that is runnable for those working on it.</p><p>First, clear the cell output you don&#39;t want to include in your final result PDF. This will include from cells that install dependencies using <code>%pip install</code> and anything else which you think doesn&#39;t add value to the final report. This can be done by selecting the cell in the web UI, going to the <code>Cell</code> menu and clicking <code>Current Outputs</code>-&gt;<code>Clear</code>.</p><p>Once this is done, we will need to run a command from a Terminal in the context of our running Docker container. The easiest way to do this is to use the Jupyter web UI itself. From the file explorer view, at the top right a menu button called <code>New</code> can be dropped down and a <code>Terminal</code> option can be selected.</p><p><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/jupyter/reports-and-testing/new-terminal.png" alt="New terminal"></p><p>Navigating to the folder of your notebook report, you can use a utility called <code>nbconvert</code> to run a similar command to what is happening when using the <code>Download as</code> menu, but this time with additional arguments to further refine the output. Specifically, the <code>--TemplateExporter.exclude_input=True</code> option.</p><div class="language-shell"><pre><code>jupyter nbconvert --to pdf chinook.netcore.io-QueryInvoices.ipynb --TemplateExporter.exclude_input<span class="token operator">=</span>True
</code></pre></div><p>The generated PDF will be visible in the Jupyter file explorer web UI so you can open and <a href="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/public/jupyter-samples/jupyter-reports-clean.pdf" target="_blank" rel="noopener noreferrer">download the result</a>.</p><p><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/jupyter/reports-and-testing/pdf-clean.png" alt="Clean output PDF"></p><h3 id="html-output" tabindex="-1">HTML Output <a class="header-anchor" href="#html-output" aria-hidden="true">#</a></h3><p>The same process can be done for outputing straight HTML for easy sharing on a static site. Using the <code>Export Notebook As</code> menu, selecting HTML we get what we can see in our Jupyter environment with all the context and code.</p><p><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/jupyter/reports-and-testing/html-standard.png" alt=""></p><p>Using the terminal again to produce HTML, we can strip the code away to produce a clean report.</p><div class="language-shell"><pre><code>jupyter nbconvert --to html chinook.netcore.io-QueryInvoices.ipynb --TemplateExporter.exclude_input<span class="token operator">=</span>True
</code></pre></div><p><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/jupyter/reports-and-testing/html-clean.png" alt=""></p><h3 id="using-mybinder-org" tabindex="-1">Using <a href="http://MyBinder.org" target="_blank" rel="noopener noreferrer">MyBinder.org</a> <a class="header-anchor" href="#using-mybinder-org" aria-hidden="true">#</a></h3><p>Now that we have finished the report we wanted to write, we might want a colleague review the work in a managed environment they can access straight from a browser. <a href="http://MyBinder.org" target="_blank" rel="noopener noreferrer">MyBinder.org</a> is limited to only public GitHub repositories but the same workflow work be applicable to your own managed BinderHub environment.</p><p><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/jupyter/reports-and-testing/my-binder-ui.png" alt=""></p><p>Reviewing notebooks is convenient using services like MyBinder, but changes are ephemeral, so while <em>reviews</em> can be done using this workflow, changes need to be made in an environment where files can be committed back to the remote GitHub repository.</p>__VP_STATIC_END__`,92),r=[s];function i(p,c,l,d,u,h){return n(),t("div",null,r)}var b=e(a,[["render",i]]);export{k as __pageData,b as default};
