import API from "../../../Services/API/api";
import {
  loadHTMLAndCSS,
  setCookie,
  setFormBinding,
} from "../../../Services/helperFunctions";

export default class LoginPage extends HTMLElement {
  #user = {
    email: "",
    password: "",
  };

  constructor() {
    super();
  }

  connectedCallback() {
    let loginData = null;
    API.fetchLoginData().then((data) => {
      loginData = data;
      console.log(loginData);
    });
    loadHTMLAndCSS("/src/Pages/ProtectedRoute/login/login.html", this).then(
      () => {
        const form = this.querySelector("form");
        // Set form binding
        this.#user = setFormBinding(form, this.#user);
        // Set up event listener
        form.addEventListener("submit", (event) => {
          event.preventDefault();

          if (
            this.#user.email == loginData.email &&
            this.#user.password == loginData.password
          ) {
            console.log("success");
            setCookie("access-token", loginData.accessToken);
            app.store.accessToken = loginData.accessToken;
          }

          console.log("Form submitted", this.#user);
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

customElements.define("login-page", LoginPage);
