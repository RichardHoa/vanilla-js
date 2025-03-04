// Convert kebab-case to camelCase
function toCamelCase(tagName) {
  return tagName.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

const moduleMap = import.meta.glob("/src/**/*.js"); // No `{ eager: true }` → Lazy load

export function loadModule(importPath) {
  const match = Object.keys(moduleMap).find((key) => key.endsWith(importPath));
  if (match) {
    return moduleMap[match](); // Vite now recognizes this as a dynamic chunk
  } else {
    console.error(`❌ Module not found: ${importPath}`);
    return Promise.reject();
  }
}

// Lazy load components & pages dynamically
function lazyLoadElement(entry, observer) {
  if (entry.isIntersecting) {
    const tagName = entry.target.tagName.toLowerCase();
    const camelCaseName = toCamelCase(tagName);

    // Prevent redefining the same custom element
    if (customElements.get(tagName)) {
      //   console.log(`[LazyLoad] ⚠️ <${tagName}> is already defined. Skipping...`);
      observer.unobserve(entry.target);
      return;
    }

    const protectedRoutes = ["fourthPage", "loginPage"];
    let importPath = "";

    if (protectedRoutes.includes(camelCaseName)) {
      importPath = `src/Pages/ProtectedRoute/${camelCaseName}/${camelCaseName}.js`;
    } else if (tagName.endsWith("-page")) {
      importPath = `src/Pages/${camelCaseName}/${camelCaseName}.js`;
    } else {
      importPath = `src/Components/${camelCaseName}/${camelCaseName}.js`;
    }

    // console.log(`[LazyLoad] Attempting to load: ${importPath}`);

    loadModule(importPath).then((module) => {
      if (!customElements.get(tagName)) {
        customElements.define(tagName, module.default);
        console.log(`✅ Loaded <${tagName}> from ${importPath}`);
      }
    });

    observer.unobserve(entry.target);
  }
}

// IntersectionObserver to lazy load elements
const elementObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => lazyLoadElement(entry, observer));
});

const customElementsList = new Set([
  "submit-button",
  "landing-page",
  "home-nav-bar",
  "second-nav-bar",
  "third-page",
  "login-page",
  "second-page",
  "fourth-page",
  // Add more custom elements here
]);

const observedElements = new Set();

// MutationObserver to watch for dynamically added custom elements

document.addEventListener("DOMContentLoaded", () => {
  const mutationObserver = new MutationObserver(() => {
    customElementsList.forEach((tagName) => {
      const element = document.querySelector(tagName);
      if (element && !observedElements.has(element)) {
        elementObserver.observe(element);
        observedElements.add(element); // Mark as observed
        console.log(`[LazyLoad] Observing custom element: <${tagName}>`);
      }
    });
  });

  if ("customElements" in window) {
    console.log(
      "[LazyLoad] 🚀 MutationObserver started, watching for new custom elements..."
    );
    mutationObserver.observe(document.body, { childList: true, subtree: true });
  }

  setTimeout(() => {
    console.log("[LazyLoad] ⏹️ MutationObserver disconnected after loading.");
    mutationObserver.disconnect();
  }, 3000);

  app.observer = mutationObserver;
});

const Observer = {};

export default Observer;
