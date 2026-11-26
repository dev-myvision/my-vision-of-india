/* ============================================================================
   The chapters: root size, springs, text reveals, the two scroll scenes, the
   card filters, sharing, hover touches and the order form.
   ============================================================================ */

// ---- Root size: above 1920px wide the rem grows with the window (below it, the media queries do it) ----
(() => {
    const FONT_BASE = 16, BASE_W = 1920, COEF = 0.6666;
    const html = document.documentElement;
    const fit = () => {
        const reduction = ((BASE_W - innerWidth) / BASE_W) * 100 * COEF;
        const size = FONT_BASE - (FONT_BASE * reduction) / 100;
        if (size > FONT_BASE) html.style.fontSize = size + 'px';
        else html.style.removeProperty('font-size');
    };
    fit();
    addEventListener('resize', fit);
})();

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = () => matchMedia('(hover: hover) and (min-width: 769px)').matches;   // no hover touches on phones

// ---- Springs ------------------------------------------------------------------------
// An element whose opacity (o), offset in px (x, y), scale (s) and rotation (r) follow springs.
// Each value steps toward its target: v += (−tension·(x − target) − friction·v)·dt;  x += v·dt.
const springLoop = (() => {
    const live = new Set();
    let raf = 0, last = 0;
    const frame = (now) => {
        const dt = Math.min(0.064, (now - last) / 1000);
        last = now;
        live.forEach((anim) => { if (anim.step(dt)) live.delete(anim); });
        raf = live.size ? requestAnimationFrame(frame) : 0;
    };
    return (anim) => {
        live.add(anim);
        if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
    };
})();

function applyTransform(el, v) {
    if ('o' in v) el.style.opacity = v.o;
    el.style.transform = `translate3d(${v.x || 0}px, ${v.y || 0}px, 0) scale(${v.s ?? 1}) rotate(${v.r || 0}deg)`;
}

// One animation per element: asking again returns the same one, so two never fight over it.
function springy(el, init) {
    if (el._spring) return el._spring;
    const vals = {};
    const current = () => Object.fromEntries(Object.entries(vals).map(([k, s]) => [k, s.x]));
    let timer = 0;
    const anim = {
        set(state) {
            for (const k in state) vals[k] = { x: state[k], v: 0, t: state[k], k: 170, c: 26 };
            applyTransform(el, current());
            return anim;
        },
        to(state, [tension, friction] = [170, 26], delay = 0) {
            const go = () => {
                for (const k in state) {
                    const s = vals[k] || (vals[k] = { x: state[k], v: 0 });
                    s.t = state[k]; s.k = tension; s.c = friction;
                    if (reduceMotion) { s.x = s.t; s.v = 0; }
                }
                if (reduceMotion) applyTransform(el, current());
                else springLoop(anim);
            };
            clearTimeout(timer);
            if (delay && !reduceMotion) timer = setTimeout(go, delay); else go();
            return anim;
        },
        step(dt) {
            let resting = true;
            for (const k in vals) {
                const s = vals[k];
                for (let left = dt; left > 1e-6; left -= 0.004) {   // small sub-steps keep stiff springs steady
                    const h = Math.min(0.004, left);
                    s.v += (-s.k * (s.x - s.t) - s.c * s.v) * h;
                    s.x += s.v * h;
                }
                const near = k === 'o' || k === 's' ? 0.0008 : 0.04;
                if (Math.abs(s.x - s.t) < near && Math.abs(s.v) < near * 10) { s.x = s.t; s.v = 0; } else resting = false;
            }
            applyTransform(el, current());
            return resting;
        }
    };
    el._spring = anim;
    return anim.set(init);
}

function hoverSpring(trigger, target, from, to, config) {
    if (!trigger || !target) return;
    const anim = springy(target, from);
    trigger.addEventListener('pointerenter', () => { if (canHover()) anim.to(to, config); });
    trigger.addEventListener('pointerleave', () => anim.to(from, config));
}

function onceInView(el, fn, rootMargin = '0px 0px -10% 0px') {
    if (!('IntersectionObserver' in window)) { fn(); return; }
    const io = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) { io.disconnect(); fn(); }
    }, { rootMargin });
    io.observe(el);
}

// Rise into place the first time it is seen. spec: { y, s, d (delay ms), t (tension), f (friction) }
function riser(el) {
    const spec = JSON.parse(el.dataset.inview || el.dataset.gated);
    const anim = springy(el, { o: 0, y: spec.y || 0, s: spec.s ?? 1 });
    return () => anim.to({ o: 1, y: 0, s: 1 }, [spec.t, spec.f], spec.d || 0);
}

