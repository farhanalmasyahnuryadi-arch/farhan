  const burger = document.getElementById('burger');
  const navList = document.getElementById('navList');
  burger.addEventListener('click', () => navList.classList.toggle('open'));
  navList.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navList.classList.remove('open')));

  // fade-in on scroll
  const els = document.querySelectorAll('section');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.style.opacity=1; e.target.style.transform='translateY(0)'; }
    });
  }, {threshold:.12});
  els.forEach(s=>{
    s.style.opacity=0; s.style.transform='translateY(24px)';
    s.style.transition='opacity .7s ease, transform .7s ease';
    obs.observe(s);
  });
  document.getElementById('beranda').style.opacity=1;
  document.getElementById('beranda').style.transform='translateY(0)';

  // ---- 3D tilt effect on tech stack icons ----
  document.querySelectorAll('[data-tilt]').forEach(el=>{
    el.addEventListener('mousemove', (e)=>{
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const rotX = ((y / r.height) - .5) * -18;
      const rotY = ((x / r.width) - .5) * 18;
      el.style.transform = `perspective(500px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.05)`;
    });
    el.addEventListener('mouseleave', ()=>{
      el.style.transform = 'perspective(500px) rotateX(0) rotateY(0) scale(1)';
    });
  });

  // ---- animated skill bars, triggered once in view ----
  const skillRows = document.querySelectorAll('.skill-bar-row');
  const skillObs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const row = entry.target;
        const target = parseInt(row.dataset.percent, 10) || 0;
        const fill = row.querySelector('.sb-fill');
        const label = row.querySelector('.sb-percent');
        fill.style.width = target + '%';

        let current = 0;
        const duration = 1200;
        const start = performance.now();
        function tick(now){
          const progress = Math.min((now - start) / duration, 1);
          current = Math.round(progress * target);
          label.textContent = current + '%';
          if(progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);

        skillObs.unobserve(row);
      }
    });
  }, {threshold:.4});
  skillRows.forEach(row => skillObs.observe(row));
