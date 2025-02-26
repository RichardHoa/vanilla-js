import { loadHTMLAndCSS } from "../../Services/helperFunctions";

export default class SecondPage extends HTMLElement {
  #user = {
    name: "",
    email: "",
    film: "",
    birthday:"",
    birthdayTime:"",
    color:"",
    secretValue:"",
    quantity:"",
    volume:"",

  };

  constructor() {
    super();
  }

  connectedCallback() {
    loadHTMLAndCSS("/src/Pages/secondPage/secondPage.html", this).then(() => {
      this.setFormBinding(this.querySelector("form"));
    });
  }

  disconnectedCallback() {
    // Remove the style element when the component is removed
    if (this.styleElement) {
      document.head.removeChild(this.styleElement);
    }
  }

  setFormBinding(form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

     
      console.log("Form submitted", this.#user);
    });

    // Load all the form elements into the user object
    // useful for hidden fields or default values
    Array.from(form.elements).forEach((element) => {
      if (element.name) {
        this.#user[element.name] = element.value;
      }
    });

    // Listen for changes on the form elements
    // Update the user object when the form changes
    Array.from(form.elements).forEach((element) => {
      if (element.name) {
        element.addEventListener("change", (event) => {
          this.#user[element.name] = element.value;
        });
      }
    });

    // Create a proxy to update the form elements when the user object changes
    this.#user = new Proxy(this.#user, {
      set(target, property, value) {
        target[property] = value;
        form.elements[property].value = value;
        return true;
      },
    });
  }
}

customElements.define("second-page", SecondPage);
