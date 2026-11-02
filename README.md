# QuMIMOS 2027 website

Static website for the 4th edition of QuMIMOS (Quantum Metrology in Many-body and Open Systems),
UAB Facultat de Ciències, Sala Josep Vendrell, 12–16 April 2027.

No build step: open `index.html` in a browser, or serve the folder locally:

```
python3 -m http.server 8000      # then open http://localhost:8000
```

## Structure

```
index.html            Landing page (header image, title, about, dates, organizers, past editions)
venue.html            Venue, address and Google Maps embed (needs internet)
registration.html     Placeholder (empty for now)
contributions.html    Placeholder (empty for now)
program.html          Program: collapsible days, posters and participants (from assets/js/program-data.js)
contact.html          Organizers and contact e-mails
assets/css/style.css  All styling (colours at the top as CSS variables)
assets/js/program-data.js   Program, posters and participants  <-- MOCK-UP DATA, edit this
assets/js/program.js        Renders the program (no need to edit)
assets/js/main.js           Mobile menu
assets/docs/QuMIMOS2027-schedule.pdf  Schedule PDF shown at the end of program.html
assets/docs/QuMIMOS2027-book-of-abstracts.pdf  Book of abstracts (PLACEHOLDER) linked on program.html
tools/make-schedule-pdf.js  Optional: regenerates the schedule PDF from program-data.js
tools/make-abstracts-pdf.js Optional: regenerates the placeholder book of abstracts
assets/img/header.svg       Fallback graphic shown if the header photo can't load
assets/img/logo-qumimos2027.png  Logo (landing-page title, transparent PNG); favicon.png = browser-tab icon
```

## Common edits

- **Publishing the program:** the program page currently shows only "Information on the program
  will be published here soon." Set `var PROGRAM_PUBLISHED = true;` at the top of
  `assets/js/program-data.js` to show the full program, book of abstracts, participants and schedule PDF.
- **Program:** edit `assets/js/program-data.js`. Each slot has `time`, `type`
  (`invited`, `contributed`, `short`, `break`, `event`, `chair`), and `speaker`/`title` or `text`.
  Day headers ("· 9:00–18:00 · 10 talks") are computed automatically.
- **Schedule PDF:** replace `assets/docs/QuMIMOS2027-schedule.pdf` with your own file (same name),
  or regenerate it from `program-data.js` with `node tools/make-schedule-pdf.js`
  (needs Node.js + `npm install playwright && npx playwright install chromium`).
- **Book of abstracts:** replace `assets/docs/QuMIMOS2027-book-of-abstracts.pdf` with the real
  book (same file name) — the link in the "Book of abstracts" box on `program.html` keeps working.
- **Header photo:** the landing-page background currently loads the Barcelona photo from its
  online URL. To keep it inside the project (recommended), save it as `assets/img/header.jpg` —
  it is picked up automatically (see `.hero` in `style.css`).
- **Supporting logos:** UAB, GIQ and CQA logos are in `assets/img/logo-uab.png`, `logo-giq.png`,
  `logo-cqa.png` and listed in the footer of `index.html` (heights in `style.css`, `.logos img`).
- **Participants / posters:** `PARTICIPANTS` and `POSTERS` arrays in `program-data.js`.
- **Colours / fonts:** CSS variables at the top of `assets/css/style.css`.
- **Navigation:** the menu is repeated in each HTML file; update all six if you add a page.
