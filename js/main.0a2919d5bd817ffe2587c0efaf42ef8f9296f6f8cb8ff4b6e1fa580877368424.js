(()=>{var p=null;document.addEventListener("DOMContentLoaded",()=>{let g=document.querySelector(".menu-toggle"),a=document.querySelector(".sidebar"),w=document.querySelector(".site-header"),d=document.querySelector("main"),h=document.querySelector("#menu-search-input"),u=()=>{if(!w||!a)return;let e=w.offsetHeight;window.innerWidth<=768?(a.style.transition="top 0.3s ease-in-out",a.classList.contains("active")?(a.style.top=`${e}px`,a.style.height=`calc(100vh - ${e}px)`):(a.style.top="-100vh",a.style.height="100vh")):(a.classList.remove("active"),a.style.top="",a.style.height="",a.style.transition="none")},v=e=>{let r=e||window.location.href,s=new URL(r,window.location.origin).pathname.toLowerCase().replace(/\/$/,"")||"/";console.log("[Debug] updateActiveMenu checking path:",s);let i=document.querySelectorAll(".sidebar a"),o=null;if(i.forEach(t=>{try{let n=t.pathname.toLowerCase().replace(/\/$/,"")||"/";t.classList.remove("active","ancestor"),(n===s||n===s+"/"||s===n+"/"||s===n+"/index.html"||s===n+"index.html")&&(console.log("[Debug] Match found:",n,"===",s),t.classList.add("active"),o=t)}catch(n){console.error("[Debug] Error processing link:",t.href,n)}}),o){let t=o.parentElement;for(;t;){if(t.tagName==="LI"){let n=t.parentElement;if(n&&n.tagName==="UL"){let c=n.parentElement;if(c&&c.tagName==="LI"){let l=c.querySelector("a");l&&l.classList.add("ancestor")}}}t=t.parentElement}}},L=e=>{let r=e.startsWith("http")?new URL(e).pathname:e,s=document.querySelectorAll(".lang-option");console.log("Updating language switcher for path:",r);let i="en",o=r.toLowerCase().replace(/\/$/,"")||"/";o.startsWith("/cn/")||o==="/cn"||o.startsWith("/cn")?i="cn":(o.startsWith("/en/")||o==="/en"||o.startsWith("/en"))&&(i="en"),console.log("Detected current language:",i),s.forEach(t=>{let n=t.dataset.lang;if(!n){let l=t.textContent.trim().toUpperCase();l==="EN"?n="en":(l==="\u4E2D\u6587"||l==="\u4E2D")&&(n="cn")}console.log("Processing link for target language:",n);let c=r;i==="en"&&n==="cn"?r==="/en/"||r==="/en"?c="/cn/":c=r.replace(/^\/en\//,"/cn/"):i==="cn"&&n==="en"&&(r==="/cn/"||r==="/cn"?c="/en/":c=r.replace(/^\/cn\//,"/en/")),console.log("Target path after replacement:",c),t.href=c,n===i?t.classList.add("active"):t.classList.remove("active")})},b=(e,r=!0)=>{fetch(e).then(s=>{if(!s.ok)throw new Error("Network response was not ok");return s.text()}).then(s=>{let o=new DOMParser().parseFromString(s,"text/html"),t=o.querySelector("main"),n=o.querySelector("title").textContent;t&&d?(d.innerHTML=t.innerHTML,document.title=n,d.querySelectorAll("script").forEach(c=>{let l=document.createElement("script");c.src?l.src=c.src:l.textContent=c.textContent,c.replaceWith(l)}),r&&history.pushState({path:e},n,e),v(e),L(e)):window.location.href=e}).catch(s=>{console.error("Failed to fetch page:",s),window.location.href=e})},m=e=>{if(!e.trim())return;(p?Promise.resolve(p):fetch("/api/apps.json").then(s=>s.json()).then(s=>(p=s,s))).then(s=>{let i=s.filter(t=>t.name.toLowerCase().includes(e.toLowerCase())||t.id&&t.id.toLowerCase().includes(e.toLowerCase())||t.slug&&t.slug.toLowerCase().includes(e.toLowerCase())),o=y(e,i);if(d){d.innerHTML=o,document.title=`Results for "${e}" - Enhook`;let t=`${window.location.pathname}?search=${encodeURIComponent(e)}`;history.pushState({path:t,query:e},document.title,t),document.querySelectorAll(".sidebar a").forEach(c=>{c.classList.remove("active","ancestor")});let n=d.querySelector(".request-software-btn");n&&n.addEventListener("click",()=>{let c=n.getAttribute("data-app-name")||e||"";window.chrome&&window.chrome.webview&&typeof window.chrome.webview.postMessage=="function"&&window.chrome.webview.postMessage({type:"discover_request_software",appName:c})})}}).catch(s=>{console.error("Failed to fetch apps data:",s)})},y=(e,r)=>{let s=document.documentElement.lang||"en",i=s==="zh-CN"||s==="cn",o=`
      <div class="search-container">
        <div class="search-header">
          <h1>Results for "${e}"</h1>
          <p class="search-count">${r.length} ${i?"\u4E2A\u7ED3\u679C":"results"}</p>
        </div>
        <div class="search-results">
    `;return r.length===0?o+=`
        <div class="no-results">
          <p>${i?"\u6CA1\u6709\u627E\u5230\u76F8\u5173\u5E94\u7528":"No applications found"}</p>
          <button
            type="button"
            class="request-software-btn"
            data-app-name="${e.replace(/"/g,"&quot;")}"
          >${i?"\u8BF7\u6C42\u52A0\u5165\u65B0\u8F6F\u4EF6":"Request New App"}</button>
        </div>
      `:r.forEach(t=>{let n=i&&t.description.cn?t.description.cn:t.description.en;o+=`
          <a href="/${i?"cn":"en"}/app/${t.id}/${t.slug}/" class="search-result-item">
            <div class="search-result-header">
              <h2 class="search-result-title">${t.name}</h2>
            </div>
            <p class="search-result-description">${n}</p>
            <div class="search-result-meta">
              <span class="search-result-version">v${t.version}</span>
            </div>
          </a>
        `}),o+=`
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
          margin: 0 0 1rem 0;
        }

        .request-software-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.6rem 1rem;
          border-radius: 8px;
          border: 1px solid #30363D;
          background-color: #1F6FEB;
          color: #fff;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }

        .request-software-btn:hover {
          background-color: #388BFD;
          border-color: #58A6FF;
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
    `,o};g&&a&&g.addEventListener("click",()=>{a.classList.toggle("active"),u()}),window.addEventListener("resize",u),h&&h.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();let r=h.value.trim();r&&(m(r),a&&window.innerWidth<=768&&a.classList.contains("active")&&(a.classList.remove("active"),u()))}}),document.querySelectorAll(".sidebar a").forEach(e=>{e.addEventListener("click",r=>{e.hostname!==window.location.hostname||e.getAttribute("href").startsWith("#")||e.classList.contains("lang-option")||(r.preventDefault(),b(e.href),a&&window.innerWidth<=768&&a.classList.contains("active")&&(a.classList.remove("active"),u()))})}),window.addEventListener("popstate",e=>{e.state&&e.state.path&&(e.state.query?m(e.state.query):b(e.state.path,!1))}),u(),v(window.location.href),L(window.location.pathname);let f=new URLSearchParams(window.location.search).get("search");f&&h&&(h.value=f,m(f))});})();
