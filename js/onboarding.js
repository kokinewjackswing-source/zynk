/* =====================================================================
   onboarding.js — Zynk onboarding flow renderer
   Reads ALL copy from window.CONTENT.onboarding (data.js).
   No text is written directly in this file.
   ===================================================================== */
(function () {
  const C    = window.CONTENT.onboarding;
  const root = document.getElementById('ob-root');

  /* Escape HTML to prevent XSS */
  const esc = s => String(s).replace(/[&<>"]/g,
    c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---- State ------------------------------------------------------- */
  let current = 0;
  const picks = {}; /* { stepIdx: [optionIds] } */

  /* ---- Build all screens ------------------------------------------ */
  const totalSteps = C.steps.length;
  const screens    = [
    buildWelcome(),
    ...C.steps.map((step, i) => buildStep(step, i)),
    buildDone(),
  ];

  screens.forEach(s => root.appendChild(s));
  activate(0);

  /* ---- Navigation -------------------------------------------------- */
  function activate(idx) {
    screens.forEach((s, i) => s.classList.toggle('is-active', i === idx));
    current = idx;
    window.scrollTo(0, 0);
  }
  function goNext() { activate(Math.min(current + 1, screens.length - 1)); }
  function goBack() { activate(Math.max(current - 1, 0)); }

  /* ==================================================================
     WELCOME SCREEN
     ================================================================== */
  function buildWelcome() {
    const div = document.createElement('div');
    div.className    = 'ob-screen ob-welcome';
    div.dataset.theme = 'dark';

    /* Orbit mark — sits in the gap between body copy and the CTA
       buttons so it never collides with the (variable-length,
       variable-line-count) heading above it. Same ellipse + dot style
       as the done screen's orbitSVG(), rendered in orange on this
       screen's dark bg. */
    const deco = document.createElement('div');
    deco.className   = 'ob-welcome__deco';
    deco.setAttribute('aria-hidden', 'true');
    deco.innerHTML   = orbitSVG('#FF6A00');

    const inner = document.createElement('div');
    inner.className = 'ob-welcome__inner';
    inner.innerHTML = `
      <div class="ob-welcome__eyebrow"><span class="zk-logo"><span class="zk-logo__ring" aria-hidden="true"></span><span class="zk-logo__text">${esc(C.welcome.eyebrow)}</span></span></div>
      <h1 class="ob-welcome__heading">
        ${C.welcome.heading.map(line => `<span>${esc(line)}</span>`).join('')}
      </h1>
      <p class="ob-welcome__body">${esc(C.welcome.body)}</p>
    `;

    const actions = document.createElement('div');
    actions.className = 'ob-welcome__actions';
    actions.innerHTML = `
      <button class="ob-btn ob-btn--primary ob-btn--full js-start">${esc(C.welcome.cta)}</button>
      <button class="ob-btn ob-btn--text js-skip-all">${esc(C.welcome.ctaSkip)}</button>
    `;
    actions.querySelector('.js-start').addEventListener('click', goNext);
    /* "スキップして入る" jumps directly to the done screen */
    actions.querySelector('.js-skip-all').addEventListener('click', () => activate(screens.length - 1));

    div.appendChild(inner);
    div.appendChild(deco);
    div.appendChild(actions);
    return div;
  }

  /* ==================================================================
     STEP SCREEN
     stepIdx: 0-based index into C.steps
     screenIdx: 1-based (0 = welcome)
     ================================================================== */
  function buildStep(step, stepIdx) {
    const div = document.createElement('div');
    div.className     = 'ob-screen ob-step';
    div.dataset.theme = step.theme;

    /* ---- Top chrome ----------------------------------------------- */
    const top = document.createElement('div');
    top.className = 'ob-top';

    const backBtn = document.createElement('button');
    backBtn.className = 'ob-back';
    backBtn.setAttribute('aria-label', esc(C.ui.back));
    backBtn.innerHTML = backArrowSVG() + `<span>${esc(C.ui.back)}</span>`;
    backBtn.addEventListener('click', goBack);

    /* Progress pips: filled-done / half-active / empty */
    const progress = document.createElement('div');
    progress.className = 'ob-progress';
    progress.setAttribute(
      'aria-label',
      `${C.ui.progressLabel} ${stepIdx + 1} ${C.ui.progressOf} ${totalSteps}`
    );
    for (let i = 0; i < totalSteps; i++) {
      const pip = document.createElement('span');
      pip.className = 'ob-progress__pip' +
        (i < stepIdx  ? ' ob-progress__pip--done'   :
         i === stepIdx ? ' ob-progress__pip--active' : '');
      progress.appendChild(pip);
    }

    /* /01 style step label */
    const stepNum = document.createElement('div');
    stepNum.className = 'ob-step-num';
    stepNum.setAttribute('aria-hidden', 'true');
    stepNum.textContent = step.num;

    top.appendChild(backBtn);
    top.appendChild(progress);
    top.appendChild(stepNum);
    div.appendChild(top);

    /* ---- Scrollable body ------------------------------------------ */
    const body = document.createElement('div');
    body.className = 'ob-step__body';

    const heading = document.createElement('h2');
    heading.className = 'ob-step__heading';
    heading.innerHTML = step.question.map(line => `<span>${esc(line)}</span>`).join('');
    body.appendChild(heading);

    const sub = document.createElement('p');
    sub.className   = 'ob-step__sub';
    sub.textContent = step.sub;
    body.appendChild(sub);

    /* Options */
    const opts = document.createElement('div');
    opts.className = step.type === 'multi' ? 'ob-options--multi' : 'ob-options--single';

    if (step.type === 'multi') {
      buildMultiOptions(opts, step, stepIdx);
    } else {
      buildSingleOptions(opts, step, stepIdx);
    }

    body.appendChild(opts);
    div.appendChild(body);

    /* ---- Bottom chrome -------------------------------------------- */
    const bottom = document.createElement('div');
    bottom.className = 'ob-bottom';

    const skipBtn = document.createElement('button');
    skipBtn.className   = 'ob-btn ob-btn--text';
    skipBtn.textContent = step.skip;
    skipBtn.addEventListener('click', () => {
      delete picks[stepIdx];
      goNext();
    });

    const nextBtn = document.createElement('button');
    nextBtn.className   = 'ob-btn ob-btn--primary';
    nextBtn.textContent = step.next;
    nextBtn.addEventListener('click', goNext);

    bottom.appendChild(skipBtn);
    bottom.appendChild(nextBtn);
    div.appendChild(bottom);

    return div;
  }

  /* ---- Single-select options (with optional bar-meter) ------------- */
  function buildSingleOptions(container, step, stepIdx) {
    step.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'ob-option';
      btn.dataset.id = opt.id;

      let inner = '';

      /* Bar-meter for options that carry a level value */
      if (opt.level != null) {
        inner += `<div class="ob-option__meter" aria-hidden="true">
          ${barMeterSVG(opt.level, 4)}
        </div>`;
      }

      inner += `<div class="ob-option__text">
        <div class="ob-option__label">${esc(opt.label)}</div>
        ${opt.note ? `<div class="ob-option__note">${esc(opt.note)}</div>` : ''}
      </div>`;

      btn.innerHTML = inner;

      btn.addEventListener('click', () => {
        /* Deselect siblings, select this */
        container.querySelectorAll('.ob-option')
          .forEach(b => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');
        picks[stepIdx] = [opt.id];
      });

      container.appendChild(btn);
    });
  }

  /* ---- Multi-select genre pills ------------------------------------ */
  function buildMultiOptions(container, step, stepIdx) {
    picks[stepIdx] = picks[stepIdx] || [];

    step.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className   = 'ob-genre';
      btn.dataset.id  = opt.id;
      btn.textContent = opt.label;

      btn.addEventListener('click', () => {
        const sel = picks[stepIdx];
        const pos = sel.indexOf(opt.id);
        if (pos === -1) sel.push(opt.id); else sel.splice(pos, 1);
        btn.classList.toggle('is-selected', sel.includes(opt.id));
      });

      container.appendChild(btn);
    });
  }

  /* ==================================================================
     DONE SCREEN
     ================================================================== */
  function buildDone() {
    const div = document.createElement('div');
    div.className     = 'ob-screen ob-done';
    div.dataset.theme = 'orange';

    const inner = document.createElement('div');
    inner.className = 'ob-done__inner';
    inner.innerHTML = `
      <div class="ob-done__eyebrow">${esc(C.done.eyebrow)}</div>
      <div class="ob-done__orbit" aria-hidden="true">${orbitSVG()}</div>
      <h2 class="ob-done__heading">
        ${C.done.heading.map(line => `<span>${esc(line)}</span>`).join('')}
      </h2>
      <p class="ob-done__body">${esc(C.done.body)}</p>
    `;

    const actions = document.createElement('div');
    actions.className = 'ob-done__actions';
    const ctaBtn = document.createElement('button');
    ctaBtn.className   = 'ob-btn ob-btn--dark ob-btn--full';
    ctaBtn.textContent = C.done.cta;
    ctaBtn.addEventListener('click', () => {
      /* In production: navigate to the main Zynk app with picks payload */
      console.log('Zynk onboarding complete. Selections:', picks);
    });
    actions.appendChild(ctaBtn);

    div.appendChild(inner);
    div.appendChild(actions);
    return div;
  }

  /* ==================================================================
     INLINE SVG HELPERS
     Rule: outline in currentColor (cream on dark, black on light),
           exactly one shape filled #FF6A00 (the highest active bar,
           or the pivot dot in the back-arrow).
     ================================================================== */

  /* Back-arrow: chevron outline, small orange dot at pivot point */
  function backArrowSVG() {
    return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 13L5 8L10 3"
            stroke="currentColor" stroke-width="1.8"
            stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="5" cy="8" r="2" fill="#FF6A00"/>
    </svg>`;
  }

  /* Bar-meter: `level` ascending bars out of `max`, highest active = orange.
     DESIGN.md: three ascending bars filled left-to-right; highest active bar orange. */
  function barMeterSVG(level, max) {
    const barW = 6, gap = 4;
    const totalW = max * barW + (max - 1) * gap;
    const maxH   = 16;
    const bars   = [];

    for (let i = 0; i < max; i++) {
      const x    = i * (barW + gap);
      const barH = Math.round(maxH * (0.4 + 0.6 * (i / (max - 1)))); /* ascending */
      const y    = maxH - barH;
      const isHighest  = i === level - 1;
      const isFilled   = i < level;
      const fill       = isHighest ? '#FF6A00' : 'currentColor';
      const opacity    = isFilled ? '1' : '0.18';
      bars.push(
        `<rect x="${x}" y="${y}" width="${barW}" height="${barH}" rx="1"
               fill="${fill}" opacity="${opacity}"/>`
      );
    }

    return `<svg width="${totalW}" height="${maxH}" viewBox="0 0 ${totalW} ${maxH}"
                 fill="none" aria-hidden="true">
      ${bars.join('')}
    </svg>`;
  }

  /* Orbit mark: thin tilted ellipse outline + filled dot.
     On orange bg (done screen), dot is black — the whole bg is the accent.
     On dark bg (welcome screen deco), pass '#FF6A00' to render in orange. */
  function orbitSVG(color = '#141414') {
    return `<svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden="true">
      <ellipse cx="26" cy="26" rx="20" ry="9"
               fill="none" stroke="${color}" stroke-width="1.6"
               transform="rotate(-32 26 26)"/>
      <circle cx="26" cy="26" r="5" fill="${color}"/>
    </svg>`;
  }

})();
