/* =========================================================
   QuMIMOS 2027 — PROGRAM DATA  (draft timetable; speaker names are placeholders)
   Edit this file to update the program page.

   Slot types:
     "invited"     – invited talk       { time, type, speaker, title }
     "contributed" – contributed talk   { time, type, speaker, title }
     "short"       – short contribution { time, type, speaker, title }
     "tutorial"    – tutorial lecture   { time, type, text }  (or speaker/title)
     "tba"         – talk session to be announced { time, type, text: "TBA" }
     "break"       – coffee / lunch     { time, type, text }
     "event"       – opening, posters, dinner, excursion… { time, type, text, note? }
     "chair"       – session header line { type, text: "Session chair: …" }
   ========================================================= */
/* Set to true to show the full program (days, posters, book of abstracts, participants,
   schedule PDF). While false, the page only shows "Information on the program will be
   published here soon." */
var PROGRAM_PUBLISHED = true;

var PROGRAM = [
  {
    id: "mon", day: "Monday 12th",
    slots: [
      { time: "9:00 – 9:30", type: "event", text: "Registration" },
      { time: "9:30 – 11:00", type: "tutorial", text: "Tutorial" },
      { time: "11:00 – 11:40", type: "break", text: "Coffee break" },
      { time: "11:40 – 13:00", type: "tutorial", text: "Tutorial" },
      { time: "13:00 – 14:30", type: "break", text: "Lunch" },
      { time: "14:30 – 15:30", type: "tba", text: "TBA" },
      { time: "15:30 – 16:10", type: "break", text: "Coffee break" },
      { time: "16:10 – 17:30", type: "tba", text: "TBA" }
    ]
  },
  {
    id: "tue", day: "Tuesday 13th",
    slots: [
      { time: "9:30 – 11:00", type: "tba", text: "TBA" },
      { time: "11:00 – 11:40", type: "break", text: "Coffee break" },
      { time: "11:40 – 13:00", type: "tba", text: "TBA" },
      { time: "13:00 – 14:30", type: "break", text: "Lunch" },
      { time: "14:30 – 15:30", type: "tba", text: "TBA" },
      { time: "15:30 – 16:10", type: "break", text: "Coffee break" },
      { time: "16:10 – 18:00", type: "event", text: "Poster session" }
    ]
  },
  {
    id: "wed", day: "Wednesday 14th",
    slots: [
      { time: "9:30 – 11:00", type: "tba", text: "TBA" },
      { time: "11:00 – 11:40", type: "break", text: "Coffee break" },
      { time: "11:40 – 13:00", type: "tba", text: "TBA" },
      { time: "13:00 – 14:30", type: "break", text: "Lunch" },
      { time: "14:30 – 15:30", type: "tba", text: "TBA" },
      { time: "15:30 – 16:10", type: "break", text: "Coffee break" },
      { time: "16:10 – 17:30", type: "tba", text: "TBA" }
    ]
  },
  {
    id: "thu", day: "Thursday 15th",
    slots: [
      { time: "9:30 – 11:00", type: "tba", text: "TBA" },
      { time: "11:00 – 11:40", type: "break", text: "Coffee break" },
      { time: "11:40 – 13:00", type: "tba", text: "TBA" },
      { time: "13:00 – 14:30", type: "break", text: "Lunch" },
      { time: "14:30 – 15:30", type: "tba", text: "TBA" },
      { time: "15:30 – 16:10", type: "break", text: "Coffee break" },
      { time: "16:10 – 17:30", type: "tba", text: "TBA" }
    ]
  },
  {
    id: "fri", day: "Friday 16th",
    slots: [
      { time: "9:30 – 11:00", type: "tba", text: "TBA" },
      { time: "11:00 – 11:40", type: "break", text: "Coffee break" },
      { time: "11:40 – 13:00", type: "tba", text: "TBA" },
      { time: "13:00 – 14:30", type: "break", text: "Lunch" },
      { time: "14:30 – 15:30", type: "tba", text: "TBA" }
    ]
  }
];

/* Poster session. Leave items empty [] to hide the section. */
var POSTERS = {
  subtitle: "Tuesday 13th, 16:10",
  note: "",
  items: [
    // { code: "P1", author: "Name", title: "Poster title" },
  ]
};

/* Participants. Leave empty [] to hide the section. */
var PARTICIPANTS = [
  // { name: "Name", affiliation: "Institution" },
];
