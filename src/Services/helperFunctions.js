/**
 * Helper function to load a CSS file into the DOM
 *
 * @param {string} path
 *
 */
export function loadCSS(path) {
  console.log("Loading CSS: ", path);
  // Check if the stylesheet is already loaded to prevent duplicates
  if (document.querySelector(`link[href="${path}"]`)) return;

  // Remove all stylesheets except the main "styles.css" and the NavBar CSS
  document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
    if (
      !link.href.includes("styles.css") &&
      !link.href.includes("NavBar.css")
    ) {
      link.remove();
    }
  });

  // Remove the other NavBar CSS
  if (path.includes("NavBar.css")) {
    document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
      if (link.href.includes("NavBar.css")) {
        link.remove();
      }
    });
  }

  // Create and append the new stylesheet
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = path;
  document.head.appendChild(link);
}
