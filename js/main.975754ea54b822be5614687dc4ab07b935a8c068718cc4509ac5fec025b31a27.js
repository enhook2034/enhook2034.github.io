(()=>{var p=null,E="/neutral_app_icon_v1.webp";document.addEventListener("DOMContentLoaded",()=>{let g=document.querySelector(".menu-toggle"),c=document.querySelector(".sidebar"),w=document.querySelector(".site-header"),d=document.querySelector("main"),h=document.querySelector("#menu-search-input"),u=()=>{if(!w||!c)return;let e=w.offsetHeight;window.innerWidth<=768?(c.style.transition="top 0.3s ease-in-out",c.classList.contains("active")?(c.style.top=`${e}px`,c.style.height=`calc(100vh - ${e}px)`):(c.style.top="-100vh",c.style.height="100vh")):(c.classList.remove("active"),c.style.top="",c.style.height="",c.style.transition="none")},v=e=>{let a=e||window.location.href,s=new URL(a,window.location.origin).pathname.toLowerCase().replace(/\/$/,"")||"/";console.log("[Debug] updateActiveMenu checking path:",s);let i=document.querySelectorAll(".sidebar a"),r=null;if(i.forEach(t=>{try{let n=t.pathname.toLowerCase().replace(/\/$/,"")||"/";t.classList.remove("active","ancestor"),(n===s||n===s+"/"||s===n+"/"||s===n+"/index.html"||s===n+"index.html")&&(console.log("[Debug] Match found:",n,"===",s),t.classList.add("active"),r=t)}catch(n){console.error("[Debug] Error processing link:",t.href,n)}}),r){let t=r.parentElement;for(;t;){if(t.tagName==="LI"){let n=t.parentElement;if(n&&n.tagName==="UL"){let o=n.parentElement;if(o&&o.tagName==="LI"){let l=o.querySelector("a");l&&l.classList.add("ancestor")}}}t=t.parentElement}}},L=e=>{let a=e.startsWith("http")?new URL(e).pathname:e,s=document.querySelectorAll(".lang-option");console.log("Updating language switcher for path:",a);let i="en",r=a.toLowerCase().replace(/\/$/,"")||"/";r.startsWith("/cn/")||r==="/cn"||r.startsWith("/cn")?i="cn":(r.startsWith("/en/")||r==="/en"||r.startsWith("/en"))&&(i="en"),console.log("Detected current language:",i),s.forEach(t=>{let n=t.dataset.lang;if(!n){let l=t.textContent.trim().toUpperCase();l==="EN"?n="en":(l==="\u4E2D\u6587"||l==="\u4E2D")&&(n="cn")}console.log("Processing link for target language:",n);let o=a;i==="en"&&n==="cn"?a==="/en/"||a==="/en"?o="/cn/":o=a.replace(/^\/en\//,"/cn/"):i==="cn"&&n==="en"&&(a==="/cn/"||a==="/cn"?o="/en/":o=a.replace(/^\/cn\//,"/en/")),console.log("Target path after replacement:",o),t.href=o,n===i?t.classList.add("active"):t.classList.remove("active")})},b=(e,a=!0)=>{fetch(e).then(s=>{if(!s.ok)throw new Error("Network response was not ok");return s.text()}).then(s=>{let r=new DOMParser().parseFromString(s,"text/html"),t=r.querySelector("main"),n=r.querySelector("title").textContent;t&&d?(d.innerHTML=t.innerHTML,document.title=n,d.querySelectorAll("script").forEach(o=>{let l=document.createElement("script");o.src?l.src=o.src:l.textContent=o.textContent,o.replaceWith(l)}),a&&history.pushState({path:e},n,e),v(e),L(e)):window.location.href=e}).catch(s=>{console.error("Failed to fetch page:",s),window.location.href=e})},f=e=>{if(!e.trim())return;(p?Promise.resolve(p):fetch("/api/apps.json").then(s=>s.json()).then(s=>(p=s,s))).then(s=>{let i=s.filter(t=>t.name.toLowerCase().includes(e.toLowerCase())||t.id&&t.id.toLowerCase().includes(e.toLowerCase())||t.slug&&t.slug.toLowerCase().includes(e.toLowerCase())),r=y(e,i);if(d){d.innerHTML=r,document.title=`Results for "${e}" - Enhook`;let t=`${window.location.pathname}?search=${encodeURIComponent(e)}`;history.pushState({path:t,query:e},document.title,t),document.querySelectorAll(".sidebar a").forEach(o=>{o.classList.remove("active","ancestor")});let n=d.querySelector(".request-software-btn");n&&n.addEventListener("click",()=>{let o=n.getAttribute("data-app-name")||e||"";window.chrome&&window.chrome.webview&&typeof window.chrome.webview.postMessage=="function"&&window.chrome.webview.postMessage({type:"discover_request_software",appName:o})})}}).catch(s=>{console.error("Failed to fetch apps data:",s)})},y=(e,a)=>{let s=document.documentElement.lang||"en",i=s==="zh-CN"||s==="cn",r=`
      <div class="search-container">
        <div class="search-header">
          <h1>Results for "${e}"</h1>
          <p class="search-count">${a.length} ${i?"\u4E2A\u7ED3\u679C":"results"}</p>
        </div>
        <div class="search-results">
    `;return a.length===0?r+=`
        <div class="no-results">
          <p>${i?"\u6CA1\u6709\u627E\u5230\u76F8\u5173\u5E94\u7528":"No applications found"}</p>
          <button
            type="button"
            class="request-software-btn"
            data-app-name="${e.replace(/"/g,"&quot;")}"
          >${i?"\u8BF7\u6C42\u52A0\u5165\u65B0\u8F6F\u4EF6":"Request New App"}</button>
        </div>
      `:a.forEach(t=>{let n=i&&t.description.cn?t.description.cn:t.description.en,o=t.icon||E,l=t.name.replace(/"/g,"&quot;");r+=`
          <a href="/${i?"cn":"en"}/app/${t.id}/${t.slug}/" class="search-result-item">
            <div class="search-result-row">
              <img class="search-result-icon" src="${o}" alt="${l}" width="48" height="48" loading="lazy" decoding="async">
              <div class="search-result-body">
                <div class="search-result-header">
                  <h2 class="search-result-title">${t.name}</h2>
                </div>
                <p class="search-result-description">${n}</p>
                <div class="search-result-meta">
                  <span class="search-result-version">v${t.version}</span>
                </div>
              </div>
            </div>
          </a>
        `}),r+=`
        </div>
      </div>
      <style>
        .search-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .search-header h1 {
          font-size: 2.5rem;
          font-weight: 600;
          margin: 0 0 var(--space-4) 0;
          color: var(--fg-0);
        }
        
        .search-count {
          font-size: 1.1rem;
          color: var(--fg-1);
          margin: 0;
        }

        .request-software-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.6rem var(--space-4);
          border-radius: 8px;
          border: 1px solid var(--border-default);
          background-color: var(--brand-muted);
          color: #fff;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color var(--motion-fast) var(--ease-standard), border-color var(--motion-fast) var(--ease-standard);
        }

        .request-software-btn:hover {
          background-color: var(--brand);
          border-color: var(--brand);
        }
        
        @media (max-width: 768px) {
          .search-header h1 {
            font-size: 2rem;
          }
        }
      </style>
    `,r};g&&c&&g.addEventListener("click",()=>{c.classList.toggle("active"),u()}),window.addEventListener("resize",u),h&&h.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();let a=h.value.trim();a&&(f(a),c&&window.innerWidth<=768&&c.classList.contains("active")&&(c.classList.remove("active"),u()))}}),document.querySelectorAll(".sidebar a").forEach(e=>{e.addEventListener("click",a=>{e.hostname!==window.location.hostname||e.getAttribute("href").startsWith("#")||e.classList.contains("lang-option")||(a.preventDefault(),b(e.href),c&&window.innerWidth<=768&&c.classList.contains("active")&&(c.classList.remove("active"),u()))})}),window.addEventListener("popstate",e=>{e.state&&e.state.path&&(e.state.query?f(e.state.query):b(e.state.path,!1))}),u(),v(window.location.href),L(window.location.pathname);let m=new URLSearchParams(window.location.search).get("search");m&&h&&(h.value=m,f(m))});})();
