/* Version 3, "Before and after": the open book's nine spreads, and the clocks. */
(() => {
const BOOK = { 1: "Book One, Governing India", 2: "Book Two, Building Prosperity", 3: "Book Three, A Safe and Caring Nation" };

// thing, book, reform, today: [figure, label, text], after: [figure, label, text]
const SPREADS = [
  ["The pothole", 1, "Knowledge First",
    ["2,385", "deaths in pothole accidents in 2024 alone.", "“When a pothole opens after the first heavy rain, we blame the Member of the Legislative Assembly (MLA), the corporator or simply ‘the government’.”"],
    ["2 hours", "to make a pothole that endangers life safe, and 7 days to repair it.", "Standing next to any road, light or drain, you can see who owns it and which officer is responsible for it."]],
  ["The vote", 1, "My Vote Is Not for Sale",
    ["1 year", "the longest prison term today for buying or selling a vote.", "“In many places, on the last nights before a poll, money goes from house to house: a note of ₹500 or ₹2,000, a bottle of liquor, a saree, a phone recharge. Everyone in the street knows, and almost nobody speaks.”"],
    ["7 years", "in prison for the giver and the taker alike, proved only on verified evidence.", "Anyone handed money has 48 hours to return it, and the citizen who refuses, returns and reports is protected and rewarded."]],
  ["The counter", 1, "A National Right to Services",
    ["“Under process”", "what a provident fund claim can show today.", "“The passport has not come; the provident fund claim shows ‘under process’; the pension revision is ‘pending at higher level’.”"],
    ["A legal date", "a named officer, and a price for being late.", "When the date is missed, the appeal opens by itself, and compensation reaches the citizen unasked."]],
  ["The land", 2, "One Land, One Clear Title",
    ["A steel trunk", "of old deeds, receipts and maps.", "“Ask a farmer to prove that her field is hers, and she will open a steel trunk of papers: an old sale deed, revenue receipts, a map that does not quite match the field.”"],
    ["One number", "for every parcel, and one record, made conclusive by law.", "The record is checked in the village and guaranteed by a State fund that pays if it is wrong."]],
  ["The harvest", 2, "Farmers First",
    ["₹1.53 lakh crore", "of farm produce lost after harvest every year.", "“Tomatoes rot because there is no cold room nearby.”"],
    ["Within reach", "storage, irradiation, a fair buyer and advice, for every farmer.", "Every payment and claim runs on a published date with a named office, and each glut becomes a product, not waste."]],
  ["The public rupee", 2, "Every Rupee Tracked",
    ["13.8%", "rise over original cost on 1,847 large projects.", "“Every road, bridge, school building, hospital ward and drain is paid for by the people: through the income tax of a salaried clerk, the Goods and Services Tax on a farmer’s diesel and a student’s notebook, and a hundred small fees.”"],
    ["One QR code", "at every public project site, opening one public page.", "It shows the contract, every payment beside the work done, every delay with its reason and every audit finding."]],
  ["The classroom", 3, "Schools That Teach",
    ["27.6%", "of Class 3 children in rural government schools can do a simple subtraction.", "And in 1,00,843 schools, one teacher teaches every class."],
    ["By Class 3", "every child reads, writes and counts.", "Every child is checked twice a year, those behind are helped at once in a language they understand, and parents see the results every term."]],
  ["Old age", 3, "Dignity in Old Age",
    ["18.7%", "of older Indians have no income at all.", "“For millions of older Indians, old age brings three quiet fears: that the money will run out, that illness will come with nobody to help, and that one day they will be left alone.”"],
    ["By the 7th", "the pension arrives, every month.", "Every older Indian is found at 60, paid on a fixed date, and never cut off without a home visit."]],
  ["The tap", 3, "Water for Every Home",
    ["76%", "of household tap samples passed bacteria tests in 2024.", "“A tap is only the end of a long chain: a source that does not run dry, a pump that works, a pipe that does not leak, a paid operator…”"],
    ["Same day", "a failed test raises a red flag on the board, and every household is told.", "Every tap is held to a published standard and tested in public."]]
];

const CLOCKS = [
  ["A pothole that endangers life", "No date", "2 hours", 60],
  ["Stamp duty for a failed registration", "No date", "24 hours", 300],
  ["Public money missing from the portal", "6 years, in one recent audit", "24 hours", 180],
  ["A broken tap line", "No date", "48 hours", 240],
  ["Your district hospital, answerable in public", "The specialist often not there", "Within 1 hour", 30],
  ["Your pension", "No fixed date", "By the 7th", 210],
  ["Tax rules", "No fixed day", "Once a year", 330],
  ["What was decided in your name", "Heard when you feel it", "Sunday, noon", 0],
  ["The nation’s debt", "No end date", "Repaid in 15 years", 150]
];

const h = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---- the journal: heavy pages that turn about the spine with a slight, natural bend ----
const book = document.getElementById("ba-book");
const pages = book.querySelector(".ba-pages");
const sheetL = document.getElementById("ba-L"), sheetR = document.getElementById("ba-R");
const leaf = book.querySelector(".ba-leaf");
const count = document.getElementById("ba-n"), live = document.getElementById("ba-live");
const spreadView = () => matchMedia("(min-width: 761px)").matches;   // two pages side by side
const N = SPREADS.length;
const STRIPS = 14;      // the leaf is cut into narrow hinged strips so it can bend a little
const TURN_MS = 1450;      // heavy stock turns unhurried
let at = 0, busy = false;

document.querySelectorAll(".ba-chips").forEach((box) => {
  const b = +box.dataset.book;
  box.innerHTML = SPREADS.map((s, i) => (s[1] === b ? `<button type="button" data-go="${i}">${h(s[0])}</button>` : "")).join("");
});
const chips = [...document.querySelectorAll(".ba-chips button")];
const tabs = [...book.querySelectorAll(".ba-tabs button")];

// side "L" is India today, side "R" is after the book
function writing(i, side) {
  const [thing, b, reform, today, after] = SPREADS[i];
  const [fig, label, text] = side === "L" ? today : after;
  return `<div class="ba-pagein ${side === "L" ? "is-today" : "is-after"}">
      <p class="ba-runhead">${side === "L" ? "India today" : "After the book"}</p>
      <div class="ba-pbody"><p class="ba-thing">${h(thing)}</p><p class="ba-fig">${h(fig)}</p><p class="ba-figlabel">${h(label)}</p><p class="ba-text">${h(text)}</p></div>
      <p class="ba-folio">${side === "L" ? h(BOOK[b]) : `From ${h(reform)}. Proposed.`}</p>
    </div>`;
}
const page = (i, side) => writing(i, side) + `<span class="ba-shade"></span>`;
const fill = (el, i, side) => { el.innerHTML = page(i, side); };

function mark() {
  count.textContent = at + 1;
  live.textContent = `Page ${at + 1} of ${N}: ${SPREADS[at][0]}`;
  chips.forEach((c) => (+c.dataset.go === at ? c.setAttribute("aria-current", "true") : c.removeAttribute("aria-current")));
  tabs.forEach((t) => (+t.dataset.tab === SPREADS[at][1] ? t.setAttribute("aria-current", "true") : t.removeAttribute("aria-current")));
}

// build the turning leaf: strip i shows its slice of the page on the front, and the matching slice of the reverse
function buildLeaf(forward, frontHTML, backHTML) {
  const W = sheetR.offsetWidth, w = W / STRIPS;
  const G = parseFloat(getComputedStyle(book).getPropertyValue("--ba-gap")) || 0;
  leaf.className = "ba-leaf " + (forward ? "fwd" : "back");
  leaf.innerHTML = "";
  const strips = [];
  // the page hangs from the rings, half the channel away from the hinge
  const spacer = document.createElement("div");
  spacer.className = "ba-strip";
  spacer.style.width = G / 2 + "px";
  if (forward) spacer.style.left = "0px"; else spacer.style.right = "0px";
  leaf.appendChild(spacer);
  strips.push({ el: spacer, f: null, b: null, spacer: true });
  let parent = spacer;
  for (let i = 0; i < STRIPS; i++) {
    const s = document.createElement("div");
    s.className = "ba-strip";
    s.style.width = (w + 1) + "px";                       // a pixel of overlap hides the seams
    const step = i ? w : G / 2;                           // each strip hangs from the end of the one before
    if (forward) s.style.left = step + "px"; else s.style.right = step + "px";
    const offFront = forward ? i * w : W - (i + 1) * w;
    const offBack = forward ? W - (i + 1) * w : i * w;
    s.innerHTML =
      `<div class="ba-sface f"><div class="ba-clone ${forward ? "is-right" : "is-left"}" style="width:${W}px;left:${-offFront}px">${frontHTML}</div><div class="ba-sshade"></div></div>` +
      `<div class="ba-sface b"><div class="ba-clone ${forward ? "is-left" : "is-right"}" style="width:${W}px;left:${-offBack}px">${backHTML}</div><div class="ba-sshade"></div></div>`;
    parent.appendChild(s);
    strips.push({ el: s, f: s.querySelector(".f .ba-sshade"), b: s.querySelector(".b .ba-sshade") });
    parent = s;
  }
  return strips;
}

let breezeStop = () => {}, breezeRun = () => {};   // set by the breeze below; a turn takes the page from the wind, then gives it back
function turn(to, dir, carry) {   // carry: the pose of a page the wind has already lifted, to carry on from
  to = (to + N) % N;
  if (busy || to === at) return;
  breezeStop();
  const from = at;
  at = to;
  mark();
  showPhotos(to, true);

  if (reduce) { fill(sheetL, to, "L"); fill(sheetR, to, "R"); return; }

  if (!spreadView()) { turnUpright(from, to, dir); return; }   // phones: the notebook stands upright

  busy = true;
  book.classList.add("is-busy");
  const forward = dir > 0;
  // the leaf: its front is the page being turned, its back the page it reveals on the other side
  const frontHTML = forward ? page(from, "R") : page(from, "L");
  const backHTML = forward ? page(to, "L") : page(to, "R");
  const strips = buildLeaf(forward, frontHTML, backHTML);
  if (forward) fill(sheetR, to, "R"); else fill(sheetL, to, "L");    // what lies beneath the leaf
  const under = (forward ? sheetR : sheetL).querySelector(".ba-shade");
  const lands = (forward ? sheetL : sheetR).querySelector(".ba-shade");

  const tilt = parseFloat(getComputedStyle(book).getPropertyValue("--ba-tilt")) || 0;
  const sign = forward ? -1 : 1;
  const rad = Math.PI / 180;
  const t0 = performance.now();

  const frame = (now) => {
    const t = Math.min(1, (now - t0) / TURN_MS);
    const e = 0.5 - 0.5 * Math.cos(Math.PI * t);                 // a soft start and a soft landing
    const base = tilt + e * (180 - 2 * tilt);
    // heavy paper bends only a little: the outer edge leads as the page lifts and trails as it settles
    const lead = 20 * Math.sin(2 * Math.PI * e), sag = 7 * Math.sin(Math.PI * e);
    let prev = 0;
    for (let i = 0; i < strips.length; i++) {
      const u = Math.pow(i / (strips.length - 1), 1.35);
      let ang = Math.max(tilt, Math.min(180 - tilt, base + u * (lead - sag)));
      if (carry) { const w = Math.min(1, t / 0.3), s = w * w * (3 - 2 * w); ang = carry(i / (strips.length - 1)) * (1 - s) + ang * s; }
      strips[i].el.style.transform = `rotateY(${sign * (ang - prev)}deg)`;
      prev = ang;
      const dark = (0.3 * Math.sin(ang * rad)).toFixed(3);     // darker as the strip turns away from the light
      if (strips[i].spacer) continue;
      strips[i].f.style.opacity = dark;
      strips[i].b.style.opacity = dark;
    }
    under.style.opacity = (0.9 * Math.pow(1 - e, 1.6)).toFixed(3);
    lands.style.opacity = (e < 0.55 ? 0 : 0.7 * Math.sin(((e - 0.55) / 0.45) * Math.PI)).toFixed(3);
    if (t < 1) { requestAnimationFrame(frame); return; }
    if (forward) fill(sheetL, to, "L"); else fill(sheetR, to, "R");
    leaf.innerHTML = "";
    book.classList.remove("is-busy");
    busy = false;
    breezeRun();   // the wind picks up the new page
  };
  requestAnimationFrame(frame);
}


// ---- a breeze from the right: air from the right keeps lifting the right-hand page, whether or not the reader
// is touching the book, and after every turn. Each gust is different: it lifts the free edge quickly, the paper bends more towards its edge than at the
// spine, a ripple runs along it, and it settles slowly. Beneath the lifted page lies the next one, as in a real book.
(() => {
  if (reduce) return;
  let on = false, built = null, gust = null, raf = 0, inView = false;
  let since = 0;   // gusts since the wind last turned a page
  const newGust = (now, first) => {
    since++;
    const turns = !first && (since >= 4 || (since >= 2 && Math.random() < 0.4));
    if (turns) since = 0;
    gust = {
      turns,
      t0: now + (first ? 500 : 700 + Math.random() * 1700),    // the wind does not keep time
      dur: 2300 + Math.random() * 1700,
      amp: turns ? 30 + Math.random() * 10 : 16 + Math.random() * 18,   // degrees at the free edge
      freq: 1.7 + Math.random() * 1.3,
      ph: Math.random() * 6.28,
      rise: turns ? 0.3 : 0.12 + Math.random() * 0.1
    };
  };
  const build = () => {
    const strips = buildLeaf(true, page(at, "R"), page((at + 1) % N, "L"));
    fill(sheetR, (at + 1) % N, "R");                            // what the lifted page uncovers
    built = { strips, tilt: parseFloat(getComputedStyle(book).getPropertyValue("--ba-tilt")) || 0 };
  };
  const unbuild = () => {
    if (!built) return;
    leaf.innerHTML = "";
    fill(sheetR, at, "R");
    built = null;
  };
  const pose = (lift, rip, phase) => {
    const { strips, tilt } = built;
    let prev = 0;
    for (let i = 0; i < strips.length; i++) {
      const u = i / (strips.length - 1);
      const wave = rip * u * u * Math.sin(phase - u * 2.6);     // the ripple travels out towards the edge
      const ang = Math.max(tilt, tilt + lift * Math.pow(u, 1.55) + wave);
      strips[i].el.style.transform = `rotateY(${-(ang - prev)}deg)`;
      prev = ang;
      if (strips[i].spacer) continue;
      const dark = (0.42 * Math.sin((ang - tilt) * Math.PI / 180)).toFixed(3);   // paper tipped from the light darkens
      strips[i].f.style.opacity = dark;
    }
  };
  const frame = (now) => {
    raf = 0;
    if (!on) return;
    if (!gust) newGust(now, true);
    if (now >= gust.t0) {
      const k = (now - gust.t0) / gust.dur;
      if (k >= 1) { unbuild(); newGust(now); }
      else {
        if (!built) build();
        const env = k < gust.rise ? Math.sin((k / gust.rise) * Math.PI / 2) : Math.pow(1 - (k - gust.rise) / (1 - gust.rise), 1.7);
        const s = (now - gust.t0) / 1000;
        const flutter = 1 + 0.18 * Math.sin(s * gust.freq * 6.28 + gust.ph) * env;   // the gust is never quite steady
        const lift = gust.amp * env * flutter, rip = 3.4 * env, ph = s * gust.freq * 6.28 + gust.ph;
        pose(lift, rip, ph);
        if (gust.turns && k >= gust.rise) {   // this one is strong enough: the page goes over, carried on from where it is
          const tilt = built.tilt;
          const carry = (u) => Math.max(tilt, tilt + lift * Math.pow(u, 1.55) + rip * u * u * Math.sin(ph - u * 2.6));
          gust = null;
          turn(at + 1, 1, carry);
          return;
        }
      }
    }
    raf = requestAnimationFrame(frame);
  };
  const run = () => {
    const should = inView && !busy && spreadView();
    if (should && !on) { on = true; gust = null; raf = requestAnimationFrame(frame); }
    if (!should && on) { on = false; if (raf) cancelAnimationFrame(raf); raf = 0; unbuild(); gust = null; }
  };
  breezeStop = () => { on = false; if (raf) cancelAnimationFrame(raf); raf = 0; unbuild(); gust = null; };
  breezeRun = run;
  if ("IntersectionObserver" in window) new IntersectionObserver(([e]) => { inView = e.isIntersecting; run(); }, { threshold: 0.5 }).observe(book);
  addEventListener("resize", run);
})();

// phones: the notebook stands upright with the binding across the middle; a page lifts over the
// binding the way a top-bound notebook turns: forward, the lower page flips up; back, the upper one flips down
function turnUpright(from, to, dir) {
  busy = true;
  book.classList.add("is-busy");
  const forward = dir > 0;
  const G = parseFloat(getComputedStyle(book).getPropertyValue("--ba-gap")) || 0;
  const lifts = forward ? sheetR : sheetL, other = forward ? sheetL : sheetR;
  const Hh = lifts.offsetHeight, W = lifts.offsetWidth;
  const hinge = forward ? lifts.offsetTop - G / 2 : lifts.offsetTop + Hh + G / 2;   // the line of the wire
  const leafM = document.createElement("div");
  leafM.className = "ba-mleaf";
  leafM.style.left = lifts.offsetLeft + "px";
  leafM.style.width = W + "px";
  leafM.style.height = Hh + G / 2 + "px";
  leafM.style.top = (forward ? hinge : lifts.offsetTop) + "px";
  leafM.style.transformOrigin = forward ? "50% 0" : "50% 100%";
  const sideNow = forward ? "R" : "L", sideNext = forward ? "L" : "R";
  const faceTop = forward ? G / 2 : 0;
  const face = (cls, i, side) =>
    `<div class="ba-mface ${cls}" style="top:${faceTop}px;height:${Hh}px"><div class="ba-clone ${side === "L" ? "is-left" : "is-right"}" style="position:absolute;inset:0">${page(i, side)}</div></div>`;
  leafM.innerHTML = face("f", from, sideNow) + face("b", to, sideNext);
  pages.appendChild(leafM);
  fill(lifts, to, sideNow);                            // what lies beneath the page as it lifts
  const fShade = leafM.querySelector(".f .ba-shade"), bShade = leafM.querySelector(".b .ba-shade");
  const under = lifts.querySelector(".ba-shade"), lands = other.querySelector(".ba-shade");
  const sign = forward ? 1 : -1, t0 = performance.now(), D = 1050;
  const frame = (now) => {
    const t = Math.min(1, (now - t0) / D);
    const e = 0.5 - 0.5 * Math.cos(Math.PI * t);
    const a = 180 * e;
    leafM.style.transform = `rotateX(${(sign * a).toFixed(2)}deg)`;
    const dark = (0.5 * Math.sin(a * Math.PI / 180)).toFixed(3);
    fShade.style.opacity = dark; bShade.style.opacity = dark;
    under.style.opacity = (0.85 * Math.pow(1 - e, 1.6)).toFixed(3);
    lands.style.opacity = (e < 0.55 ? 0 : 0.6 * Math.sin(((e - 0.55) / 0.45) * Math.PI)).toFixed(3);
    if (t < 1) { requestAnimationFrame(frame); return; }
    fill(other, to, sideNext);
    leafM.remove();
    book.classList.remove("is-busy");
    busy = false;
  };
  requestAnimationFrame(frame);
}


// ---- the photographs beside the journal belong to the open spread ----
// [India today, after the book] for each spread; null leaves that side bare rather than show something unrelated
const PHOTO_PLAN = [
  ["pothole", "pothole-repair"],   // the pothole
  ["vote-today", "vote"],          // the vote
  ["counter-today", "counter-after"], // the counter
  ["land-today", "land-after"],      // the land
  ["harvest", "market"],           // the harvest
  ["rupee-today", "board"],        // the public rupee
  ["classroom-today", "classroom"], // the classroom
  ["oldage-today", "veranda"],          // old age
  ["tap-today", "tap-after"]            // the tap
];
const LIB = Object.fromEntries([...document.querySelectorAll(".sc-library img")].map((i) => [i.dataset.photo, i.getAttribute("src")]));
const SLOTS = { L: document.querySelector(".sc-slot-l"), R: document.querySelector(".sc-slot-r") };
function placePhoto(slot, key, i, side) {
  slot.dataset.key = key || "";
  if (!key) { slot.dataset.empty = ""; return; }
  delete slot.dataset.empty;
  slot.querySelector("img").src = LIB[key];
  slot.querySelector("figcaption").textContent = `${SPREADS[i][0]}, ${side === "L" ? "today" : "after"}`;
}
function showPhotos(i, animate) {
  ["L", "R"].forEach((side, k) => {
    const slot = SLOTS[side];
    if (!slot) return;
    const key = PHOTO_PLAN[i][k], cur = slot.dataset.key || null;
    if (key === cur && slot.dataset.shown === String(i)) return;
    slot.dataset.shown = String(i);
    if (!animate || reduce) { placePhoto(slot, key, i, side); return; }
    const lift = cur ? slot.animate([
      { opacity: 1, translate: "0 0", rotate: "0deg" },
      { opacity: 0, translate: "0 -30px", rotate: side === "L" ? "-7deg" : "7deg" }
    ], { duration: 300, easing: "cubic-bezier(0.5, 0, 0.75, 0)", fill: "forwards" }) : null;
    // the new photograph lands as the page lands, and develops
    setTimeout(async () => {
      if (slot.dataset.shown !== String(i)) return;    // turned again meanwhile
      placePhoto(slot, key, i, side);
      if (lift) lift.cancel();
      if (!key) return;
      const img = slot.querySelector("img");
      try { await img.decode(); } catch (e) {}
      slot.classList.remove("is-in"); void slot.offsetWidth; slot.classList.add("is-in");
      slot.animate([
        { opacity: 0, translate: "0 -44px", rotate: side === "L" ? "6deg" : "-6deg", scale: "1.05" },
        { opacity: 1, translate: "0 0", rotate: "0deg", scale: "1" }
      ], { duration: 700, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" });
    }, cur ? 620 : 380);
  });
}

fill(sheetL, 0, "L"); fill(sheetR, 0, "R"); mark();
showPhotos(0, false);
chips.forEach((c) => c.addEventListener("click", () => { const i = +c.dataset.go; turn(i, i > at ? 1 : -1); }));
// an index tab opens the first page of its book
tabs.forEach((t) => t.addEventListener("click", () => { const i = SPREADS.findIndex((s) => s[1] === +t.dataset.tab); turn(i, i > at ? 1 : -1); }));
document.querySelectorAll(".ba-arrow, .ba-corner").forEach((a) => a.addEventListener("click", () => turn(at + +a.dataset.dir, +a.dataset.dir)));
// tap a page to turn it: the right page forward, the left page back (on phones, any page goes forward)
[[sheetR, 1], [sheetL, -1]].forEach(([sheet, dir]) => sheet.addEventListener("click", () => {
  if (String(getSelection()).trim()) return;     // someone selecting text is not turning the page
  const d = spreadView() ? dir : 1;
  turn(at + d, d);
}));
// hover to turn (mouse and trackpad): rest on the outer edge of a page, where a hand would take it, and it turns.
// The middle of the page is for reading and never turns it; a page turns once, then waits for the hand to leave the edge.
if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
  const EDGE = 110, REST = 380;
  let zone = 0, spent = 0, timer = 0;
  const setZone = (z) => {
    if (z === zone) return;
    zone = z; clearTimeout(timer);
    pages.classList.toggle("hot-r", z === 1); pages.classList.toggle("hot-l", z === -1);
    if (z === 0) { spent = 0; return; }
    if (z === spent || !spreadView()) return;
    timer = setTimeout(() => { if (busy || zone !== z) return; spent = z; turn(at + z, z); }, REST);
  };
  pages.addEventListener("pointermove", (e) => {
    if (busy || e.pointerType === "touch") return;
    const r = pages.getBoundingClientRect();
    setZone(e.clientX > r.right - EDGE ? 1 : e.clientX < r.left + EDGE ? -1 : 0);
  });
  pages.addEventListener("pointerleave", () => setZone(0));
}
book.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") { e.preventDefault(); turn(at + 1, 1); }
  if (e.key === "ArrowLeft") { e.preventDefault(); turn(at - 1, -1); }
});
let x0 = null;   // a swipe across the journal turns its page
book.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
book.addEventListener("touchend", (e) => {
  if (x0 === null) return;
  const dx = e.changedTouches[0].clientX - x0; x0 = null;
  if (Math.abs(dx) > 50) turn(at + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
}, { passive: true });

// ---- the clocks: blank today, set by the book when they come into view ----
const clocks = document.getElementById("ba-clocks");
const ticks = Array.from({ length: 12 }, (_, i) => {
  const a = (i * Math.PI) / 6, r1 = 27, r2 = i % 3 ? 25 : 22;
  return `<line class="t" x1="${32 + r1 * Math.sin(a)}" y1="${32 - r1 * Math.cos(a)}" x2="${32 + r2 * Math.sin(a)}" y2="${32 - r2 * Math.cos(a)}"/>`;
}).join("");
clocks.innerHTML = CLOCKS.map(([what, today, after, deg]) => `
  <li style="--deg:${deg}deg">
    <svg class="ba-dial" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="30"/>${ticks}<line class="hand" x1="32" y1="32" x2="32" y2="12"/><circle class="hub" cx="32" cy="32" r="2.5"/></svg>
    <div><p class="ba-what">${h(what)}</p><p class="ba-today">Today: <s>${h(today)}</s></p><p class="ba-after">${h(after)}</p></div>
  </li>`).join("");
const setClocks = () => {
  clocks.classList.add("is-on");
  if (clocks.classList.contains("is-scrub")) return;   // the scroll scenes set the hands instead
  clocks.querySelectorAll("li").forEach((li) => { li.querySelector(".hand").style.transform = `rotate(${360 + parseFloat(li.style.getPropertyValue("--deg"))}deg)`; });
};
if (reduce || !("IntersectionObserver" in window)) setClocks();
else {
  const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); setClocks(); } }, { rootMargin: "0px 0px -20% 0px" });
  io.observe(clocks);
}
})();

