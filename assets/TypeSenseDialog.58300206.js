import{_ as A,g as F,B as O,r as I,o as d,c as u,b as s,x as R,y as U,C as $,F as D,D as L,E as P,G as Q,n as G,H as J,J as W,K as X,u as Y}from"./app.64b20f26.js";const x=g=>(J("data-v-3ab25024"),g=g(),W(),g),Z=["onClick"],ee={class:"p-2 flex flex-col",style:{"max-height":"70vh"}},te={class:"flex"},le=x(()=>s("label",{class:"pt-4 mt-0.5 pl-2",for:"docsearch-input"},[s("svg",{class:"w-8 h-8 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[s("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"})])],-1)),oe={class:"mt-5 mr-3"},se={key:0,class:"group-results border-0 border-t border-solid border-gray-400 mx-2 pr-1 py-2 overflow-y-scroll",style:{"max-height":"60vh"}},ne=["innerHTML"],re=["aria-selected","onMouseover","onClick"],ie={class:"min-w-min mr-2 flex items-center"},ae={key:0,class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},ce=x(()=>s("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"},null,-1)),de=[ce],ue={key:1,class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},he=x(()=>s("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 6h16M4 12h16M4 18h16"},null,-1)),pe=[he],me={key:2,class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},ve=x(()=>s("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M7 20l4-16m2 16l4-16M6 9h14M4 15h14"},null,-1)),fe=[ve],ge={class:"overflow-hidden"},ye=["innerHTML"],_e=["href","innerHTML"],we=F({props:{open:null},emits:["hide"],setup(g,{emit:j}){const z=O(),h=I({groups:[],allItems:[]}),p=I("");let C="",k=null;const K=e=>{if(!p.value){h.value={groups:[],allItems:[]};return}k=setTimeout(()=>{if(k!=null){if(C===p.value)return;C=p.value,clearTimeout(k),fetch("https://search.docs.servicestack.net/collections/typesense_docs/documents/search?q="+encodeURIComponent(p.value)+"&query_by=content,hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3&group_by=hierarchy.lvl0",{headers:{"x-typesense-api-key":"N4N8bF0XwyvzwCGwm3CKB0QcnwyWtygo"}}).then(l=>{l.json().then(t=>{a.value=1;let n=0;const o={},r={groups:[],allItems:[]};t.grouped_hits.forEach(i=>{var y;let c=i.group_key[0];r.groups.push({group:c});let m=(y=o[c])!=null?y:o[c]=[];i.hits.forEach(_=>{var T,B,S;let v=_.document,f=_.highlights.length>0?_.highlights[0]:null,w={id:++n,titleHtml:(S=(B=(T=v.hierarchy.lvl3)!=null?T:v.hierarchy.lvl2)!=null?B:v.hierarchy.lvl1)!=null?S:v.hierarchy.lvl0,snippetHtml:f==null?void 0:f.snippet,type:(f==null?void 0:f.field)==="content"?"content":"heading",url:v.url.substring(v.url.indexOf("/","https://".length))},E=M(w.titleHtml);E===c&&(w.type="doc"),E===M(w.snippetHtml)&&(w.snippetHtml=""),m.push(w)})}),r.groups.forEach(i=>{var c;i.items=(c=o[i.group])!=null?c:[],i.items.forEach(m=>{r.allItems.push(m)})}),h.value=r})})}},200)};let a=I(1);const N=e=>a.value=e,H=e=>(j("hide"),z.go(e)),V=(e,l)=>{const t=h.value,n=t.allItems.findIndex(r=>r.id===e);if(n===-1)return t.allItems[0];const o=(n+l)%t.allItems.length;return o>=0?t.allItems[o]:t.allItems[t.allItems.length+o]};let b=0;const q=e=>{var t,n;const l=h.value;if(!(!l||l.allItems.length===0)){if(e.code==="ArrowDown"||e.code==="ArrowUp"||e.code==="Home"||e.code==="End")a.value=e.code==="Home"?(t=l.allItems[0])==null?void 0:t.id:e.code==="End"?(n=l.allItems[l.allItems.length-1])==null?void 0:n.id:V(a.value,e.code==="ArrowUp"?-1:1).id,X(()=>{var m;let o=document.querySelector("[aria-selected=true]"),r=o==null?void 0:o.closest(".group-result"),i=r==null?void 0:r.closest(".group-results");b++;let c=b;if(o&&r&&i){if(o===((m=r.firstElementChild)==null?void 0:m.nextElementSibling)&&r===i.firstElementChild)i.scrollTo({top:0,left:0});else if(o===r.lastElementChild&&r===i.lastElementChild)i.scrollTo({top:i.scrollHeight,left:0});else if(typeof IntersectionObserver!="undefined"){let y=new IntersectionObserver(_=>{_[0].intersectionRatio<=0&&c==b&&o.scrollIntoView(),y.disconnect()});y.observe(o)}}}),e.preventDefault();else if(e.code==="Enter"){let o=l.allItems.find(r=>r.id===a.value);o&&(H(o.url),e.preventDefault())}}};function M(e){return e.replace(/<[^>]*>?/gm,"")}return(e,l)=>(d(),u("div",{class:G(["search-dialog hidden flex bg-black bg-opacity-25 items-center",{open:g.open}]),onClick:l[4]||(l[4]=t=>e.$emit("hide"))},[s("div",{class:"dialog absolute",style:{"max-height":"70vh"},onClick:Q(t=>!1,["stop"])},[s("div",ee,[s("div",te,[le,R(s("input",{id:"docsearch-input",class:"search-input","onUpdate:modelValue":l[0]||(l[0]=t=>p.value=t),onKeyup:K,"aria-autocomplete":"list","aria-labelledby":"docsearch-label",autocomplete:"off",autocorrect:"off",autocapitalize:"off",spellcheck:"false",placeholder:"Search docs",maxlength:"64",type:"search",enterkeyhint:"go",onFocus:l[1]||(l[1]=t=>$(a)?a.value=1:a=1),onBlur:l[2]||(l[2]=t=>$(a)?a.value=-1:a=-1),onKeydown:q},null,544),[[U,p.value]]),s("div",oe,[s("button",{class:"search-cancel",onClick:l[3]||(l[3]=t=>e.$emit("hide"))},"Cancel")])]),h.value.allItems.length?(d(),u("div",se,[(d(!0),u(D,null,L(h.value.groups,t=>(d(),u("div",{key:t.group,class:"group-result mb-2"},[s("h3",{class:"m-0 text-lg text-gray-600",innerHTML:t.group},null,8,ne),(d(!0),u(D,null,L(t.items,n=>(d(),u("div",{key:n.id,"aria-selected":n.id==Y(a),class:"group-item rounded-lg bg-gray-50 mb-1 p-2 flex",onMouseover:o=>N(n.id),onClick:o=>H(n.url)},[s("div",ie,[n.type=="doc"?(d(),u("svg",ae,de)):n.type=="content"?(d(),u("svg",ue,pe)):(d(),u("svg",me,fe))]),s("div",ge,[s("div",{class:"snippet overflow-ellipsis overflow-hidden whitespace-nowrap text-sm",innerHTML:n.snippetHtml},null,8,ye),s("h4",null,[s("a",{class:"text-sm text-gray-600",href:n.url,innerHTML:n.titleHtml},null,8,_e)])])],40,re))),128))]))),128))])):P("v-if",!0)])],8,Z)],2))}});var ke=A(we,[["__scopeId","data-v-3ab25024"]]);export{ke as default};
