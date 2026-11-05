// Regenerates assets/docs/QuMIMOS2027-schedule.pdf from assets/js/program-data.js
// Layout: one-page timetable grid — days as columns, a shared time axis on the left,
// each slot spanning the rows of its duration, colour-coded by type, legend at the bottom.
//
// Optional helper — needs Node.js and Playwright:
//   npm install playwright && npx playwright install chromium
//   node tools/make-schedule-pdf.js
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { chromium } = require("playwright");

const root = path.join(__dirname, "..");
const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, "assets/js/program-data.js"), "utf8") +
  "\nthis.PROGRAM = PROGRAM;", ctx);
const PROGRAM = ctx.PROGRAM;

// Slots given as a single time (e.g. "20:00") are drawn with this length in minutes.
const OPEN_ENDED_MIN = 30;

const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const toMin = (t) => { const [h, m] = t.trim().split(":").map(Number); return h * 60 + (m || 0); };
const fmt = (m) => Math.floor(m / 60) + ":" + String(m % 60).padStart(2, "0");

// Parse slots into {start, end, ...}
const days = PROGRAM.map((d) => ({
  day: d.day,
  slots: d.slots.filter((s) => s.time && s.type !== "chair").map((s) => {
    const parts = s.time.split("–");
    const start = toMin(parts[0]);
    const end = parts[1] ? toMin(parts[1]) : start + OPEN_ENDED_MIN;
    return Object.assign({}, s, { start, end, openEnded: !parts[1] });
  }),
}));

// Shared time axis: every start/end across all days becomes a row boundary.
const bounds = [...new Set(days.flatMap((d) => d.slots.flatMap((s) => [s.start, s.end])))].sort((a, b) => a - b);
let rows = [];
for (let i = 0; i < bounds.length - 1; i++) rows.push([bounds[i], bounds[i + 1]]);
// Drop rows in which no day has anything scheduled
rows = rows.filter(([a, b]) => days.some((d) => d.slots.some((s) => s.start < b && s.end > a)));
// Rows that exist only because of an open-ended slot (e.g. "21:00" dinner) show just the start time
const openOnly = ([a, b]) => days.every((d) => d.slots.every((s) => !(s.start < b && s.end > a) || (s.openEnded && s.start === a)));

const label = (s) => {
  if (s.speaker) return `<span class="who">${esc(s.speaker)}</span>`;
  return `<span class="what">${esc(s.text)}</span>`;
};
const typeClass = (s) => ({ invited: "invited", contributed: "contributed", short: "short", tutorial: "tutorial", tba: "tba", break: "break" }[s.type] ||
  (/poster/i.test(s.text || "") ? "poster" : "social"));

