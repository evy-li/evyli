# evy.li — Agent Instructions

## Project Overview

Personal portfolio website for **Evelyn Lindberg**, a filmmaker (cinematography, colour, focus puller/DIT background).  
Simple static HTML/CSS site deployed on **Cloudflare Pages**. No build tools, no framework.

**Domain:** evy.li  
**Contact:** hi@evy.li

---

## Project Structure

```
/
├── index.html                    # Home page (single nav/contact list)
├── CNAME                         # Custom domain (evy.li)
├── site.webmanifest              # PWA manifest
├── README.md
├── .gitignore
├── .well-known/
│   ├── atproto-did               # Bluesky/AT protocol domain verification
│   ├── index.html
│   └── index.md
├── copilot/                      # Agent instructions (NOT deployed)
│   ├── instructions.md
│   └── cloudflare-pages.sh       # Build script (see Deployment)
├── css/
│   └── style.css                 # All custom styles (mobile + desktop breakpoints at 1001px)
├── images/
│   ├── boy/                      # Film stills for "Boy" project
│   │   ├── a.jpg
│   │   ├── b.jpg
│   │   └── c.jpg
│   └── dust/                     # Film stills for "Dust" project
│       ├── a.jpg
│       ├── b.jpg
│       ├── c.jpg
│       └── d.jpg
├── video/                        # Currently empty (reserved for future projects)
└── projects/
    ├── boy.html                  # "Boy"
    ├── dust.html                 # "Dust"
    ├── development.html          # Feature projects in development ("Fir Tree", "Spooky Effects at a Distance")
    ├── left_over.html            # "Left Over" (Vimeo embed)
    └── post_398.html             # "Post 398" (Vimeo embed)
```

PWA / favicon files at repo root: `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `android-chrome-192x192.png`, `android-chrome-512x512.png`.

---

## Design System

### Typography
- **Font:** Google Sans Code, loaded from Google Fonts
- **Declared in:** `style.css` via `@import url('https://fonts.googleapis.com/css2?family=Google+Sans+Code:wght@300;400;500;600;700;800&display=swap')`

### CSS Resets
- **Reset:** Adobe's new CSS reset, imported from GitHub raw:
  `@import url('https://raw.githubusercontent.com/elad2412/the-new-css-reset/main/css/reset.css')`

### Layout
- CSS Grid via `.parent` class with `div1`, `div2`, `div3` grid areas
- **Mobile:** `< 1001px` — columns `1fr 100fr 1fr`
- **Desktop:** `>= 1001px` — three-column layout `1fr 2fr 1fr`
- `div1`, `div2`, `div3` are the three grid cells; text/media lives in `.div3`
- **Body:** `padding: 2em`, background `rgb(240, 240, 240)`, text `rgb(40, 40, 40)`

### Colors
- **Background:** `rgb(240, 240, 240)` (off-white)
- **Text:** `rgb(40, 40, 40)`
- **Links:** `darkseagreen`, hover `slategrey`

### Components
- **Vimeo embeds:** `.vimeo-embed-container` — responsive iframe wrapper (used on `left_over.html` and `post_398.html`)
- **Image stills:** `.filmstill` — full-width responsive inline image (used on `boy.html` and `dust.html`)

---

## Conventions

### HTML Pages
- Every page includes the comment:
  `<!-- spotted a problem? i'm not a web dev. please let me know via the email address on the home page. -->`
- Every page links the shared stylesheet: `<link rel="stylesheet" href="/css/style.css">`
- Body skeleton (all pages):
```
<body>
    <div class="parent">
        <div class="div2"> </div>
        <div class="div1"> </div>
        <div class="div3">
            ...content here...
        </div>
    </div>
</body>
```

### Film Project Page Pattern (`boy`, `dust`, `left_over`, `post_398`)
- `<title>` = `PROJECT — Evelyn Lindberg`
- First `<p>` = project metadata line joined with ` _ ` separators:
  `Project _ role(s) _ type _ production company(ies) _ director — NAME _ producer — NAME _ imdb link`
