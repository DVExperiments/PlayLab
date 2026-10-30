# Futures PlayLab: build brief

Share this file at the start of every build session, along with the name of the tool to build. It describes how the site works so each new tool fits in without changing anything else.

## The project

The Futures PlayLab is a set of browser-based learning tools for academyEX's Master of Technological Futures (MTF). Students are mid-career professionals, mostly aged 30 to 50, studying alongside work and family. They are curious but not necessarily technical. Tools cover futures thinking, design thinking and digital literacy.

- Repository: https://github.com/DVExperiments/PlayLab
- Live site: https://dvexperiments.github.io/PlayLab/
- Hosting: GitHub Pages (static files only, no server, no database)

## What a session should produce

One tool per session: a single `index.html` in `<category>/<tool-id>/`, built from `templates/tool/index.html`, plus the one-line status change in `assets/js/tools.js`. Do not edit `playlab.css` or `playlab.js` during a tool build. If a tool needs a shared change, note it and handle it in a separate session.

## Rules every tool follows

**Privacy.** Nothing a student types leaves the browser. No analytics, no tracking, no calls to AI or other APIs. Save progress with `PlayLab.store`.

**Self-contained.** All tool-specific CSS goes in the page's `<style>` block and all logic in its final `<script>`. External libraries only when really needed, loaded from cdnjs.cloudflare.com at a pinned version.

**Time-boxed.** Each tool should be usable in its listed time (5 to 20 minutes). Fewer, clearer steps beat more features.

**Leaves something behind.** Every tool offers at least: download an image, save a copy, open a copy, print or save as PDF, and start over. Most end with two or three reflection questions.

**Brings their context.** Prompts invite students to apply the tool to their own organisation, sector or project, and examples should feel at home in Aotearoa New Zealand.

**Accessible.** Works with a keyboard alone, has visible focus, labels on every input, sufficient contrast in light and dark themes, and works on a phone. Drag-and-drop always has a non-drag alternative (buttons or menus).

**Writing.** New Zealand English (organisation, colour, prioritise). Sentence case for headings and buttons. Buttons say exactly what they do ("Download image", not "Submit"). Plain, warm language, no jargon without explanation. Use curly apostrophes and quotes (’ “ ”) in visible text.

## Page anatomy (from the template)

1. `<body class="cat-<category>" data-tool="<tool-id>">`
2. **Intro** (`.tool-intro`): filled automatically from `tools.js` using `data-pl` attributes
3. **How it works** (`.tool-steps`): a short numbered list
4. **Workspace** (`#workspace`, usually `.panel`): the tool itself
5. **Save and export bar** (`.tool-actions`)
6. **Reflect** (`.reflect`): textareas with `data-reflect` keys, saved with the tool's state
7. Shared scripts, then the tool's own script

The header, menu and footer are added by `playlab.js`. Pages don't include them.

## Design system

Defined as CSS variables in `assets/css/playlab.css`; always use the variables, never raw colours.

- Surfaces and text: `--bg`, `--surface`, `--surface-2`, `--ink`, `--ink-soft`, `--line`
- Category colours: `--futures` (violet), `--design` (teal), `--literacy` (amber), each with a `-tint`
- Within a tool, use `--accent` and `--accent-tint`; they follow the tool's category automatically
- `--on-accent` for text on an accent background; `--danger` for destructive actions
- Fonts: `--font-display` (Bricolage Grotesque, headings) and `--font-body` (Atkinson Hyperlegible, chosen for readability)
- Radii: `--radius-sm`, `--radius-md`, `--radius-lg`; text width: `--measure`
- Light and dark themes are both required; using the variables handles this

Ready-made classes: `.btn`, `.btn--primary`, `.btn--quiet`, `.btn--danger`, `.btn--small`, `.panel`, `.item-list`, `.item`, `.empty`, `.hint`, `.inline-form__row`, `.visually-hidden`, `.no-print` (hidden when printing).

## Shared JavaScript (from `playlab.js`)

```js
const store = PlayLab.store("tool-id");
store.get("state", fallback);     // read saved data (returns fallback if none)
store.set("state", value);        // save any JSON-friendly value
store.clear();                    // remove everything for this tool

PlayLab.toast("Image downloaded");                          // short confirmation

PlayLab.export.filename("tool-id", "png");                  // "tool-id-2026-10-30.png"
PlayLab.export.elementToPNG(element, filename);             // any HTML element → PNG (Promise)
PlayLab.export.svgToPNG(svgElement, filename);              // an SVG drawing → PNG (Promise)
PlayLab.export.saveFile("tool-id", state);                  // downloads a reopenable save file
PlayLab.export.openSaveFile("tool-id").then(data => ...);   // reopens one (rejects "cancelled" if closed)
PlayLab.export.markdown(filename, text);                    // download text or Markdown
PlayLab.export.print();                                     // print or save as PDF

PlayLab.url("futures/futures-wheel/");   // full link to any page on the site
PlayLab.tool("tool-id");                 // the tool's registry entry
PlayLab.escape(text);                    // make text safe for innerHTML
```

Store each tool's data as one `state` object, so saving, opening a copy and starting over all work on the same thing. Use `textContent` (or `PlayLab.escape`) for anything a student typed.

## Checklist before launching a tool

- Works with keyboard only, and on a phone-sized screen
- Looks right in light and dark themes
- Progress survives a page reload; Start over clears it
- Download image, save a copy, open a copy and print all work
- Copy reads well for a busy professional, in NZ English
- Status set to `"live"` in `assets/js/tools.js`

## Build progress

| Stage | Contents | Status |
|---|---|---|
| 1 | Foundation: shared styles and scripts, home, about, template | Done |
| 2 | Pilots: What Your Browser Knows, Futures Wheel | Done |
| 3 | Review pilots and adjust the foundation | Next |
| 4A | Signal Collider, How Might We Reframer, Futures Cone Sorter | |
| 4B | Assumption Mapper, Three Horizons Mapper, Backcasting Timeline, Pre-mortem | |
| 4C | Feed Algorithm Sandbox, Stakeholder Ecosystem Map | |
| 4D | Train a Biased Classifier, AI Output Critique Lab, Data Sovereignty Explorer (content prepared first; the Data Sovereignty Explorer developed with Māori advisors) | |
| 5 | Polish: accessibility check, facilitator notes, consistency pass | |

Update this table as tools go live.
