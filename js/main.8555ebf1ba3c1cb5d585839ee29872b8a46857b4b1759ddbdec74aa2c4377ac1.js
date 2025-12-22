(()=>{var f=null;document.addEventListener("DOMContentLoaded",()=>{let g=document.querySelector(".menu-toggle"),o=document.querySelector(".sidebar"),p=document.querySelector(".site-header"),h=document.querySelector("main"),l=document.querySelector("#menu-search-input"),d=()=>{if(!p||!o)return;let e=p.offsetHeight;window.innerWidth<=768?(o.style.transition="top 0.3s ease-in-out",o.classList.contains("active")?(o.style.top=`${e}px`,o.style.height=`calc(100vh - ${e}px)`):(o.style.top="-100vh",o.style.height="100vh")):(o.classList.remove("active"),o.style.top="",o.style.height="",o.style.transition="none")},w=e=>{let n=document.querySelectorAll(".sidebar a"),s=null;if(n.forEach(r=>{r.classList.remove("active","ancestor"),r.href===e&&(r.classList.add("active"),s=r)}),s){let r=s.parentElement;for(;r;){if(r.tagName==="LI"){let a=r.parentElement;if(a&&a.tagName==="UL"){let t=a.parentElement;if(t&&t.tagName==="LI"){let c=t.querySelector("a");c&&c.classList.add("ancestor")}}}r=r.parentElement}}},v=e=>{let n=e.startsWith("http")?new URL(e).pathname:e,s=document.querySelectorAll(".language-link-compact"),r=document.querySelector(".language-current-compact");console.log("Updating language switcher for path:",n);let a="en";n.startsWith("/cn/")?a="cn":n.startsWith("/en/")&&(a="en"),console.log("Detected current language:",a),r&&(r.textContent=a==="en"?"EN":"\u4E2D"),s.forEach(t=>{let c=t.dataset.lang||(t.textContent==="EN"?"en":"cn");console.log("Processing link for target language:",c);let i=n;a==="en"&&c==="cn"?n==="/en/"||n==="/en"?i="/cn/":i=n.replace(/^\/en\//,"/cn/"):a==="cn"&&c==="en"?n==="/cn/"||n==="/cn"?i="/en/":i=n.replace(/^\/cn\//,"/en/"):i=n,console.log("Target path after replacement:",i),t.href=i,c===a?t.style.display="none":t.style.display="inline-flex"})},L=(e,n=!0)=>{fetch(e).then(s=>{if(!s.ok)throw new Error("Network response was not ok");return s.text()}).then(s=>{let a=new DOMParser().parseFromString(s,"text/html"),t=a.querySelector("main"),c=a.querySelector("title").textContent;t&&h?(h.innerHTML=t.innerHTML,document.title=c,n&&history.pushState({path:e},c,e),w(e),v(e)):window.location.href=e}).catch(s=>{console.error("Failed to fetch page:",s),window.location.href=e})},u=e=>{if(!e.trim())return;(f?Promise.resolve(f):fetch("/api/apps.json").then(s=>s.json()).then(s=>(f=s,s))).then(s=>{let r=s.filter(t=>t.name.toLowerCase().includes(e.toLowerCase())||t.id&&t.id.toLowerCase().includes(e.toLowerCase())||t.slug&&t.slug.toLowerCase().includes(e.toLowerCase())),a=y(e,r);if(h){h.innerHTML=a,document.title=`Results for "${e}" - Enhook`;let t=`${window.location.pathname}?search=${encodeURIComponent(e)}`;history.pushState({path:t,query:e},document.title,t),document.querySelectorAll(".sidebar a").forEach(c=>{c.classList.remove("active","ancestor")})}}).catch(s=>{console.error("Failed to fetch apps data:",s)})},y=(e,n)=>{let s=document.documentElement.lang||"en",r=s==="zh-CN"||s==="cn",a=`
      <div class="search-container">
        <div class="search-header">
          <h1>Results for "${e}"</h1>
          <p class="search-count">${n.length} ${r?"\u4E2A\u7ED3\u679C":"results"}</p>
        </div>
        <div class="search-results">
    `;return n.length===0?a+=`
        <div class="no-results">
          <p>${r?"\u6CA1\u6709\u627E\u5230\u76F8\u5173\u5E94\u7528":"No applications found"}</p>
        </div>
      `:n.forEach(t=>{let c=r&&t.description.cn?t.description.cn:t.description.en;a+=`
          <a href="/${r?"cn":"en"}/app/${t.id}/${t.slug}/" class="search-result-item">
            <div class="search-result-header">
              <h2 class="search-result-title">${t.name}</h2>
            </div>
            <p class="search-result-description">${c}</p>
            <div class="search-result-meta">
              <span class="search-result-version">v${t.version}</span>
            </div>
          </a>
        `}),a+=`
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
    `,a};g&&o&&g.addEventListener("click",()=>{o.classList.toggle("active"),d()}),window.addEventListener("resize",d),l&&l.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();let n=l.value.trim();n&&(u(n),o&&window.innerWidth<=768&&o.classList.contains("active")&&(o.classList.remove("active"),d()))}}),document.querySelectorAll(".sidebar a").forEach(e=>{e.addEventListener("click",n=>{e.hostname!==window.location.hostname||e.getAttribute("href").startsWith("#")||(n.preventDefault(),L(e.href),o&&window.innerWidth<=768&&o.classList.contains("active")&&(o.classList.remove("active"),d()))})}),window.addEventListener("popstate",e=>{e.state&&e.state.path&&(e.state.query?u(e.state.query):L(e.state.path,!1))}),d(),w(window.location.href),v(window.location.pathname);let m=new URLSearchParams(window.location.search).get("search");m&&l&&(l.value=m,u(m))});})();
