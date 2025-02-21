import { loadCSS } from "../../Services/helperFunctions";

export default class LandingPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    let div = document.createElement("div");
    // Load the CSS

    div.innerHTML = `
 <header>
        <h1>This is a fairly large page</h1>
        <p>Just to demonstrate how to load a fairly big page in vanilla js</p>
    </header>

    <section>
        <article>
            <h2>Some text here</h2>
            <p>This is a setence, exciting isn't it?</p>
        </article>

        <article>
            <h2>What this website has</h2>
            <ul>
                <li>Nothing</li>
                <li>Pretty much nothing</li>
                <li>personal projects</li>
                <li>Continued nothing</li>
            </ul>
        </article>
    </section>

    <section>
        <h2>What Our Clients Say</h2>
        <blockquote>
            "Their expertise transformed our business. Highly recommended!"
            <footer>- A Happy Client</footer>
        </blockquote>
        <blockquote>
            "Top-notch service and innovative solutions. Couldn't be happier!"
            <footer>- A Satisfied Customer</footer>
        </blockquote>
    </section>

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

customElements.define("landing-page", LandingPage);
