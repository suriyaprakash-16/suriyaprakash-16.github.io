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
  function rich(t) {
    var f = document.createDocumentFragment();
    String(t).split("**").forEach(function (p, i) {
      if (!p) { return; }
      f.appendChild(i % 2 ? h("strong", { text: p }) : document.createTextNode(p));
    });
    return f;
  }
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

  /* ---------- hero: DNA double helix, one numbered rung per piece of evidence ---------- */
  (function plot() {
    var ev = S.evidence || [];
    var box = $("plot"), list = $("evidence");
    clear(box); clear(list);
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var W = 600, H = 420, L = 44, R = 556, cy = 196, amp = 96, K = 2 * Math.PI / 210, step = 24;
    var svg = s("svg", { viewBox: "0 0 " + W + " " + H, role: "img", "aria-label": "Animated DNA double helix with numbered points of evidence" });
    var glow = s("g", { class: "glow" });
    var rungsG = s("g"), beadsG = s("g"), nodesG = s("g");
    var pathB = s("path", { class: "strand b" }), pathA = s("path", { class: "strand a" });
    glow.appendChild(rungsG); glow.appendChild(pathB); glow.appendChild(pathA); glow.appendChild(beadsG);
    svg.appendChild(glow); svg.appendChild(nodesG);
    var t1 = s("text", { class: "hlabel", x: L, y: H - 16 }); t1.textContent = "2024";
    var t2 = s("text", { class: "hlabel", x: R, y: H - 16, "text-anchor": "end" }); t2.textContent = "now";
    svg.appendChild(t1); svg.appendChild(t2);

    var count = Math.floor((R - L) / step), rungs = [];
    for (var i = 0; i < count; i++) {
      var x = L + step / 2 + i * step;
      var line = s("line", { class: "rung" });
      var ba = s("circle", { class: "bead a" }), bb = s("circle", { class: "bead b" });
      rungsG.appendChild(line); beadsG.appendChild(ba); beadsG.appendChild(bb);
      rungs.push({ x: x, line: line, a: ba, b: bb });
    }
    /* evidence points sit on evenly spaced rungs */
    var n = ev.length, nodes = [], used = {};
    ev.forEach(function (item, i) {
      var f = n > 1 ? i / (n - 1) : 0;
      var idx = Math.round(2 + f * (count - 5));
      while (used[idx]) { idx++; }
      used[idx] = true;
      var g = s("g", { class: "hn" + (item.flag ? " flag" : "") });
      if (item.flag) { g.appendChild(s("circle", { class: "ring", cx: rungs[idx].x, cy: cy, r: 15 })); }
      g.appendChild(s("circle", { cx: rungs[idx].x, cy: cy, r: 15 }));
      var t = s("text", { x: rungs[idx].x, y: cy }); t.textContent = String(i + 1);
      g.appendChild(t); nodesG.appendChild(g);
      nodes.push({ x: rungs[idx].x, g: g, on: false });
      list.appendChild(h("li", { class: item.flag ? "flag" : "", text: item.label }));
    });
    box.appendChild(svg);

    var phase = 0.7, start = 0, raf = 0, running = false;
    function frame(xmax) {
      var d1 = "", d2 = "";
      for (var x = L; x <= xmax; x += 5) {
        var th = K * x + phase, y = amp * Math.sin(th);
        d1 += (d1 ? "L" : "M") + x.toFixed(1) + " " + (cy + y).toFixed(1);
        d2 += (d2 ? "L" : "M") + x.toFixed(1) + " " + (cy - y).toFixed(1);
      }
      pathA.setAttribute("d", d1); pathB.setAttribute("d", d2);
      rungs.forEach(function (r) {
        var show = r.x <= xmax;
        r.line.style.display = r.a.style.display = r.b.style.display = show ? "" : "none";
        if (!show) { return; }
        var th = K * r.x + phase, y = amp * Math.sin(th), c = Math.cos(th);
        r.line.setAttribute("x1", r.x); r.line.setAttribute("x2", r.x);
        r.line.setAttribute("y1", (cy + y).toFixed(1)); r.line.setAttribute("y2", (cy - y).toFixed(1));
        r.line.style.opacity = (0.3 + 0.5 * Math.abs(c)).toFixed(2);
        r.a.setAttribute("cx", r.x); r.a.setAttribute("cy", (cy + y).toFixed(1)); r.a.setAttribute("r", (3.6 + 1.8 * c).toFixed(1));
        r.b.setAttribute("cx", r.x); r.b.setAttribute("cy", (cy - y).toFixed(1)); r.b.setAttribute("r", (3.6 - 1.8 * c).toFixed(1));
      });
      nodes.forEach(function (nd) { if (!nd.on && nd.x <= xmax) { nd.on = true; nd.g.classList.add("on"); } });
    }
    function loop(now) {
      if (!running) { return; }
      if (!start) { start = now; }
      var p = Math.min(1, (now - start) / 2200), e = 1 - Math.pow(1 - p, 3);
      phase += 0.011;
      frame(L + (R - L) * e);
      raf = requestAnimationFrame(loop);
    }
    function go() { if (!running && !reduce) { running = true; raf = requestAnimationFrame(loop); } }
    function halt() { running = false; cancelAnimationFrame(raf); }
    if (reduce) { frame(R + 1); }
    else if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { if (en[0].isIntersecting && !document.hidden) { go(); } else { halt(); } }).observe(box);
      document.addEventListener("visibilitychange", function () { if (document.hidden) { halt(); } });
    } else { go(); }
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
      var box = h("div", { class: "skill-group", "data-tracks": g.tracks || "" }, h("h3", { text: g.group }), ul);
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
        done.appendChild(h("article", { class: "work-item", "data-tracks": w.tracks || "" }, meta,
          h("div", {}, h("h4", { text: w.title }), h("p", {}, rich(w.summary)), tags, link)));
      } else {
        planned.appendChild(h("article", { class: "plan", "data-tracks": w.tracks || "" }, meta, h("h4", { text: w.title }), h("p", {}, rich(w.summary)), tags, link));
      }
    });
  })();

  /* ---------- experience and credentials ---------- */
  (function exp() {
    var tl = $("timeline");
    S.experience.forEach(function (e) {
      tl.appendChild(h("li", {}, h("span", { class: "tl-date", text: e.date }), h("h3", { text: e.role }),
        h("p", { class: "tl-org", text: e.org }), h("p", {}, rich(e.text))));
    });
    var ed = $("education");
    S.education.forEach(function (e) {
      ed.appendChild(h("div", { class: "edu" }, h("span", { class: "edu-year", text: e.date }), h("strong", { text: e.title }),
        h("span", { text: e.org }), e.note ? h("small", { text: e.note }) : null, h("span", { class: "pill", text: "Completed" })));
    });
    var cl = $("certs");
    S.certificates.forEach(function (c) {
      var title = h("strong", {}, c.link ? h("a", { href: safeUrl(c.link), target: "_blank", rel: "noopener", text: c.title }) : c.title);
      if (c.status) { title.appendChild(h("span", { class: "pill", text: c.status })); }
      cl.appendChild(h("li", {}, h("span", { class: "c-date", text: c.date }),
        h("div", {}, title, h("span", { class: "c-by", text: c.issuer }))));
    });
  })();

  /* ---------- my path ---------- */
  (function path() {
    var ol = $("path-list");
    if (!ol || !S.path) { return; }
    var tags = { done: "Done", now: "In progress", goal: "Goal" };
    S.path.forEach(function (st, i) {
      ol.appendChild(h("li", { class: "p-" + st.state, style: "--i:" + i },
        h("div", { class: "p-box" }, h("strong", { text: st.title }), h("span", { text: st.meta }),
          h("em", { text: tags[st.state] || "" }))));
    });
    function show() { ol.classList.add("in"); }
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) { show(); return; }
    var io = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { show(); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(ol);
  })();

  /* ---------- skill map ---------- */
  (function skillMap() {
    var c = $("net"), N = S.network, cap = $("net-cap");
    if (!c || !c.getContext || !N) { return; }
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var labels = { practised: "practised", certified: "certified", coursework: "from coursework", training: "in training", learning: "learning" };
    var status = {};
    S.skills.forEach(function (g) { g.items.forEach(function (it) { status[it.name] = it.status; }); });
    var nodes = [], by = {};
    N.hubs.forEach(function (hb) { var n = { id: hb.id, label: hb.label, hub: true, x: hb.x, y: hb.y, nb: {} }; nodes.push(n); by[hb.id] = n; by[hb.label] = n; });
    N.nodes.forEach(function (d) {
      var n = { id: d.label, label: d.label, parent: by[d.hub], angle: d.angle, status: status[d.skill] || "learning", skill: d.skill, nb: {} };
      nodes.push(n); by[d.label] = n;
    });
    nodes.forEach(function (n) { n.nb[n.id] = 1; if (n.parent) { n.nb[n.parent.id] = 1; n.parent.nb[n.id] = 1; } });
    var edges = [];
    N.links.forEach(function (l) { var a = by[l[0]], b = by[l[1]]; if (a && b) { edges.push([a, b]); a.nb[b.id] = 1; b.nb[a.id] = 1; } });
    var ctx = c.getContext("2d"), W = 0, H = 0, hov = null, raf = 0, on = false, t = 0, P = {}, cache = {}, key = "";
    function colors() {
      var k = document.documentElement.getAttribute("data-theme") || "light";
      if (k !== key) {
        var cs = getComputedStyle(document.documentElement);
        cache = { accent: cs.getPropertyValue("--accent").trim(), flag: cs.getPropertyValue("--flag").trim(), muted: cs.getPropertyValue("--muted").trim(), ink: cs.getPropertyValue("--ink").trim(), surface: cs.getPropertyValue("--surface").trim() };
        key = k;
      }
      return cache;
    }
    function pos(n) {
      var sd = n.hub ? n.x * 9 : n.angle * 5;
      var jx = reduce ? 0 : Math.sin(t / 1800 + sd) * 1.4, jy = reduce ? 0 : Math.cos(t / 2000 + sd * 1.3) * 1.4;
      if (n.hub) { return { x: n.x * W + jx, y: n.y * H + jy }; }
      var pp = pos(n.parent), r = Math.min(W, H) * (W < 480 ? 0.17 : 0.19);
      return { x: pp.x + Math.cos(n.angle) * r + jx, y: pp.y + Math.sin(n.angle) * r + jy };
    }
    function draw() {
      var col = colors();
      ctx.clearRect(0, 0, W, H);
      nodes.forEach(function (n) { P[n.id] = pos(n); });
      function lit(n) { return !hov || hov.nb[n.id]; }
      function line(a, b, strong) {
        ctx.beginPath(); ctx.moveTo(P[a.id].x, P[a.id].y); ctx.lineTo(P[b.id].x, P[b.id].y);
        ctx.globalAlpha = strong ? 0.9 : (hov ? 0.12 : 0.3); ctx.strokeStyle = col.accent; ctx.lineWidth = strong ? 1.8 : 1; ctx.stroke();
      }
      nodes.forEach(function (n) { if (n.parent) { line(n, n.parent, hov && hov.nb[n.id] && hov.nb[n.parent.id]); } });
      edges.forEach(function (e) { line(e[0], e[1], hov && (hov === e[0] || hov === e[1])); });
      nodes.forEach(function (n) {
        var p = P[n.id], r = n.hub ? 12 : 6.5, small = W < 480;
        ctx.globalAlpha = lit(n) ? 1 : 0.25;
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 6.2832);
        if (n.hub) { ctx.fillStyle = col.surface; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = col.accent; ctx.stroke(); }
        else if (n.status === "learning") { ctx.fillStyle = col.surface; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = col.muted; ctx.stroke(); }
        else if (n.status === "training") { ctx.fillStyle = col.flag; ctx.fill(); }
        else if (n.status === "certified") { ctx.fillStyle = col.accent; ctx.fill(); ctx.beginPath(); ctx.arc(p.x, p.y, r + 4, 0, 6.2832); ctx.lineWidth = 1.6; ctx.strokeStyle = col.accent; ctx.stroke(); }
        else { ctx.fillStyle = col.accent; ctx.fill(); }
        ctx.fillStyle = col.ink;
        ctx.font = (n.hub ? "600 " + (small ? 11.5 : 13) : "400 " + (small ? 10 : 11.5)) + "px IBM Plex Sans, system-ui, sans-serif";
        ctx.textAlign = "center"; ctx.textBaseline = "top";
        ctx.fillText(n.label, p.x, p.y + r + (n.status === "certified" ? 7 : 4));
      });
      ctx.globalAlpha = 1;
    }
    function size() {
      var dpr = Math.min(2, window.devicePixelRatio || 1);
      W = c.parentNode.clientWidth; H = W < 480 ? 430 : 400;
      c.width = W * dpr; c.height = H * dpr; c.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); draw();
    }
    function pick(e) {
      var rc = c.getBoundingClientRect(), x = e.clientX - rc.left, y = e.clientY - rc.top, best = null, bd = 28;
      nodes.forEach(function (n) { var p = P[n.id], d = Math.hypot(p.x - x, p.y - y); if (d < bd) { bd = d; best = n; } });
      hov = best;
      if (cap) {
        cap.textContent = best ? (best.hub ? best.label + " group" : best.label + ": " + labels[best.status]) : "Hover or tap a dot to see how I know it. The full list is below.";
      }
      if (reduce) { draw(); }
    }
    c.addEventListener("pointermove", pick); c.addEventListener("pointerdown", pick);
    c.addEventListener("pointerleave", function () { hov = null; if (cap) { cap.textContent = "Hover or tap a dot to see how I know it. The full list is below."; } if (reduce) { draw(); } });
    function loop(now) { if (!on) { return; } t = now; draw(); raf = requestAnimationFrame(loop); }
    function go() { if (!on && !reduce) { on = true; raf = requestAnimationFrame(loop); } }
    function halt() { on = false; cancelAnimationFrame(raf); }
    size(); window.addEventListener("resize", size);
    var tb = $("theme"); if (tb) { tb.addEventListener("click", function () { setTimeout(function () { key = ""; draw(); }, 30); }); }
    if (!reduce && "IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { if (en[0].isIntersecting && !document.hidden) { go(); } else { halt(); } }).observe(c);
      document.addEventListener("visibilitychange", function () { if (document.hidden) { halt(); } });
    } else if (!reduce) { go(); }
  })();

  /* ---------- courses (cards that open a detail window) ---------- */
  (function courses() {
    var grid = $("course-grid"), dlg = $("course-dialog");
    if (!grid || !dlg || !S.courses) { return; }
    var label = { done: "Completed", progress: "In progress", planned: "Planned" };
    function open(c) {
      clear(dlg);
      var tags = h("ul", { class: "tags" });
      (c.tags || []).forEach(function (t) { tags.appendChild(h("li", { text: t })); });
      var close = h("button", { class: "tool", type: "button", text: "Close" });
      close.addEventListener("click", function () { dlg.close(); });
      dlg.appendChild(h("span", { class: "cstatus s-" + c.status, text: label[c.status] }));
      dlg.appendChild(h("h3", { id: "cd-title", class: "cd-title", text: c.title }));
      dlg.appendChild(h("p", { class: "cd-by", text: c.provider + ". " + c.date }));
      dlg.appendChild(h("p", { text: c.summary }));
      dlg.appendChild(h("p", {}, h("strong", { text: "How I am using it. " }), c.use));
      dlg.appendChild(tags);
      dlg.appendChild(h("div", { class: "cd-actions" }, close));
      if (dlg.showModal) { dlg.showModal(); } else { dlg.setAttribute("open", ""); }
    }
    S.courses.forEach(function (c) {
      var b = h("button", { class: "course", type: "button" },
        h("span", { class: "cstatus s-" + c.status, text: label[c.status] }),
        h("strong", { text: c.title }), h("span", { class: "c-by", text: c.provider }), h("span", { class: "c-when", text: c.date }));
      b.addEventListener("click", function () { open(c); });
      grid.appendChild(b);
    });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) { dlg.close(); } });
  })();

  /* ---------- view switch: reorders and highlights for the reader ---------- */
  (function views() {
    var bar = $("views"), V = S.views, lead = $("lead");
    if (!bar || !V) { return; }
    var els = Array.prototype.slice.call(document.querySelectorAll("[data-tracks]"));
    els.forEach(function (el, i) { el.__i = i; });
    var defaultLead = lead ? lead.textContent : "";
    function relevant(el, v) { return v === "all" || (" " + el.getAttribute("data-tracks") + " ").indexOf(" " + v + " ") > -1; }
    function apply(v, report) {
      if (lead) { lead.textContent = (V[v] && V[v].lead) || defaultLead; }
      var parents = [];
      els.forEach(function (el) { if (parents.indexOf(el.parentNode) < 0) { parents.push(el.parentNode); } });
      parents.forEach(function (par) {
        var kids = els.filter(function (el) { return el.parentNode === par; });
        kids.sort(function (a, b) {
          var ra = relevant(a, v) ? 0 : 1, rb = relevant(b, v) ? 0 : 1;
          return ra - rb || a.__i - b.__i;
        });
        kids.forEach(function (k) { par.appendChild(k); });
      });
      els.forEach(function (el) { el.classList.toggle("dim", !relevant(el, v)); });
      Array.prototype.forEach.call(bar.querySelectorAll("button"), function (b) {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-v") === v));
      });
      try { sessionStorage.setItem("view", v); } catch (e) {}
      if (report && window.goatcounter && window.goatcounter.count) {
        window.goatcounter.count({ path: "view-" + v, title: "View: " + V[v].label, event: true });
      }
    }
    Object.keys(V).forEach(function (k) {
      var b = h("button", { class: "chip", type: "button", "data-v": k, "aria-pressed": "false", text: V[k].label });
      b.addEventListener("click", function () { apply(k, true); });
      bar.appendChild(b);
    });
    var start = "all";
    try { var saved = sessionStorage.getItem("view"); if (saved && V[saved]) { start = saved; } } catch (e) {}
    apply(start, false);
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
    var sel = ".block h2,.sub,.prose p,.filters,.roadmap li,.now-list li,.skill-group,.tablist,.work-item,.plan,.timeline li,.edu,.certs li,.course,.net,.big,.mail-row,.links";
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
  /* drifting molecules behind the hero: pauses off screen, static with reduced motion */
  (function () {
    var c = $("bio");
    if (!c || !c.getContext) { return; }
    var ctx = c.getContext("2d"), hero = c.parentNode, W = 0, H = 0, nodes = [], raf = 0, on = false;
    var seed = 11;
    function rnd() { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }
    function size() {
      var dpr = Math.min(2, window.devicePixelRatio || 1);
      W = hero.clientWidth; H = hero.clientHeight;
      c.width = W * dpr; c.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.max(14, Math.min(44, Math.round(W * H / 24000)));
      nodes = [];
      for (var i = 0; i < n; i++) {
        nodes.push({ x: rnd() * W, y: rnd() * H, vx: (rnd() - .5) * .22, vy: (rnd() - .5) * .22, r: 1.6 + rnd() * 1.8 });
      }
    }
    function draw(step) {
      var col = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#0A7F6E";
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = col; ctx.strokeStyle = col; ctx.lineWidth = 1;
      nodes.forEach(function (a) {
        if (step) {
          a.x += a.vx; a.y += a.vy;
          if (a.x < 0 || a.x > W) { a.vx *= -1; }
          if (a.y < 0 || a.y > H) { a.vy *= -1; }
        }
      });
      for (var i = 0; i < nodes.length; i++) {
        for (var j = i + 1; j < nodes.length; j++) {
          var dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) { ctx.globalAlpha = (1 - d / 130) * .5; ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke(); }
        }
      }
      ctx.globalAlpha = .85;
      nodes.forEach(function (a) { ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.2832); ctx.fill(); });
    }
    function loop() { if (!on) { return; } draw(true); raf = requestAnimationFrame(loop); }
    function start() { if (!on && !reduce) { on = true; loop(); } }
    function stop() { on = false; cancelAnimationFrame(raf); }
    size(); draw(false);
    var t; window.addEventListener("resize", function () { clearTimeout(t); t = setTimeout(function () { size(); draw(false); }, 150); });
    var tb = $("theme"); if (tb) { tb.addEventListener("click", function () { setTimeout(function () { draw(false); }, 30); }); }
    if (!reduce && "IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { if (en[0].isIntersecting && !document.hidden) { start(); } else { stop(); } }).observe(hero);
      document.addEventListener("visibilitychange", function () { if (document.hidden) { stop(); } });
    } else if (!reduce) { start(); }
  })();
})();
