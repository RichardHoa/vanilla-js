import { loadHTMLAndCSS } from "../../Services/helperFunctions";

export default class HomeNavBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    loadHTMLAndCSS("/src/Components/homeNavBar/homeNavBar.html", this).then(() => {
      this.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          app.router.go(link.getAttribute("href"));
        });
      });


      // Set the toggle to change theme-color
      const toggle = this.querySelector("input");

      // Load saved theme from localStorage (if any)
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
        toggle.checked = savedTheme === "dark";
      }

      toggle.addEventListener("change", () => {
        const newTheme = toggle.checked ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      });
    });
  }

  disconnectedCallback() {
    // Remove the style element when the component is removed
    if (this.styleElement) {
      document.head.removeChild(this.styleElement);
    }
  }
}

customElements.define("home-nav-bar", HomeNavBar);
