(()=>{var f=null;document.addEventListener("DOMContentLoaded",()=>{let p=document.querySelector(".menu-toggle"),o=document.querySelector(".sidebar"),w=document.querySelector(".site-header"),u=document.querySelector("main"),h=document.querySelector("#menu-search-input"),d=()=>{if(!w||!o)return;let e=w.offsetHeight;window.innerWidth<=768?(o.style.transition="top 0.3s ease-in-out",o.classList.contains("active")?(o.style.top=`${e}px`,o.style.height=`calc(100vh - ${e}px)`):(o.style.top="-100vh",o.style.height="100vh")):(o.classList.remove("active"),o.style.top="",o.style.height="",o.style.transition="none")},L=e=>{let n=e||window.location.href,s=new URL(n,window.location.origin).pathname.toLowerCase().replace(/\/$/,"")||"/";console.log("[Debug] updateActiveMenu checking path:",s);let c=document.querySelectorAll(".sidebar a"),r=null;if(c.forEach(t=>{try{let a=t.pathname.toLowerCase().replace(/\/$/,"")||"/";t.classList.remove("active","ancestor"),a===s&&(console.log("[Debug] Match found:",a),t.classList.add("active"),r=t)}catch(a){console.error("[Debug] Error processing link:",t.href,a)}}),r){let t=r.parentElement;for(;t;){if(t.tagName==="LI"){let a=t.parentElement;if(a&&a.tagName==="UL"){let l=a.parentElement;if(l&&l.tagName==="LI"){let i=l.querySelector("a");i&&i.classList.add("ancestor")}}}t=t.parentElement}}},v=e=>{let n=e.startsWith("http")?new URL(e).pathname:e,s=document.querySelectorAll(".language-link-compact"),c=document.querySelector(".language-current-compact");console.log("Updating language switcher for path:",n);let r="en",t=n.toLowerCase().replace(/\/$/,"")||"/";t.startsWith("/cn/")||t==="/cn"||t.startsWith("/cn")?r="cn":(t.startsWith("/en/")||t==="/en"||t.startsWith("/en"))&&(r="en"),console.log("Detected current language:",r),c&&(c.textContent=r==="en"?"EN":"\u4E2D"),s.forEach(a=>{let l=a.dataset.lang||(a.textContent==="EN"?"en":"cn");console.log("Processing link for target language:",l);let i=n;r==="en"&&l==="cn"?n==="/en/"||n==="/en"?i="/cn/":i=n.replace(/^\/en\//,"/cn/"):r==="cn"&&l==="en"?n==="/cn/"||n==="/cn"?i="/en/":i=n.replace(/^\/cn\//,"/en/"):i=n,console.log("Target path after replacement:",i),a.href=i,l===r?a.style.display="none":a.style.display="inline-flex"})},y=(e,n=!0)=>{fetch(e).then(s=>{if(!s.ok)throw new Error("Network response was not ok");return s.text()}).then(s=>{let r=new DOMParser().parseFromString(s,"text/html"),t=r.querySelector("main"),a=r.querySelector("title").textContent;t&&u?(u.innerHTML=t.innerHTML,document.title=a,n&&history.pushState({path:e},a,e),L(e),v(e)):window.location.href=e}).catch(s=>{console.error("Failed to fetch page:",s),window.location.href=e})},m=e=>{if(!e.trim())return;(f?Promise.resolve(f):fetch("/api/apps.json").then(s=>s.json()).then(s=>(f=s,s))).then(s=>{let c=s.filter(t=>t.name.toLowerCase().includes(e.toLowerCase())||t.id&&t.id.toLowerCase().includes(e.toLowerCase())||t.slug&&t.slug.toLowerCase().includes(e.toLowerCase())),r=E(e,c);if(u){u.innerHTML=r,document.title=`Results for "${e}" - Enhook`;let t=`${window.location.pathname}?search=${encodeURIComponent(e)}`;history.pushState({path:t,query:e},document.title,t),document.querySelectorAll(".sidebar a").forEach(a=>{a.classList.remove("active","ancestor")})}}).catch(s=>{console.error("Failed to fetch apps data:",s)})},E=(e,n)=>{let s=document.documentElement.lang||"en",c=s==="zh-CN"||s==="cn",r=`
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
      `:n.forEach(t=>{let a=c&&t.description.cn?t.description.cn:t.description.en;r+=`
          <a href="/${c?"cn":"en"}/app/${t.id}/${t.slug}/" class="search-result-item">
            <div class="search-result-header">
              <h2 class="search-result-title">${t.name}</h2>
            </div>
            <p class="search-result-description">${a}</p>
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
    `,r};p&&o&&p.addEventListener("click",()=>{o.classList.toggle("active"),d()}),window.addEventListener("resize",d),h&&h.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();let n=h.value.trim();n&&(m(n),o&&window.innerWidth<=768&&o.classList.contains("active")&&(o.classList.remove("active"),d()))}}),document.querySelectorAll(".sidebar a").forEach(e=>{e.addEventListener("click",n=>{e.hostname!==window.location.hostname||e.getAttribute("href").startsWith("#")||(n.preventDefault(),y(e.href),o&&window.innerWidth<=768&&o.classList.contains("active")&&(o.classList.remove("active"),d()))})}),window.addEventListener("popstate",e=>{e.state&&e.state.path&&(e.state.query?m(e.state.query):y(e.state.path,!1))}),d(),L(window.location.href),v(window.location.pathname);let g=new URLSearchParams(window.location.search).get("search");g&&h&&(h.value=g,m(g))});})();
