/* =====================================================================
   app.js — Zynk Home, Library & Lesson Detail screens
   Reads ALL copy from window.CONTENT.app (data.js).
   No text is written directly in this file.
   ===================================================================== */
(function () {
  const C    = window.CONTENT.app;
  const root = document.getElementById('app-root');
  const navEl = document.getElementById('app-nav');
  const esc  = s => String(s).replace(/[&<>"]/g,
    c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---- State -------------------------------------------------------- */
  let activeFilter     = 'ALL';
  let lessonsContainer = null;
  let previousScreen   = 'home';

  /* Detail sub-element references — set once in buildDetailShell */
  let detailHeaderEl = null;
  let detailScrollEl = null;

  /* ---- Build screens ------------------------------------------------ */
  const homeScreen     = buildHome();
  const libScreen      = buildLibrary();
  const detailScreen   = buildDetailShell();   /* sets detailHeaderEl / detailScrollEl */
  const progressScreen = buildStub('progress');
  const profileScreen  = buildStub('profile');

  [homeScreen, libScreen, detailScreen, progressScreen, profileScreen]
    .forEach(s => root.appendChild(s));

  buildNav();
  activate('home');

  /* ==================================================================
     NAVIGATION
     ================================================================== */
  function activate(id) {
    const screens = {
      home: homeScreen, library: libScreen, detail: detailScreen,
      progress: progressScreen, profile: profileScreen,
    };
    Object.entries(screens).forEach(([k, s]) =>
      s.classList.toggle('is-active', k === id));

    /* Highlight the nav tab that "owns" the current view */
    const navId = id === 'detail' ? previousScreen : id;
    navEl.querySelectorAll('[data-screen]').forEach(btn =>
      btn.classList.toggle('is-active', btn.dataset.screen === navId));
  }

  function openDetail(lesson, fromScreen) {
    previousScreen = fromScreen;
    populateDetail(lesson);
    activate('detail');
  }

  /* ==================================================================
     BOTTOM NAV
     ================================================================== */
  function buildNav() {
    C.nav.forEach(item => {
      const btn = document.createElement('button');
      btn.className  = 'zk-nav__item';
      btn.dataset.screen = item.id;
      btn.setAttribute('aria-label', esc(item.label));
      btn.innerHTML  = `${navIconSVG(item.id)}<span class="zk-nav__label">${esc(item.label)}</span>`;
      btn.addEventListener('click', () => {
        previousScreen = item.id;
        activate(item.id);
      });
      navEl.appendChild(btn);
    });
  }

  /* ==================================================================
     HOME SCREEN
     ================================================================== */
  function buildHome() {
    const screen = el('div', 'zk-screen zk-home');

    /* Header */
    const header = el('header', 'zk-header');
    const profileLabel = C.nav.find(n => n.id === 'profile').label;
    header.innerHTML = `
      <span class="zk-brand">${esc(C.brand)}</span>
      <button class="zk-header__icon" aria-label="${esc(profileLabel)}">${profileIconSVG()}</button>`;
    header.querySelector('button').addEventListener('click', () => {
      previousScreen = 'home';
      activate('profile');
    });
    screen.appendChild(header);

    /* Scrollable body */
    const scroll = el('div', 'zk-home__scroll');

    /* Hero */
    const h    = C.home.hero;
    const hero = el('section', 'zk-hero');
    hero.innerHTML = `
      <h1 class="zk-hero__heading">${h.heading.map(l => `<span>${esc(l)}</span>`).join('')}</h1>
      <p class="zk-hero__sub">${esc(h.sub)}</p>`;
    const ctaBtn = el('button', 'zk-btn--primary');
    ctaBtn.textContent = h.cta;
    hero.appendChild(ctaBtn);
    scroll.appendChild(hero);

    /* Featured card */
    const featSection = el('section', 'zk-featured-section');
    const f           = C.home.featured;
    const featLesson  = C.library.lessons.find(l => l.title === f.title) || f;
    const featCard    = el('div', 'zk-featured-card');
    featCard.setAttribute('role', 'button');
    featCard.setAttribute('tabindex', '0');
    featCard.setAttribute('aria-label', `Open ${esc(f.title)}`);
    featCard.style.cursor = 'pointer';
    featCard.innerHTML = `
      <div class="zk-featured-card__top">
        <span class="zk-eyebrow">${esc(C.home.featuredLabel)}</span>
        <span class="zk-featured-card__arrow" aria-hidden="true">→</span>
      </div>
      <h2 class="zk-featured-card__title">${esc(f.title)}</h2>
      <div class="zk-featured-card__meta">
        <span class="zk-featured-card__genre">${esc(f.genre)}</span>
        <span class="zk-meta-dot" aria-hidden="true">·</span>
        <span class="zk-featured-card__dur">${esc(f.duration)}</span>
        <span style="flex:1"></span>
        ${barMeterSVG(f.level, 3, '#141414')}
      </div>`;
    featCard.addEventListener('click', () => openDetail(featLesson, 'home'));
    featCard.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openDetail(featLesson, 'home');
    });
    featSection.appendChild(featCard);

    ctaBtn.addEventListener('click', () =>
      featSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
    scroll.appendChild(featSection);

    /* Category rail */
    const catSection = el('section', 'zk-cat-section');
    catSection.innerHTML = `<p class="zk-section-label">${esc(C.home.categoriesLabel)}</p>`;
    const rail = el('div', 'zk-cat-rail');
    C.home.categories.forEach(cat => {
      const card = el('button', 'zk-cat-card');
      card.dataset.theme = cat.theme;
      card.setAttribute('aria-label', cat.label.replace('\n', ' '));
      card.innerHTML = `
        <div class="zk-cat-card__top">
          <span class="zk-cat-card__num">${esc(cat.num)}</span>
          <span class="zk-cat-card__badge-x" aria-hidden="true">×</span>
        </div>
        <span class="zk-cat-card__label">${esc(cat.label)}</span>`;
      card.addEventListener('click', () => {
        previousScreen = 'library';
        activate('library');
        setTimeout(() => applyFilter(cat.genre), 30);
      });
      rail.appendChild(card);
    });
    catSection.appendChild(rail);
    scroll.appendChild(catSection);

    screen.appendChild(scroll);
    return screen;
  }

  /* ==================================================================
     LIBRARY SCREEN
     ================================================================== */
  function buildLibrary() {
    const screen = el('div', 'zk-screen zk-library');

    const head = el('div', 'zk-lib-head');
    head.innerHTML = `<h2 class="zk-lib-heading">${C.library.heading.map(l => `<span>${esc(l)}</span>`).join('')}</h2>`;
    screen.appendChild(head);

    const filterRail = el('div', 'zk-filter-rail');
    filterRail.setAttribute('aria-label', 'Genre filter');
    C.library.filters.forEach(f => {
      const btn = el('button', 'zk-filter');
      btn.dataset.filter = f;
      btn.textContent = f;
      if (f === activeFilter) btn.classList.add('is-active');
      btn.addEventListener('click', () => {
        filterRail.querySelectorAll('.zk-filter').forEach(b =>
          b.classList.toggle('is-active', b.dataset.filter === f));
        applyFilter(f);
      });
      filterRail.appendChild(btn);
    });
    screen.appendChild(filterRail);

    lessonsContainer = el('div', 'zk-lessons');
    renderLessons(C.library.lessons);
    screen.appendChild(lessonsContainer);

    return screen;
  }

  function applyFilter(f) {
    activeFilter = f;
    if (libScreen) {
      libScreen.querySelectorAll('.zk-filter').forEach(btn =>
        btn.classList.toggle('is-active', btn.dataset.filter === f));
    }
    const matched = f === 'ALL'
      ? C.library.lessons
      : C.library.lessons.filter(l => l.genre === f);
    renderLessons(matched);
  }

  function renderLessons(lessons) {
    if (!lessonsContainer) return;
    lessonsContainer.innerHTML = '';
    if (!lessons.length) {
      const empty = el('p', 'zk-lessons__empty');
      empty.textContent = C.library.emptyLabel;
      lessonsContainer.appendChild(empty);
      return;
    }
    lessons.forEach(lesson => {
      const card = el('div', 'zk-lesson-card');
      card.style.cursor = 'pointer';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Open ${lesson.title}`);
      card.innerHTML = `
        <div class="zk-lesson-card__left">
          <span class="zk-lesson-card__genre">${esc(lesson.genre)}</span>
          <span class="zk-lesson-card__title">${esc(lesson.title)}</span>
        </div>
        <div class="zk-lesson-card__right">
          <span class="zk-lesson-card__dur">${esc(lesson.duration)}</span>
          ${barMeterSVG(lesson.level, 3, '#FF6A00')}
        </div>`;
      card.addEventListener('click', () => openDetail(lesson, 'library'));
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') openDetail(lesson, 'library');
      });
      lessonsContainer.appendChild(card);
    });
  }

  /* ==================================================================
     LESSON DETAIL SCREEN
     ================================================================== */
  function buildDetailShell() {
    const screen = el('div', 'zk-screen');

    detailHeaderEl = el('div', 'zk-detail-header');
    screen.appendChild(detailHeaderEl);

    detailScrollEl = el('div', 'zk-detail__scroll');
    screen.appendChild(detailScrollEl);

    return screen;
  }

  function populateDetail(lesson) {
    /* --- Header --- */
    detailHeaderEl.innerHTML = '';

    const backBtn = el('button', 'zk-detail-back');
    backBtn.innerHTML = `${backArrowSVG()}<span>Back</span>`;
    backBtn.addEventListener('click', () => activate(previousScreen));
    detailHeaderEl.appendChild(backBtn);

    const genreTag = el('span', 'zk-detail-genre');
    genreTag.textContent = lesson.genre || '';
    detailHeaderEl.appendChild(genreTag);

    /* --- Scroll area --- */
    detailScrollEl.innerHTML = '';
    detailScrollEl.scrollTop = 0;

    /* Hero: oversized title + meta row */
    const hero = el('div', 'zk-detail-hero');
    const displayTitle = lesson.displayTitle || lesson.title.toUpperCase();
    hero.innerHTML = `
      <h1 class="zk-detail-title">${esc(displayTitle)}</h1>
      <div class="zk-detail-meta">
        ${barMeterSVG(lesson.level, 3, '#FF6A00')}
        <span class="zk-detail-meta__dot" aria-hidden="true">·</span>
        <span class="zk-detail-duration">${esc(lesson.duration || '')}</span>
      </div>`;
    detailScrollEl.appendChild(hero);

    /* Action buttons */
    const actions = el('div', 'zk-detail-actions');
    const playBtn = el('button', 'zk-play-btn');
    playBtn.setAttribute('aria-label', `Play ${lesson.title}`);
    playBtn.innerHTML = playIconSVG();
    actions.appendChild(playBtn);

    const restartBtn = el('button', 'zk-icon-btn');
    restartBtn.setAttribute('aria-label', 'Restart lesson');
    restartBtn.setAttribute('title', 'Restart');
    restartBtn.innerHTML = restartIconSVG();
    actions.appendChild(restartBtn);

    const timerBtn = el('button', 'zk-icon-btn');
    timerBtn.setAttribute('aria-label', 'Set timer');
    timerBtn.setAttribute('title', 'Timer');
    timerBtn.innerHTML = timerIconSVG();
    actions.appendChild(timerBtn);

    detailScrollEl.appendChild(actions);

    /* Description */
    if (lesson.description) {
      appendDivider(detailScrollEl);
      const desc = el('div', 'zk-detail-desc');
      const p = el('p', '');
      p.textContent = lesson.description;
      desc.appendChild(p);
      detailScrollEl.appendChild(desc);
    }

    /* What you'll work on */
    if (lesson.focuses && lesson.focuses.length) {
      const div2 = appendDivider(detailScrollEl);
      div2.style.marginTop = '24px';
      const focuses = el('div', 'zk-detail-focuses');
      const label = el('p', 'zk-detail-focuses__label');
      label.textContent = "What you'll work on";
      focuses.appendChild(label);
      lesson.focuses.forEach((text, i) => {
        const item = el('div', 'zk-focus-item');
        const num  = el('span', 'zk-focus-num');
        num.textContent = `/${String(i + 1).padStart(2, '0')}`;
        const body = el('span', 'zk-focus-text');
        body.textContent = text;
        item.appendChild(num);
        item.appendChild(body);
        focuses.appendChild(item);
      });
      detailScrollEl.appendChild(focuses);
    }
  }

  /* ==================================================================
     STUB SCREENS
     ================================================================== */
  function buildStub(id) {
    const stub = (C.stubs && C.stubs[id]) || { heading: id, body: 'Coming soon.' };
    const div  = el('div', 'zk-screen zk-stub');
    const inner = el('div', 'zk-stub__inner');
    const h    = el('div', 'zk-stub__heading');
    h.textContent = stub.heading;
    const p    = el('p', 'zk-stub__body');
    p.textContent = stub.body;
    inner.appendChild(h);
    inner.appendChild(p);
    div.appendChild(inner);
    return div;
  }

  /* ==================================================================
     HELPERS
     ================================================================== */
  function el(tag, className) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    return node;
  }

  function appendDivider(parent) {
    const d = el('div', 'zk-detail-divider');
    parent.appendChild(d);
    return d;
  }

  /* ==================================================================
     SVG ICONS
     DESIGN.md: outline currentColor, exactly ONE shape filled orange.
     ================================================================== */
  function navIconSVG(id) {
    const icons = {
      home: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <polyline points="1.5,10.5 11,3 20.5,10.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4 10.5V19.5H8.5V14H13.5V19.5H18V10.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="8.5" y="14" width="5" height="5.5" rx="1" fill="#FF6A00"/>
      </svg>`,
      library: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <line x1="5" y1="6"  x2="17" y2="6"  stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        <line x1="5" y1="11" x2="17" y2="11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        <line x1="5" y1="16" x2="17" y2="16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        <circle cx="8" cy="11" r="2.5" fill="#FF6A00"/>
      </svg>`,
      progress: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="3"  y="13" width="4" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/>
        <rect x="9"  y="8"  width="4" height="12" rx="1" stroke="currentColor" stroke-width="1.5"/>
        <rect x="15" y="3"  width="4" height="17" rx="1" fill="#FF6A00"/>
      </svg>`,
      profile: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="8" r="4" stroke="currentColor" stroke-width="1.6"/>
        <path d="M3 20.5C3 17 6.6 14.5 11 14.5C15.4 14.5 19 17 19 20.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        <circle cx="16.5" cy="4.5" r="2.5" fill="#FF6A00"/>
      </svg>`,
    };
    return icons[id] || '';
  }

  function profileIconSVG() {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8.5" r="4.5" stroke="currentColor" stroke-width="1.6"/>
      <path d="M3 22C3 18 7 15.5 12 15.5C17 15.5 21 18 21 22" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
      <circle cx="17.5" cy="4.5" r="2.5" fill="#FF6A00"/>
    </svg>`;
  }

  function backArrowSVG() {
    return `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <polyline points="11,4 6,9 11,14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="6" cy="9" r="2" fill="#FF6A00"/>
    </svg>`;
  }

  /* Play: sits on orange button → fill is black (per DESIGN.md) */
  function playIconSVG() {
    return `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <polygon points="10,6 24,14 10,22" fill="#141414"/>
    </svg>`;
  }

  /*
   * Restart — counter-clockwise arc (DESIGN.md spec)
   * viewBox 0 0 24 24 / rendered 22×22
   *
   * Arc math (center 12,12 r=8):
   *   Start  : (20, 12)  = 3 o'clock
   *   End    : (17.7, 6.3) ≈ 315° (upper-right, ~1 o'clock)
   *   Flags  : large-arc=1, sweep=0 → CCW on screen
   *   → arc sweeps: 3→12→9→6→back-to-1-o'clock (≈315°)
   *
   * Arrowhead (orange) at arc end (17.7, 6.3):
   *   CCW tangent at 315° = (-0.707, -0.707) = upper-left
   *   Tip  : (15.6, 4.2)
   *   Base : (16.3, 7.7) and (19.1, 4.9)
   */
  function restartIconSVG() {
    return `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <path d="M5 12a7 7 0 1 0 2.2-5.1" stroke="#F4EFE6" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M3.5 4.5 L7.5 7 L4.5 10 Z" fill="#FF6A00"/>
    </svg>`;
  }

  /*
   * Timer — clock face + orange quarter-wedge + stem (DESIGN.md spec)
   * viewBox 0 0 24 24 / rendered 22×22
   *
   * Clock: center (12, 13.5) r=7.5
   *   Top rim  (12 o'clock) : (12,   6  )
   *   Right rim (3 o'clock) : (19.5, 13.5)
   * Orange wedge: center → 12 o'clock → arc CW to 3 o'clock → center
   *   (sweep=1 = CW = rightward from top)
   * Two cream tick marks inside the orange wedge:
   *   /01 vertical  at 12 o'clock: (12, 7)–(12, 8.5)
   *   /02 horizontal at 3 o'clock: (17.5, 13.5)–(16, 13.5)
   */
  function timerIconSVG() {
    return `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <circle cx="12" cy="13" r="7.5" stroke="#F4EFE6" stroke-width="1.8"/>
      <path d="M12 13 L12 6.5 A6.5 6.5 0 0 1 17.6 16.2 Z" fill="#FF6A00"/>
      <line x1="4.5"  y1="4"   x2="6.3"  y2="5.7" stroke="#F4EFE6" stroke-width="1.4" stroke-linecap="round"/>
      <line x1="19.5" y1="4"   x2="17.7" y2="5.7" stroke="#F4EFE6" stroke-width="1.4" stroke-linecap="round"/>
    </svg>`;
  }

  /*
   * Bar meter: max ascending bars, highest active filled highlightColor.
   * dark bg  → highlightColor '#FF6A00'
   * orange bg → highlightColor '#141414'
   */
  function barMeterSVG(level, max, highlightColor) {
    const maxH = 14, w = 5, gap = 3;
    const totalW = max * w + (max - 1) * gap;
    const bars = Array.from({ length: max }, (_, i) => {
      const h      = Math.round(maxH * (0.45 + 0.55 * (i / Math.max(max - 1, 1))));
      const x      = i * (w + gap);
      const y      = maxH - h;
      const isTop  = i === level - 1;
      const filled = i < level;
      return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1"
        fill="${isTop ? highlightColor : 'currentColor'}"
        opacity="${filled ? '1' : '0.18'}"/>`;
    });
    return `<svg width="${totalW}" height="${maxH}" viewBox="0 0 ${totalW} ${maxH}"
      fill="none" aria-hidden="true" style="display:block">${bars.join('')}</svg>`;
  }

})();
