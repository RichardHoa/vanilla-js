import API from "../../../Services/API/api";
import { loadHTMLAndCSS } from "../../../Services/helperFunctions";

export default class FourthPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    try {
      // Fetch API data
      const privData = await API.fetchPrivateData();

      // Load HTML and CSS
      await loadHTMLAndCSS(
        "/src/Pages/ProtectedRoute/fourthPage/fourthPage.html",
        this
      );

      if (privData) {
        this.querySelector("p").innerHTML = privData.data;
      }
    } catch (error) {
      console.error("[FourthPage] ❌ Error loading data:", error);
    }
  }

  disconnectedCallback() {
    // Remove the style element when the component is removed
    if (this.styleElement) {
      document.head.removeChild(this.styleElement);
    }
  }
}

customElements.define("fourth-page", FourthPage);