/* ---- Motion: quiet, physical, mostly once. Paper is laid down, photos develop, script is written,
   type is typed, figures are circled, mistakes are struck through, the jacket unfolds, tags sway.
   Nothing moves for visitors who ask for reduced motion. ---- */
(() => {
  const root = document.querySelector("main.ba");
  if (!root) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;

  // polaroids on the table can be picked up and moved (desktop pointer)
  if (fine) {
    let z = 30;
    document.querySelectorAll(".sc-tl .sc-pola, .sc-br .sc-pola").forEach((p) => {
      let sx = 0, sy = 0, dx = 0, dy = 0;
      p.addEventListener("pointerdown", (e) => {
        if (e.button !== 0) return;
        e.preventDefault();
        p.setPointerCapture(e.pointerId);
        sx = e.clientX - dx; sy = e.clientY - dy;
        p.style.zIndex = ++z;
        p.classList.add("is-held");
      });
      p.addEventListener("pointermove", (e) => {
        if (!p.classList.contains("is-held")) return;
        dx = e.clientX - sx; dy = e.clientY - sy;
        p.style.translate = `${dx}px ${dy}px`;
      });
      const drop = () => {
        if (!p.classList.contains("is-held")) return;
        p.classList.remove("is-held");
        p.style.rotate = (Math.random() * 7 - 3.5).toFixed(1) + "deg";   // it lands a little askew, as paper does
      };
      p.addEventListener("pointerup", drop);
      p.addEventListener("pointercancel", drop);
    });
  }

  if (reduce) return;
  root.classList.add("mo-ready");
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // section titles are typed, one key at a time
  document.querySelectorAll(".ba .wd-t").forEach((t) => {
    t.innerHTML = [...t.textContent].map((ch, i) => `<span class="ch" style="--i:${i}">${ch === " " ? "&nbsp;" : esc(ch)}</span>`).join("");
  });
  // the corrections are struck one after another
  document.querySelectorAll(".nv-list li").forEach((li, i) => li.style.setProperty("--i", i));

  // paper objects are laid on the table as they come into view
  const objects = [".ar-folder", ".sc-sec .ba-book", ".nb-board", ".nv-stack", ".lc-wrap", ".rf-folder"];
  objects.forEach((s) => document.querySelectorAll(s).forEach((el) => el.classList.add("mo-obj")));
  const watched = [...objects, ".wd-row", ".wd-t", ".wd-script", ".nb-script", ".ar-sig", ".lc-script", ".sc-by",
    ".au-photo", ".au-stamps", ".ar-photo", ".sc-pola", ".lc-tag", ".nv-photo", ".rf-pola", ".bk-flat"].join(",");
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("is-in");
    io.unobserve(e.target);
  }), { rootMargin: "0px 0px -12% 0px" });
  document.querySelectorAll(".ba :is(" + watched + ")").forEach((el) => io.observe(el));

  // depth: loose things on the table drift a little against the scroll (wide screens only)
  const layers = [[".ar-photo", -0.045], [".rf-pola", -0.06]]
    .flatMap(([s, k]) => [...document.querySelectorAll(".ba " + s)].map((el) => [el, k, el.closest("section")]));
  const vellum = document.querySelector(".nv-v2"), stack = document.querySelector(".nv-stack");
  let queued = false;
  const frame = () => {
    queued = false;
    if (innerWidth <= 760) { layers.forEach(([el]) => (el.style.translate = "")); return; }
    const mid = innerHeight / 2;
    for (const [el, k, sec] of layers) {
      const r = sec.getBoundingClientRect();
      if (r.bottom < -200 || r.top > innerHeight + 200) continue;
      el.style.translate = `0 ${((r.top + r.height / 2 - mid) * k).toFixed(1)}px`;
    }
    if (vellum && stack) {   // the vellum slides into place over the sheet as it is reached
      const r = stack.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight * 0.85)));
      const q = 1 - p * p * (3 - 2 * p);
      vellum.style.translate = `${(-90 * q).toFixed(1)}px ${(-46 * q).toFixed(1)}px`;
      vellum.style.rotate = `${(-5 * q).toFixed(2)}deg`;
    }
  };
  const queue = () => { if (!queued) { queued = true; requestAnimationFrame(frame); } };
  addEventListener("scroll", queue, { passive: true });
  addEventListener("resize", queue);
  frame();
})();