// ---- Text: lines and words that rise out of a clipping mask --------------------------
const esc = (t) => t.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const timing = (el, d) => ({
    stagger: +(el.dataset.stagger ?? d.stagger), dur: +(el.dataset.dur ?? d.dur), delay: +(el.dataset.delay ?? d.delay)
});
// the words are shown to the eye; one plain copy is kept for screen readers
const wrap = (plain, shown) => `<span class="visually-hidden">${esc(plain)}</span><span aria-hidden="true">${shown}</span>`;

function splitLines(el) {
    const { stagger, dur, delay } = timing(el, { stagger: 120, dur: 950, delay: 0 });
    const lines = el.dataset.lines.split('|');
    el.innerHTML = wrap(lines.join(' '), lines.map((line, i) =>
        `<span class="ln"><span class="lni" style="--d:${delay + i * stagger}ms;--dur:${dur}ms">${esc(line)}</span></span>`).join(''));
}
function wordSpans(text, { stagger, dur, delay }, start = 0) {
    return text.split(/\s+/).filter(Boolean).map((word, i) =>
        `<span class="w"><span class="wi" style="--d:${delay + (start + i) * stagger}ms;--dur:${dur}ms">${esc(word)}</span></span>`).join(' ');
}
function splitWords(el) {   // '|' starts a new line
    const t = timing(el, { stagger: 140, dur: 1100, delay: 0 });
    let count = 0;
    const shown = el.dataset.words.split('|').map((line) => {
        const html = wordSpans(line, t, count);
        count += line.split(/\s+/).filter(Boolean).length;
        return html;
    }).join('<br>');
    el.innerHTML = wrap(el.dataset.words.replace(/\|/g, ' '), shown);
}
function splitFade(el) {
    const { stagger, dur, delay } = timing(el, { stagger: 28, dur: 700, delay: 250 });
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = wrap(words.join(' '), words.map((word, i) =>
        `<span class="fw" style="--d:${delay + i * stagger}ms;--dur:${dur}ms">${esc(word)}</span>`).join(' '));
}
function play(el) {   // (re)starts a reveal from its hidden state
    el.classList.remove('is-in');
    void el.offsetWidth;
    el.classList.add('is-in');
}

document.querySelectorAll('[data-lines]').forEach(splitLines);
document.querySelectorAll('[data-words]').forEach(splitWords);
document.querySelectorAll('[data-fade-words]').forEach(splitFade);

// text plays as it scrolls into view, except in the opening scene, which plays its own
document.querySelectorAll('.chapters [data-lines], .chapters [data-fade-words]').forEach((el) => {
    if (!el.closest('.k-hero')) onceInView(el, () => play(el));
});
document.querySelectorAll('[data-inview]').forEach((el) => {
    const go = riser(el);
    onceInView(el, go);
});

