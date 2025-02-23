import { loadHTMLAndCSS } from "../../Services/helperFunctions";

export default class HomeNavBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    console.log("function is running");
    loadHTMLAndCSS("/src/Components/NavBar/homeNavBar.html", this).then(
      (div) => {
        if (div) {
          this.appendChild(div);

          div.querySelectorAll("nav > a").forEach((link) => {
            link.addEventListener("click", (event) => {
              event.preventDefault();
              app.router.go(link.getAttribute("href"));
            });
          });
        }
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

customElements.define("home-nav-bar", HomeNavBar);
