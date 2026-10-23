const countEl = document.querySelector("#count");
const noteInput = document.querySelector("#note");
const savedNote = document.querySelector("#saved-note");
const themeToggle = document.querySelector("#theme-toggle");

let count = Number(localStorage.getItem("count") || 0);

function renderCount() {
  countEl.textContent = String(count);
  localStorage.setItem("count", String(count));
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

function changeCount(delta) {
  count += delta;
  renderCount();
}

function resetCount() {
  count = 0;
  renderCount();
}

function isTyping() {
  const active = document.activeElement;
  if (!active) {
    return false;
  }
  return active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.isContentEditable;
}

document.querySelector("#increment").addEventListener("click", () => {
  changeCount(1);
});

document.querySelector("#decrement").addEventListener("click", () => {
  changeCount(-1);
});

document.querySelector("#reset").addEventListener("click", resetCount);

document.addEventListener("keydown", (event) => {
  if (isTyping() || event.metaKey || event.ctrlKey || event.altKey) {
    return;
  }
  if (event.key === "+" || event.key === "=") {
    event.preventDefault();
    changeCount(1);
  } else if (event.key === "-" || event.key === "_") {
    event.preventDefault();
    changeCount(-1);
  } else if (event.key === "0") {
    event.preventDefault();
    resetCount();
  }
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
