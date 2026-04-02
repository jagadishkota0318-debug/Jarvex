// SYNC KC ANIMATIONS — use Date.now() so rotation is continuous across page navigations
(function syncKC(){
  const t=Date.now()/1000;
  document.querySelectorAll('.kc-outer,.kc-middle,.kc-inner,.kc-center-dot').forEach(el=>{
    const dur=parseFloat(getComputedStyle(el).animationDuration);
    if(dur>0) el.style.animationDelay=-(t%dur)+'s';
  });
})();

// CURSOR
const cur=document.getElementById('cursor'),ring=document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px'});
(function a(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(a)})();
document.querySelectorAll('a,button,.service-card,.why-item,.price-card,.testi-card,.process-step,.stat-row,.team-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.style.width='18px';cur.style.height='18px';ring.style.width='52px';ring.style.height='52px'});
  el.addEventListener('mouseleave',()=>{cur.style.width='10px';cur.style.height='10px';ring.style.width='34px';ring.style.height='34px'});
});

// MOBILE WATERMARK - matches desktop hero kc-bg opacity (0.07) — subtle ambient background
if(window.innerWidth<=767){
  const wm=document.createElement('svg');
  wm.setAttribute('viewBox','-160 -160 320 320');
  wm.setAttribute('xmlns','http://www.w3.org/2000/svg');
  // opacity 0.08 matches desktop hero-kc-bg (opacity:0.07) — background, not foreground
  wm.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:340px;height:340px;pointer-events:none;z-index:0;opacity:0.08';

  // Inner fill matches body background exactly (#080808) to avoid center-disc artifact
  wm.innerHTML=`<circle r="152" fill="none" stroke="#e8ff47" stroke-width="1.5"/><g id="wm-outer"><polygon points="0,-152 8,-120 -8,-120" fill="#e8ff47"/><polygon points="76,-131 68,-102 55,-112" fill="#e8ff47"/><polygon points="131,-76 110,-55 102,-72" fill="#c8e800"/><polygon points="152,0 120,8 120,-8" fill="#e8ff47"/><polygon points="131,76 102,72 110,55" fill="#c8e800"/><polygon points="76,131 55,112 68,102" fill="#e8ff47"/><polygon points="0,152 -8,120 8,120" fill="#e8ff47"/><polygon points="-76,131 -68,102 -55,112" fill="#e8ff47"/><polygon points="-131,76 -110,55 -102,72" fill="#c8e800"/><polygon points="-152,0 -120,-8 -120,8" fill="#e8ff47"/><polygon points="-131,-76 -102,-72 -110,-55" fill="#c8e800"/><polygon points="-76,-131 -55,-112 -68,-102" fill="#e8ff47"/></g><circle r="114" fill="none" stroke="#e8ff47" stroke-width="1.5"/><g id="wm-middle"><circle cx="0" cy="-114" r="5" fill="#e8ff47"/><circle cx="57" cy="-99" r="4" fill="#c8e800"/><circle cx="99" cy="-57" r="4" fill="#c8e800"/><circle cx="114" cy="0" r="5" fill="#e8ff47"/><circle cx="99" cy="57" r="4" fill="#c8e800"/><circle cx="57" cy="99" r="4" fill="#c8e800"/><circle cx="0" cy="114" r="5" fill="#e8ff47"/><circle cx="-57" cy="99" r="4" fill="#c8e800"/><circle cx="-99" cy="57" r="4" fill="#c8e800"/><circle cx="-114" cy="0" r="5" fill="#e8ff47"/><circle cx="-99" cy="-57" r="4" fill="#c8e800"/><circle cx="-57" cy="-99" r="4" fill="#c8e800"/></g><circle r="70" fill="#080808" stroke="#e8ff47" stroke-width="1.5"/><g id="wm-inner"><polygon points="0,-70 5,-45 -5,-45" fill="#7fa800"/><polygon points="60,-35 41,-22 35,-32" fill="#7fa800"/><polygon points="60,35 35,32 41,22" fill="#7fa800"/><polygon points="0,70 -5,45 5,45" fill="#7fa800"/><polygon points="-60,35 -41,22 -35,32" fill="#7fa800"/><polygon points="-60,-35 -35,-32 -41,-22" fill="#7fa800"/></g><circle r="32" fill="#e8ff47"/><circle r="20" fill="#080808"/><circle r="10" fill="#e8ff47"/><circle r="4" fill="#080808"/>`;
  document.body.appendChild(wm);

  // RAF rotation — setAttribute rotate(angle) pivots around (0,0) = center of viewBox
  // Speeds match desktop hero kc-bg: outer 40s, middle 28s (reverse), inner 16s
  const wmOuter=wm.querySelector('#wm-outer'),wmMiddle=wm.querySelector('#wm-middle'),wmInner=wm.querySelector('#wm-inner');
  // Sync with Date.now() so rotation continues across page navigations
  const epoch=Date.now()/1000;
  let oA=(epoch*(360/40))%360, mA=(360-(epoch*(360/28))%360)%360, iA=(epoch*(360/16))%360;
  let prev=performance.now();
  (function tick(t){
    const d=Math.min((t-prev)/1000,0.05); prev=t;
    oA=(oA+9*d)%360;        // 40s full rotation
    mA=(mA-12.86*d+360)%360; // 28s full rotation, counter-clockwise
    iA=(iA+22.5*d)%360;     // 16s full rotation
    wmOuter.setAttribute('transform','rotate('+oA+')');
    wmMiddle.setAttribute('transform','rotate('+mA+')');
    wmInner.setAttribute('transform','rotate('+iA+')');
    requestAnimationFrame(tick);
  })(performance.now());
}

