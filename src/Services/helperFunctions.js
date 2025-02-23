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
 * Helper function to load an HTML file into the DOM
 *
 * @param {string} path
 * @param {object} contentObj
 *
 */
export async function loadHTML(path, contentObj) {
  // Fetch the HTML content
  const response = await fetch(path);
  const content = await response.text();
  if (content) {
    contentObj.content = content;
  } else {
    console.error("Failed to load HTML content from", path);
  }
}

export function loadHTMLAndCSS(path, DOMNode) {
  let contentObj = { content: "" };

  return fetch(path)
    .then((response) => response.text())
    .then((content) => {
      if (content) {
        // Create a DocumentFragment directly
        const fragment = document.createDocumentFragment();

        // Create a temporary container to parse the HTML
        const tempContainer = document.createElement("div");
        tempContainer.innerHTML = content;

        const headContent = tempContainer.querySelector("style").innerHTML;
        if (headContent) {
          DOMNode.styleElement = document.createElement("style");
          DOMNode.styleElement.innerHTML = headContent;
          document.head.appendChild(DOMNode.styleElement);
        }

        tempContainer.innerHTML = content;

        // Remove <style> and <script> tags before appending
        tempContainer
          .querySelectorAll("style, script")
          .forEach((tag) => tag.remove());

        // Move all child nodes from tempContainer to fragment
        while (tempContainer.firstChild) {
          fragment.appendChild(tempContainer.firstChild);
        }

        // Append the fragment to the target DOMNode
        DOMNode.appendChild(fragment);
      } else {
        console.error("Failed to load HTML content from", path);
      }
    })
    .catch((error) => {
      console.error("Error fetching HTML content:", error);
    });
}
