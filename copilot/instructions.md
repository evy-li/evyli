# evy.li — Agent Instructions

## Project Overview

Personal portfolio website for **Evelyn Lindberg**, a cinematographer.  
Simple static HTML/CSS/JS site deployed on **Cloudflare Pages**.

**Domain:** evy.li  
**Contact:** hi@evy.li

---

## Project Structure

```
/
├── index.html                    # Home page
├── CNAME                         # Custom domain (evy.li)
├── site.webmanifest              # PWA manifest
├── .gitignore
├── copilot/                      # Agent instructions (NOT deployed)
│   └── instructions.md
├── css/
│   ├── style.css                 # All custom styles (mobile + desktop breakpoints at 1000px)
│   └── splide.min.css            # Splide.js carousel CSS (vendored)
├── fonts/
│   ├── stylesheet.css            # @font-face declarations for Neue Haas Display
│   └── NeueHaasDisplay-*.woff2   # Font files (many weights)
├── js/
│   └── app.js                    # Modal open/close logic
├── images/
│   └── boy/                      # Film stills for "Boy" project
│       ├── a.jpg
│       ├── b.jpg
│       └── c.jpg
├── video/
│   └── nz/                       # Video files for N—Z deck project
│       ├── cover_h264.mp4
│       ├── cover_still.jpg
│       └── nightambience.mp3
├── projects/
│   ├── left_over.html            # "Left Over" project page
│   ├── boy.html                  # "Boy" project page (uses Splide carousel)
│   ├── post_398.html             # "Post 398" project page
│   ├── templates/
│   │   └── splide.html           # Boilerplate template for new projects
│   └── future/
│       └── NZ/                   # N—Z interactive video deck (password protected)
│           ├── index.html        # Landing / entry page
│           └── cover.html        # Video cover page (links to page1.html — not yet created)
```

---

## Design System

### Typography
- **Font:** Neue Haas Display (NeueHaasDisplay-*), self-hosted via `fonts/`
- **Weights used:** NHD-Medium (headings), NHD-Roman (body text)
- **Declared in:** `fonts/stylesheet.css` — loaded via `@import` in `style.css`

### Layout
- CSS Grid via `.parent` class with `div1`, `div2`, `div3` grid areas
- **Mobile:** `< 1000px` — single-column, tighter margins
- **Desktop:** `>= 1001px` — three-column layout (1fr 2fr 1fr)
- **Body:** `padding: 2em`, background `rgb(247, 247, 247)`

### Colors
- **Background:** `rgb(247, 247, 247)` (off-white)
- **Links:** `darkslateblue` / `slategrey` on hover

### Components
- **Vimeo embeds:** `.vimeo-embed-container` — responsive iframe wrapper
- **Splide carousel:** Used on `boy.html` via Splide.js (loaded from CDN + vendored CSS)
- **Modal dialogs:** `.modalDialog` — toggled via `#openModalBtn` + `js/app.js`
  - Opens on click, closes on: click outside, Escape key, or "close" link

---

## Conventions

### HTML Pages
- Each project page follows the same pattern as `projects/templates/splide.html`
- Always include the comment: `<!-- spotted a problem? i'm not a web dev. please let me know via the email address on the home page. -->`
- Link back to home: `<h3>— <a href="../index.html">back</a></h3>`
- Modal: `id="openModal"` + `id="openModalBtn"` + `.modalDialog` class

### Project Page Template (from `projects/templates/splide.html`)
```
<h1>TITLE</h1>
<h2>ROLE</h2>
<h2>YEAR — TYPE — <a href="...">PROD</a></h2>
... content (video embed or image carousel) ...
<h2>SYNOPSIS
    <p>director — DIR<br>
    producer — PROD<br>
    <br>
    CAST — NAME<br>
</h2>
<h3>— <a href="...">imdb</a></h3>
<h3><a href="#openModal" id="openModalBtn">— technical details</a></h3>
<div id="openModal" class="modalDialog">
    <div>
        <h4>
        <p>language — LANG</br>
        runtime — TIME</p>
        <p>acquisition — FORMAT</p>
        <p>finishing — davinci resolve, aces</br>
        format — FORMAT</p>
        <a href="#close" title="Close">— close</a>
        </h4>
    </div>
</div>
```

### N—Z Deck Pages
- Black background, full-screen video with audio
- No cache / no index meta tags
- Left/right click zones for navigation
- Uses HTML5 `<video>` and `<audio>` elements

---

## Deployment (Cloudflare Pages)

### Build Configuration (required in Cloudflare dashboard)
Since this is a static HTML site with **no build step**, Cloudflare Pages deploys the entire repo root by default.  
**To exclude the `/copilot/` directory from deployment**, set the following in the Cloudflare Pages dashboard:

| Setting | Value |
|---------|-------|
| **Build command** | `mkdir -p _site && cp -r * .[^.]* _site/ 2>/dev/null; rm -rf _site/copilot` |
| **Build output directory** | `_site` |
| **Root directory** | (leave blank — use repo root) |

This copies all files (including dotfiles like `CNAME`) into `_site/`, then removes the `copilot/` folder before deployment.

Alternatively, you can use the Cloudflare dashboard's **exclude path** feature if available.

### Required Files for Deployment
The following **must** be deployed:
- `index.html`, `CNAME`, `site.webmanifest`
- `css/`, `fonts/`, `js/`, `images/`, `video/`
- `projects/` (all HTML pages and subdirectories)

The following **must not** be deployed:
- `copilot/` (agent instructions only)
- `README.md` (optional — fine to deploy, but not needed)

---

## Notes for the AI Agent

1. **New projects:** Use `projects/templates/splide.html` as a starting point — it has the correct structure, modal, Splide carousel, and all required sections.
2. **No build tools:** This is a pure static site — no npm, no bundler, no framework. All CSS and JS is hand-written or vendored.
3. **Fonts:** If adding a new font weight, add the `@font-face` declaration to `fonts/stylesheet.css` and place the `.woff`/`.woff2` files in `fonts/`.
4. **Splide.js:** Loaded from CDN (`https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.1/`). Only vendored file is the CSS (`css/splide.min.css`).
5. **Vimeo:** Embedded via iframe with autoplay=1 parameter. Use the `.vimeo-embed-container` wrapper div.
6. **N—Z Deck:** This is a work-in-progress interactive video project. `cover.html` links to `page1.html` which does not yet exist — pages 1..N should follow the same pattern.
7. **Git:** `/copilot/` is tracked in git (NOT in .gitignore) so instructions are shared. It is excluded from Cloudflare Pages deployment via the build command.
