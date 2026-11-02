// Generates a PLACEHOLDER book of abstracts (assets/docs/QuMIMOS2027-book-of-abstracts.pdf)
// from assets/js/program-data.js. Replace the PDF with the real book of abstracts when ready
// (keep the same file name so the link on program.html keeps working).
//
// Optional helper — needs Node.js and Playwright:
//   npm install playwright && npx playwright install chromium
//   node tools/make-abstracts-pdf.js
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { chromium } = require("playwright");

const root = path.join(__dirname, "..");
const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, "assets/js/program-data.js"), "utf8") +
  "\nthis.PROGRAM = PROGRAM; this.POSTERS = typeof POSTERS !== 'undefined' ? POSTERS : {items: []};", ctx);
const { PROGRAM, POSTERS } = ctx;

const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const groups = { invited: [], contributed: [], short: [] };
PROGRAM.forEach((d) => d.slots.forEach((s) => { if (groups[s.type]) groups[s.type].push(Object.assign({ day: d.day }, s)); }));

const entry = (who, title, meta) => `
  <article>
    <h3>${esc(title)}</h3>
    <p class="who">${esc(who)}</p>
    <p class="meta">${esc(meta)}</p>
    <p class="text">Abstract text to be added.</p>
  </article>`;

const section = (name, list) => list.length ? `<section><h2>${name}</h2>${list.join("")}</section>` : "";

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  @page { size: A4; margin: 20mm 18mm; }
  body { margin: 0; font-family: Georgia, "Times New Roman", serif; color: #16202e; font-size: 10.5pt; line-height: 1.45; }
  .cover { height: 250mm; display: flex; flex-direction: column; justify-content: center; text-align: center; page-break-after: always; }
  .cover h1 { font-size: 34pt; color: #1b3a63; margin: 0 0 6mm; }
  .cover .sub { font-size: 14pt; margin: 0 0 4mm; }
  .cover .when { font-family: Helvetica, Arial, sans-serif; color: #c8553d; font-size: 11pt; margin: 0; }
  .cover .kind { font-family: Helvetica, Arial, sans-serif; letter-spacing: .2em; text-transform: uppercase; color: #4a5566; margin-top: 14mm; font-size: 11pt; }
  h2 { font-size: 17pt; color: #1b3a63; border-bottom: 2px solid #1b3a63; padding-bottom: 2mm; margin: 0 0 6mm; page-break-before: always; }
  article { margin: 0 0 7mm; page-break-inside: avoid; }
  article h3 { font-size: 12pt; margin: 0 0 1mm; }
  .who { font-family: Helvetica, Arial, sans-serif; font-weight: 600; margin: 0; }
  .meta { font-family: Helvetica, Arial, sans-serif; color: #7a8494; font-size: 9pt; margin: 0 0 2mm; }
  .text { margin: 0; color: #4a5566; font-style: italic; }
</style></head><body>
<div class="cover">
  <h1>QuMIMOS 2027</h1>
  <p class="sub">Workshop on Quantum Metrology in Many-body and Open Systems</p>
  <p class="when">Sala Josep Vendrell, Facultat de Ciències, UAB · April 12–16, 2027</p>
  <p class="kind">Book of abstracts</p>
</div>
${section("Invited talks", groups.invited.map((s) => entry(s.speaker, s.title, s.day + " · " + s.time)))}
${section("Contributed talks", groups.contributed.map((s) => entry(s.speaker, s.title, s.day + " · " + s.time)))}
${section("Short contributions", groups.short.map((s) => entry(s.speaker, s.title, s.day + " · " + s.time)))}
${section("Posters", (POSTERS.items || []).map((p) => entry(p.author, p.title, p.code + (POSTERS.subtitle ? " · " + POSTERS.subtitle : ""))))}
</body></html>`;

(async () => {
  const out = path.join(root, "assets/docs/QuMIMOS2027-book-of-abstracts.pdf");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "load" });
  await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true,
    displayHeaderFooter: true, headerTemplate: "<span></span>",
    footerTemplate: '<div style="width:100%;text-align:center;font-size:8pt;color:#7a8494;font-family:Helvetica,Arial,sans-serif"><span class="pageNumber"></span></div>' });
  await browser.close();
  console.log("Wrote", out);
})();
