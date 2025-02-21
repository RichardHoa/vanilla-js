import API from "../../../Services/API/api";
import { loadHTMLAndCSS } from "../../../Services/helperFunctions";

export default class FourthPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    let privData = null;
    API.fetchPrivateData().then((data) => {
      privData = data;
    });

    loadHTMLAndCSS(
      "/src/Pages/ProtectedRoute/fourthPage/fourthPage.html",
      this
    ).then(() => {
      this.querySelector("p").innerHTML = privData.data;
    });
  }

  disconnectedCallback() {
    // Remove the style element when the component is removed
    if (this.styleElement) {
      document.head.removeChild(this.styleElement);
    }
  }
}

customElements.define("fourth-page", FourthPage);
