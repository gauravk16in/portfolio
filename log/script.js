const requestedId = new URLSearchParams(window.location.search).get("id");
const note = logs.find((entry) => entry.id === requestedId);
const article = document.querySelector("#log");

// buildNoteArticle comes from ../script.js, loaded before this file, so the
// standalone note page renders identically to the homepage's in-page view.
const { fragment, title } = buildNoteArticle(note);
document.title = title;
article.append(fragment);
