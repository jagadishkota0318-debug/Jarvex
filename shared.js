// CURSOR
const cur=document.getElementById('cursor'),ring=document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px'});
(function a(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(a)})();
document.querySelectorAll('a,button,.service-card,.why-item,.price-card,.testi-card,.process-step,.stat-row,.team-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.style.width='18px';cur.style.height='18px';ring.style.width='52px';ring.style.height='52px'});
  el.addEventListener('mouseleave',()=>{cur.style.width='10px';cur.style.height='10px';ring.style.width='34px';ring.style.height='34px'});
});

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
  });
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

// WAITLIST FORM (used on index + waitlist page)
let wlCount=Math.floor(Math.random()*90)+130;
function handleWaitlist(){
  const inp=document.getElementById('wlEmail');
  if(!inp)return;
  const email=inp.value.trim();
  if(!email||!email.includes('@')){
    inp.style.outline='1px solid #ff4d4d';inp.placeholder='Please enter a valid email';
    setTimeout(()=>{inp.style.outline='';inp.placeholder='Enter your email address'},2200);return;
  }
  wlCount++;
  const wrap=document.getElementById('wlFormWrap'),suc=document.getElementById('wlSuccess');
  if(wrap)wrap.style.display='none';
  if(suc){suc.style.display='block';const c=document.getElementById('wlCount');if(c)c.textContent=wlCount;}
  try{const wl=JSON.parse(localStorage.getItem('jarvex_waitlist')||'[]');wl.push({email,ts:new Date().toISOString()});localStorage.setItem('jarvex_waitlist',JSON.stringify(wl))}catch(e){}
}
const wlInput=document.getElementById('wlEmail');
if(wlInput)wlInput.addEventListener('keydown',e=>{if(e.key==='Enter')handleWaitlist()});

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