// ---- Scroll scenes ----------------------------------------------------------------------
// Each chapter's stage holds still while the page scrolls: its photograph is wiped open from
// the foot as the stage rises into the window, then settles from a slight zoom while pinned.
// The chapter marks on the right fill as each chapter is read, like the opening's own marks.
(() => {
    const clamp01 = (v) => Math.min(1, Math.max(0, v));
    const lerp = (a, b, t) => a + (b - a) * t;
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const narrow = () => innerWidth <= 820;
    const pins = [...document.querySelectorAll('.k-pin')].map((el) => ({ el, frame: el.querySelector('.k-frame') }));
    const chapters = [...document.querySelectorAll('[data-chapter]')];
    const marks = [...document.querySelectorAll('.k-mark')];
    let queued = false;

    const last = new Map();   // what each element was last given, so nothing is written twice
    const put = (el, prop, value) => {
        const seen = last.get(el) || {};
        if (seen[prop] === value) return;
        seen[prop] = value; last.set(el, seen);
        el.style.setProperty(prop, value);
    };

    // the titles' letters blur up into place, as the slides' titles do
    document.querySelectorAll('.k-t').forEach((title) => {
        title.setAttribute('aria-label', title.textContent.replace(/\s+/g, ' ').trim());
        let n = 0;
        title.innerHTML = title.innerHTML.split(/(<br\s*\/?>)/i).map((part) => (/^<br/i.test(part) ? part
            : part.split(' ').map((word) => (word ? `<span class="wd" aria-hidden="true">${[...word].map((c) => `<span class="ch" style="transition-delay:${(n++ * 0.035).toFixed(3)}s">${c}</span>`).join('')}</span>` : '')).join(' '))).join('');   // a word's letters never part
        if (reduceMotion) title.classList.add('is-in');
        else onceInView(title, () => title.classList.add('is-in'), '0px 0px -15% 0px');
    });

    function render() {
        queued = false;
        const vh = innerHeight;
        // read everything first, then write
        const pinBoxes = pins.map((p) => p.el.getBoundingClientRect());
        const chBoxes = chapters.map((c) => c.getBoundingClientRect());
        if (!reduceMotion && !narrow()) pins.forEach((p, i) => {
            const r = pinBoxes[i];
            if (r.bottom < -100 || r.top > vh + 100) return;
            const enter = clamp01((vh - r.top) / vh);                      // 0 as the stage appears, 1 as it pins
            const held = clamp01(-r.top / Math.max(1, r.height - vh));     // 0 … 1 while pinned
            put(p.frame, '--wipe', (100 * (1 - easeOut(clamp01((enter - 0.15) / 0.75)))).toFixed(2) + '%');
            put(p.frame, '--z', lerp(1.14, 1, easeOut(clamp01(enter * 0.6 + held * 0.4))).toFixed(4));
        });
        let current = -1;
        chBoxes.forEach((r, i) => {
            const f = clamp01((vh * 0.5 - r.top) / Math.max(1, r.height));
            if (r.top < vh * 0.5 && r.bottom > vh * 0.5) current = i;
            if (marks[i]) put(marks[i], '--f', f.toFixed(3));
        });
        marks.forEach((m, i) => (i === current ? m.setAttribute('aria-current', 'true') : m.removeAttribute('aria-current')));
    }
    const queue = () => { if (!queued) { queued = true; requestAnimationFrame(render); } };
    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', queue);
    render();

    // a mark takes the reader to its chapter
    marks.forEach((m, i) => m.addEventListener('click', () => {
        chapters[i].scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }));

    // the stages' text plays in when the stage is reached
    document.querySelectorAll('.k-stage').forEach((st) => onceInView(st, () => st.classList.add('is-seen'), '0px 0px -30% 0px'));
    new IntersectionObserver(([e]) => document.documentElement.classList.toggle('at-foot', e.isIntersecting), { rootMargin: '0px 0px -30% 0px' })
        .observe(document.getElementById('contact'));
})();

// ---- Scrolling ------------------------------------------------------------------------
// The browser scrolls the whole page itself, smoothly, on every mouse, trackpad and phone.
// Nothing here takes the wheel over, so the scroll never fights the reader.

// ---- Hover touches (not on phones) ---------------------------------------------------
document.querySelectorAll('.pill').forEach((pill) => hoverSpring(pill, pill.querySelector('svg'), { x: 0 }, { x: 5 }, [320, 20]));
document.querySelectorAll('.order-close').forEach((btn) => hoverSpring(btn, btn.querySelector('svg'), { r: 0 }, { r: 90 }, [300, 18]));

// in-page links that are not part of the stage's navigation
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-jump]');
    if (!link) return;
    e.preventDefault();
    document.querySelector(link.getAttribute('href'))?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
});

// ---- Download form ---------------------------------------------------------------------
// The reader gives their name, email and mobile number; the button stays locked until all three
// are filled in correctly. Each reader is then added as a row in the Google Sheet, and the book
// downloads to their device. The book is the PDF that sits beside this page (keep the two together).
// SHEET_URL is the web app address of the Apps Script in google-sheet-script.gs (see that file);
// until it is set, the download still works and nothing is recorded.
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbw4MWiv1bAAyNkTi6Ru_7VmuK9AiQtU6g6uQ_fZbOo6GvbOm5CgHaBcadtEgjozsnI6/exec';
const BOOK_FILE = '/My-Vision-of-India.pdf';
const BOOK_SAVE_AS = 'My Vision of India.pdf';

