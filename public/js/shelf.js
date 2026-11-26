/* The reforms shelf (app/components/reform-shelf.tsx): one volume open per shelf at a time.
   With a mouse, hovering a book opens it, moving onto another book opens that one instead, and leaving the
   shelf closes it. Touch screens open a book on tap, and start with the first book on each shelf open. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const phone = matchMedia('(max-width: 720px)');

  document.querySelectorAll('.rs-sec .shelf').forEach((shelf) => {
    const vols = [...shelf.querySelectorAll('.vol')];
    const wrap = shelf.querySelector('.row-wrap');
    const detail = shelf.querySelector('.detail');
    let timer = 0;

    const fill = (v) => {
      const html = v.querySelector('.note').innerHTML.replace(/ id="[^"]*"/g, '');
      if (reduce || !detail.innerHTML) { detail.innerHTML = html; return; }
      detail.classList.add('swap');
      setTimeout(() => { detail.innerHTML = html; detail.classList.remove('swap'); }, 140);
    };

    // Keep the opened volume inside the sliding shelf once it has finished opening.
    const reveal = (v) => {
      const left = v.offsetLeft - 12;
      const right = left + v.offsetWidth + 24;
      if (left < wrap.scrollLeft) wrap.scrollTo({ left });
      else if (right > wrap.scrollLeft + wrap.clientWidth) wrap.scrollTo({ left: right - wrap.clientWidth });
    };

    let current = null;
    // Open one volume (or none) on this shelf; every other volume closes.
    const open = (v) => {
      if (v === current) return;
      current = v;
      vols.forEach((o) => {
        const on = o === v;
        o.classList.toggle('is-open', on);
        o.querySelector('.spine').setAttribute('aria-expanded', String(on));
      });
      if (!v) return;
      fill(v);
      if (wrap.scrollWidth > wrap.clientWidth) {
        v.addEventListener('transitionend', function done(ev) {
          if (ev.target !== v || ev.propertyName !== 'width') return;
          v.removeEventListener('transitionend', done);
          if (current === v) reveal(v);
        });
        if (reduce) reveal(v);
      }
    };

    // With a mouse: hovering a book opens it, moving onto another book closes it and opens that one,
    // and leaving the shelf closes it. Only real mouse movement counts, so the shelf shifting under a
    // still pointer never opens anything by itself.
    const mouse = (ev) => ev.pointerType === 'mouse' && !phone.matches;
    wrap.addEventListener('pointermove', (ev) => {
      if (!mouse(ev)) return;
      clearTimeout(timer);
      const v = ev.target.closest('.vol');
      if (!v || v === current) return;
      timer = setTimeout(() => open(v), 30);
    });
    wrap.addEventListener('pointerleave', (ev) => {
      if (!mouse(ev)) return;
      clearTimeout(timer);
      timer = setTimeout(() => open(null), 120);
    });

    vols.forEach((v, i) => {
      const spine = v.querySelector('.spine');
      spine.addEventListener('click', () => open(v));
      spine.addEventListener('keydown', (ev) => {
        if (ev.key === 'Escape') { open(null); return; }
        const step = ev.key === 'ArrowRight' ? 1 : ev.key === 'ArrowLeft' ? -1 : 0;
        if (!step) return;
        ev.preventDefault();
        const next = vols[Math.min(vols.length - 1, Math.max(0, i + step))];
        open(next);
        next.querySelector('.spine').focus({ preventScroll: true });
      });
    });

    // Touch screens cannot hover, so there the first volume on each shelf starts open.
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) open(vols[0]);
  });

  // Volumes rise onto the shelf as each shelf scrolls into view; without the observer they simply stand there.
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const s = en.target;
        const base = +s.querySelector('.vol').style.getPropertyValue('--i');
        s.querySelectorAll('.vol').forEach((v) => v.style.setProperty('--d', ((+v.style.getPropertyValue('--i') - base) * 16) + 'ms'));
        requestAnimationFrame(() => s.classList.remove('await'));
        io.unobserve(s);
      });
    }, { threshold: 0.2 });
    document.querySelectorAll('.rs-sec .shelf').forEach((s) => {
      const r = s.getBoundingClientRect();
      if (r.top < innerHeight * 0.85) return;   // already on screen: leave it standing
      s.classList.add('await');
      io.observe(s);
    });
  }
})();
