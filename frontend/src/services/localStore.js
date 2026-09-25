const prefix = (key) => `careerhub.${key}`;

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(prefix(key));
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(prefix(key), JSON.stringify(value));
}

export function getSavedInternships() {
  return read("savedInternships", []);
}

export function toggleSavedInternship(internship) {
  const current = getSavedInternships();
  const exists = current.some((item) => item.id === internship.id);
  const next = exists
    ? current.filter((item) => item.id !== internship.id)
    : [...current, internship];
  write("savedInternships", next);
  return next;
}

export function isInternshipSaved(id) {
  return getSavedInternships().some((item) => item.id === id);
}

export function getApplicationNotes() {
  return read("applicationNotes", {});
}

export function saveApplicationNote(applicationId, note) {
  const notes = getApplicationNotes();
  notes[applicationId] = note;
  write("applicationNotes", notes);
  return notes;
}

export const DEFAULT_CHECKLIST = [
  { id: "resume", label: "Update resume with latest projects", done: false },
  { id: "linkedin", label: "Review LinkedIn headline and skills", done: false },
  { id: "github", label: "Pin 2–3 GitHub repositories", done: false },
  { id: "cover", label: "Draft a reusable cover-letter outline", done: false },
  { id: "dsa", label: "Practice 5 DSA questions this week", done: false },
  { id: "mock", label: "Do one mock interview with a friend", done: false },
  { id: "apply", label: "Apply to 3 matching internships", done: false },
];

export function getChecklist() {
  const saved = read("checklist", null);
  return saved || DEFAULT_CHECKLIST;
}

export function saveChecklist(items) {
  write("checklist", items);
}
