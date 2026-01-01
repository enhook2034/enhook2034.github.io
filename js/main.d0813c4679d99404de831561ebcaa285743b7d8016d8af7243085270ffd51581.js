(()=>{var f=null;document.addEventListener("DOMContentLoaded",()=>{let g=document.querySelector(".menu-toggle"),a=document.querySelector(".sidebar"),p=document.querySelector(".site-header"),h=document.querySelector("main"),l=document.querySelector("#menu-search-input"),d=()=>{if(!p||!a)return;let e=p.offsetHeight;window.innerWidth<=768?(a.style.transition="top 0.3s ease-in-out",a.classList.contains("active")?(a.style.top=`${e}px`,a.style.height=`calc(100vh - ${e}px)`):(a.style.top="-100vh",a.style.height="100vh")):(a.classList.remove("active"),a.style.top="",a.style.height="",a.style.transition="none")},w=e=>{let n=t=>{try{return new URL(t,window.location.origin).pathname.replace(/\/$/,"")||"/"}catch{return t}},s=n(e),c=document.querySelectorAll(".sidebar a"),r=null;if(c.forEach(t=>{t.classList.remove("active","ancestor"),n(t.href)===s&&(t.classList.add("active"),r=t)}),r){let t=r.parentElement;for(;t;){if(t.tagName==="LI"){let o=t.parentElement;if(o&&o.tagName==="UL"){let i=o.parentElement;if(i&&i.tagName==="LI"){let y=i.querySelector("a");y&&y.classList.add("ancestor")}}}t=t.parentElement}}},L=e=>{let n=e.startsWith("http")?new URL(e).pathname:e,s=document.querySelectorAll(".language-link-compact"),c=document.querySelector(".language-current-compact");console.log("Updating language switcher for path:",n);let r="en";n.startsWith("/cn/")?r="cn":n.startsWith("/en/")&&(r="en"),console.log("Detected current language:",r),c&&(c.textContent=r==="en"?"EN":"\u4E2D"),s.forEach(t=>{let o=t.dataset.lang||(t.textContent==="EN"?"en":"cn");console.log("Processing link for target language:",o);let i=n;r==="en"&&o==="cn"?n==="/en/"||n==="/en"?i="/cn/":i=n.replace(/^\/en\//,"/cn/"):r==="cn"&&o==="en"?n==="/cn/"||n==="/cn"?i="/en/":i=n.replace(/^\/cn\//,"/en/"):i=n,console.log("Target path after replacement:",i),t.href=i,o===r?t.style.display="none":t.style.display="inline-flex"})},v=(e,n=!0)=>{fetch(e).then(s=>{if(!s.ok)throw new Error("Network response was not ok");return s.text()}).then(s=>{let r=new DOMParser().parseFromString(s,"text/html"),t=r.querySelector("main"),o=r.querySelector("title").textContent;t&&h?(h.innerHTML=t.innerHTML,document.title=o,n&&history.pushState({path:e},o,e),w(e),L(e)):window.location.href=e}).catch(s=>{console.error("Failed to fetch page:",s),window.location.href=e})},u=e=>{if(!e.trim())return;(f?Promise.resolve(f):fetch("/api/apps.json").then(s=>s.json()).then(s=>(f=s,s))).then(s=>{let c=s.filter(t=>t.name.toLowerCase().includes(e.toLowerCase())||t.id&&t.id.toLowerCase().includes(e.toLowerCase())||t.slug&&t.slug.toLowerCase().includes(e.toLowerCase())),r=E(e,c);if(h){h.innerHTML=r,document.title=`Results for "${e}" - Enhook`;let t=`${window.location.pathname}?search=${encodeURIComponent(e)}`;history.pushState({path:t,query:e},document.title,t),document.querySelectorAll(".sidebar a").forEach(o=>{o.classList.remove("active","ancestor")})}}).catch(s=>{console.error("Failed to fetch apps data:",s)})},E=(e,n)=>{let s=document.documentElement.lang||"en",c=s==="zh-CN"||s==="cn",r=`
      <div class="search-container">
        <div class="search-header">
          <h1>Results for "${e}"</h1>
          <p class="search-count">${n.length} ${c?"\u4E2A\u7ED3\u679C":"results"}</p>
        </div>
        <div class="search-results">
    `;return n.length===0?r+=`
        <div class="no-results">
          <p>${c?"\u6CA1\u6709\u627E\u5230\u76F8\u5173\u5E94\u7528":"No applications found"}</p>
        </div>
      `:n.forEach(t=>{let o=c&&t.description.cn?t.description.cn:t.description.en;r+=`
          <a href="/${c?"cn":"en"}/app/${t.id}/${t.slug}/" class="search-result-item">
            <div class="search-result-header">
              <h2 class="search-result-title">${t.name}</h2>
            </div>
            <p class="search-result-description">${o}</p>
            <div class="search-result-meta">
              <span class="search-result-version">v${t.version}</span>
            </div>
          </a>
        `}),r+=`
        </div>
      </div>
      <style>
        .search-container {
          /* Container uses main's padding and max-width */
          background-color: #0d1117;
        }
        
        .search-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .search-header h1 {
          font-size: 2.5rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
          color: #DCDEDF;
        }
        
        .search-count {
          font-size: 1.1rem;
          color: #8B949E;
          margin: 0;
        }
        
        .search-results {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .search-result-item {
          display: block;
          background-color: #0D1117;
          border: 1px solid #30363D;
          border-radius: 6px;
          padding: 1.5rem;
          cursor: pointer;
          transition: border-color 0.2s ease;
          text-decoration: none;
          color: inherit;
        }
        
        .search-result-item:hover {
          border-color: #58A6FF;
        }
        
        .search-result-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }
        
        .search-result-title {
          margin: 0;
          font-size: 1.25rem;
          color: #58A6FF;
          font-weight: 600;
        }
        
        .search-result-item:hover .search-result-title {
          text-decoration: underline;
        }
        
        .search-result-description {
          color: #8B949E;
          margin: 0 0 1rem 0;
          line-height: 1.5;
        }
        
        .search-result-meta {
          display: flex;
          gap: 1rem;
          align-items: center;
          font-size: 0.875rem;
        }
        
        .search-result-version {
          color: #8B949E;
        }
        
        .no-results {
          text-align: center;
          padding: 3rem 1rem;
        }
        
        .no-results p {
          color: #8B949E;
          font-size: 1.1rem;
          margin: 0;
        }
        
        @media (max-width: 768px) {
          .search-container {
            /* Use main's mobile padding */
          }
          
          .search-header h1 {
            font-size: 2rem;
          }
          
          .search-result-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      </style>
    `,r};g&&a&&g.addEventListener("click",()=>{a.classList.toggle("active"),d()}),window.addEventListener("resize",d),l&&l.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();let n=l.value.trim();n&&(u(n),a&&window.innerWidth<=768&&a.classList.contains("active")&&(a.classList.remove("active"),d()))}}),document.querySelectorAll(".sidebar a").forEach(e=>{e.addEventListener("click",n=>{e.hostname!==window.location.hostname||e.getAttribute("href").startsWith("#")||(n.preventDefault(),v(e.href),a&&window.innerWidth<=768&&a.classList.contains("active")&&(a.classList.remove("active"),d()))})}),window.addEventListener("popstate",e=>{e.state&&e.state.path&&(e.state.query?u(e.state.query):v(e.state.path,!1))}),d(),w(window.location.href),L(window.location.pathname);let m=new URLSearchParams(window.location.search).get("search");m&&l&&(l.value=m,u(m))});})();
