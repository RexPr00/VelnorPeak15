const $ = (s,p=document)=>p.querySelector(s);
const $$ = (s,p=document)=>[...p.querySelectorAll(s)];

function trapFocus(container, e){
  if(e.key !== 'Tab') return;
  const focusables = $$('a,button,input,summary,[tabindex]:not([tabindex="-1"])', container).filter(el=>!el.disabled);
  if(!focusables.length) return;
  const first = focusables[0], last = focusables[focusables.length-1];
  if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
  else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
}

$$('.lang').forEach(wrap=>{
  const btn = $('.lang-btn', wrap);
  btn?.addEventListener('click', ()=>wrap.classList.toggle('open'));
  document.addEventListener('click', e=>{ if(!wrap.contains(e.target)) wrap.classList.remove('open'); });
});

const drawer = $('#drawer');
const drawerPanel = $('.drawer-panel');
$('.mobile-toggle')?.addEventListener('click', ()=>{drawer.classList.add('open');document.body.classList.add('lock');$('.drawer-close').focus();});
$('.drawer-close')?.addEventListener('click', closeDrawer);
$('.drawer-bg')?.addEventListener('click', closeDrawer);
function closeDrawer(){drawer?.classList.remove('open');document.body.classList.remove('lock');$('.mobile-toggle')?.focus();}

const modal = $('#privacyModal');
const openModal = $$('.privacy-open');
openModal.forEach(el=>el.addEventListener('click',e=>{e.preventDefault();modal.classList.add('open');document.body.classList.add('lock');$('.modal-top-close').focus();}));
$('.modal-top-close')?.addEventListener('click', closeModal);
$('.modal-bottom-close')?.addEventListener('click', closeModal);
$('.modal-bg')?.addEventListener('click', closeModal);
function closeModal(){modal?.classList.remove('open');document.body.classList.remove('lock');}

$$('.faq-item summary').forEach(sum=>sum.addEventListener('click',()=>{
  const item = sum.parentElement;
  $$('.faq-item[open]').forEach(open=>{if(open!==item) open.removeAttribute('open');});
}));

document.addEventListener('keydown',e=>{
  if(e.key === 'Escape'){closeDrawer();closeModal();$$('.lang.open').forEach(l=>l.classList.remove('open'));}
  if(drawer?.classList.contains('open')) trapFocus(drawerPanel,e);
  if(modal?.classList.contains('open')) trapFocus($('.modal-card'),e);
});

const io = new IntersectionObserver(entries=>{
  entries.forEach(ent=>{
    if(ent.isIntersecting){
      ent.target.animate([{opacity:.01, transform:'translateY(18px)'},{opacity:1, transform:'translateY(0)'}],{duration:500,fill:'forwards'});
      io.unobserve(ent.target);
    }
  });
},{threshold:.12});

$$('.section .card, .section .visual-card, .section .process-card, .section .review-card').forEach(el=>io.observe(el));
