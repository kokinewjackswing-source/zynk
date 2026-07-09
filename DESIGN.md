# DESIGN.md — Zynk

A single source of truth for Zynk's visual language. Any AI coding agent (Claude Code, Cursor, etc.) implementing UI for this project should read this file first and follow it strictly.

## Brand philosophy

Zynk is for self-motivated dancers in their late teens to 20s — not professional dancers, not beginners taking a class for the first time, but people practicing alone in small shared spaces who feel anxious about being compared to others. The core design rule across every decision in this file:

**Zero comparison. Confident, but never intimidating.**

Every visual choice should read as bold and energetic, but nothing should read as cold, clinical, or judgmental. When in doubt, favor the warmer, rounder, more human version of a choice over the sharper, harder one.

Mission: *"A world where everyone can dance freely."*
Personal tagline: *"Your space. Your pace. Your dance."*

Visual register: poster / zine — closer to a campaign poster or mixtape cover than a typical SaaS app. Typography and flat color carry the energy that photography would normally carry.

---

## Color

| Token | Hex | Role |
|---|---|---|
| `--orange` | `#FF6A00` | Primary accent. CTAs, active states, the one filled accent shape inside icons, alternating panel background. |
| `--cream` | `#F4EFE6` | Primary text on dark backgrounds, alternating panel background, button fills. |
| `--black` | `#141414` | Primary background, primary text on light backgrounds. |
| `--bg-page` | `#0E0E0E` | Page-level background, slightly darker than card black for depth. |
| `--muted` | `rgba(244,239,230,0.55)` | Secondary/caption text on dark backgrounds. |

**Flat color only — no gradients.** This is a deliberate departure from an earlier gradient-accent direction; gradients read as too soft/SaaS for this brand.

### Color switchback

Don't apply the three colors the same way on every screen. Alternate which color is background vs. text from card to card or section to section (e.g., black card → orange card → cream card in a row). This creates rhythm and a "campaign poster" feel rather than a single static theme. Each individual card/panel still only uses two colors at a time (one background, one text) for contrast and legibility.

---

## Typography

- **Display (headlines, hero text, card titles):** Bricolage Grotesque, weight 700–800, uppercase, tight leading (~0.95–1.0), letter-spacing -0.01 to -0.02em. This is the typeface that carries the brand's personality — compressed, energetic, but with enough warmth in its ink traps that it doesn't read as aggressive.
- **Body / UI (paragraphs, labels, buttons, captions):** Inter, weight 400–600. Keep body copy in Inter across every screen so the display face is always the variable that signals brand personality, not body text.

Do not substitute Bricolage Grotesque with a sharper/heavier alternative (e.g. Anton, Big Shoulders) — those were tested and rejected for reading too aggressive for this audience.

---

## Spacing

Base unit: **16px.** Use multiples of 16 for padding and gaps between major elements (16 / 32 / 40 / 48...). This is deliberately looser than a typical dense SaaS app — the bold display type needs room to breathe. Smaller multiples (4 / 8px) are acceptable only for tight internal spacing within a single component (e.g. icon-to-label gap, dot-meter gaps).

## Corner radius

Standard radius: **14px** ("ticket" radius — rounded enough to feel soft and approachable, sharp enough to keep the poster/zine edge). Use this for cards, buttons, panels. Avoid fully sharp corners (reads too cold) and avoid very large soft radii like 20px+ (reads too SaaS/generic).

---

## Iconography

**No icon fonts, no icon CDNs.** Use hand-built inline SVG only — this avoids font-loading failures in sandboxed/restricted environments and gives full control over accent placement.

Treatment: outline in cream (or black on light backgrounds), stroke-width ~1.6, rounded line caps/joins. Exactly **one shape per icon filled solid in orange** as a deliberate accent — never left to a library's preset duotone split. Place the accent on the part of the icon that matters most (e.g. the door of a house, the note-head of a track icon, the top/tallest bar of a chart).

### Confirmed icon set
- **Home (nav):** roofline + walls outline, door filled orange
- **Library (nav):** three horizontal bars, one note-dot filled orange
- **Progress (nav):** three ascending bars, tallest bar filled orange
- **Profile (nav):** head/shoulders outline, status dot filled orange
- **Play (primary control):** solid filled triangle, no duotone (sits on an orange button, so fill is black)
- **Restart/undo:** counter-clockwise arc outline, arrowhead filled orange
- **Timer:** clock face outline, one pie-wedge filled orange + two tick marks

### Difficulty indicator
Do **not** use a lock icon for locked/advanced content — this contradicts the zero-comparison philosophy (locks gatekeep and shame). Use a **bar-meter** instead: three ascending bars (visually consistent with the Progress nav icon), filled left-to-right by difficulty level, with the highest active bar in orange. No separate leading icon — the bar meter is self-sufficient. (An earlier sparkle/star icon was tested and rejected — read as a generic "AI feature" cliché.)

---

## Decorative marks

A small, restrained vocabulary of marks can be used as accents (corner tags, badges, dividers) — never as a dominant motif:

- **Orbit mark:** small filled dot + a thin tilted ring around it. Used on category cards as a subtle badge.
- **× stamp:** a simple typographic × at small size. Used the same way as the orbit mark — interchangeable accent, not tied to a specific meaning.
- **Numbered labels (`/01`, `/02`...):** only use when the items actually have a meaningful order (e.g. onboarding steps, a ranked category list). Don't add numbering decoratively to unordered content.

### Explicitly excluded
- Hazard stripes, warning signage, barcodes — read as cold/industrial, contradicts "not intimidating."
- Wireframe globe — reserved for a possible future logo/mission-statement use (ties to "a world where everyone can dance"), not for general UI decoration.
- Sparkle/star icons — generic, overused, rejected for the difficulty indicator.
- Organic blob shapes — an earlier direction, fully abandoned in favor of the poster/zine direction.

---

## Movement & the body

Zynk has no real photography (it's a fictional case study, and using stock photos of "real" dancers would misrepresent the product). Movement and physicality are communicated through:

1. **Oversized display typography** used as a texture, not just a headline — let it crop/bleed at the edge of a card.
2. **Geometric shapes** (bars, rings, stamps) implying motion/rhythm rather than depicting bodies literally.

Never substitute stock photography of people to suggest movement.

---

## Layout

Poster/zine composition, not generic app chrome:
- Flat color-blocked cards/panels rather than soft shadows and white space.
- Ticket-style cutouts and ordered lists where the content genuinely has order.
- Bold headline first, supporting copy second, action last — the type does most of the work a photo would normally do.

---

## Quick do/don't summary

**Do:** flat orange/cream/black, color switchback, Bricolage Grotesque display + Inter body, 16px spacing, 14px radius, hand-built SVG icons with one orange accent, bar-meters for level/progress, orbit/× marks used sparingly.

**Don't:** gradients, hazard stripes, barcodes, lock icons, sparkle icons, stock photography, organic blobs, icon fonts/CDNs, sharp aggressive condensed display type.
