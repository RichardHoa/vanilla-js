import { loadHTMLAndCSS } from "../../Services/helperFunctions";

export default class SubmitButton extends HTMLElement {
  constructor() {
    super();
    this.button = null;
  }

  connectedCallback() {
    loadHTMLAndCSS("/src/Components/Button/submitButton.html", this).then(
      () => {
        this.button = this.querySelector("button");

        if (!this.button) {
          console.error(
            "SubmitButton: No <button> found inside loaded content."
          );
          return;
        }

        // Set button text from <submit-button> inner content
        const text = this.textContent.trim();
        if (text) {
          this.button.textContent = text;
        }

        // Clear the outer text
        this.innerHTML = "";
        this.appendChild(this.button);

        // Add click event to disable the button for 3 seconds
        this.button.addEventListener("click", () => {
          const form = this.closest("form");
          this.button.disabled = true;
          setTimeout(() => {
            this.button.disabled = false;
          }, 3000);
          form.requestSubmit();
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

customElements.define("submit-button", SubmitButton);
