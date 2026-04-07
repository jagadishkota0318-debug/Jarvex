// SYNC KC ANIMATIONS — head script handles first-paint sync via CSS animation-delay.
// This re-syncs any dynamically added KC elements (watermark) using their actual durations.
function syncKCElements(root){
  const t=Date.now()/1000;
  (root||document).querySelectorAll('.kc-outer,.kc-middle,.kc-inner,.kc-center-dot').forEach(el=>{
    const dur=parseFloat(getComputedStyle(el).animationDuration);
    if(dur>0) el.style.animationDelay=-(t%dur)+'s';
  });
}

// CURSOR
const cur=document.getElementById('cursor'),ring=document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px'});
(function a(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(a)})();
document.querySelectorAll('a,button,.home-card,.service-card,.why-item,.price-card,.testi-card,.process-step,.stat-row,.team-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.style.width='18px';cur.style.height='18px';ring.style.width='52px';ring.style.height='52px'});
  el.addEventListener('mouseleave',()=>{cur.style.width='10px';cur.style.height='10px';ring.style.width='34px';ring.style.height='34px'});
});

// MOBILE/TABLET WATERMARK — GPU-accelerated CSS animations (no RAF loop)
// Wrapped in a fixed container with height:100dvh + overflow:hidden to prevent
// jitter caused by mobile browser address bar show/hide resizing the viewport.
if(window.innerWidth<=1023){
  const wmSize=window.innerWidth<=479?'320px':window.innerWidth<=767?'420px':'560px';
  const wmWrap=document.createElement('div');
  wmWrap.style.cssText='position:fixed;top:0;left:0;width:100%;height:100dvh;height:100vh;pointer-events:none;z-index:1;overflow:hidden';
  // 100dvh where supported, 100vh fallback — set dvh last so it wins if supported
  if(CSS.supports&&CSS.supports('height','100dvh'))wmWrap.style.height='100dvh';
  const tmp=document.createElement('div');
  tmp.innerHTML='<svg viewBox="-340 -340 680 680" xmlns="http://www.w3.org/2000/svg" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:'+wmSize+';height:'+wmSize+';pointer-events:none;opacity:0.25"><circle r="338" fill="none" stroke="#e8ff47" stroke-width="1" opacity="0.8"/><g class="kc-outer" style="animation-duration:40s"><polygon points="0,-338 14,-268 -14,-268" fill="#e8ff47"/><polygon points="169,-293 152,-226 123,-245" fill="#e8ff47" opacity="0.85"/><polygon points="293,-169 245,-123 226,-152" fill="#c8e800" opacity="0.78"/><polygon points="338,0 268,14 268,-14" fill="#e8ff47"/><polygon points="293,169 226,152 245,123" fill="#c8e800" opacity="0.78"/><polygon points="169,293 123,245 152,226" fill="#e8ff47" opacity="0.85"/><polygon points="0,338 -14,268 14,268" fill="#e8ff47"/><polygon points="-169,293 -152,226 -123,245" fill="#e8ff47" opacity="0.85"/><polygon points="-293,169 -245,123 -226,152" fill="#c8e800" opacity="0.78"/><polygon points="-338,0 -268,-14 -268,14" fill="#e8ff47"/><polygon points="-293,-169 -226,-152 -245,-123" fill="#c8e800" opacity="0.78"/><polygon points="-169,-293 -123,-245 -152,-226" fill="#e8ff47" opacity="0.85"/></g><circle r="254" fill="none" stroke="#e8ff47" stroke-width="2" opacity="0.7"/><g class="kc-middle" style="animation-duration:28s"><circle cx="0" cy="-254" r="10" fill="#e8ff47"/><circle cx="127" cy="-220" r="8" fill="#c8e800" opacity="0.8"/><circle cx="220" cy="-127" r="8" fill="#c8e800" opacity="0.8"/><circle cx="254" cy="0" r="10" fill="#e8ff47"/><circle cx="220" cy="127" r="8" fill="#c8e800" opacity="0.8"/><circle cx="127" cy="220" r="8" fill="#c8e800" opacity="0.8"/><circle cx="0" cy="254" r="10" fill="#e8ff47"/><circle cx="-127" cy="220" r="8" fill="#c8e800" opacity="0.8"/><circle cx="-220" cy="127" r="8" fill="#c8e800" opacity="0.8"/><circle cx="-254" cy="0" r="10" fill="#e8ff47"/><circle cx="-220" cy="-127" r="8" fill="#c8e800" opacity="0.8"/><circle cx="-127" cy="-220" r="8" fill="#c8e800" opacity="0.8"/></g><circle r="155" fill="#080808" opacity="0.6"/><circle r="154" fill="none" stroke="#e8ff47" stroke-width="1.5" opacity="0.5"/><g class="kc-inner" style="animation-duration:16s"><polygon points="0,-154 10,-98 -10,-98" fill="#7fa800" opacity="0.9"/><polygon points="133,-77 91,-49 77,-70" fill="#7fa800" opacity="0.8"/><polygon points="133,77 77,70 91,49" fill="#7fa800" opacity="0.8"/><polygon points="0,154 -10,98 10,98" fill="#7fa800" opacity="0.9"/><polygon points="-133,77 -91,49 -77,70" fill="#7fa800" opacity="0.8"/><polygon points="-133,-77 -77,-70 -91,-49" fill="#7fa800" opacity="0.8"/></g><circle r="70" fill="#e8ff47"/><circle r="44" fill="#080808"/><circle r="22" fill="#e8ff47"/><circle r="8" fill="#080808"/></svg>';
  const wm=tmp.firstElementChild;
  wmWrap.appendChild(wm);
  document.body.appendChild(wmWrap);
  // Sync watermark with its actual durations (40s/28s/16s differ from nav logo defaults)
  syncKCElements(wm);
}

