import"./modulepreload-polyfill-B5Qt9EMX.js";import{createClient as N}from"https://esm.sh/@supabase/supabase-js@2";const B="https://0ec90b57d6e95fcbda19832f.supabase.co",P="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw",O=N(B,P),g=document.getElementById("bgCanvas"),o=g.getContext("2d");let h,u,w=[];function T(){h=g.width=window.innerWidth,u=g.height=window.innerHeight}T();window.addEventListener("resize",T);for(let t=0;t<180;t++)w.push({x:Math.random()*2e3,y:Math.random()*1200,r:Math.random()*1.5+.3,alpha:Math.random()*.7+.2,speed:Math.random()*.3+.05});function C(){o.clearRect(0,0,h,u),o.strokeStyle="rgba(0,212,255,0.04)",o.lineWidth=1;for(let t=0;t<h;t+=60)o.beginPath(),o.moveTo(t,0),o.lineTo(t,u),o.stroke();for(let t=0;t<u;t+=60)o.beginPath(),o.moveTo(0,t),o.lineTo(h,t),o.stroke();w.forEach(t=>{o.beginPath(),o.arc(t.x%h,t.y%u,t.r,0,Math.PI*2),o.fillStyle=`rgba(200,230,255,${t.alpha})`,o.fill(),t.y-=t.speed,t.y<0&&(t.y=u)}),requestAnimationFrame(C)}C();async function U(){const{data:{session:t}}=await O.auth.getSession(),a=document.getElementById("loginGate"),s=document.getElementById("mainContent");return t?(a.classList.remove("visible"),s.style.display="block",!0):(a.classList.add("visible"),s.style.display="none",!1)}const y=[{id:1,name:"IN-Mumbai-01",location:"Mumbai",type:"Minecraft",cpu:"Intel Xeon E5-2699 V4",status:"operational",uptime:99.99},{id:2,name:"IN-Mumbai-02",location:"Mumbai",type:"Minecraft",cpu:"AMD EPYC 9000",status:"operational",uptime:99.98},{id:3,name:"IN-Mumbai-03",location:"Mumbai",type:"Minecraft",cpu:"AMD Ryzen 9 7900X",status:"operational",uptime:99.99},{id:4,name:"IN-Noida-01",location:"Noida",type:"VPS",cpu:"Intel Xeon E5-2699 V4",status:"operational",uptime:99.97},{id:5,name:"IN-Mumbai-04",location:"Mumbai",type:"VPS",cpu:"AMD Ryzen 9 7900X",status:"operational",uptime:99.99}];function $(){const t=Date.now(),a=24,s=[];for(let n=a;n>=0;n--){const e=t-n*36e5;s.push({time:e,value:30+Math.random()*35,label:n+"h"})}return s}function D(t,a,s="#00d4ff",n=!0){const e=t.getContext("2d"),d=t.getBoundingClientRect(),v=window.devicePixelRatio||1;t.width=d.width*v,t.height=d.height*v,e.scale(v,v);const f=d.width,m=d.height,l=30,b=f-l*2,M=m-l*2;e.strokeStyle="rgba(0,212,255,0.08)",e.lineWidth=1;for(let i=0;i<=4;i++){const c=l+M/4*i;e.beginPath(),e.moveTo(l,c),e.lineTo(f-l,c),e.stroke()}const I=a.map(i=>i.value),S=Math.max(...I),x=Math.min(...I),k=S-x||1,r=a.map((i,c)=>{const p=l+b/a.length*c,L=m-l-(i.value-x)/k*M;return{x:p,y:L}});if(n&&r.length>1){const i=e.createLinearGradient(0,l,0,m-l);i.addColorStop(0,s+"40"),i.addColorStop(1,s+"00"),e.fillStyle=i,e.beginPath(),e.moveTo(r[0].x,m-l),r.forEach(c=>e.lineTo(c.x,c.y)),e.lineTo(r[r.length-1].x,m-l),e.fill()}e.strokeStyle=s,e.lineWidth=2.5,e.lineCap="round",e.lineJoin="round",e.beginPath(),r.forEach((i,c)=>{c===0?e.moveTo(i.x,i.y):e.lineTo(i.x,i.y)}),e.stroke(),e.fillStyle=s,r.forEach(i=>{e.beginPath(),e.arc(i.x,i.y,3,0,Math.PI*2),e.fill()}),e.fillStyle="rgba(106,143,168,0.8)",e.font="11px Rajdhani",e.textAlign="center";const A=Math.ceil(a.length/6);a.forEach((i,c)=>{if(c%A===0||c===a.length-1){const p=l+b/a.length*c;e.fillText(i.label||c,p,m-10)}})}function R(){const t=document.getElementById("nodesGrid");t.innerHTML="",y.forEach((a,s)=>{const n=document.createElement("div");n.className="node-card",n.innerHTML=`
      <div class="node-header">
        <div class="node-info">
          <div style="display:flex;align-items:center;gap:8px;">
            <div class="node-status-indicator ${a.status}"></div>
            <h3>${a.name}</h3>
          </div>
          <div class="node-detail">📍 ${a.location}</div>
          <div class="node-detail">🎮 ${a.type}</div>
          <div class="node-detail">💻 ${a.cpu}</div>
          <div class="node-uptime">${a.uptime}%<div class="node-uptime-label">Uptime</div></div>
        </div>
      </div>
      <div class="node-detail" style="margin-top:12px;">Last checked: <span class="last-check">now</span></div>
      <button class="node-chart-toggle">View Metrics</button>
      <div class="node-charts">
        <div class="chart-container">
          <div class="chart-title">CPU Usage (%)</div>
          <canvas class="metric-chart" data-metric="cpu"></canvas>
        </div>
        <div class="chart-container">
          <div class="chart-title">RAM Usage (%)</div>
          <canvas class="metric-chart" data-metric="ram"></canvas>
        </div>
        <div class="chart-container">
          <div class="chart-title">Disk Usage (%)</div>
          <canvas class="metric-chart" data-metric="disk"></canvas>
        </div>
        <div class="chart-container">
          <div class="chart-title">Network (Mbps)</div>
          <canvas class="metric-chart" data-metric="network"></canvas>
        </div>
        <div class="chart-container" style="grid-column:span 2;">
          <div class="chart-title">Active Servers</div>
          <canvas class="metric-chart" data-metric="servers"></canvas>
        </div>
      </div>
    `,n.querySelector(".node-chart-toggle").addEventListener("click",()=>{n.classList.toggle("expanded"),n.classList.contains("expanded")&&setTimeout(()=>{n.querySelectorAll(".metric-chart").forEach(e=>{D(e,$(),"#00d4ff",!0)})},100)}),t.appendChild(n)})}function z(){const t=document.getElementById("uptimeTableBody");t.innerHTML="",y.forEach(a=>{const s=document.createElement("tr");s.innerHTML=`
      <td><strong>${a.name}</strong></td>
      <td>${a.type}</td>
      <td>${a.cpu}</td>
      <td><div class="table-status operational">Operational</div></td>
      <td><strong style="color:var(--green);">${a.uptime}%</strong></td>
    `,t.appendChild(s)})}function E(){const t=y.every(d=>d.status==="operational"),a=document.getElementById("statusBanner"),s=document.getElementById("statusTitle"),n=document.getElementById("statusTime");a.className="status-banner",t?(a.classList.add("all-operational"),s.textContent="All Systems Operational",document.getElementById("statusCircle").textContent="✓"):(a.classList.add("partial-outage"),s.textContent="Partial Outage",document.getElementById("statusCircle").textContent="⚠");const e=new Date;n.textContent=`Last updated: ${e.toLocaleTimeString()} - Checking in 60s`}async function H(){if(!await U())return;R(),z(),E(),setInterval(async()=>{E(),document.querySelectorAll(".last-check").forEach(n=>{n.textContent="just now"})},6e4);const a=document.querySelectorAll(".reveal"),s=new IntersectionObserver(n=>{n.forEach(e=>{e.isIntersecting&&e.target.classList.add("visible")})},{threshold:.1});a.forEach(n=>s.observe(n))}H();
