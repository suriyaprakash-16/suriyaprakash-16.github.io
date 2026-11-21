(function () {
  "use strict";
  var S = window.SITE;
  if (!S) { return; }

  /* ---------- helpers (text only, nothing from content.js is inserted as HTML) ---------- */
  function h(tag, props) {
    var node = document.createElement(tag);
    props = props || {};
    Object.keys(props).forEach(function (k) {
      if (k === "text") { node.textContent = props[k]; }
      else if (k === "class") { node.className = props[k]; }
      else { node.setAttribute(k, props[k]); }
    });
    for (var i = 2; i < arguments.length; i++) {
      var kid = arguments[i];
      if (kid == null) { continue; }
      node.appendChild(typeof kid === "string" ? document.createTextNode(kid) : kid);
    }
    return node;
  }
  function $(id) { return document.getElementById(id); }
  function clear(node) { while (node.firstChild) { node.removeChild(node.firstChild); } }
  function safeUrl(u) { return /^(https?:|mailto:|assets\/)/.test(u) ? u : "#"; }
  var SVG = "http://www.w3.org/2000/svg";
  function s(tag, attrs) {
    var n = document.createElementNS(SVG, tag);
    Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    return n;
  }

  /* ---------- contact links and footer ---------- */
  var P = S.person;
  $("mail-link").href = "mailto:" + P.email;
  $("mail-text").href = "mailto:" + P.email;
  $("mail-text").textContent = P.email;
  $("cv-link").href = safeUrl(P.cv);
  $("li-link").href = safeUrl(P.linkedin);
  $("blog-link").href = safeUrl(P.blog);
  $("year").textContent = new Date().getFullYear();
  $("updated").textContent = S.updated;

  /* ---------- theme and menu ---------- */
  var root = document.documentElement;
  var themeBtn = $("theme");
  function syncTheme() {
    var dark = root.getAttribute("data-theme") === "dark";
    themeBtn.textContent = dark ? "Light" : "Dark";
    themeBtn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) { meta.setAttribute("content", dark ? "#07161F" : "#F3F6F7"); }
  }
  themeBtn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    syncTheme();
  });
  syncTheme();

  var menu = $("menu"), nav = $("nav");
  menu.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
    menu.textContent = open ? "Close" : "Menu";
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      nav.classList.remove("open");
      menu.setAttribute("aria-expanded", "false");
      menu.textContent = "Menu";
    }
  });

  $("copy").addEventListener("click", function () {
    var btn = this;
    function done(ok) {
      btn.textContent = ok ? "Copied" : "Press Ctrl+C to copy";
      setTimeout(function () { btn.textContent = "Copy email"; }, 2000);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(P.email).then(function () { done(true); }, function () { done(false); });
    } else { done(false); }
  });

  /* ---------- hero: signal plot ---------- */
  (function plot() {
    var ev = S.evidence || [];
    var box = $("plot"), list = $("evidence");
    clear(box); clear(list);
    var W = 600, H = 420, L = 56, R = 578, T = 24, B = 368;
    var svg = s("svg", { viewBox: "0 0 " + W + " " + H, role: "img", "aria-label": "Chart of evidence building over time" });
    [0.25, 0.5, 0.75].forEach(function (f) {
      svg.appendChild(s("line", { class: "grid", x1: L, x2: R, y1: B - (B - T) * f, y2: B - (B - T) * f }));
    });
    svg.appendChild(s("line", { class: "axis", x1: L, x2: R, y1: B, y2: B }));
    svg.appendChild(s("line", { class: "axis", x1: L, x2: L, y1: T, y2: B }));
    var xl = s("text", { class: "axis-label", x: R, y: B + 28, "text-anchor": "end" }); xl.textContent = "2024 to now";
    var yl = s("text", { class: "axis-label", x: 20, y: (T + B) / 2, "text-anchor": "middle", transform: "rotate(-90 20 " + ((T + B) / 2) + ")" });
    yl.textContent = "Evidence";
    svg.appendChild(xl); svg.appendChild(yl);

    /* background dots: seeded so the picture is the same on every visit */
    var seed = 7;
    function rnd() { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }
    for (var i = 0; i < 64; i++) {
      var x = L + 14 + rnd() * (R - L - 28);
      var y = B - 14 - Math.pow(rnd(), 1.9) * (B - T - 40);
      var c = s("circle", { class: "dot", cx: x.toFixed(1), cy: y.toFixed(1), r: (2.5 + rnd() * 2.5).toFixed(1) });
      c.style.setProperty("--d", (7 + rnd() * 8).toFixed(1) + "s");
      c.style.setProperty("--dl", (-rnd() * 8).toFixed(1) + "s");
      c.style.setProperty("--dx", ((rnd() - .5) * 14).toFixed(1) + "px");
      c.style.setProperty("--dy", ((rnd() - .5) * 14).toFixed(1) + "px");
      c.style.animationDelay = (rnd() * 0.8).toFixed(2) + "s, " + (-rnd() * 8).toFixed(1) + "s";
      svg.appendChild(c);
    }

    /* evidence points climb from lower left to upper right */
    var n = ev.length, pts = [];
    ev.forEach(function (item, i) {
      var f = n > 1 ? i / (n - 1) : 0;
      pts.push({ x: L + 40 + f * (R - L - 90), y: B - 60 - Math.pow(f, 0.85) * (B - T - 120) });
    });
    if (pts.length > 1) {
      var d = "M" + pts.map(function (p) { return p.x.toFixed(1) + " " + p.y.toFixed(1); }).join(" L");
      var len = 0;
      for (var k = 1; k < pts.length; k++) { len += Math.hypot(pts[k].x - pts[k - 1].x, pts[k].y - pts[k - 1].y); }
      var line = s("path", { class: "link-line", d: d });
      line.style.setProperty("--len", String(Math.ceil(len) + 4));
      svg.appendChild(line);
    }
    ev.forEach(function (item, i) {
      var g = s("g", { class: "pt" + (item.flag ? " flag" : "") });
      g.style.setProperty("--pd", (0.9 + i * 0.22).toFixed(2) + "s");
      if (item.flag) { g.appendChild(s("circle", { class: "ring", cx: pts[i].x, cy: pts[i].y, r: 15 })); }
      g.appendChild(s("circle", { cx: pts[i].x, cy: pts[i].y, r: 15 }));
      var t = s("text", { x: pts[i].x, y: pts[i].y }); t.textContent = String(i + 1);
      g.appendChild(t);
      svg.appendChild(g);
      list.appendChild(h("li", { class: item.flag ? "flag" : "", text: item.label }));
    });
    box.appendChild(svg);
  })();

  /* ---------- roadmap and current learning ---------- */
  (function roadmap() {
    var rm = $("roadmap"), now = new Date();
    var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    S.roadmap.forEach(function (m, i) {
      var start = new Date(m.start + "T00:00:00");
      var next = S.roadmap[i + 1] ? new Date(S.roadmap[i + 1].start + "T00:00:00") : new Date(start.getFullYear(), start.getMonth() + 1, 1);
      var state = now >= next ? "done" : now >= start ? "current" : "next";
      var label = state === "done" ? "Done" : state === "current" ? "This month" : "Next";
      rm.appendChild(h("li", { class: state },
        h("span", { class: "rm-month", text: months[start.getMonth()] + " " + start.getFullYear() }),
        h("span", { class: "rm-topic", text: m.topic }),
        h("span", { class: "rm-state", text: label })));
    });
    var nl = $("now-list");
    S.now.forEach(function (n) {
      nl.appendChild(h("li", {}, h("strong", { text: n.title }), h("span", { text: n.detail })));
    });
  })();

  /* ---------- skills with filter ---------- */
  (function skills() {
    var labels = { practised: "Practised", certified: "Certified", coursework: "Coursework", training: "In training", learning: "Learning" };
    var bar = $("filters"), grid = $("skill-grid");
    var groups = [];
    S.skills.forEach(function (g) {
      var ul = h("ul", {}), items = [];
      g.items.forEach(function (it) {
        var li = h("li", { "data-status": it.status }, h("span", { text: it.name }),
          h("span", { class: "badge " + it.status, text: labels[it.status] || it.status }));
        ul.appendChild(li); items.push(li);
      });
      var box = h("div", { class: "skill-group" }, h("h3", { text: g.group }), ul);
      grid.appendChild(box); groups.push({ box: box, items: items });
    });
    var current = "all";
    var kinds = ["all"].concat(Object.keys(labels).filter(function (k) {
      return S.skills.some(function (g) { return g.items.some(function (i) { return i.status === k; }); });
    }));
    function apply() {
      groups.forEach(function (g) {
        var shown = 0;
        g.items.forEach(function (li) {
          var ok = current === "all" || li.getAttribute("data-status") === current;
          li.hidden = !ok;
          if (ok) { shown++; li.classList.remove("show"); void li.offsetWidth; li.classList.add("show"); }
        });
        g.box.classList.toggle("empty", shown === 0);
      });
      Array.prototype.forEach.call(bar.children, function (b) {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-k") === current));
      });
    }
    kinds.forEach(function (k) {
      var b = h("button", { class: "chip", type: "button", "data-k": k, "aria-pressed": "false", text: k === "all" ? "All" : labels[k] });
      b.addEventListener("click", function () { current = k; apply(); });
      bar.appendChild(b);
    });
    apply();
  })();

  /* ---------- work ---------- */
  (function work() {
    var done = $("work-done"), planned = $("work-planned");
    S.work.forEach(function (w) {
      var tags = h("ul", { class: "tags" });
      (w.tags || []).forEach(function (t) { tags.appendChild(h("li", { text: t })); });
      var meta = h("div", { class: "work-meta" }, h("strong", { text: w.kind }), w.period);
      var link = w.link ? h("a", { href: safeUrl(w.link), target: "_blank", rel: "noopener", text: w.linkText || "View" }) : null;
      if (w.state === "done") {
        done.appendChild(h("article", { class: "work-item" }, meta,
          h("div", {}, h("h4", { text: w.title }), h("p", { text: w.summary }), tags, link)));
      } else {
        planned.appendChild(h("article", { class: "plan" }, meta, h("h4", { text: w.title }), h("p", { text: w.summary }), tags, link));
      }
    });
  })();

  /* ---------- experience and credentials ---------- */
  (function exp() {
    var tl = $("timeline");
    S.experience.forEach(function (e) {
      tl.appendChild(h("li", {}, h("span", { class: "tl-date", text: e.date }), h("h3", { text: e.role }),
        h("p", { class: "tl-org", text: e.org }), h("p", { text: e.text })));
    });
    var ed = $("education");
    S.education.forEach(function (e) {
      ed.appendChild(h("div", { class: "edu" }, h("strong", { text: e.title }), h("span", { text: e.org }),
        h("small", { text: e.date + (e.note ? ". " + e.note : "") })));
    });
    var cl = $("certs");
    S.certificates.forEach(function (c) {
      var title = h("strong", {}, c.link ? h("a", { href: safeUrl(c.link), target: "_blank", rel: "noopener", text: c.title }) : c.title);
      if (c.status) { title.appendChild(h("span", { class: "pill", text: c.status })); }
      cl.appendChild(h("li", {}, h("span", { class: "c-date", text: c.date }),
        h("div", {}, title, h("span", { class: "c-by", text: c.issuer }))));
    });
  })();

  /* ---------- highlight the section being read ---------- */
  if ("IntersectionObserver" in window) {
    var links = {};
    Array.prototype.forEach.call(nav.querySelectorAll("a"), function (a) { links[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && links[en.target.id]) {
          Object.keys(links).forEach(function (k) { links[k].classList.remove("active"); });
          links[en.target.id].classList.add("active");
          if (window.__inkTo) { window.__inkTo(links[en.target.id]); }
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(links).forEach(function (id) { var sec = document.getElementById(id); if (sec) { io.observe(sec); } });
  }
})();

/* ---------- motion: tabs, nav indicator, rotating topics, progress bar, scroll reveal ---------- */
(function () {
  "use strict";
  var S = window.SITE || {};
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function $(id) { return document.getElementById(id); }
  function each(list, fn) { Array.prototype.forEach.call(list, fn); }

  /* tabs with a sliding indicator and arrow-key support */
  function tabs(root) {
    var list = root.querySelector('[role="tablist"]');
    var all = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
    var ink = list.querySelector(".tab-ink");
    var current = all[0];
    function place(t) {
      if (!t || !t.offsetWidth) { return; }
      ink.style.width = t.offsetWidth + "px";
      ink.style.transform = "translateX(" + t.offsetLeft + "px)";
    }
    function select(t, focus) {
      current = t;
      all.forEach(function (x) {
        var on = x === t;
        x.setAttribute("aria-selected", String(on));
        x.tabIndex = on ? 0 : -1;
        var p = document.getElementById(x.getAttribute("aria-controls"));
        p.hidden = !on;
        if (on && !reduce) { p.classList.remove("enter"); void p.offsetWidth; p.classList.add("enter"); }
      });
      place(t);
      if (focus) { t.focus(); }
    }
    all.forEach(function (t, i) {
      t.addEventListener("click", function () { select(t); });
      t.addEventListener("keydown", function (e) {
        var n = null;
        if (e.key === "ArrowRight") { n = all[(i + 1) % all.length]; }
        if (e.key === "ArrowLeft") { n = all[(i - 1 + all.length) % all.length]; }
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
    place(current);
    window.addEventListener("resize", function () { place(current); });
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(function () { place(current); }); }
  }
  each(document.querySelectorAll(".tabs"), tabs);

  /* nav indicator follows the section you are in, and the link you point at */
  var nav = $("nav"), ink = $("nav-ink"), activeLink = null;
  function inkTo(a) {
    if (!ink) { return; }
    if (!a || !a.offsetWidth) { ink.style.opacity = "0"; return; }
    ink.style.opacity = "1";
    ink.style.width = a.offsetWidth + "px";
    ink.style.transform = "translateX(" + a.offsetLeft + "px)";
  }
  window.__inkTo = function (a) { activeLink = a; inkTo(a); };
  if (nav && ink) {
    each(nav.querySelectorAll("a"), function (a) {
      a.addEventListener("mouseenter", function () { inkTo(a); });
      a.addEventListener("focus", function () { inkTo(a); });
    });
    nav.addEventListener("mouseleave", function () { inkTo(activeLink); });
    window.addEventListener("resize", function () { inkTo(activeLink); });
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(function () { inkTo(activeLink); }); }
  }

  /* rotating topic line in the hero */
  var rot = $("rotator");
  if (rot && S.roadmap && S.roadmap.length) {
    var topics = S.roadmap.map(function (m) { return m.topic; });
    var now = new Date(), cur = 0;
    S.roadmap.forEach(function (m, i) { if (new Date(m.start + "T00:00:00") <= now) { cur = i; } });
    if (reduce) { rot.textContent = topics[cur]; }
    else {
      var n = cur;
      var show = function () {
        rot.textContent = topics[n % topics.length];
        rot.classList.remove("swap"); void rot.offsetWidth; rot.classList.add("swap");
        n++;
      };
      show();
      setInterval(show, 2600);
    }
  }

  /* reading progress bar */
  var bar = $("progress"), ticking = false;
  function update() {
    var d = document.documentElement, max = d.scrollHeight - d.clientHeight;
    bar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, d.scrollTop / max) : 0) + ")";
    ticking = false;
  }
  if (bar && !reduce) {
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* staggered reveal as sections scroll into view */
  if (!reduce && "IntersectionObserver" in window) {
    document.documentElement.classList.add("js-anim");
    var sel = ".block h2,.sub,.prose p,.filters,.roadmap li,.now-list li,.skill-group,.tablist,.work-item,.plan,.timeline li,.edu,.certs li,.big,.mail-row,.links";
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) { return; }
        var el = en.target;
        io.unobserve(el);
        el.classList.add("in");
        setTimeout(function () { el.classList.remove("reveal", "in"); el.style.removeProperty("--i"); }, 1200);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -5% 0px" });
    each(document.querySelectorAll(sel), function (el) {
      var idx = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.style.setProperty("--i", String(Math.min(idx, 7)));
      el.classList.add("reveal");
      io.observe(el);
    });
  }
})();