- Middle `<p>` = media: either a Vimeo iframe inside `.vimeo-embed-container`, or multiple `.filmstill` `<img>` tags
- Last `<p>` = `[short synopsis]` + tech specs joined with ` _ `: format, runtime, aspect ratio, fps, colour/black&white, audio, language

### Home Page (`index.html`)
- Single `.div3` `<p>` with all sections joined by ` _ `:
  `evelyn lindberg _ films _ Dust _ Left Over _ Boy _ Post 398 _ apps _ screenp.la _ about _ <bio> _ contact _ hi@evy.li _ links _ ig _ bsky`
- Project links point to `projects/<name>.html`
- `mailto:hi@evy.li` uses `rel="me"` for identity verification
- Bluesky profile link: `https://bsky.app/profile/evy.li`

### Development Page (`development.html`)
- Lists feature projects in development as separate `<p>` blocks (title _ genre _ logline)
- Ends with a contact line linking `hi@evy.li`

### Note: No JS, no modal, no carousel
- The current site has **no JavaScript at all**. Previously used features — Splide carousel, modal dialogs (`js/app.js`), local fonts folder, and the N—Z video deck — have all been **removed**. Do not reintroduce them.

---

## Deployment (Cloudflare Pages)

There is a **build script** at `copilot/cloudflare-pages.sh`. It copies all files (including dotfiles like `CNAME`, `.well-known/`) into `_site/`, then removes `copilot/` from the output.

The build command is configured in the Cloudflare Pages dashboard. If you need the equivalent inline command, it is:

| Setting | Value |
|---------|-------|
| **Build command** | run `copilot/cloudflare-pages.sh`, or inline: `mkdir -p _site && cp -r * .[^.]* _site/ 2>/dev/null; rm -rf _site/copilot` |
| **Build output directory** | `_site` |
| **Root directory** | (leave blank — use repo root) |

Alternatively, use the dashboard's **exclude path** feature for `copilot/`.

### Required Files for Deployment
The following **must** be deployed:
- `index.html`, `CNAME`, `site.webmanifest`
- `css/`, `images/`, `projects/`, `video/`
- Root-level favicon/PWA PNGs + `favicon.ico`
- `.well-known/` (needed for Bluesky / AT Protocol domain verification — `atproto-did` must be reachable so the bsky link resolves to `evy.li`)

The following **must not** be deployed:
- `copilot/` (agent instructions only)
- `README.md` (optional — fine to deploy, but not needed)

---

## Notes for the AI Agent

1. **New film project:** Clone an existing project page (`projects/boy.html` or `projects/dust.html` if image stills, `projects/left_over.html` if a Vimeo embed), update the `<title>`, the metadata `<p>`, the media `<p>`, and the specs `<p>`. Add stills to a new folder under `images/` and reference with `/images/<folder>/...`.
2. **New project link:** Add it to the film list on `index.html`.
3. **No build tools:** This is a pure static site — no npm, no bundler, no framework. All CSS is hand-written in `css/style.css`.
4. **No JavaScript:** Do not add JS dependencies unless the user explicitly asks.
5. **Vimeo embed:** Use the `.vimeo-embed-container` wrapper with the current Vimeo player URL parameters (autoplay, `title=0`, `portrait=0`, `byline=0`, `color=6a5acd`).
6. **Fonts:** Loaded entirely via the Google Fonts `@import` in `style.css`. The old local `fonts/` folder and its `@font-face` files were removed.
7. **Grid:** Keep the `.parent` / `div1` / `div2` / `div3` grid structure. Text and media always live in `.div3`. `div1` and `div2` are intentionally empty placeholder cells.
8. **Git:** `/copilot/` is tracked in git (NOT in .gitignore) so instructions are shared. It is excluded from Cloudflare Pages deployment via the build command / exclude path.
9. **Bluesky identity:** `rel="me"` on the `mailto` link plus `.well-known/atproto-did` keep the `@evy.li` handle working on Bluesky. If you change the mailto or the DID, update both.
