/* =====================================================================
   main.js — renders the HOME page from window.CONTENT (data.js)
   You normally won't need to touch this. Edit data.js instead.
   ===================================================================== */
(function () {
  const C = window.CONTENT;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---- Document meta ---- */
  document.title = `${C.meta.brand} — ${C.meta.role}`;
  const md = $('meta[name="description"]');
  if (md) md.content = C.meta.description;

  /* ---- Brand + nav ---- */
  $("#brand").innerHTML = `${esc(C.meta.brand)}<span>.</span>`;
  const navLinks = $("#nav-links");
  C.nav.forEach((l) => navLinks.appendChild(el("a", "", esc(l.label))).setAttribute("href", l.href));
  const navCta = el("a", "btn btn--primary nav-cta", esc(C.hero.ctaPrimary.label));
  navCta.href = C.hero.ctaPrimary.href;
  navLinks.appendChild(navCta);

  /* ---- Hero ---- */
  const heroSinceEl = $("#hero-since");
  heroSinceEl.textContent = C.hero.since;
  heroSinceEl.style.display = C.hero.since ? "" : "none";
  $("#hero-title").innerHTML = `${esc(C.hero.name)}`;
  $("#hero-role").textContent = C.hero.title;
  $("#hero-intro").textContent = C.hero.intro;
  $("#hero-photo").src = C.hero.photo;
  $("#hero-photo").alt = C.hero.name;
  const ha = $("#hero-actions");
  [["btn btn--primary", C.hero.ctaPrimary], ["btn btn--ghost", C.hero.ctaSecondary]]
    .forEach(([cls, cta]) => {
      const a = el("a", cls, esc(cta.label)); a.href = cta.href; ha.appendChild(a);
    });

  /* ---- About ---- */
  $("#about-kicker").textContent = C.about.kicker;
  $("#about-tagline").textContent = C.about.tagline;
  const ab = $("#about-body");
  C.about.body.forEach((p) => ab.appendChild(el("p", "", esc(p))));

  /* ---- Services ---- */
  $("#services-kicker").textContent = C.services.kicker;
  $("#services-heading").textContent = C.services.heading;
  const sg = $("#services-grid");
  C.services.items.forEach((item) => {
    const card = el("div", "service-card");
    card.appendChild(el("h3", "", esc(item.title)));
    const tags = el("div", "tags");
    item.tags.forEach((t) => tags.appendChild(el("span", "tag", esc(t))));
    card.appendChild(tags);
    sg.appendChild(card);
  });

  /* ---- Work / projects (variable count) ---- */
  const wg = $("#work-grid");
  C.projects.forEach((p) => {
    const card = el("a", "project-card");
    card.href = `project.html?slug=${encodeURIComponent(p.slug)}`;
    card.innerHTML = `
      <div class="project-card__media"><img src="${esc(p.cover)}" alt="${esc(p.title)}" loading="lazy"></div>
      <div class="project-card__body">
        <div>
          <div class="project-card__title">${esc(p.title)}</div>
          <div class="project-card__cat">${esc(p.category)}</div>
        </div>
        <span class="project-card__arrow" aria-hidden="true">→</span>
      </div>`;
    wg.appendChild(card);
  });

  /* ---- Testimonials ---- */
  $("#testimonials-kicker").textContent = C.testimonials.kicker;
  $("#testimonials-heading").textContent = C.testimonials.heading;
  const tg = $("#testimonials-grid");
  C.testimonials.items.forEach((t) => {
    const card = el("div", "testimonial");
    card.innerHTML = `
      <p class="testimonial__quote">${esc(t.quote)}</p>
      <div class="testimonial__who">
        <span class="testimonial__name">${esc(t.name)}</span>
        <span class="testimonial__role">${esc(t.role)}</span>
      </div>`;
    tg.appendChild(card);
  });

  /* ---- Thoughts / blog ---- */
  const thg = $("#thoughts-grid");
  C.thoughts.forEach((post) => {
    const card = el("a", "post-card");
    card.href = `post.html?slug=${encodeURIComponent(post.slug)}`;
    const date = new Date(post.date + "T00:00:00").toLocaleDateString(undefined,
      { year: "numeric", month: "short", day: "numeric" });
    card.innerHTML = `
      <div class="post-card__media"><img src="${esc(post.cover)}" alt="${esc(post.title)}" loading="lazy"></div>
      <div class="post-card__body">
        <div class="post-card__meta"><span>${esc(date)}</span><span class="dot">•</span><span>${esc(post.category)}</span></div>
        <div class="post-card__title">${esc(post.title)}</div>
        <p class="post-card__excerpt">${esc(post.excerpt)}</p>
        <span class="post-card__more">Read →</span>
      </div>`;
    thg.appendChild(card);
  });

  /* ---- Contact ---- */
  $("#contact-kicker").textContent = C.contact.kicker;
  $("#contact-heading").textContent = C.contact.heading;
  $("#contact-blurb").textContent = C.contact.blurb;
  const cm = $("#contact-email");
  cm.textContent = C.contact.email; cm.href = `mailto:${C.contact.email}`;
  const form = $("#contact-form");
  if (C.contact.formAction) form.action = C.contact.formAction;
  form.addEventListener("submit", (e) => {
    if (!C.contact.formAction) {
      e.preventDefault();
      // No endpoint configured — fall back to opening the user's mail client.
      const data = new FormData(form);
      const subject = encodeURIComponent(`Project enquiry from ${data.get("name") || ""}`);
      const body = encodeURIComponent(
        `Name: ${data.get("name") || ""}\nEmail: ${data.get("email") || ""}\n\n${data.get("details") || ""}`);
      window.location.href = `mailto:${C.contact.email}?subject=${subject}&body=${body}`;
    }
  });

  /* ---- Footer ---- */
  $("#footer-brand").innerHTML = `${esc(C.meta.brand)}<span>.</span>`;
  const fs = $("#footer-social");
  C.social.forEach((s) => { const a = el("a", "", esc(s.label)); a.href = s.href; fs.appendChild(a); });
  $("#footer-year").textContent = new Date().getFullYear();

  /* ---- Mobile nav toggle ---- */
  $("#nav-toggle").addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") navLinks.classList.remove("open");
  });

  /* ---- Reveal-on-scroll ---- */
  initReveal();
})();

/* Shared: fade sections in as they enter the viewport */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !items.length) {
    items.forEach((i) => i.classList.add("is-visible")); return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  items.forEach((i) => io.observe(i));
}
