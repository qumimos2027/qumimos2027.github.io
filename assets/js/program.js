// Renders PROGRAM, POSTERS and PARTICIPANTS (from program-data.js) into program.html
// Each day / posters / participants is a collapsible <details> block, closed on load.
(function () {
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function startEnd(slots) {
    var timed = slots.filter(function (s) { return s.time; });
    if (!timed.length) return "";
    var first = timed[0].time.split("–")[0].trim();
    var lastT = timed[timed.length - 1].time.split("–");
    var last = (lastT[1] || lastT[0]).trim();
    return first + "–" + last;
  }
  function talkCount(slots) {
    return slots.filter(function (s) {
      return s.type === "invited" || s.type === "contributed" || s.type === "short";
    }).length;
  }
  function block(id, title, meta, inner) {
    return '<details class="day" id="' + esc(id) + '">' +
      '<summary><span class="day-title">' + esc(title) + '</span>' +
      (meta ? '<span class="meta">' + esc(meta) + "</span>" : "") +
      '<span class="chev" aria-hidden="true"></span></summary>' +
      '<div class="day-body">' + inner + "</div></details>";
  }

  var published = typeof PROGRAM_PUBLISHED === "undefined" || PROGRAM_PUBLISHED;
  var content = document.getElementById("program-content");
  var placeholder = document.getElementById("program-placeholder");
  if (content) content.hidden = !published;
  if (placeholder) placeholder.hidden = published;
  if (!published) return;

  var out = document.getElementById("program");
  if (!out || typeof PROGRAM === "undefined") return;
  var html = "";

  PROGRAM.forEach(function (d) {
    var n = talkCount(d.slots), inner = "";
    d.slots.forEach(function (s) {
      if (s.type === "chair") {
        inner += '<div class="session-chair">' + esc(s.text) + "</div>";
        return;
      }
      inner += '<div class="slot ' + esc(s.type) + '"><div class="time">' + esc(s.time) + '</div><div class="body">';
      if (s.speaker) {
        inner += '<span class="speaker">' + esc(s.speaker) + "</span>";
        if (s.title) inner += '<span class="title">' + esc(s.title) + "</span>";
      } else {
        inner += esc(s.text);
        if (s.note) inner += '<span class="note">' + esc(s.note) + "</span>";
      }
      inner += "</div></div>";
    });
    html += block(d.id, d.day, startEnd(d.slots) + (n ? " · " + n + (n === 1 ? " talk" : " talks") : ""), inner);
  });

  if (typeof POSTERS !== "undefined" && POSTERS.items && POSTERS.items.length) {
    var p = "";
    if (POSTERS.note) p += '<p class="muted">' + esc(POSTERS.note) + "</p>";
    p += '<ul class="posters">';
    POSTERS.items.forEach(function (x) {
      p += '<li><span class="code">' + esc(x.code) + '</span><span><span class="who">' + esc(x.author) +
        '</span><span class="what">' + esc(x.title) + "</span></span></li>";
    });
    p += "</ul>";
    html += block("posters", "Posters",
      (POSTERS.subtitle ? POSTERS.subtitle + " · " : "") + POSTERS.items.length + " posters", p);
  }

  if (typeof PARTICIPANTS !== "undefined" && PARTICIPANTS.length) {
    var q = '<ol class="participants">';
    PARTICIPANTS.forEach(function (x) {
      q += '<li><span class="who">' + esc(x.name) + '</span>' +
        (x.affiliation ? '<span class="aff">' + esc(x.affiliation) + "</span>" : "") + "</li>";
    });
    q += "</ol>";
    var pHtml = block("participants", "Participants", PARTICIPANTS.length + " registered", q);
    var pOut = document.getElementById("participants-list");
    if (pOut) pOut.innerHTML = pHtml; else html += pHtml;
  }

  out.innerHTML = html;

  // Expand / collapse all
  function setAll(open) {
    document.querySelectorAll("details.day").forEach(function (d) { d.open = open; });
  }
  var ea = document.getElementById("expand-all"), ca = document.getElementById("collapse-all");
  if (ea) ea.addEventListener("click", function () { setAll(true); });
  if (ca) ca.addEventListener("click", function () { setAll(false); });

  // Open the section named in the URL hash (e.g. program.html#wed)
  if (location.hash) {
    var t = document.getElementById(location.hash.slice(1));
    if (t && t.tagName === "DETAILS") { t.open = true; t.scrollIntoView(); }
  }
})();
