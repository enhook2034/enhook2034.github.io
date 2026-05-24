(()=>{var p=null,x="/neutral_app_icon_v1.webp";document.addEventListener("DOMContentLoaded",()=>{let g=document.querySelector(".menu-toggle"),c=document.querySelector(".sidebar"),w=document.querySelector(".site-header"),d=document.querySelector("main"),h=document.querySelector("#menu-search-input"),u=()=>{if(!w||!c)return;let e=w.offsetHeight;window.innerWidth<=768?(c.style.transition="top 0.3s ease-in-out",c.classList.contains("active")?(c.style.top=`${e}px`,c.style.height=`calc(100vh - ${e}px)`):(c.style.top="-100vh",c.style.height="100vh")):(c.classList.remove("active"),c.style.top="",c.style.height="",c.style.transition="none")},v=e=>{let n=e||window.location.href,r=new URL(n,window.location.origin).pathname.toLowerCase().replace(/\/$/,"")||"/";console.log("[Debug] updateActiveMenu checking path:",r);let i=document.querySelectorAll(".sidebar a"),a=null;if(i.forEach(t=>{try{let s=t.pathname.toLowerCase().replace(/\/$/,"")||"/";t.classList.remove("active","ancestor"),(s===r||s===r+"/"||r===s+"/"||r===s+"/index.html"||r===s+"index.html")&&(console.log("[Debug] Match found:",s,"===",r),t.classList.add("active"),a=t)}catch(s){console.error("[Debug] Error processing link:",t.href,s)}}),a){let t=a.parentElement;for(;t;){if(t.tagName==="LI"){let s=t.parentElement;if(s&&s.tagName==="UL"){let o=s.parentElement;if(o&&o.tagName==="LI"){let l=o.querySelector("a");l&&l.classList.add("ancestor")}}}t=t.parentElement}}},L=e=>{let n=e.startsWith("http")?new URL(e).pathname:e,r=document.querySelectorAll(".lang-option");console.log("Updating language switcher for path:",n);let i="en",a=n.toLowerCase().replace(/\/$/,"")||"/";a.startsWith("/cn/")||a==="/cn"||a.startsWith("/cn")?i="cn":(a.startsWith("/en/")||a==="/en"||a.startsWith("/en"))&&(i="en"),console.log("Detected current language:",i),r.forEach(t=>{let s=t.dataset.lang;if(!s){let l=t.textContent.trim().toUpperCase();l==="EN"?s="en":(l==="\u4E2D\u6587"||l==="\u4E2D")&&(s="cn")}console.log("Processing link for target language:",s);let o=n;i==="en"&&s==="cn"?n==="/en/"||n==="/en"?o="/cn/":o=n.replace(/^\/en\//,"/cn/"):i==="cn"&&s==="en"&&(n==="/cn/"||n==="/cn"?o="/en/":o=n.replace(/^\/cn\//,"/en/")),console.log("Target path after replacement:",o),t.href=o,s===i?t.classList.add("active"):t.classList.remove("active")})},b=(e,n=!0)=>{fetch(e).then(r=>{if(!r.ok)throw new Error("Network response was not ok");return r.text()}).then(r=>{let a=new DOMParser().parseFromString(r,"text/html"),t=a.querySelector("main"),s=a.querySelector("title").textContent;t&&d?(d.innerHTML=t.innerHTML,document.title=s,d.querySelectorAll("script").forEach(o=>{let l=document.createElement("script");o.src?l.src=o.src:l.textContent=o.textContent,o.replaceWith(l)}),n&&history.pushState({path:e},s,e),v(e),L(e)):window.location.href=e}).catch(r=>{console.error("Failed to fetch page:",r),window.location.href=e})},m=e=>{if(!e.trim())return;(p?Promise.resolve(p):fetch("/api/apps.json").then(r=>r.json()).then(r=>(p=r,r))).then(r=>{let i=r.filter(t=>t.name.toLowerCase().includes(e.toLowerCase())||t.id&&t.id.toLowerCase().includes(e.toLowerCase())||t.slug&&t.slug.toLowerCase().includes(e.toLowerCase())),a=y(e,i);if(d){d.innerHTML=a,document.title=`Results for "${e}" - Enhook`;let t=`${window.location.pathname}?search=${encodeURIComponent(e)}`;history.pushState({path:t,query:e},document.title,t),document.querySelectorAll(".sidebar a").forEach(o=>{o.classList.remove("active","ancestor")});let s=d.querySelector(".request-software-btn");s&&s.addEventListener("click",()=>{let o=s.getAttribute("data-app-name")||e||"";window.chrome&&window.chrome.webview&&typeof window.chrome.webview.postMessage=="function"&&window.chrome.webview.postMessage({type:"discover_request_software",appName:o})})}}).catch(r=>{console.error("Failed to fetch apps data:",r)})},y=(e,n)=>{let r=document.documentElement.lang||"en",i=r==="zh-CN"||r==="cn",a=`
      <div class="search-container">
        <div class="search-header">
          <h1>Results for "${e}"</h1>
          <p class="search-count">${n.length} ${i?"\u4E2A\u7ED3\u679C":"results"}</p>
        </div>
        <div class="search-results">
    `;return n.length===0?a+=`
        <div class="no-results">
          <p>${i?"\u6CA1\u6709\u627E\u5230\u76F8\u5173\u5E94\u7528":"No applications found"}</p>
          <button
            type="button"
            class="request-software-btn"
            data-app-name="${e.replace(/"/g,"&quot;")}"
          >${i?"\u8BF7\u6C42\u52A0\u5165\u65B0\u8F6F\u4EF6":"Request New App"}</button>
        </div>
      `:n.forEach(t=>{let s=i&&t.description.cn?t.description.cn:t.description.en,o=t.icon||x,l=t.name.replace(/"/g,"&quot;");a+=`
          <a href="/${i?"cn":"en"}/app/${t.id}/${t.slug}/" class="search-result-item">
            <div class="search-result-row">
              <img class="search-result-icon" src="${o}" alt="${l}" width="48" height="48" loading="lazy" decoding="async">
              <div class="search-result-body">
                <div class="search-result-header">
                  <h2 class="search-result-title">${t.name}</h2>
                </div>
                <p class="search-result-description">${s}</p>
                <div class="search-result-meta">
                  <span class="search-result-version">v${t.version}</span>
                </div>
              </div>
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

        .search-result-row {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .search-result-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          object-fit: cover;
          flex-shrink: 0;
          border: 1px solid #30363D;
          background: linear-gradient(135deg, #2c2c2e, #1c1c1e);
        }

        .search-result-body {
          flex: 1;
          min-width: 0;
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
    `,a};g&&c&&g.addEventListener("click",()=>{c.classList.toggle("active"),u()}),window.addEventListener("resize",u),h&&h.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();let n=h.value.trim();n&&(m(n),c&&window.innerWidth<=768&&c.classList.contains("active")&&(c.classList.remove("active"),u()))}}),document.querySelectorAll(".sidebar a").forEach(e=>{e.addEventListener("click",n=>{e.hostname!==window.location.hostname||e.getAttribute("href").startsWith("#")||e.classList.contains("lang-option")||(n.preventDefault(),b(e.href),c&&window.innerWidth<=768&&c.classList.contains("active")&&(c.classList.remove("active"),u()))})}),window.addEventListener("popstate",e=>{e.state&&e.state.path&&(e.state.query?m(e.state.query):b(e.state.path,!1))}),u(),v(window.location.href),L(window.location.pathname);let f=new URLSearchParams(window.location.search).get("search");f&&h&&(h.value=f,m(f))});})();
