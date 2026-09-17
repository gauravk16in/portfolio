// Run before the stylesheet so a saved night theme never flashes white.
try {
  document.documentElement.dataset.theme = localStorage.getItem("notebook-theme") === "night" ? "night" : "day";
} catch {
  document.documentElement.dataset.theme = "day";
}
