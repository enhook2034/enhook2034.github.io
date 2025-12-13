(()=>{var u=null;document.addEventListener("DOMContentLoaded",()=>{let f=document.querySelector(".menu-toggle"),r=document.querySelector(".sidebar"),p=document.querySelector(".site-header"),d=document.querySelector("main"),c=document.querySelector("#menu-search-input"),l=()=>{if(!p||!r)return;let e=p.offsetHeight;window.innerWidth<=768?(r.style.transition="top 0.3s ease-in-out",r.classList.contains("active")?(r.style.top=`${e}px`,r.style.height=`calc(100vh - ${e}px)`):(r.style.top="-100vh",r.style.height="100vh")):(r.classList.remove("active"),r.style.top="",r.style.height="",r.style.transition="none")},g=e=>{let o=document.querySelectorAll(".sidebar a"),s=null;if(o.forEach(n=>{n.classList.remove("active","ancestor"),n.href===e&&(n.classList.add("active"),s=n)}),s){let n=s.parentElement;for(;n;){if(n.tagName==="LI"){let a=n.parentElement;if(a&&a.tagName==="UL"){let t=a.parentElement;if(t&&t.tagName==="LI"){let i=t.querySelector("a");i&&i.classList.add("ancestor")}}}n=n.parentElement}}},v=(e,o=!0)=>{fetch(e).then(s=>{if(!s.ok)throw new Error("Network response was not ok");return s.text()}).then(s=>{let a=new DOMParser().parseFromString(s,"text/html"),t=a.querySelector("main"),i=a.querySelector("title").textContent;t&&d?(d.innerHTML=t.innerHTML,document.title=i,o&&history.pushState({path:e},i,e),g(e)):window.location.href=e}).catch(s=>{console.error("Failed to fetch page:",s),window.location.href=e})},h=e=>{if(!e.trim())return;(u?Promise.resolve(u):fetch("/api/apps.json").then(s=>s.json()).then(s=>(u=s,s))).then(s=>{let n=s.filter(t=>t.name.toLowerCase().includes(e.toLowerCase())||t.id&&t.id.toLowerCase().includes(e.toLowerCase())||t.slug&&t.slug.toLowerCase().includes(e.toLowerCase())),a=w(e,n);if(d){d.innerHTML=a,document.title=`Results for "${e}" - Enhook`;let t=`${window.location.pathname}?search=${encodeURIComponent(e)}`;history.pushState({path:t,query:e},document.title,t),document.querySelectorAll(".sidebar a").forEach(i=>{i.classList.remove("active","ancestor")})}}).catch(s=>{console.error("Failed to fetch apps data:",s)})},w=(e,o)=>{let s=document.documentElement.lang||"en",n=s==="zh-CN"||s==="cn",a=`
      <div class="search-container">
        <div class="search-header">
          <h1>Results for "${e}"</h1>
          <p class="search-count">${o.length} ${n?"\u4E2A\u7ED3\u679C":"results"}</p>
        </div>
        <div class="search-results">
    `;return o.length===0?a+=`
        <div class="no-results">
          <p>${n?"\u6CA1\u6709\u627E\u5230\u76F8\u5173\u5E94\u7528":"No applications found"}</p>
        </div>
      `:o.forEach(t=>{let i=n&&t.description.cn?t.description.cn:t.description.en;a+=`
          <a href="/${n?"cn":"en"}/app/${t.id}/${t.slug}/" class="search-result-item">
            <div class="search-result-header">
              <h2 class="search-result-title">${t.name}</h2>
            </div>
            <p class="search-result-description">${i}</p>
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
    `,a};f&&r&&f.addEventListener("click",()=>{r.classList.toggle("active"),l()}),window.addEventListener("resize",l),c&&c.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();let o=c.value.trim();o&&(h(o),r&&window.innerWidth<=768&&r.classList.contains("active")&&(r.classList.remove("active"),l()))}}),document.querySelectorAll(".sidebar a").forEach(e=>{e.addEventListener("click",o=>{e.hostname!==window.location.hostname||e.getAttribute("href").startsWith("#")||(o.preventDefault(),v(e.href),r&&window.innerWidth<=768&&r.classList.contains("active")&&(r.classList.remove("active"),l()))})}),window.addEventListener("popstate",e=>{e.state&&e.state.path&&(e.state.query?h(e.state.query):v(e.state.path,!1))}),l(),g(window.location.href);let m=new URLSearchParams(window.location.search).get("search");m&&c&&(c.value=m,h(m))});})();
