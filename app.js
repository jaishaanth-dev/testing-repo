const countEl = document.querySelector("#count");
const stepInput = document.querySelector("#step");
const historyEl = document.querySelector("#history");
const noteInput = document.querySelector("#note");
const savedNote = document.querySelector("#saved-note");
const themeToggle = document.querySelector("#theme-toggle");

let count = Number(localStorage.getItem("count") || 0);
let history = [];

function renderCount() {
  countEl.textContent = String(count);
  localStorage.setItem("count", String(count));
}

function renderNote() {
  const note = localStorage.getItem("note") || "";
  savedNote.textContent = note ? `Saved: ${note}` : "No note saved yet.";
  noteInput.value = note;
}

function stepSize() {
  const value = Number(stepInput.value);
  if (!Number.isInteger(value) || value < 1) {
    return 1;
  }
  return Math.min(value, 100);
}

function renderHistory() {
  historyEl.textContent = history.length ? `Recent: ${history.join(" → ")}` : "No steps yet.";
}

function changeCount(delta) {
  count += delta;
  history.push(count);
  if (history.length > 5) {
    history.shift();
  }
  renderCount();
  renderHistory();
}

function renderTheme() {
  const dark = localStorage.getItem("theme") === "dark";
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  themeToggle.textContent = dark ? "Light mode" : "Dark mode";
  themeToggle.setAttribute("aria-pressed", String(dark));
}

document.querySelector("#increment").addEventListener("click", () => {
  changeCount(stepSize());
});

document.querySelector("#decrement").addEventListener("click", () => {
  changeCount(-stepSize());
});

document.querySelector("#reset").addEventListener("click", () => {
  count = 0;
  history = [];
  renderCount();
  renderHistory();
});

document.querySelector("#note-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const note = noteInput.value.trim();
  if (note) {
    localStorage.setItem("note", note);
  } else {
    localStorage.removeItem("note");
  }
  renderNote();
});

themeToggle.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", next);
  renderTheme();
});

stepInput.value = localStorage.getItem("step") || "1";
stepInput.addEventListener("change", () => {
  stepInput.value = String(stepSize());
  localStorage.setItem("step", stepInput.value);
});

renderCount();
renderHistory();
renderNote();
renderTheme();
