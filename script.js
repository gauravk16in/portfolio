// This script runs on both pages. Relative URLs also work under a subdirectory.
const sharedScriptUrl = document.querySelector('script[src$="/script.js"], script[src="script.js"]').src;
const portfolioRoot = new URL("./", sharedScriptUrl);

document.querySelectorAll("[data-site-name]").forEach((element) => {
  element.textContent = site.name;
});
document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = site.year;
});

const illustration = document.createElement("img");
illustration.alt = ""; // Decorative; the footer's text is available separately.
illustration.className = "skater-art";
illustration.src = new URL(site.illustrationSrc, portfolioRoot).href;
document.querySelector("[data-illustration]").append(illustration);

// Store only the visitor's explicit theme choice. Day is the default.
const themeButtons = document.querySelectorAll("[data-theme-choice]");
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.themeChoice === theme));
  });
}
setTheme(document.documentElement.dataset.theme || "day");
themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const theme = button.dataset.themeChoice;
    setTheme(theme);
    try { localStorage.setItem("notebook-theme", theme); } catch { /* The switch still works without storage. */ }
  });
});

const musicButton = document.querySelector(".music-control");
const musicStatus = document.querySelector("#music-status");
const audio = site.musicSrc ? new Audio(new URL(site.musicSrc, portfolioRoot).href) : null;
let startingAudio = false;
if (audio) {
  audio.id = "notebook-audio";
  audio.hidden = true;
  audio.loop = true;
  audio.preload = "none";
  audio.volume = 0.35;
  document.body.append(audio);
}

function showMusicState(playing) {
  const label = playing ? "Pause music" : "Play music";
  musicButton.setAttribute("aria-label", label);
  musicButton.title = label;
  musicButton.setAttribute("aria-pressed", String(playing));
}

musicButton.addEventListener("click", async () => {
  if (!audio) {
    musicStatus.textContent = "No music has been added yet.";
    return;
  }
  if (startingAudio) return;
  if (!audio.paused) { audio.pause(); musicStatus.textContent = "Music is paused."; return; }
  startingAudio = true;
  try {
    await audio.play();
    musicStatus.textContent = "Music is playing.";
  } catch {
    showMusicState(false);
    musicStatus.textContent = "Music could not be played. You can try again.";
  } finally { startingAudio = false; }
});
if (audio) {
  audio.addEventListener("play", () => showMusicState(true));
  audio.addEventListener("pause", () => showMusicState(false));
  audio.addEventListener("error", () => {
    showMusicState(false);
    musicStatus.textContent = "Music is unavailable right now.";
  });
}

const list = document.querySelector("#logs");
if (list) {
  // Animate the existing footer skater before ordinary page navigation. Modified clicks
  // retain native new-tab behavior. Reduced-motion users navigate immediately.
  const footer = document.querySelector(".site-footer");
  const loadingStatus = document.createElement("span");
  loadingStatus.className = "sr-only";
  loadingStatus.setAttribute("role", "status");
  footer.append(loadingStatus);
  let navigationTimer = null;
  list.addEventListener("click", (event) => {
    const link = event.target.closest(".log-link");
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    event.preventDefault();
    if (navigationTimer !== null) return;
    footer.classList.add("is-loading");
    loadingStatus.textContent = "Opening note…";
    document.querySelector("main").setAttribute("aria-busy", "true");
    navigationTimer = window.setTimeout(() => window.location.assign(link.href), 700);
  });
  window.addEventListener("pageshow", () => {
    window.clearTimeout(navigationTimer);
    navigationTimer = null;
    footer.classList.remove("is-loading");
    loadingStatus.textContent = "";
    document.querySelector("main").removeAttribute("aria-busy");
  });
  document.title = `${site.name} — figuring.0ut()`;
  const newestFirst = [...logs].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  if (!newestFirst.length) {
    const empty = document.createElement("li");
    empty.textContent = "a note will find its way here soon.";
    list.append(empty);
  }
  newestFirst.forEach((log) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.className = "log-link";
    link.href = `log/?id=${encodeURIComponent(log.id)}`;
    const date = document.createElement("time");
    date.className = "log-date";
    date.dateTime = log.publishedAt;
    date.textContent = `${log.date} -`;
    const title = document.createElement("span");
    title.textContent = log.title + " ";
    const arrow = document.createElement("span");
    arrow.className = "arrow";
    arrow.textContent = "→";
    arrow.setAttribute("aria-hidden", "true");
    title.append(arrow);
    link.append(date, title);
    item.append(link);
    list.append(item);
  });
}
