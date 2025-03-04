/**
 * Helper function to load an HTML file into a DOMNode and CSS into the head
 * @param {string} path
 * @param {Object} context - The object (usually a custom element) that holds the private state.
 */
export function loadHTMLAndCSS(path, context) {
  // { cache: "force-cache" }
  // We turn off cache control to see the changes in html pages
  return fetch(path)
    .then((response) => response.text())
    .then((content) => {
      if (content) {
        renderHTML(content, context);
      } else {
        console.error("Failed to load HTML content from", path);
      }
    })
    .catch((error) => {
      console.error("Error fetching HTML content:", error);
    });
}

function renderHTML(content, context) {
  // Create a DocumentFragment
  const fragment = document.createDocumentFragment();
  const tempContainer = document.createElement("div");
  tempContainer.innerHTML = content;

  // Extract and apply CSS
  const styleTag = tempContainer.querySelector("style");
  if (styleTag) {
    context.styleElement = document.createElement("style");
    context.styleElement.innerHTML = styleTag.innerHTML;
    document.head.appendChild(context.styleElement);
    styleTag.remove(); // Remove style tag from fragment
  }

  // Remove <script> tags
  tempContainer.querySelectorAll("script").forEach((tag) => tag.remove());

  // Move child nodes to fragment
  while (tempContainer.firstChild) {
    fragment.appendChild(tempContainer.firstChild);
  }

  // Append the fragment to the target DOMNode
  context.appendChild(fragment);
}

/**
 * Binds a form to a private state object inside a custom element.
 *
 * @param {HTMLFormElement} form - The form to bind.
 * @param {Object} stateObject - The private state object
 */
export function setFormBinding(form, stateObject) {
  // Load all the form elements into the state object
  Array.from(form.elements).forEach((element) => {
    if (element.name) {
      stateObject[element.name] = element.value;
    }
  });

  // Listen for changes on form elements
  Array.from(form.elements).forEach((element) => {
    if (element.name) {
      element.addEventListener("change", (event) => {
        stateObject[element.name] = element.value;
      });
    }
  });

  // Create a proxy to update form elements when the object changes
  return new Proxy(stateObject, {
    set(target, property, value) {
      target[property] = value;
      if (form.elements[property]) {
        form.elements[property].value = value;
      }
      return true;
    },
  });
}

/**
 * Sets a cookie in the browser.
 *
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value of the cookie.
 * @param {number} [days=7] - The number of days until the cookie expires (default is 7 days).
 */
export function setCookie(name, value, days = 7) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value
  )}; expires=${expires.toUTCString()}; path=/`;
}

/**
 * Retrieves a cookie value from the browser.
 *
 * @param {string} name - The name of the cookie to retrieve.
 * @returns {string|null} - The value of the cookie if found, otherwise null.
 */
export function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === encodeURIComponent(name)) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

const HELPER = {};

export default HELPER;
