import { loadHTMLAndCSS } from "../../Services/helperFunctions";

export default class SecondNavBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    loadHTMLAndCSS("/src/Components/NavBar/secondNavBar.html", this).then(
      () => {
        this.querySelectorAll("a").forEach((link) => {
          link.addEventListener("click", (event) => {
            event.preventDefault();
            app.router.go(link.getAttribute("href"));
          });
        });
    
      }
    );
  }

  disconnectedCallback() {
    // Remove the style element when the component is removed
    if (this.styleElement) {
      document.head.removeChild(this.styleElement);
    }
  }
}

customElements.define("second-nav-bar", SecondNavBar);
