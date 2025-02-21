import {  loadHTMLAndCSS } from "../../Services/helperFunctions";

export default class LandingPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    loadHTMLAndCSS("/src/Pages/landingPage/landingPage.html", this);
  }

  disconnectedCallback() {
    // Remove the style element when the component is removed
    if (this.styleElement) {
      document.head.removeChild(this.styleElement);
    }
  }
}

customElements.define("landing-page", LandingPage);