/* ---- The margin index: where you are on the desk (wide screens), and the letter you can draw out ---- */
(() => {
  const nav = document.querySelector(".ix");
  if (nav) {
    const links = [...nav.querySelectorAll("a")];
    const secs = links.map((a) => document.querySelector(a.getAttribute("href")));
    const now = nav.querySelector(".ix-now");
    const main = document.querySelector("main.ba"), foot = document.getElementById("contact");
    let queued = false, current = -1;
    const frame = () => {
      queued = false;
      const vh = innerHeight;
      const on = main.getBoundingClientRect().top < vh * 0.35 && foot.getBoundingClientRect().top > vh * 0.6;
      nav.classList.toggle("ix-on", on);
      let i = -1;
      secs.forEach((s, k) => { if (s && s.getBoundingClientRect().top < vh * 0.5) i = k; });
      if (i !== current) {
        current = i;
        links.forEach((a, k) => (k === i ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current")));
        now.textContent = i >= 0 ? links[i].textContent.trim() : "";
      }
    };
    const queue = () => { if (!queued) { queued = true; requestAnimationFrame(frame); } };
    addEventListener("scroll", queue, { passive: true });
    addEventListener("resize", queue);
    frame();
  }

  const letter = document.querySelector(".ar-letter");
  if (letter) {
    const toggle = () => {
      const out = !letter.classList.contains("is-out");
      letter.classList.toggle("is-out", out);
      letter.setAttribute("aria-expanded", String(out));
    };
    letter.addEventListener("click", toggle);
    letter.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } });
  }
})();


