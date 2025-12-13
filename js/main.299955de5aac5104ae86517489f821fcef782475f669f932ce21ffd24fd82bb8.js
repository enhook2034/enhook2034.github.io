(()=>{document.addEventListener("DOMContentLoaded",()=>{let u=document.querySelector(".menu-toggle"),s=document.querySelector(".sidebar"),f=document.querySelector(".site-header"),d=document.querySelector("main"),c=document.querySelector("#menu-search-input"),l=()=>{if(!f||!s)return;let e=f.offsetHeight;window.innerWidth<=768?(s.style.transition="top 0.3s ease-in-out",s.classList.contains("active")?(s.style.top=`${e}px`,s.style.height=`calc(100vh - ${e}px)`):(s.style.top="-100vh",s.style.height="100vh")):(s.classList.remove("active"),s.style.top="",s.style.height="",s.style.transition="none")},g=e=>{let n=document.querySelectorAll(".sidebar a"),i=null;if(n.forEach(r=>{r.classList.remove("active","ancestor"),r.href===e&&(r.classList.add("active"),i=r)}),i){let r=i.parentElement;for(;r;){if(r.tagName==="LI"){let t=r.parentElement;if(t&&t.tagName==="UL"){let o=t.parentElement;if(o&&o.tagName==="LI"){let a=o.querySelector("a");a&&a.classList.add("ancestor")}}}r=r.parentElement}}},p=(e,n=!0)=>{fetch(e).then(i=>{if(!i.ok)throw new Error("Network response was not ok");return i.text()}).then(i=>{let t=new DOMParser().parseFromString(i,"text/html"),o=t.querySelector("main"),a=t.querySelector("title").textContent;o&&d?(d.innerHTML=o.innerHTML,document.title=a,n&&history.pushState({path:e},a,e),g(e)):window.location.href=e}).catch(i=>{console.error("Failed to fetch page:",i),window.location.href=e})},h=e=>{e.trim()&&fetch("/api/apps.json").then(n=>n.json()).then(n=>{let i=n.filter(t=>t.name.toLowerCase().includes(e.toLowerCase())||t.description.en&&t.description.en.toLowerCase().includes(e.toLowerCase())||t.description.cn&&t.description.cn.toLowerCase().includes(e.toLowerCase())||t.id&&t.id.toLowerCase().includes(e.toLowerCase())||t.slug&&t.slug.toLowerCase().includes(e.toLowerCase())),r=w(e,i);if(d){d.innerHTML=r,document.title=`Results for "${e}" - Enhook`;let t=`${window.location.pathname}?search=${encodeURIComponent(e)}`;history.pushState({path:t,query:e},document.title,t),document.querySelectorAll(".sidebar a").forEach(o=>{o.classList.remove("active","ancestor")})}}).catch(n=>{console.error("Failed to fetch apps data:",n)})},w=(e,n)=>{let i=document.documentElement.lang||"en",r=i==="zh-CN"||i==="cn",t=`
      <div class="search-container">
        <div class="search-header">
          <h1>Results for "${e}"</h1>
          <p class="search-count">${n.length} ${r?"\u4E2A\u7ED3\u679C":"results"}</p>
        </div>
        <div class="search-results">
    `;return n.length===0?t+=`
        <div class="no-results">
          <p>${r?"\u6CA1\u6709\u627E\u5230\u76F8\u5173\u5E94\u7528":"No applications found"}</p>
        </div>
      `:n.forEach(o=>{let a=r&&o.description.cn?o.description.cn:o.description.en;t+=`
          <a href="/${r?"cn":"en"}/app/${o.id}/${o.slug}/" class="search-result-item">
            <div class="search-result-header">
              <h2 class="search-result-title">${o.name}</h2>
            </div>
            <p class="search-result-description">${a}</p>
            <div class="search-result-meta">
              <span class="search-result-version">v${o.version}</span>
            </div>
          </a>
        `}),t+=`
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
    `,t};u&&s&&u.addEventListener("click",()=>{s.classList.toggle("active"),l()}),window.addEventListener("resize",l),c&&c.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();let n=c.value.trim();n&&(h(n),s&&window.innerWidth<=768&&s.classList.contains("active")&&(s.classList.remove("active"),l()))}}),document.querySelectorAll(".sidebar a").forEach(e=>{e.addEventListener("click",n=>{e.hostname!==window.location.hostname||e.getAttribute("href").startsWith("#")||(n.preventDefault(),p(e.href),s&&window.innerWidth<=768&&s.classList.contains("active")&&(s.classList.remove("active"),l()))})}),window.addEventListener("popstate",e=>{e.state&&e.state.path&&(e.state.query?h(e.state.query):p(e.state.path,!1))}),l(),g(window.location.href);let m=new URLSearchParams(window.location.search).get("search");m&&c&&(c.value=m,h(m))});})();
