const countEl = document.querySelector("#count");
const noteInput = document.querySelector("#note");
const savedNote = document.querySelector("#saved-note");
const themeToggle = document.querySelector("#theme-toggle");

let count = Number(localStorage.getItem("count") || 0);

function renderCount() {
  countEl.textContent = String(count);
  localStorage.setItem("count", String(count));
  const span = 10;
  const clamped = Math.max(-span, Math.min(span, count));
  const magnitude = (Math.abs(clamped) / span) * 50;
  const fill = document.querySelector("#level-fill");
  fill.style.width = magnitude + "%";
  fill.style.marginLeft = clamped >= 0 ? "50%" : 50 - magnitude + "%";
  const label = document.querySelector("#level-label");
  if (count === 0) {
    label.textContent = "Level 0";
  } else if (count > 0) {
    label.textContent = "Above zero by " + count;
  } else {
    label.textContent = "Below zero by " + Math.abs(count);
  }
}

function renderNote() {
  const note = localStorage.getItem("note") || "";
  savedNote.textContent = note ? `Saved: ${note}` : "No note saved yet.";
  noteInput.value = note;
}

function renderTheme() {
  const dark = localStorage.getItem("theme") === "dark";
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  themeToggle.textContent = dark ? "Light mode" : "Dark mode";
  themeToggle.setAttribute("aria-pressed", String(dark));
}

document.querySelector("#increment").addEventListener("click", () => {
  count += 1;
  renderCount();
});

document.querySelector("#decrement").addEventListener("click", () => {
  count -= 1;
  renderCount();
});

document.querySelector("#reset").addEventListener("click", () => {
  count = 0;
  renderCount();
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

renderCount();
renderNote();
renderTheme();
