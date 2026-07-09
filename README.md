# Zynk Portfolio

A dark, bold portfolio skeleton for a UX/UI designer. Plain HTML/CSS/JS — no build step, no dependencies. All content is centralized so you can edit copy and add projects/posts without touching layout code.

## Run it

Just open `index.html` in a browser. (For the contact-form fallback and clean routing, a tiny local server is nicer:)

```powershell
# from inside the zynk/ folder
python -m http.server 8000
# then visit http://localhost:8000
```

## Edit content — one file

Everything you write lives in **`js/data.js`**:

| Want to change…        | Edit in `js/data.js` |
|------------------------|----------------------|
| Your name / role / bio | `meta`, `hero`, `about` |
| Skills + tags          | `services.items` |
| Projects               | `projects[]` — duplicate a block to add one |
| Blog posts             | `thoughts[]` — add to the top |
| Testimonials           | `testimonials.items` |
| Contact email / form   | `contact` |
| Social links           | `social` |

- **Projects** auto-fill the grid (any number) and each links to `project.html?slug=<slug>` as a **Problem → Research → Design Decisions → Outcome** case study.
- **Posts** link to `post.html?slug=<slug>`.

## Images

Drop files into **`images/`** and reference them by path in `data.js` (e.g. `cover: "images/zynk-cover.jpg"`). The included `.svg` files are placeholders — replace them with real images (`.jpg`/`.png`/`.webp` all fine).

## Accent color

The whole site runs off one CSS variable. To switch:

- **Quick:** change `data-accent="electric-green"` on the `<html>` tag in `index.html`, `project.html`, and `post.html` to `electric-blue` or `warm-orange`.
- **Custom:** edit `--accent` (or add a new preset) in `css/styles.css` under `:root`.

## Contact form

By default the form opens the visitor's email app. To collect submissions properly, paste a [Formspree](https://formspree.io) (or similar) endpoint into `contact.formAction` in `data.js`.

## Files

```
zynk/
├─ index.html        Home (all sections)
├─ project.html      Case-study template (reads ?slug=)
├─ post.html         Blog post template (reads ?slug=)
├─ css/styles.css    All styling + accent system
├─ js/
│  ├─ data.js        ← YOUR CONTENT (edit this)
│  ├─ main.js        renders the home page
│  └─ inner.js       renders project + post pages
└─ images/           placeholder SVGs (replace with real assets)
```
