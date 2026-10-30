# Futures PlayLab

Hands-on digital tools for students in the Master of Technological Futures at [academyEX](https://academyex.com/), covering futures thinking, design thinking and digital literacy.

Live site: **https://dvexperiments.github.io/PlayLab/**

## How the site is organised

```
PlayLab/
├── index.html               Home page (the tool list is generated from tools.js)
├── about/index.html         About the PlayLab
├── assets/
│   ├── css/playlab.css      All shared styles, colours and fonts
│   ├── js/tools.js          The list of tools: edit this to add or launch a tool
│   ├── js/playlab.js        Shared header, menu, footer, saving and exporting
│   └── img/favicon.svg
├── templates/tool/          Copy this folder to start a new tool
├── futures/                 Futures thinking tools (one folder each)
├── design/                  Design thinking tools
├── literacy/                Digital literacy tools
├── BUILD-BRIEF.md           Conventions for building tools (share this when building with Claude)
└── .nojekyll                Tells GitHub Pages to serve files as they are
```

Each tool is a single `index.html` in its own folder, so a problem in one tool never affects the others.

## Publishing on GitHub Pages

1. Upload all of these files to the root of the `DVExperiments/PlayLab` repository (include the hidden `.nojekyll` file).
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. After a minute or two the site appears at https://dvexperiments.github.io/PlayLab/.

Every change pushed to `main` republishes the site automatically.

## Adding a new tool

1. Copy `templates/tool/` into the right category folder and rename it to the tool's id, for example `futures/futures-wheel/`.
2. In the new `index.html`, set `data-tool="futures-wheel"` on `<body>` and `TOOL_ID = "futures-wheel"` in the script.
3. Build the tool (see `BUILD-BRIEF.md`).
4. In `assets/js/tools.js`, change the tool's `status` from `"planned"` to `"live"`.

The home page and menu update themselves from `tools.js`.

## Previewing on your own computer

Open a terminal in the project folder and run:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000. (Opening the HTML files directly by double-clicking works for most things, but a local server is more reliable.)

## Changing the look

All colours, fonts and spacing live at the top of `assets/css/playlab.css` as variables. To use official academyEX brand colours, change the values there and every page follows.

## Privacy

The tools run entirely in the browser. Nothing students type is sent anywhere; progress is saved in the browser's local storage, and students can download copies of their work.
