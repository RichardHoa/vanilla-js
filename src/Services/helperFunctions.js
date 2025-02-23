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

/**
 * Helper function to load an HTML file into a DOMNode and CSS into the head
 * @param {string} path
 * @param {HTMLElement} DOMNode
 */
export function loadHTMLAndCSS(path, DOMNode) {
  return fetch(path, { cache: "force-cache" })
    .then((response) => response.text())
    .then((content) => {
      if (content) {
        renderHTML(content, DOMNode);
      } else {
        console.error("Failed to load HTML content from", path);
      }
    })
    .catch((error) => {
      console.error("Error fetching HTML content:", error);
    });
}

function renderHTML(content, DOMNode) {
  // Create a DocumentFragment
  const fragment = document.createDocumentFragment();
  const tempContainer = document.createElement("div");
  tempContainer.innerHTML = content;

  // Extract and apply CSS
  const styleTag = tempContainer.querySelector("style");
  if (styleTag) {
    DOMNode.styleElement = document.createElement("style");
    DOMNode.styleElement.innerHTML = styleTag.innerHTML;
    document.head.appendChild(DOMNode.styleElement);
    styleTag.remove(); // Remove style tag from fragment
  }

  // Remove <script> tags
  tempContainer.querySelectorAll("script").forEach((tag) => tag.remove());

  // Move child nodes to fragment
  while (tempContainer.firstChild) {
    fragment.appendChild(tempContainer.firstChild);
  }

  // Append the fragment to the target DOMNode
  DOMNode.appendChild(fragment);
}