// SCROLL PROGRESS
window.addEventListener('scroll',()=>{
  const pct=(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight))*100;
  const bar=document.getElementById('progressBar');
  if(bar)bar.style.width=pct+'%';
});

// MOBILE NAV
let menuOpen=false;
// Create backdrop overlay for slide-in menu
const menuBackdrop=document.createElement('div');
menuBackdrop.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:495;opacity:0;pointer-events:none;transition:opacity 0.35s ease';
document.body.appendChild(menuBackdrop);
menuBackdrop.addEventListener('click',()=>{if(menuOpen)toggleMenu()});

function toggleMenu(){
  menuOpen=!menuOpen;
  document.getElementById('navLinks').classList.toggle('open',menuOpen);
  menuBackdrop.style.opacity=menuOpen?'1':'0';
  menuBackdrop.style.pointerEvents=menuOpen?'auto':'none';
  document.body.style.overflow=menuOpen?'hidden':'';
  const[t1,t2,t3]=['t1','t2','t3'].map(id=>document.getElementById(id));
  if(menuOpen){t1.style.transform='translateY(7px) rotate(45deg)';t2.style.opacity='0';t3.style.transform='translateY(-7px) rotate(-45deg)'}
  else{t1.style.transform='';t2.style.opacity='';t3.style.transform=''}
}
function closeMenu(){if(menuOpen)toggleMenu()}

// ACTIVE NAV LINK
(function(){
  const path=window.location.pathname.replace(/\/$/,'').replace(/\.html$/,'')||'/';
  document.querySelectorAll('.nav-link').forEach(a=>{
    const href=a.getAttribute('href');
    if(href===path||(path==='/'&&href==='/'))a.classList.add('active');
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

// TOUCH PAUSE/RESUME — ticker (scroll bar) on mobile
if('ontouchstart' in window){
  var tickerTrack=document.querySelector('.ticker-track');
  if(tickerTrack){
    tickerTrack.addEventListener('touchstart',function(){this.style.animationPlayState='paused'},{passive:true});
    tickerTrack.addEventListener('touchend',function(){var t=this;setTimeout(function(){t.style.animationPlayState='running'},1500)});
    tickerTrack.addEventListener('touchcancel',function(){this.style.animationPlayState='running'});
  }
}

// TOUCH HIGHLIGHT — home cards (green sweep on tap, then navigate)
if('ontouchstart' in window){
  document.querySelectorAll('.home-card').forEach(card=>{
    card.addEventListener('touchstart',function(){this.classList.add('touch')},{passive:true});
    card.addEventListener('touchend',function(e){
      e.preventDefault();
      const href=this.dataset.href||this.getAttribute('href');
      const el=this;
      setTimeout(()=>{el.classList.remove('touch');if(href)window.location.href=href},400);
    });
    card.addEventListener('touchcancel',function(){this.classList.remove('touch')});
  });
}

// DESKTOP CLICK — home-card divs navigate via data-href
document.querySelectorAll('.home-card[data-href]').forEach(card=>{
  card.addEventListener('click',function(e){
    if(!e.target.closest('.home-card-link'))window.location.href=this.dataset.href;
  });
});

// CONTACT FORM — sends email to info@jarvex.in via Web3Forms
function submitContact(){
  const name=document.getElementById('cf_name')?.value.trim();
  const email=document.getElementById('cf_email')?.value.trim();
  const phone=document.getElementById('cf_phone')?.value.trim();
  const service=document.getElementById('cf_service')?.value;
  const budget=document.getElementById('cf_budget')?.value;
  const msg=document.getElementById('cf_msg')?.value.trim();
  if(!name||!email||!msg){
    ['cf_name','cf_email','cf_msg'].forEach(id=>{const el=document.getElementById(id);if(el&&!el.value.trim())el.style.outline='1px solid #ff4d4d'});
    setTimeout(()=>document.querySelectorAll('.form-group input,.form-group textarea').forEach(el=>el.style.outline=''),2200);return;
  }
  // Show success immediately — don't make user wait for API
  const btn=document.querySelector('.form-submit-btn');
  if(btn)btn.style.display='none';
  var suc=document.getElementById('formSuccessMsg');if(suc)suc.style.display='block';
  ['cf_name','cf_email','cf_phone','cf_msg'].forEach(function(id){var el=document.getElementById(id);if(el)el.value='';});
  var selSvc=document.getElementById('cf_service');if(selSvc)selSvc.selectedIndex=0;
  var selBud=document.getElementById('cf_budget');if(selBud)selBud.selectedIndex=0;
  // Build plain-text message — Web3Forms renders this inside their own template cleanly
  var body=[
    '----------------------------------------',
    'NEW ENQUIRY FROM JARVEX.IN',
    '----------------------------------------',
    '',
    'Name    : ' + name,
    'Email   : ' + email,
    'Phone   : ' + (phone || 'Not provided'),
    'Service : ' + (service || 'Not selected'),
    'Budget  : ' + (budget || 'Not selected'),
    '',
    'Message :',
    msg,
    '',
    '----------------------------------------',
    'Sent from the contact form at jarvex.in',
    '----------------------------------------'
  ].join('\n');
  fetch('https://api.web3forms.com/submit',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      access_key:'59bfe598-dab6-43c1-8f53-22131bd399b4',
      subject:'New Enquiry — ' + name + ' via Jarvex.in',
      from_name:'Jarvex Website',
      replyto:email,
      message:body
    })
  }).catch(function(){/* silent — user already saw success */});
}