// SCROLL PROGRESS
window.addEventListener('scroll',()=>{
  const pct=(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight))*100;
  const bar=document.getElementById('progressBar');
  if(bar)bar.style.width=pct+'%';
});

// MOBILE NAV
let menuOpen=false;
function toggleMenu(){
  menuOpen=!menuOpen;
  document.getElementById('navLinks').classList.toggle('open',menuOpen);
  const[t1,t2,t3]=['t1','t2','t3'].map(id=>document.getElementById(id));
  if(menuOpen){t1.style.transform='rotate(45deg) translate(5px,5px)';t2.style.opacity='0';t3.style.transform='rotate(-45deg) translate(5px,-5px)'}
  else{t1.style.transform='';t2.style.opacity='';t3.style.transform=''}
}
function closeMenu(){if(menuOpen)toggleMenu()}

// ACTIVE NAV LINK
(function(){
  const path=window.location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-link').forEach(a=>{
    const href=a.getAttribute('href');
    if(href===path||(path===''&&href==='index.html'))a.classList.add('active');
    a.addEventListener('click',closeMenu);
  });
  document.querySelectorAll('.nav-cta').forEach(a=>a.addEventListener('click',closeMenu));
})();

// SCROLL ANIMATIONS
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)'}});
},{threshold:0.08});
document.querySelectorAll('.service-card,.why-item,.process-step,.price-card,.testi-card,.ci-item,.team-card,.anim-up').forEach((el,i)=>{
  el.style.opacity='0';el.style.transform='translateY(22px)';
  el.style.transition=`opacity 0.55s ${i*0.07}s ease,transform 0.55s ${i*0.07}s ease,background 0.3s,padding-left 0.3s`;
  obs.observe(el);
});

// CONTACT FORM
function submitContact(){
  const name=document.getElementById('cf_name')?.value.trim();
  const email=document.getElementById('cf_email')?.value.trim();
  const msg=document.getElementById('cf_msg')?.value.trim();
  if(!name||!email||!msg){
    ['cf_name','cf_email','cf_msg'].forEach(id=>{const el=document.getElementById(id);if(el&&!el.value.trim())el.style.outline='1px solid #ff4d4d'});
    setTimeout(()=>document.querySelectorAll('.form-group input,.form-group textarea').forEach(el=>el.style.outline=''),2200);return;
  }
  try{const c=JSON.parse(localStorage.getItem('jarvex_contacts')||'[]');c.push({name,email,phone:document.getElementById('cf_phone')?.value,service:document.getElementById('cf_service')?.value,msg,ts:new Date().toISOString()});localStorage.setItem('jarvex_contacts',JSON.stringify(c))}catch(e){}
  const btn=document.querySelector('.form-submit-btn');if(btn)btn.style.display='none';
  const suc=document.getElementById('formSuccessMsg');if(suc)suc.style.display='block';
}
