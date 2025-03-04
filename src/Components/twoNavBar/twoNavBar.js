import { loadHTMLAndCSS } from "../../Services/helperFunctions";

export default class twoNavBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    loadHTMLAndCSS("/src/Components/twoNavBar/twoNavBar.html", this).then(
      () => {
        this.querySelectorAll("a").forEach((link) => {
          link.addEventListener("click", (event) => {
            event.preventDefault();
            const destinataion = link.getAttribute("href");
            if (destinataion == location.pathname) {
              console.log("same route");
            } else {
              app.router.go(link.getAttribute("href"));
            }
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

customElements.define("two-nav-bar", twoNavBar);
