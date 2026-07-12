
const music=document.querySelector("#bgMusic");
const musicToggle=document.querySelector("#musicToggle");
const introScreen=document.querySelector("#introScreen");
const enterBtn=document.querySelector("#enterBtn");
async function startMusic(){try{music.volume=.28;await music.play();musicToggle.classList.add("playing");musicToggle.textContent="❚❚"}catch(e){musicToggle.textContent="♫"}}
enterBtn.addEventListener("click",async()=>{introScreen.classList.add("hidden");await startMusic()});
musicToggle.addEventListener("click",async()=>{if(music.paused){await startMusic()}else{music.pause();musicToggle.classList.remove("playing");musicToggle.textContent="♫"}});


const $=s=>document.querySelector(s);
const gallery=$("#gallery");
window.GALLERY.forEach(item=>{
  const card=document.createElement("article");
  card.className="student-card reveal";
  const first=item.images[0];
  const second=item.images[1]||item.images[0];
  card.innerHTML=`<img class="primary" loading="lazy" src="${first}" alt="${item.name}"><img class="alt" loading="lazy" src="${second}" alt=""><div class="caption"><h3>${item.name}</h3><p>Generación 2020–2026</p></div>`;
  card.addEventListener("click",()=>openLightbox(second,item.name));
  gallery.appendChild(card);
});
const names=$("#names");
window.GRADUATES.forEach(n=>{const el=document.createElement("div");el.className="name";el.textContent=n;names.appendChild(el)});
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));
const target=new Date("2026-07-14T17:00:00-06:00").getTime();
function tick(){const diff=Math.max(0,target-Date.now()),d=Math.floor(diff/86400000),h=Math.floor(diff/3600000)%24,m=Math.floor(diff/60000)%60,s=Math.floor(diff/1000)%60;$("#days").textContent=String(d).padStart(2,"0");$("#hours").textContent=String(h).padStart(2,"0");$("#minutes").textContent=String(m).padStart(2,"0");$("#seconds").textContent=String(s).padStart(2,"0")}
tick();setInterval(tick,1000);
const dialog=$("#lightbox");
function openLightbox(src,name){$("#lightboxImg").src=src;$("#lightboxImg").alt=name;$("#lightboxName").textContent=name;dialog.showModal()}
$("#closeLightbox").onclick=()=>dialog.close();
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close()});
async function share(){const data={title:document.title,text:"Acompáñanos a celebrar la graduación de la Generación 2020–2026.",url:location.href};if(navigator.share){try{await navigator.share(data)}catch(e){}}else{try{await navigator.clipboard.writeText(location.href);alert("Enlace copiado.")}catch(e){}}}
$("#shareBtn").onclick=share;$("#shareBtn2").onclick=share;
$("#calendarBtn").onclick=()=>{const ics=`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Graduacion 2026//ES
BEGIN:VEVENT
UID:graduacion-2026@invitacion
DTSTAMP:20260711T120000Z
DTSTART:20260714T230000Z
DTEND:20260715T030000Z
SUMMARY:Graduación Generación 2020–2026
LOCATION:Salón Royal Liberage, Calle Física núm. 96, Col. Las Palmas, Nezahualcóyotl, Estado de México
DESCRIPTION:Celebración de graduación de sexto grado.
END:VEVENT
END:VCALENDAR`;const blob=new Blob([ics],{type:"text/calendar;charset=utf-8"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="graduacion-2026.ics";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)};
const canvas=$("#sparkles"),ctx=canvas.getContext("2d");let w,h,dpr,pts=[];
function resize(){dpr=Math.min(devicePixelRatio||1,2);w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+"px";canvas.style.height=h+"px";ctx.setTransform(dpr,0,0,dpr,0,0);pts=Array.from({length:Math.min(55,Math.floor(w/14))},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.4+.25,v:Math.random()*.16+.04,a:Math.random()*.5+.12}))}
function draw(){ctx.clearRect(0,0,w,h);for(const p of pts){p.y-=p.v;if(p.y<-3){p.y=h+3;p.x=Math.random()*w}ctx.beginPath();ctx.fillStyle=`rgba(243,215,155,${p.a})`;ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}requestAnimationFrame(draw)}
addEventListener("resize",resize,{passive:true});resize();draw();