(() => {
    const dialog = document.getElementById('order');
    const form = dialog.querySelector('.order-form');
    const done = dialog.querySelector('.order-done');
    const status = dialog.querySelector('.order-status');
    const title = dialog.querySelector('.order-title');
    const submit = form.querySelector('[type="submit"]');
    const submitLabel = submit.querySelector('[data-submit-label]');
    const LABEL = submitLabel.textContent;

    const RULES = {
        name:  [(v) => v.trim().length >= 2, 'Enter your full name.'],
        email: [(v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()), 'Enter an email address, like name@example.com.'],
        phone: [(v) => /^(\+91|91|0)?[6-9]\d{9}$/.test(v.replace(/[\s()-]/g, '')), 'Enter your 10-digit mobile number.']
    };

    const allValid = () => Object.keys(RULES).every((name) => RULES[name][0](form.elements[name].value));
    function updateReady() {
        if (submitLabel.textContent !== LABEL) return;   // still sending
        submit.disabled = !allValid();
    }
    form.addEventListener('input', updateReady);
    form.addEventListener('change', updateReady);
    updateReady();

    function check(name) {
        const input = form.elements[name];
        const [ok, message] = RULES[name];
        const valid = ok(input.value);
        const error = document.getElementById('e-' + name);
        input.setAttribute('aria-invalid', String(!valid));
        error.textContent = valid ? '' : message;
        error.hidden = valid;
        return valid;
    }
    Object.keys(RULES).forEach((name) => {
        const input = form.elements[name];
        const recheck = () => { if (input.getAttribute('aria-invalid') === 'true') check(name); };
        input.addEventListener('input', recheck);
        input.addEventListener('change', recheck);
    });
    form.addEventListener('focusout', (e) => {
        const name = e.target.name;
        if (RULES[name] && e.target.value.trim() !== '') check(name);
    });

    function setStatus(text, isError) {
        status.textContent = text;
        status.classList.toggle('is-error', !!isError);
    }

    function download() {
        const a = document.createElement('a');
        a.href = BOOK_FILE;
        a.download = BOOK_SAVE_AS;
        a.rel = 'noopener';
        a.target = '_blank';   // if a browser will not save it, the book opens beside the site rather than replacing it
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    function open() {
        if (!done.hidden) {   // a fresh form for the next reader
            form.reset();
            Object.keys(RULES).forEach((name) => {
                form.elements[name].removeAttribute('aria-invalid');
                document.getElementById('e-' + name).hidden = true;
            });
            done.hidden = true;
            form.hidden = false;
        }
        updateReady();
        setStatus('');
        document.documentElement.classList.add('dialog-open');
        dialog.showModal();
        dialog.querySelector('.order-body').scrollTop = 0;
        if (canHover()) form.elements.name.focus({ preventScroll: true });
        play(title);
    }
    document.addEventListener('click', (e) => { if (e.target.closest('[data-open-order]')) open(); });
    dialog.querySelectorAll('[data-close-order]').forEach((button) => button.addEventListener('click', () => dialog.close()));
    dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => document.documentElement.classList.remove('dialog-open'));

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const invalid = Object.keys(RULES).filter((name) => !check(name));
        if (invalid.length) {
            setStatus('Please correct the ' + (invalid.length === 1 ? 'highlighted field.' : invalid.length + ' highlighted fields.'), true);
            form.elements[invalid[0]].focus();
            return;
        }
        if (form.elements.botcheck.checked) return;

        const reader = Object.fromEntries(Object.keys(RULES).map((name) => [name, form.elements[name].value.trim()]));
        submit.disabled = true;
        submitLabel.textContent = 'Preparing…';
        setStatus('');
        if (SHEET_URL) {   // sent in the background, so a slow or failed send never holds the book back
            const row = new URLSearchParams({
                name: reader.name,
                email: reader.email,
                phone: '+91 ' + reader.phone.replace(/\D/g, '').slice(-10),
                page: location.href.split('#')[0]
            });
            let sent = false;
            try { sent = navigator.sendBeacon(SHEET_URL, row); } catch (error) { /* falls through to fetch */ }
            if (!sent) {
                fetch(SHEET_URL, { method: 'POST', mode: 'no-cors', keepalive: true, body: row })
                    .catch((error) => console.warn('The reader’s details could not be recorded; the book downloads anyway.', error));
            }
        }
        download();
        done.querySelector('[data-done-name]').textContent = reader.name.split(/\s+/)[0];
        done.querySelector('[data-done-text]').textContent =
            'Your copy of My Vision of India is downloading (PDF, 26 MB). If it has not started, download it again below.';
        form.hidden = true;
        done.hidden = false;
        done.querySelector('.done-title').focus();
        submitLabel.textContent = LABEL;
        updateReady();
    });
})();