/* ---- Scroll scenes and things to play with. The desk answers the reader: what happens is tied to the scroll
   (and runs backwards when you scroll back), and the objects respond to the hand. Nothing here runs for
   visitors who ask for reduced motion; they see every object in its finished state. ---- */
(() => {
  const root = document.querySelector("main.ba");
  if (!root || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ease = (t) => t * t * (3 - 2 * t);
  const near = (r, vh) => r.bottom > -150 && r.top < vh + 150;
  const scenes = [];

  // a script line starts clipped to nothing, which the browser can report as never on screen:
  // watch the line's container, and write the line in when the container arrives
  if ("IntersectionObserver" in window) {
    const lines = [...document.querySelectorAll(".ba :is(.wd-script, .nb-script, .ar-sig, .lc-script, .sc-by)")];
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      lines.forEach((l) => { if (l.parentElement === e.target) l.classList.add("is-in"); });
      io.unobserve(e.target);
    }), { rootMargin: "0px 0px -12% 0px" });
    new Set(lines.map((l) => l.parentElement)).forEach((p) => io.observe(p));
  }

  // the author's folder fades in slowly as it comes up the screen
  const auFolder = document.querySelector(".au-folder");
  if (auFolder) scenes.push((vh) => {
    const r = auFolder.getBoundingClientRect();
    if (!near(r, vh)) return;
    const q = ease(clamp((vh - r.top) / (vh * 0.8)));
    auFolder.style.opacity = q.toFixed(3);
    auFolder.style.translate = `0 ${((1 - q) * 80).toFixed(1)}px`;
  });

  // the record: the author's note is slid across onto the photograph as the folder comes up the screen
  const folder = document.querySelector(".ar-folder"), letter = document.querySelector(".ar-letter"),
    clip = document.querySelector(".ar-collage .pclip");
  if (folder && letter) scenes.push((vh) => {
    const r = folder.getBoundingClientRect();
    if (!near(r, vh)) return;
    const q = 1 - ease(clamp((Math.min(260, vh * 0.32) - r.top) / 440));   // the stage hands over with the folder already high, so the slide happens while reading it
    const small = innerWidth <= 760;   // on a phone the note only shifts a little, so it never leaves the folder
    const x = ((small ? -14 : -110) * q).toFixed(1) + "px", y = ((small ? 18 : 70) * q).toFixed(1) + "px";
    letter.style.setProperty("--lx", x); letter.style.setProperty("--ly", y);
    letter.style.setProperty("--lr", (-1.2 - 5 * q).toFixed(2) + "deg");
    if (clip) clip.style.translate = `${x} ${y}`;
  });

  // the clocks: the hands are set one clock after another as the page is read
  const dial = document.getElementById("ba-clocks");
  let clocks = [];
  if (dial) {
    dial.classList.add("is-scrub");
    clocks = [...dial.querySelectorAll("li")].map((li) => ({ li, hand: li.querySelector(".hand"), to: 360 + parseFloat(li.style.getPropertyValue("--deg")), extra: 0, t: 0 }));
    const draw = (c) => { c.hand.style.transform = `rotate(${(c.t * c.to + c.extra).toFixed(1)}deg)`; };
    scenes.push((vh) => {
      const r = dial.getBoundingClientRect();
      if (!near(r, vh)) return;
      const p = clamp((vh * 0.95 - r.top) / (r.height * 0.5 + vh * 0.42));
      clocks.forEach((c, i) => {
        c.t = ease(clamp((p - i * 0.045) / 0.6));
        draw(c);
        c.li.classList.toggle("is-set", c.t > 0.97);
      });
    });
    // run a hand round again by touching its clock
    clocks.forEach((c) => c.li.addEventListener("pointerenter", () => {
      if (c.spin || c.t < 0.97) return;
      c.spin = true;
      const t0 = performance.now();
      const step = (now) => {
        const k = clamp((now - t0) / 1200);
        c.extra = -360 * Math.pow(1 - k, 3);
        draw(c);
        if (k < 1) requestAnimationFrame(step); else c.spin = false;
      };
      requestAnimationFrame(step);
    }));
  }

  // corrected: each phrase is struck through as it reaches the reading line, then its correction is written in
  const stackEl = document.querySelector(".nv-stack"), lines = [...document.querySelectorAll(".nv-list li")];
  if (stackEl && lines.length) {
    stackEl.classList.add("is-scrub");
    scenes.push((vh) => {
      if (!near(stackEl.getBoundingClientRect(), vh)) return;
      lines.forEach((li) => li.style.setProperty("--k", clamp((vh * 0.8 - li.getBoundingClientRect().top) / (vh * 0.17)).toFixed(3)));
    });
  }

  // the book: it arrives closed and opens flat, jacket and all, as it is scrolled to
  const flat = document.querySelector(".bk-flat");
  if (flat) {
    flat.classList.add("is-scrub");
    scenes.push((vh) => {
      const r = flat.getBoundingClientRect();
      if (!near(r, vh)) return;
      flat.style.setProperty("--open", ease(clamp((vh * 0.95 - r.top) / (vh * 0.55))).toFixed(3));
    });
  }

  let queued = false;
  const run = () => { queued = false; const vh = innerHeight; scenes.forEach((f) => f(vh)); };
  const queue = () => { if (!queued) { queued = true; requestAnimationFrame(run); } };
  addEventListener("scroll", queue, { passive: true });
  addEventListener("resize", queue);
  run();

  // a desk lamp: a warm pool of light on the desk follows the hand (desktop pointer, below the stage only)
  if (fine) {
    const lamp = document.createElement("div");
    lamp.className = "desk-lamp"; lamp.setAttribute("aria-hidden", "true");
    root.prepend(lamp);
    let mx = innerWidth / 2, my = innerHeight * 0.45, q = false;
    const place = () => {
      q = false;
      lamp.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      lamp.classList.toggle("is-on", root.getBoundingClientRect().top < innerHeight * 0.25);
    };
    const ask = () => { if (!q) { q = true; requestAnimationFrame(place); } };
    addEventListener("pointermove", (e) => { mx = e.clientX; my = e.clientY; ask(); }, { passive: true });
    addEventListener("scroll", ask, { passive: true });
    place();
  }
})();
