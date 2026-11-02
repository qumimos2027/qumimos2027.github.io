/* =========================================================
   QuMIMOS 2027 — PROGRAM DATA  (MOCK-UP / DEMO ONLY)
   Edit this file to update the program page.

   Slot types:
     "invited"     – invited talk       { time, type, speaker, title }
     "contributed" – contributed talk   { time, type, speaker, title }
     "short"       – short contribution { time, type, speaker, title }
     "break"       – coffee / lunch     { time, type, text }
     "event"       – opening, posters, dinner, excursion… { time, type, text, note? }
     "chair"       – session header line { type, text: "Session chair: …" }
   ========================================================= */
/* Set to true to show the full program (days, posters, book of abstracts, participants,
   schedule PDF). While false, the page only shows "Information on the program will be
   published here soon." */
var PROGRAM_PUBLISHED = false;

var PROGRAM = [
  {
    id: "mon", day: "Monday 12th",
    slots: [
      { time: "8:30 – 9:00", type: "event", text: "Registration" },
      { time: "9:00 – 9:15", type: "event", text: "Opening" },
      { time: "9:15 – 10:00", type: "invited", speaker: "Name 1", title: "Title 1" },
      { time: "10:00 – 10:25", type: "contributed", speaker: "Name 2", title: "Title 2" },
      { time: "10:25 – 11:00", type: "break", text: "Coffee break" },
      { time: "11:00 – 11:45", type: "invited", speaker: "Name 3", title: "Title 3" },
      { time: "11:45 – 12:10", type: "contributed", speaker: "Name 4", title: "Title 4" },
      { time: "12:10 – 12:25", type: "short", speaker: "Name 5", title: "Title 5" },
      { time: "12:25 – 14:30", type: "break", text: "Lunch" },
      { time: "14:30 – 15:15", type: "invited", speaker: "Name 6", title: "Title 6" },
      { time: "15:15 – 15:40", type: "contributed", speaker: "Name 7", title: "Title 7" },
      { time: "15:40 – 15:55", type: "short", speaker: "Name 8", title: "Title 8" },
      { time: "15:55 – 16:30", type: "break", text: "Coffee break" },
      { time: "16:30 – 17:15", type: "invited", speaker: "Name 9", title: "Title 9" },
      { time: "17:15 – 18:00", type: "event", text: "Discussion session" },
      { time: "18:30", type: "event", text: "Poster session" }
    ]
  },
  {
    id: "tue", day: "Tuesday 13th",
    slots: [
      { time: "9:00 – 9:45", type: "invited", speaker: "Name 10", title: "Title 10" },
      { time: "9:45 – 10:10", type: "contributed", speaker: "Name 11", title: "Title 11" },
      { time: "10:10 – 10:25", type: "short", speaker: "Name 12", title: "Title 12" },
      { time: "10:25 – 11:00", type: "break", text: "Coffee break" },
      { time: "11:00 – 11:45", type: "invited", speaker: "Name 13", title: "Title 13" },
      { time: "11:45 – 12:10", type: "contributed", speaker: "Name 14", title: "Title 14" },
      { time: "12:10 – 12:35", type: "contributed", speaker: "Name 15", title: "Title 15" },
      { time: "12:35 – 14:30", type: "break", text: "Lunch" },
      { time: "14:30 – 15:15", type: "invited", speaker: "Name 16", title: "Title 16" },
      { time: "15:15 – 15:40", type: "contributed", speaker: "Name 17", title: "Title 17" },
      { time: "15:40 – 15:55", type: "short", speaker: "Name 18", title: "Title 18" },
      { time: "15:55 – 16:30", type: "break", text: "Coffee break" },
      { time: "16:30 – 18:00", type: "event", text: "Discussion session" }
    ]
  },
  {
    id: "wed", day: "Wednesday 14th",
    slots: [
      { time: "9:00 – 9:45", type: "invited", speaker: "Name 19", title: "Title 19" },
      { time: "9:45 – 10:10", type: "contributed", speaker: "Name 20", title: "Title 20" },
      { time: "10:10 – 10:25", type: "short", speaker: "Name 21", title: "Title 21" },
      { time: "10:25 – 11:00", type: "break", text: "Coffee break" },
      { time: "11:00 – 11:45", type: "invited", speaker: "Name 22", title: "Title 22" },
      { time: "11:45 – 12:30", type: "invited", speaker: "Name 23", title: "Title 23" },
      { time: "12:30 – 14:00", type: "break", text: "Lunch" },
      { time: "17:30 – 19:30", type: "event", text: "Social activity" },
      { time: "20:00", type: "event", text: "Workshop dinner" }
    ]
  },
  {
    id: "thu", day: "Thursday 15th",
    slots: [
      { time: "9:00 – 9:45", type: "invited", speaker: "Name 24", title: "Title 24" },
      { time: "9:45 – 10:10", type: "contributed", speaker: "Name 25", title: "Title 25" },
      { time: "10:10 – 10:25", type: "short", speaker: "Name 26", title: "Title 26" },
      { time: "10:25 – 11:00", type: "break", text: "Coffee break" },
      { time: "11:00 – 11:45", type: "invited", speaker: "Name 27", title: "Title 27" },
      { time: "11:45 – 12:10", type: "contributed", speaker: "Name 28", title: "Title 28" },
      { time: "12:10 – 12:35", type: "contributed", speaker: "Name 29", title: "Title 29" },
      { time: "12:35 – 14:30", type: "break", text: "Lunch" },
      { time: "14:30 – 15:15", type: "invited", speaker: "Name 30", title: "Title 30" },
      { time: "15:15 – 15:40", type: "contributed", speaker: "Name 31", title: "Title 31" },
      { time: "15:40 – 16:15", type: "break", text: "Coffee break" },
      { time: "16:15 – 17:30", type: "event", text: "Discussion session" }
    ]
  },
  {
    id: "fri", day: "Friday 16th",
    slots: [
      { time: "9:00 – 9:45", type: "invited", speaker: "Name 32", title: "Title 32" },
      { time: "9:45 – 10:10", type: "contributed", speaker: "Name 33", title: "Title 33" },
      { time: "10:10 – 10:25", type: "short", speaker: "Name 34", title: "Title 34" },
      { time: "10:25 – 11:00", type: "break", text: "Coffee break" },
      { time: "11:00 – 11:45", type: "invited", speaker: "Name 35", title: "Title 35" },
      { time: "11:45 – 12:00", type: "event", text: "Closing remarks" }
    ]
  }
];

