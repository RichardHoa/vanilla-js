import { loadHTMLAndCSS } from "../../Services/helperFunctions";

export default class HomeNavBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    loadHTMLAndCSS("/src/Components/NavBar/homeNavBar.html", this).then(() => {
      this.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          app.router.go(link.getAttribute("href"));
        });
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