let body = "";
const coveredUntil = days.map(() => -1); // last row index already covered by a rowspan, per day
rows.forEach(([a, b], ri) => {
  // Visually separate non-contiguous rows (gaps where nothing is scheduled)
  const gap = ri > 0 && rows[ri - 1][1] !== a;
  body += `<tr${gap ? ' class="gap"' : ""}><th class="time">${openOnly([a, b]) ? fmt(a) : fmt(a) + " – " + fmt(b)}</th>`;
  days.forEach((d, di) => {
    if (coveredUntil[di] >= ri) return;               // inside a rowspan from above
    const s = d.slots.find((x) => x.start < b && x.end > a);
    if (!s) {                                         // merge consecutive empty rows into one blank cell
      let span = 1;
      const busy = (r) => d.slots.some((x) => x.start < r[1] && x.end > r[0]);
      while (ri + span < rows.length && rows[ri + span - 1][1] === rows[ri + span][0] && !busy(rows[ri + span])) span++;
      coveredUntil[di] = ri + span - 1;
      body += `<td class="empty"${span > 1 ? ` rowspan="${span}"` : ""}></td>`;
      return;
    }
    let span = 1;                                     // extend over following contiguous rows
    while (ri + span < rows.length && rows[ri + span - 1][1] === rows[ri + span][0] && rows[ri + span][0] < s.end) span++;
    coveredUntil[di] = ri + span - 1;
    body += `<td class="${typeClass(s)}"${span > 1 ? ` rowspan="${span}"` : ""}>${label(s)}</td>`;
  });
  body += "</tr>";
});

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  @page { size: A4 landscape; margin: 9mm; }
  * { box-sizing: border-box; }
  html, body { height: 100%; }
  body { margin: 0; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; color: #16202e; font-size: 8.6pt; display: flex; flex-direction: column; }
  .top { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #1b3a63; padding-bottom: 4px; margin-bottom: 5px; }
  .top h1 { margin: 0; font-family: Georgia, "Times New Roman", serif; color: #1b3a63; font-size: 18pt; font-weight: 700; }
  .top p { margin: 0; color: #4a5566; font-size: 8.5pt; }
  .legend { display: flex; gap: 16px; margin: 0 0 7px; color: #16202e; font-size: 8pt; }
  .legend span { display: inline-flex; align-items: center; gap: 4px; }
  .legend i { display: inline-block; width: 14px; height: 9px; border-radius: 2px; }
  table { width: 100%; border-collapse: collapse; table-layout: fixed; flex: 1; }
  thead th { background: #1b3a63; color: #fff; font-size: 10pt; font-weight: 700; padding: 5px 4px; border: 1px solid #1b3a63; }
  thead th.time { background: #fff; border-color: #fff; }
  col.timecol { width: 86px; }
  th.time { text-align: right; padding: 0 7px 0 2px; font-weight: 500; color: #4a5566; font-size: 7.6pt; white-space: nowrap; font-variant-numeric: tabular-nums; border: 1px solid #cfd5de; background: #f5f6f8; }
  td { border: 1px solid #cfd5de; text-align: center; vertical-align: middle; padding: 2px 4px; line-height: 1.15; }
  td.empty { background: #fff; }
  tr.gap > * { border-top: 3px double #9aa3b1; }
  .who { font-weight: 600; }
  .what { font-weight: 600; }
  td.invited     { background: #a9c9ef; color: #0f2c52; }
  td.contributed { background: #bfe3c3; color: #18401f; }
  td.short       { background: #f4e7cf; }
  td.tutorial    { background: #f8cf98; color: #5a3304; }
  td.poster      { background: #eab9d6; color: #5b1740; }
  td.tba         { background: #e1e4e9; color: #4a5566; border: 2px solid #fff; font-weight: 600; letter-spacing: .04em; }
  td.invited, td.contributed, td.tutorial, td.poster { border: 2px solid #fff; font-weight: 600; }
  td.break       { background: #fff; color: #4a5566; }
  td.break .what { font-weight: 500; font-style: italic; }
  td.social      { background: #fff; color: #c8553d; }
</style></head><body>
<div class="top"><h1>QuMIMOS 2027 — Schedule</h1><p>Sala Josep Vendrell, Facultat de Ciències, UAB · April 12–16, 2027</p></div>
<div class="legend">
  <span><i style="background:#f8cf98;border:1px solid #d99a3f"></i>Tutorial</span>
  <span><i style="background:#e1e4e9;border:1px solid #9aa3b1"></i>Talks (to be announced)</span>
  <span><i style="background:#eab9d6;border:1px solid #b9568f"></i>Poster session</span>
</div>
<table>
  <colgroup><col class="timecol">${days.map(() => "<col>").join("")}</colgroup>
  <thead><tr><th class="time"></th>${days.map((d) => `<th>${esc(d.day)}</th>`).join("")}</tr></thead>
  <tbody>${body}</tbody>
</table>

</body></html>`;

(async () => {
  const out = path.join(root, "assets/docs/QuMIMOS2027-schedule.pdf");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  if (process.argv.includes("--html")) fs.writeFileSync(out.replace(/\.pdf$/, ".debug.html"), html);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "load" });
  await page.pdf({ path: out, format: "A4", landscape: true, printBackground: true, preferCSSPageSize: true });
  await browser.close();
  console.log("Wrote", out);
})();
