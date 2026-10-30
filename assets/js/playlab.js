/* ==========================================================================
   Futures PlayLab: shared engine
   Loaded on every page, after tools.js. Provides:
     - the site header, menu and footer
     - light/dark theme switching
     - PlayLab.store(toolId)        save progress in this browser
     - PlayLab.export.*             download images, files and save files
     - PlayLab.toast(message)       short confirmation messages
   Tools should not need to edit this file.
   ========================================================================== */

(function () {
  "use strict";

  var script = document.currentScript;
  // This file lives in assets/js/, so the site root is two folders up.
  var ROOT = new URL("../../", script.src);
  var REG = window.PLAYLAB_TOOLS || { categories: [], tools: [] };
  var PL = (window.PlayLab = window.PlayLab || {});

  PL.root = ROOT.href;
  PL.url = function (path) { return new URL(path || "", ROOT).href; };
  PL.registry = REG;
  PL.tool = function (id) { return REG.tools.find(function (t) { return t.id === id; }) || null; };
  PL.category = function (id) { return REG.categories.find(function (c) { return c.id === id; }) || null; };

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  PL.escape = esc;

  /* ------------------------------------------------------------------
     Icons
     ------------------------------------------------------------------ */
  var ICON = {
    mark: '<svg class="pl-brand__mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M3 16 L29 3 Q31 16 29 29 Z" fill="currentColor" opacity=".22"/><path d="M3 16 L29 9 Q30 16 29 23 Z" fill="currentColor" opacity=".45"/><path d="M3 16 L29 13.5 Q29.6 16 29 18.5 Z" fill="currentColor"/><circle cx="3.5" cy="16" r="2.5" fill="currentColor"/></svg>',
    chevron: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 6l4.5 4.5L12.5 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    sun: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    moon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>'
  };

  /* ------------------------------------------------------------------
     Theme
     ------------------------------------------------------------------ */
  var THEME_KEY = "playlab:theme";
  function currentTheme() {
    var t = document.documentElement.dataset.theme;
    if (t === "light" || t === "dark") return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function setTheme(t) {
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem(THEME_KEY, t); } catch (e) { /* storage unavailable */ }
    updateThemeButton();
  }
  function updateThemeButton() {
    var btn = document.querySelector(".pl-theme-btn");
    if (!btn) return;
    var next = currentTheme() === "dark" ? "light" : "dark";
    btn.innerHTML = (next === "dark" ? ICON.moon : ICON.sun) +
      '<span class="pl-theme-btn__text">' + (next === "dark" ? "Dark theme" : "Light theme") + "</span>";
    btn.setAttribute("aria-label", "Switch to " + next + " theme");
    var text = btn.querySelector(".pl-theme-btn__text");
    if (window.matchMedia("(min-width: 881px)").matches) text.className = "visually-hidden";
  }

  /* ------------------------------------------------------------------
     Header and navigation
     ------------------------------------------------------------------ */
  function buildHeader() {
    var here = location.href.split("#")[0];
    var aboutHref = PL.url("about/");

    var catItems = REG.categories.map(function (c) {
      var tools = REG.tools.filter(function (t) { return t.category === c.id; });
      var items = tools.map(function (t) {
        var href = PL.url(t.path);
        if (t.status === "live") {
          var cur = here.indexOf(href) === 0 ? ' aria-current="page"' : "";
          return '<li><a href="' + href + '"' + cur + ">" + esc(t.name) + "</a></li>";
        }
        return '<li><span class="pl-nav__planned">' + esc(t.name) + "<small>Coming soon</small></span></li>";
      }).join("");

      return '<li class="pl-nav__item cat-' + c.id + '">' +
        '<button class="pl-nav__toggle" type="button" aria-expanded="false" aria-controls="pl-sub-' + c.id + '">' +
        esc(c.name) + ICON.chevron + "</button>" +
        '<ul class="pl-nav__sub" id="pl-sub-' + c.id + '" hidden>' +
        '<li class="pl-nav__subhead"><a href="' + PL.url("#" + c.id) + '">All ' + esc(c.name.toLowerCase()) + " tools</a></li>" +
        items + "</ul></li>";
    }).join("");

    var aboutCur = here.indexOf(aboutHref) === 0 ? ' aria-current="page"' : "";

    var html =
      '<a class="skip-link" href="#main">Skip to content</a>' +
      '<header class="pl-header"><div class="pl-header__inner">' +
      '<a class="pl-brand" href="' + PL.root + '">' + ICON.mark +
      '<span class="pl-brand__name">Futures PlayLab</span><span class="pl-brand__org">academyEX</span></a>' +
      '<button class="pl-icon-btn pl-menu-btn" type="button" aria-expanded="false" aria-controls="pl-nav">Menu</button>' +
      '<nav class="pl-nav" id="pl-nav" aria-label="Main">' +
      '<ul class="pl-nav__list">' + catItems +
      '<li><a class="pl-nav__link" href="' + aboutHref + '"' + aboutCur + ">About</a></li></ul>" +
      '<button class="pl-icon-btn pl-theme-btn" type="button"></button>' +
      "</nav></div></header>";

    document.body.insertAdjacentHTML("afterbegin", html);
    updateThemeButton();
    wireNav();
  }

  function wireNav() {
    var nav = document.getElementById("pl-nav");
    var menuBtn = document.querySelector(".pl-menu-btn");
    var toggles = Array.prototype.slice.call(nav.querySelectorAll(".pl-nav__toggle"));

    function closeAll(except) {
      toggles.forEach(function (b) {
        if (b === except) return;
        b.setAttribute("aria-expanded", "false");
        document.getElementById(b.getAttribute("aria-controls")).hidden = true;
      });
    }

    toggles.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") === "true";
        closeAll(btn);
        btn.setAttribute("aria-expanded", String(!open));
        document.getElementById(btn.getAttribute("aria-controls")).hidden = open;
      });
    });

    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.textContent = open ? "Close" : "Menu";
    });

    // Close menus when clicking elsewhere or pressing Escape
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".pl-nav__item")) closeAll();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      var openBtn = toggles.find(function (b) { return b.getAttribute("aria-expanded") === "true"; });
      closeAll();
      if (openBtn) openBtn.focus();
    });
    // Close the mobile menu after following an in-page link
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "Menu";
        closeAll();
      }
    });

    document.querySelector(".pl-theme-btn").addEventListener("click", function () {
      setTheme(currentTheme() === "dark" ? "light" : "dark");
    });
    window.matchMedia("(min-width: 881px)").addEventListener("change", updateThemeButton);
  }

  /* ------------------------------------------------------------------
     Footer
     ------------------------------------------------------------------ */
  function buildFooter() {
    var html =
      '<footer class="pl-footer"><div class="pl-footer__inner">' +
      "<p><strong>Futures PlayLab</strong> is a space for hands-on experimentation with emerging technologies, " +
      'developed alongside the <a href="https://academyex.com/courses/master/master-of-technological-futures">Master of Technological Futures</a> ' +
      'at <a href="https://academyex.com/">academyEX</a>.</p>' +
      "<p>Anything you type into these tools is saved only in this browser. Nothing is sent anywhere.</p>" +
      '<nav aria-label="Footer"><a href="' + PL.root + '">All tools</a><a href="' + PL.url("about/") + '">About the PlayLab</a>' +
      '<a href="https://github.com/DVExperiments/PlayLab/issues">Suggest a tool or report a problem</a></nav>' +
      "</div></footer>";
    document.body.insertAdjacentHTML("beforeend", html);
  }

  /* ------------------------------------------------------------------
     Tool pages: fill the intro from the registry
     Elements with data-pl="name|description|minutes|output|category"
     are filled in automatically when <body data-tool="..."> matches a tool.
     ------------------------------------------------------------------ */
  function fillToolInfo() {
    var id = document.body.dataset.tool;
    var t = id && PL.tool(id);
    if (!t) return;
    var c = PL.category(t.category);
    document.body.classList.add("cat-" + t.category);
    var values = {
      name: t.name,
      description: t.description,
      minutes: t.minutes + " minutes",
      output: t.output,
      category: c ? c.name : ""
    };
    document.querySelectorAll("[data-pl]").forEach(function (el) {
      var key = el.dataset.pl;
      if (values[key] != null) el.textContent = values[key];
    });
    var catLink = document.querySelector("[data-pl-category-link]");
    if (catLink && c) catLink.href = PL.url("#" + c.id);
    document.title = t.name + " | Futures PlayLab";
  }

  /* ------------------------------------------------------------------
     Home page: tool directory
     ------------------------------------------------------------------ */
  function renderDirectory() {
    var host = document.getElementById("tool-directory");
    if (!host) return;
    host.innerHTML = REG.categories.map(function (c) {
      var tools = REG.tools.filter(function (t) { return t.category === c.id; });
      return '<section class="dir-section cat-' + c.id + '" id="' + c.id + '" aria-labelledby="h-' + c.id + '">' +
        '<div class="dir-section__head"><h2 id="h-' + c.id + '">' + esc(c.name) + "</h2><p>" + esc(c.description) + "</p></div>" +
        '<ul class="tool-list">' + tools.map(toolRow).join("") + "</ul></section>";
    }).join("");
  }
  function toolRow(t) {
    var live = t.status === "live";
    var title = live ? '<a class="tool-row__link" href="' + PL.url(t.path) + '">' + esc(t.name) + "</a>" : esc(t.name);
    return '<li class="tool-row' + (live ? " is-live" : "") + '">' +
      '<div class="tool-row__main"><h3>' + title + "</h3><p>" + esc(t.description) + "</p></div>" +
      '<dl class="tool-row__meta"><div><dt>Time</dt><dd>' + t.minutes + " min</dd></div>" +
      "<div><dt>You leave with</dt><dd>" + esc(t.output) + "</dd></div></dl>" +
      '<span class="tool-row__status">' + (live ? "Open" : "Coming soon") + "</span></li>";
  }

  /* ------------------------------------------------------------------
     Saving progress: PlayLab.store("tool-id")
       .get(key, fallback)  .set(key, value)  .remove(key)  .clear()
     Values are stored as JSON in this browser only.
     ------------------------------------------------------------------ */
  PL.store = function (toolId) {
    var ns = "playlab:" + toolId + ":";
    return {
      get: function (key, fallback) {
        try {
          var raw = localStorage.getItem(ns + key);
          return raw === null ? fallback : JSON.parse(raw);
        } catch (e) { return fallback; }
      },
      set: function (key, value) {
        try { localStorage.setItem(ns + key, JSON.stringify(value)); return true; }
        catch (e) { return false; }
      },
      remove: function (key) {
        try { localStorage.removeItem(ns + key); } catch (e) { /* ignore */ }
      },
      clear: function () {
        try {
          Object.keys(localStorage)
            .filter(function (k) { return k.indexOf(ns) === 0; })
            .forEach(function (k) { localStorage.removeItem(k); });
        } catch (e) { /* ignore */ }
      }
    };
  };

  /* ------------------------------------------------------------------
     Toast messages: PlayLab.toast("Image downloaded")
     ------------------------------------------------------------------ */
  var toastEl, toastTimer;
  PL.toast = function (message) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "pl-toast";
      toastEl.setAttribute("role", "status");
      toastEl.setAttribute("aria-live", "polite");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = message;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("is-visible"); }, 2800);
  };

  /* ------------------------------------------------------------------
     Exporting: PlayLab.export.*
     ------------------------------------------------------------------ */
  var exp = (PL.export = {});

  // "futures-wheel" -> "futures-wheel-2026-10-30.png"
  exp.filename = function (base, ext) {
    return base + "-" + new Date().toISOString().slice(0, 10) + "." + ext;
  };

  exp.download = function (filename, content, type) {
    var blob = content instanceof Blob ? content : new Blob([content], { type: type || "text/plain;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
  };

  exp.text = function (filename, text) { exp.download(filename, text, "text/plain;charset=utf-8"); };
  exp.markdown = function (filename, text) { exp.download(filename, text, "text/markdown;charset=utf-8"); };

  // Save files: a copy of a student's work they can reopen later or share.
  exp.saveFile = function (toolId, data) {
    var file = { playlab: 1, tool: toolId, savedAt: new Date().toISOString(), data: data };
    exp.download(exp.filename(toolId, "json"), JSON.stringify(file, null, 2), "application/json");
  };

  exp.openSaveFile = function (toolId) {
    return new Promise(function (resolve, reject) {
      var input = document.createElement("input");
      input.type = "file";
      input.accept = "application/json,.json";
      input.addEventListener("change", function () {
        var f = input.files && input.files[0];
        if (!f) return reject(new Error("cancelled"));
        var reader = new FileReader();
        reader.onload = function () {
          var parsed;
          try { parsed = JSON.parse(reader.result); }
          catch (e) { return reject(new Error("That file isn’t a PlayLab save file.")); }
          if (!parsed || parsed.playlab !== 1 || !("data" in parsed)) {
            return reject(new Error("That file isn’t a PlayLab save file."));
          }
          if (parsed.tool !== toolId) {
            var other = PL.tool(parsed.tool);
            return reject(new Error("That save file belongs to " + (other ? other.name : "a different tool") + "."));
          }
          resolve(parsed.data);
        };
        reader.onerror = function () { reject(new Error("The file couldn’t be read. Try choosing it again.")); };
        reader.readAsText(f);
      });
      input.click();
    });
  };

  function surfaceColour() {
    return getComputedStyle(document.documentElement).getPropertyValue("--surface").trim() || "#ffffff";
  }

  function canvasToDownload(canvas, filename) {
    return new Promise(function (resolve, reject) {
      canvas.toBlob(function (blob) {
        if (!blob) return reject(new Error("The image couldn’t be created."));
        exp.download(filename, blob);
        resolve();
      }, "image/png");
    });
  }

  // Export an <svg> element as a PNG. Best for maps and diagrams drawn in SVG.
  var SVG_PROPS = ["fill", "fill-opacity", "stroke", "stroke-width", "stroke-opacity", "stroke-dasharray",
    "stroke-linecap", "stroke-linejoin", "opacity", "font-family", "font-size", "font-weight",
    "text-anchor", "dominant-baseline", "color", "visibility"];

  exp.svgToPNG = function (svg, filename, opts) {
    opts = opts || {};
    var scale = opts.scale || 2;
    var box = svg.getBoundingClientRect();
    var w = Math.round(box.width), h = Math.round(box.height);
    var clone = svg.cloneNode(true);
    var src = [svg].concat(Array.prototype.slice.call(svg.querySelectorAll("*")));
    var dst = [clone].concat(Array.prototype.slice.call(clone.querySelectorAll("*")));
    // Copy computed styles inline so CSS variables survive outside the page
    src.forEach(function (el, i) {
      var cs = getComputedStyle(el);
      SVG_PROPS.forEach(function (p) {
        var v = cs.getPropertyValue(p);
        if (v) dst[i].style.setProperty(p, v);
      });
      dst[i].style.setProperty("animation", "none");
      dst[i].style.setProperty("transition", "none");
    });
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    clone.setAttribute("width", w);
    clone.setAttribute("height", h);
    var xml = new XMLSerializer().serializeToString(clone);
    var url = URL.createObjectURL(new Blob([xml], { type: "image/svg+xml;charset=utf-8" }));

    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = w * scale;
        canvas.height = h * scale;
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = opts.background || surfaceColour();
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        canvasToDownload(canvas, filename).then(resolve, reject);
      };
      img.onerror = function () {
        URL.revokeObjectURL(url);
        reject(new Error("The image couldn’t be created."));
      };
      img.src = url;
    });
  };

  // Export any HTML element as a PNG. Loads html2canvas the first time it's needed.
  var h2cLoading;
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = function () { reject(new Error("The image exporter didn’t load. Check your connection and try again.")); };
      document.head.appendChild(s);
    });
  }
  exp.elementToPNG = function (el, filename, opts) {
    opts = opts || {};
    if (!window.html2canvas) {
      h2cLoading = h2cLoading || loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
    }
    return Promise.resolve(window.html2canvas ? null : h2cLoading).then(function () {
      return window.html2canvas(el, { backgroundColor: opts.background || surfaceColour(), scale: opts.scale || 2 });
    }).then(function (canvas) {
      return canvasToDownload(canvas, filename);
    });
  };

  // Print, or save as PDF from the print dialog.
  exp.print = function () { window.print(); };

  /* ------------------------------------------------------------------
     Start up
     ------------------------------------------------------------------ */
  function init() {
    buildHeader();
    buildFooter();
    fillToolInfo();
    renderDirectory();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
