const requestedId = new URLSearchParams(window.location.search).get("id");
const note = logs.find((entry) => entry.id === requestedId);
const article = document.querySelector("#log");

if (!note) {
  document.title = `Note not found — ${site.name}`;
  const heading = document.createElement("h1");
  heading.textContent = "this note isn’t here.";
  const message = document.createElement("p");
  message.textContent = "The link may be incomplete, or the note may have moved. You can return to the notebook above.";
  article.append(heading, message);
} else {
  document.title = `${note.heading || note.title} — ${site.name}`;
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
  article.append(date, heading, body);
}
