/* =====================================================================
   inner.js — renders PROJECT (case study) and POST (blog) pages.
   Reads ?slug=... from the URL and looks it up in window.CONTENT.
   Set window.PAGE_TYPE = "project" | "post" in the HTML before this loads.
   ===================================================================== */
(function () {
  const C = window.CONTENT;
  const $ = (s, c = document) => c.querySelector(s);
  const el = (t, cls, html) => { const n = document.createElement(t); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const params = new URLSearchParams(location.search);
  const slug = params.get("slug");

  /* ---- Shared chrome: brand, nav, footer ---- */
  $("#brand").innerHTML = `${esc(C.meta.brand)}<span>.</span>`;
  const navLinks = $("#nav-links");
  C.nav.forEach((l) => { const a = el("a", "", esc(l.label)); a.href = l.href; navLinks.appendChild(a); });
  const navCta = el("a", "btn btn--primary nav-cta", esc(C.hero.ctaPrimary.label));
  navCta.href = C.hero.ctaPrimary.href; navLinks.appendChild(navCta);
  $("#footer-brand").innerHTML = `${esc(C.meta.brand)}<span>.</span>`;
  const fs = $("#footer-social");
  C.social.forEach((s) => { const a = el("a", "", esc(s.label)); a.href = s.href; fs.appendChild(a); });
  $("#footer-year").textContent = new Date().getFullYear();
  $("#nav-toggle").addEventListener("click", () => navLinks.classList.toggle("open"));

  const root = $("#page-root");

  if (window.PAGE_TYPE === "project") renderProject();
  else renderPost();

  /* --------------------------------------------------------------- */
  function notFound(kind, backHref, backLabel) {
    document.title = `Not found — ${C.meta.brand}`;
    root.innerHTML = `
      <section class="section container">
        <a class="back-link" href="${backHref}">← ${backLabel}</a>
        <h1 class="page-title">Not found</h1>
        <p class="section-lead" style="margin-top:16px">We couldn't find that ${kind}. It may have been moved or renamed.</p>
      </section>`;
  }

  function renderProject() {
    const p = (C.projects || []).find((x) => x.slug === slug);
    if (!p) return notFound("project", "index.html#work", "Back to work");
    document.title = `${p.title} — ${C.meta.brand}`;

    const meta = [
      ["Role", p.role], ["Category", p.category], ["Year", p.year],
    ].filter(([, v]) => v).map(([k, v]) =>
      `<div><span class="meta-label">${esc(k)}</span><span class="meta-value">${esc(v)}</span></div>`).join("");

    const blocks = [
      ["01", "Problem", p.caseStudy.problem],
      ["02", "Research", p.caseStudy.research],
      ["03", "Design Decisions", p.caseStudy.designDecisions],
      ["04", "Outcome", p.caseStudy.outcome],
    ].map(([num, title, body]) => `
      <div class="case-block reveal">
        <h2><span class="num">${num}</span>${esc(title)}</h2>
        <p>${esc(body || "")}</p>
      </div>`).join("");

    const gallery = (p.gallery && p.gallery.length)
      ? `<div class="case-gallery reveal">${p.gallery.map((g) =>
          `<img src="${esc(g)}" alt="${esc(p.title)} visual" loading="lazy">`).join("")}</div>`
      : "";

    const protoBtn = p.prototypeLink
      ? `<div style="margin-top:32px">
           <a class="btn btn--primary" href="${esc(p.prototypeLink)}" target="_blank" rel="noopener">
             ${esc(p.prototypeCta || "View prototype →")}
           </a>
         </div>`
      : "";

    /* Zynk gets its Orbitron + orbit-ring wordmark; every other project
       keeps the plain page-title heading. */
    const titleHTML = p.slug === "zynk"
      ? `<h1 class="page-title page-title--zynk">
           <span class="zk-logo-ring" aria-hidden="true"></span>
           <span class="zk-logo-text">${esc(p.title)}</span>
         </h1>`
      : `<h1 class="page-title">${esc(p.title)}</h1>`;

    root.innerHTML = `
      <section class="page-hero container">
        <a class="back-link" href="index.html#work">← Back to work</a>
        <div class="page-category">${esc(p.category)}</div>
        ${titleHTML}
        <p class="section-lead" style="margin-top:18px">${esc(p.summary)}</p>
        <div class="page-meta">${meta}</div>
        ${protoBtn}
      </section>
      <div class="container">
        <figure class="cover-figure reveal"><img src="${esc(p.cover)}" alt="${esc(p.title)} cover"></figure>
      </div>
      <section class="container">
        <div class="case">${blocks}</div>
        ${gallery}
      </section>
      ${pager(C.projects, slug, "project")}`;
    finish();
  }

  function renderPost() {
    const post = (C.thoughts || []).find((x) => x.slug === slug);
    if (!post) return notFound("post", "index.html#thoughts", "Back to thoughts");
    document.title = `${post.title} — ${C.meta.brand}`;
    const date = new Date(post.date + "T00:00:00").toLocaleDateString(undefined,
      { year: "numeric", month: "long", day: "numeric" });
    const body = (post.body || []).map((p) => `<p>${esc(p)}</p>`).join("");

    root.innerHTML = `
      <section class="page-hero container">
        <a class="back-link" href="index.html#thoughts">← Back to thoughts</a>
        <div class="page-category">${esc(post.category)}</div>
        <h1 class="page-title" style="font-size:clamp(30px,5vw,56px)">${esc(post.title)}</h1>
        <p class="section-lead" style="margin-top:16px">${esc(date)}</p>
      </section>
      <div class="container">
        <figure class="cover-figure reveal"><img src="${esc(post.cover)}" alt="${esc(post.title)}"></figure>
      </div>
      <section class="container">
        <div class="article reveal">${body}</div>
      </section>
      ${pager(C.thoughts, slug, "post")}`;
    finish();
  }

  function pager(list, current, type) {
    const i = list.findIndex((x) => x.slug === current);
    const prev = list[i - 1], next = list[i + 1];
    const link = (item, label, align) => item
      ? `<a class="back-link" style="margin:0;text-align:${align}" href="${type}.html?slug=${encodeURIComponent(item.slug)}">${label}</a>`
      : `<span></span>`;
    return `<section class="container"><div class="pager">
      ${link(prev, "← " + (prev ? esc(prev.title) : ""), "left")}
      ${link(next, (next ? esc(next.title) : "") + " →", "right")}
    </div></section>`;
  }

  function finish() {
    navLinks.addEventListener("click", (e) => { if (e.target.tagName === "A") navLinks.classList.remove("open"); });
    if (typeof initReveal === "function") initReveal();
  }
})();

/* Reveal helper (same as main.js so inner pages can be loaded standalone) */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !items.length) { items.forEach((i) => i.classList.add("is-visible")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  items.forEach((i) => io.observe(i));
}
