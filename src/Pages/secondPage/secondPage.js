import { loadCSS } from "../../Services/helperFunctions";

export default class SecondPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    let div = document.createElement("div");

    div.innerHTML = `
 <header>
        <h1>This is a controlled form</h1>
        <p>We use proxy to achieve this control form
    </header>

    <section>
        <h2>Get in Touch</h2>
        <form>
            <label>Name:</label>
            <input type="text" placeholder="Your Name">
            
            <label>Email:</label>
            <input type="email" placeholder="Your Email">
            
            <label>Message:</label>
            <textarea placeholder="Your Message"></textarea>
            
            <button type="submit">Send Message</button>
        </form>
    </section>
    `;
    this.appendChild(div);
  }
}

customElements.define("second-page", SecondPage);
