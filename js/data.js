/* =====================================================================
   ZYNK PORTFOLIO — CENTRAL CONTENT FILE
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit to change copy, projects,
   blog posts, services, testimonials, and contact details.

   - Text:        edit the strings below.
   - Images:      drop files into the /images folder and reference them
                  by path, e.g. "images/my-photo.jpg".
   - Projects:    add an object to the `projects` array. The grid and the
                  individual project page work for ANY number of items.
   - Blog posts:  add an object to the `thoughts` array.

   Nothing else needs to change. The pages read from this file.
   ===================================================================== */

window.CONTENT = {

  /* ---- Site / brand --------------------------------------------- */
  meta: {
    brand: "Koki Ito",                 // shown in the navbar + footer
    role: "UX/UI Designer",
    tagline: "Where research-led UX meets considered visual design.",
    description: "UX/UI design portfolio — research-led design with a strong visual eye.", // used for <meta> description
  },

  /* ---- Navigation links (anchor to sections on the home page) --- */
  nav: [
    { label: "About",        href: "index.html#about" },
    { label: "Services",     href: "index.html#services" },
    { label: "Work",         href: "index.html#work" },
    { label: "Thoughts",     href: "index.html#thoughts" },
    { label: "Contact",      href: "index.html#contact" },
  ],

  /* ---- 1. HERO -------------------------------------------------- */
  hero: {
    name: "Koki Ito",
    title: "UX/UI Designer",
    // TODO: add a "Designing since YYYY" style line here once decided, e.g. since: "Designing since 2020",
    since: "",
    intro:
      "Hey — I craft thoughtful, accessible interfaces and turn complex " +
      "problems into simple, usable products. Currently open to new work.",
    photo: "images/profile.svg",        // swap for a real photo, e.g. images/profile.jpg
    ctaPrimary:   { label: "Get in touch",    href: "index.html#contact" },
    ctaSecondary: { label: "Download resume", href: "#" }, // link your PDF later
  },

  /* ---- 2. ABOUT ------------------------------------------------- */
  about: {
    kicker: "About",
    tagline: "Good design is invisible — it just works.",
    body: [
      "I'm a UX/UI designer who believes good design starts with listening — " +
      "to people, to context, to the small frustrations that get overlooked. " +
      "My process is research-led: I dig into how people actually behave " +
      "before I touch a single pixel.",
      "From there, I shape interfaces that feel simple, considered, and a " +
      "little more human. Currently working on independent projects and " +
      "always open to new collaborations.",
    ],
  },

  /* ---- 3. SERVICES ---------------------------------------------- */
  services: {
    kicker: "Services",
    heading: "What I do",
    items: [
      { title: "UX Research",   tags: ["User Interviews", "Surveys", "Usability Testing"] },
      { title: "Wireframing",   tags: ["Information Architecture", "User Flows", "Prototyping"] },
      { title: "Visual Design", tags: ["UI Design", "Design Systems", "Figma"] },
      { title: "Branding",      tags: ["Identity", "Logo", "Guidelines"] },
    ],
  },

  /* ---- 4. FEATURED PROJECTS ------------------------------------
     Each project links to project.html?slug=<slug>.
     Add as many as you like — the grid adapts automatically.
     Case-study format: Problem -> Research -> Design Decisions -> Outcome
  --------------------------------------------------------------- */
  projects: [
    {
      slug: "zynk",
      title: "Zynk",
      category: "Product Design",
      year: "2025",
      role: "Lead UX/UI Designer",
      cover: "images/project-zynk.svg",
      summary:
        "A placeholder case study. Replace with the real story of how Zynk " +
        "came together — the goal, your role, and the impact.",
      // Link to a live prototype or demo page (optional — omit to hide the button)
      prototypeLink: "zynk-onboarding.html",
      prototypeCta:  "Try the onboarding prototype →",
      // Optional extra images shown in the case study body:
      gallery: ["images/project-zynk-1.svg", "images/project-zynk-2.svg"],
      caseStudy: {
        problem:
          "Describe the core problem Zynk set out to solve and who it was for. " +
          "What was painful, slow, or confusing before this project existed?",
        research:
          "Summarize the research: interviews, competitive analysis, data. " +
          "What did you learn, and which insight reframed the problem?",
        designDecisions:
          "Walk through the key design decisions and trade-offs. Why this " +
          "layout, this flow, this pattern? Reference the gallery images above.",
        outcome:
          "Share the result — metrics, qualitative feedback, what shipped, and " +
          "what you'd do next. End on the impact.",
      },
    },

    /* ---- DUPLICATE THIS BLOCK to add another project ------------ */
    {
      slug: "project-two",
      title: "Project Two",
      category: "Mobile App",
      year: "2024",
      role: "UX/UI Designer",
      cover: "images/project-two.svg",
      summary: "Placeholder project. Swap in your real work.",
      gallery: [],
      caseStudy: {
        problem: "Placeholder — the problem.",
        research: "Placeholder — the research.",
        designDecisions: "Placeholder — the design decisions.",
        outcome: "Placeholder — the outcome.",
      },
    },
    {
      slug: "project-three",
      title: "Project Three",
      category: "Web Platform",
      year: "2024",
      role: "Product Designer",
      cover: "images/project-three.svg",
      summary: "Placeholder project. Swap in your real work.",
      gallery: [],
      caseStudy: {
        problem: "Placeholder — the problem.",
        research: "Placeholder — the research.",
        designDecisions: "Placeholder — the design decisions.",
        outcome: "Placeholder — the outcome.",
      },
    },
  ],

  /* ---- 5. TESTIMONIALS (lower priority placeholder) ------------ */
  testimonials: {
    kicker: "Testimonials",
    heading: "Kind words",
    items: [
      { quote: "Placeholder testimonial — clear thinking and a great eye for detail.",
        name: "Client Name", role: "Role, Company" },
      { quote: "Placeholder testimonial — made a complex project feel simple.",
        name: "Client Name", role: "Role, Company" },
      { quote: "Placeholder testimonial — would absolutely work together again.",
        name: "Client Name", role: "Role, Company" },
    ],
  },

  /* ---- 6. THOUGHTS (blog) --------------------------------------
     Each post links to post.html?slug=<slug>.
     `body` is an array of paragraphs. Add new posts to the top.
  --------------------------------------------------------------- */
  thoughts: [
    {
      slug: "designing-with-constraints",
      title: "Designing with constraints",
      date: "2026-01-15",
      category: "Process",
      excerpt: "Why limitations make for better design decisions.",
      cover: "images/thought-1.svg",
      body: [
        "Placeholder post. Write your design reflections here.",
        "Each paragraph is a string in the `body` array — add as many as you need.",
      ],
    },
    {
      slug: "research-before-pixels",
      title: "Research before pixels",
      date: "2025-12-02",
      category: "UX Research",
      excerpt: "A short note on slowing down before opening Figma.",
      cover: "images/thought-2.svg",
      body: [
        "Placeholder post. Replace with your own writing.",
      ],
    },
  ],

  /* ---- 7. CONTACT ----------------------------------------------- */
  contact: {
    kicker: "Contact",
    heading: "Let's build something",
    blurb: "Have a project in mind? Tell me a little about it.",
    email: "you@example.com",
    // The form posts nowhere by default. To make it work, paste a Formspree
    // (or similar) endpoint URL here, e.g. "https://formspree.io/f/abcdwxyz".
    formAction: "",
  },

  /* ---- Footer / social ----------------------------------------- */
  social: [
    { label: "LinkedIn",  href: "#" },
    { label: "Dribbble",  href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Email",     href: "mailto:you@example.com" },
  ],

  /* ---- ZYNK APP SCREENS ----------------------------------------
     All copy for zynk-app.html lives here.
     js/app.js reads only from this object — no text in layout code.
  --------------------------------------------------------------- */
  app: {

    pageTitle: "Zynk",
    brand:     "/ ZYNK",

    /* Bottom navigation tabs */
    nav: [
      { id: "home",     label: "Home"     },
      { id: "library",  label: "Library"  },
      { id: "progress", label: "Progress" },
      { id: "profile",  label: "Profile"  },
    ],

    /* ---- Home screen ------------------------------------------ */
    home: {
      hero: {
        heading: ["MOVE.", "YOUR WAY."],
        sub:     "Today's practice is ready.",
        cta:     "Start today's session",
      },

      featuredLabel: "Today's Pick",
      featured: {
        title:    "Groove Foundation",
        genre:    "HIP HOP",
        duration: "12 min",
        level:    2,            /* 1–3 for bar meter */
      },

      categoriesLabel: "Browse by style",
      categories: [
        { num: "/01", label: "Beginner\nFlows",  genre: "ALL",     theme: "dark"   },
        { num: "/02", label: "Hip Hop",           genre: "HIP HOP", theme: "cream"  },
        { num: "/03", label: "R&B\nGroove",       genre: "R&B",     theme: "orange" },
        { num: "/04", label: "House",             genre: "HOUSE",   theme: "dark"   },
      ],
    },

    /* ---- Library screen --------------------------------------- */
    library: {
      heading:    ["What do you", "want to work on?"],
      filters:    ["ALL", "HIP HOP", "R&B", "K-POP", "HOUSE", "LOCKING", "POP", "JAZZ"],
      emptyLabel: "No lessons match that filter yet.",
      lessons: [
        {
          id: "l1", title: "Groove Foundation", displayTitle: "GROOVE /\nFOUNDATION.",
          genre: "HIP HOP", duration: "12 min", level: 1,
          description: "Start here. Build the core groove that makes everything else possible — weight shifts, chest pops, and finding your own natural bounce.",
          focuses: ["Weight shifting and grounding your stance", "Chest isolation and pop timing", "Finding your personal bounce rhythm"],
        },
        {
          id: "l2", title: "Bounce & Flow", displayTitle: "BOUNCE &\nFLOW.",
          genre: "HIP HOP", duration: "18 min", level: 2,
          description: "Layer movement on top of a locked groove. This session focuses on smooth transitions between hits — energy in, energy out.",
          focuses: ["Connecting hits into a continuous flow", "Head and shoulder wave mechanics", "Timing transitions to the off-beat"],
        },
        {
          id: "l3", title: "R&B Sway", displayTitle: "R&B\nSWAY.",
          genre: "R&B", duration: "15 min", level: 1,
          description: "Slow it down. R&B movement lives in the space between beats — learn to stretch time and let the music breathe through your body.",
          focuses: ["Slow sway and hip pendulum", "Upper body softness vs. lower body anchor", "Moving on the 2 and the 4"],
        },
        {
          id: "l4", title: "Isolation Basics", displayTitle: "ISOLATION\nBASICS.",
          genre: "HIP HOP", duration: "20 min", level: 2,
          description: "Control one part of your body while the rest stays still. Isolations are the building blocks of every clean, sharp move you'll want later.",
          focuses: ["Horizontal and vertical head isolations", "Chest box: forward, side, back, side", "Hip isolation figure-eight"],
        },
        {
          id: "l5", title: "House Step 101", displayTitle: "HOUSE\nSTEP 101.",
          genre: "HOUSE", duration: "14 min", level: 2,
          description: "House lives in the feet. Feel the four-on-the-floor pulse and let it move up through your legs — fast, clean, low-impact footwork.",
          focuses: ["The basic jack and its variations", "Heel-toe alternation at tempo", "Traveling step patterns across the floor"],
        },
        {
          id: "l6", title: "K-Pop Foundation", displayTitle: "K-POP\nFOUNDATION.",
          genre: "K-POP", duration: "22 min", level: 2,
          description: "Clean lines, sharp accents, controlled energy. K-Pop choreography rewards precision — this session teaches you to hit marks without losing personality.",
          focuses: ["Arm lines and full-extension control", "Sharp accent timing vs. smooth transitions", "Count-based phrase structure"],
        },
        {
          id: "l7", title: "Locking Claps", displayTitle: "LOCKING\nCLAPS.",
          genre: "LOCKING", duration: "16 min", level: 3,
          description: "Locking is all about the freeze. Hit hard, lock in place, then release — this session drills the stop-and-go dynamic that makes locking unmistakable.",
          focuses: ["The lock position and muscle memory", "Double clap timing and wrist snap", "Point, lock, and release sequence"],
        },
        {
          id: "l8", title: "Freestyle Session", displayTitle: "FREESTYLE\nSESSION.",
          genre: "ALL", duration: "30 min", level: 3,
          description: "No choreography. Just you and the music. Use everything you've worked on — and throw some of it away. Freestyle is where it becomes yours.",
          focuses: ["Call-and-response improvisation", "Mixing styles within a single phrase", "Listening to the music instead of counting it"],
        },
      ],
    },

    /* ---- Stub screens (Progress / Profile) -------------------- */
    stubs: {
      progress: { heading: "PROGRESS",  body: "Your journey so far — coming soon." },
      profile:  { heading: "PROFILE",   body: "Your space, your settings — coming soon." },
    },

  }, /* end app */

  /* ---- ZYNK ONBOARDING FLOW ------------------------------------
     All copy for zynk-onboarding.html lives here.
     The rendering script (js/onboarding.js) reads only from this
     object — no text is written directly in layout code.
  --------------------------------------------------------------- */
  onboarding: {

    pageTitle: "Zynk — Let's go",

    /* Utility strings for navigation chrome */
    ui: {
      back:          "Back",
      progressLabel: "Step",
      progressOf:    "of",
    },

    /* ---- Welcome screen (dark panel) -------------------------- */
    welcome: {
      eyebrow:  "/ ZYNK",
      heading:  ["No comparisons.", "Just your rhythm."],
      body:     "No scores, no rankings. Just music you love, at a pace that's yours.",
      cta:      "Let's go",
      ctaSkip:  "Skip and jump in",
    },

    /* ---- Steps (rendered in order) ----------------------------
       theme: "dark" | "light" | (done = "orange")
       type:  "single" | "multi"
       Options with `level` (1–4) get a bar-meter indicator.
    --------------------------------------------------------------- */
    steps: [
      {
        num:   "/01",
        theme: "dark",
        question: ["Where are you", "right now?"],
        sub:      "Pick the one that feels closest. No wrong answers.",
        type:     "single",
        options: [
          { id: "explore",       label: "Brand new to this",                note: "Figuring out what dancing feels like", level: 1 },
          { id: "play",          label: "I can move — I want to explore",   note: "Feel over form",                      level: 2 },
          { id: "flow",          label: "Getting comfortable, want a flow", note: "Building something that's mine",      level: 3 },
          { id: "choreography",  label: "Ready for a real challenge",       note: "Confident and going further",         level: 4 },
        ],
        skip: "Skip",
        next: "Next",
      },
      {
        num:   "/02",
        theme: "light",
        question: ["Does being compared", "to others bother you?"],
        sub:      "Optional — honest answers help us find your pace.",
        type:     "single",
        options: [
          { id: "low",    label: "Not really my thing" },
          { id: "medium", label: "It creeps in sometimes" },
          { id: "high",   label: "Yeah, honestly — it does" },
        ],
        skip: "Skip",
        next: "Next",
      },
      {
        num:   "/03",
        theme: "dark",
        question: ["What music", "moves you?"],
        sub:      "Optional · pick as many as you like · change anytime.",
        type:     "multi",
        options: [
          { id: "hiphop", label: "HIP HOP" },
          { id: "rnb",    label: "R&B"     },
          { id: "kpop",   label: "K-POP"   },
          { id: "house",  label: "HOUSE"   },
          { id: "lock",   label: "LOCKING" },
          { id: "pop",    label: "POP"     },
          { id: "jazz",   label: "JAZZ"    },
          { id: "other",  label: "OTHER"   },
        ],
        skip: "Skip",
        next: "Next",
      },
    ],

    /* ---- Done screen (orange panel) -------------------------- */
    done: {
      eyebrow: "You're set",
      heading: ["Your pace.", "Your dance."],
      body:    "Nothing to prove. Just move.",
      cta:     "Start Zynk",
    },

  }, /* end onboarding */

};
