// This script runs on both pages. Relative URLs also work under a subdirectory.
const sharedScriptUrl = document.querySelector('script[src$="/script.js"], script[src="script.js"]').src;
const portfolioRoot = new URL("./", sharedScriptUrl);
// The homepage swaps views via history.pushState, which moves the address bar
// (and therefore the base URL any *relative* href resolves against) between
// "/" and "/log/". Any link left as a relative string would then resolve
// against whichever URL happens to be current, drifting further with every
// round trip (e.g. "old/" -> "/log/old/" -> "/log/log/old/"...). Rewriting
// internal links to absolute URLs, anchored once to the real root, makes
// them immune to that drift no matter how many times the view changes.
function toRoot(path) {
  return new URL(path, portfolioRoot).href;
}
document.querySelectorAll("[data-site-name]").forEach((element) => {
  element.textContent = site.name;
  if (element.tagName === "A") element.href = portfolioRoot.href;
});
document.querySelectorAll(".back-link").forEach((element) => {
  element.href = portfolioRoot.href;
});
document.querySelectorAll(".old-portfolio-link").forEach((element) => {
  element.href = toRoot("old/");
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

// Builds the reading-page markup for a note. Shared by the homepage's in-page
// note view and the standalone log/ page, so both render identically.
function buildNoteArticle(note) {
  const fragment = document.createDocumentFragment();
  if (!note) {
    const heading = document.createElement("h1");
    heading.textContent = "this note isn’t here.";
    const message = document.createElement("p");
    message.textContent = "The link may be incomplete, or the note may have moved. You can return to the notebook above.";
    fragment.append(heading, message);
    return { fragment, title: `Note not found — ${site.name}` };
  }
  const date = document.createElement("time");
  date.className = "log-date";
  date.dateTime = note.publishedAt;
  date.textContent = `${note.date} -`;
  const heading = document.createElement("h1");
  heading.textContent = note.heading || note.title;
  const body = document.createElement("div");
  body.className = "note-content";
  // Only the owner's hand-authored HTML in logs.js is rendered as markup.
  body.innerHTML = note.content;
  fragment.append(date, heading, body);
  return { fragment, title: `${note.heading || note.title} — ${site.name}` };
}

const list = document.querySelector("#logs");
if (list) {
  // Notes open in place (no real navigation) so the audio element, if playing,
  // is never torn down. The log/ URL still exists as a real page for direct
  // links, refreshes, and JS-disabled visitors.
  const homeView = document.querySelector("#home-view");
  const readingView = document.querySelector("#reading-view");
  const articleEl = readingView.querySelector("#log");
  const backLink = document.querySelector("#back-link");
  const siteNameLink = document.querySelector("[data-site-name]");
  const mainEl = document.querySelector("main");
  const footer = document.querySelector(".site-footer");
  const loadingStatus = document.createElement("span");
  loadingStatus.className = "sr-only";
  loadingStatus.setAttribute("role", "status");
  footer.append(loadingStatus);
  const defaultTitle = `${site.name} — figuring.0ut()`;
  document.title = defaultTitle;

  function showNote(id) {
    const note = logs.find((entry) => entry.id === id);
    articleEl.replaceChildren();
    const { fragment, title } = buildNoteArticle(note);
    articleEl.append(fragment);
    document.title = title;
    homeView.hidden = true;
    readingView.hidden = false;
    mainEl.focus();
  }

  function showHome() {
    readingView.hidden = true;
    homeView.hidden = false;
    document.title = defaultTitle;
    mainEl.focus();
  }

  function clearLoadingState() {
    window.clearTimeout(navigationTimer);
    navigationTimer = null;
    footer.classList.remove("is-loading");
    loadingStatus.textContent = "";
    mainEl.removeAttribute("aria-busy");
  }

  let navigationTimer = null;
  list.addEventListener("click", (event) => {
    const link = event.target.closest(".log-link");
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (navigationTimer !== null) return;
    const id = new URLSearchParams(new URL(link.href).search).get("id");
    const open = () => {
      clearLoadingState();
      history.pushState({ id }, "", link.href);
      showNote(id);
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      open();
      return;
    }
    footer.classList.add("is-loading");
    loadingStatus.textContent = "Opening note…";
    mainEl.setAttribute("aria-busy", "true");
    navigationTimer = window.setTimeout(open, 700);
  });

  function goHome(event, url) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    clearLoadingState();
    history.pushState({}, "", url);
    showHome();
  }
  backLink.addEventListener("click", (event) => goHome(event, backLink.href));
  siteNameLink.addEventListener("click", (event) => {
    if (readingView.hidden) return; // Already home; let the normal link behave.
    goHome(event, siteNameLink.href);
  });

  window.addEventListener("popstate", () => {
    clearLoadingState();
    const id = new URLSearchParams(window.location.search).get("id");
    if (id) { showNote(id); } else { showHome(); }
  });

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
    link.href = toRoot(`log/?id=${encodeURIComponent(log.id)}`);
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