/* Poster session. Leave items empty [] to hide the section. */
var POSTERS = {
  subtitle: "Monday 12th, 18:30",
  note: "",
  items: [
    { code: "P1", author: "Name 1", title: "Title 1" },
    { code: "P2", author: "Name 2", title: "Title 2" },
    { code: "P3", author: "Name 3", title: "Title 3" },
    { code: "P4", author: "Name 4", title: "Title 4" },
    { code: "P5", author: "Name 5", title: "Title 5" },
    { code: "P6", author: "Name 6", title: "Title 6" },
    { code: "P7", author: "Name 7", title: "Title 7" },
    { code: "P8", author: "Name 8", title: "Title 8" },
    { code: "P9", author: "Name 9", title: "Title 9" },
    { code: "P10", author: "Name 10", title: "Title 10" }
  ]
};

/* Participants. Leave empty [] to hide the section. */
var PARTICIPANTS = [
    { name: "Name 1", affiliation: "Affiliation 1" },
    { name: "Name 2", affiliation: "Affiliation 2" },
    { name: "Name 3", affiliation: "Affiliation 3" },
    { name: "Name 4", affiliation: "Affiliation 4" },
    { name: "Name 5", affiliation: "Affiliation 5" },
    { name: "Name 6", affiliation: "Affiliation 6" },
    { name: "Name 7", affiliation: "Affiliation 7" },
    { name: "Name 8", affiliation: "Affiliation 8" },
    { name: "Name 9", affiliation: "Affiliation 9" },
    { name: "Name 10", affiliation: "Affiliation 10" },
    { name: "Name 11", affiliation: "Affiliation 11" },
    { name: "Name 12", affiliation: "Affiliation 12" },
    { name: "Name 13", affiliation: "Affiliation 13" },
    { name: "Name 14", affiliation: "Affiliation 14" },
    { name: "Name 15", affiliation: "Affiliation 15" },
    { name: "Name 16", affiliation: "Affiliation 16" },
    { name: "Name 17", affiliation: "Affiliation 17" },
    { name: "Name 18", affiliation: "Affiliation 18" },
    { name: "Name 19", affiliation: "Affiliation 19" },
    { name: "Name 20", affiliation: "Affiliation 20" }
];
