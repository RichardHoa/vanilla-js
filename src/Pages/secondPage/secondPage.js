import { loadCSS } from "../../Services/helperFunctions";

export default class SecondPage extends HTMLElement {
  #user = {
    name: "",
    birthday: "",
    birthdaytime: "",
    color: "",
    message: "",
    custId: "",
    bdayMonth: "",
    quantity: "",
    vol: "",
    phone: "",
    email: "",
    browsers: "",
  };

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
        <label for="name">Your Name</label>
        <input type="text" id="name" name="name" autocomplete="off" pattern="\\w{1,16}" value="Sasha" autofocus/>
        <label for="email">Your Email</label>
        <input type="email" id="email" name="email" autocomplete="off" multiple />

<label for="browsers">Choose a film:</label>
<input list="browsers" id="browsersInput" name="browsers">
<datalist id="browsers">
  <option value="Film 1">
  <option value="Film 2">
  <option value="Film 3">
  <option value="Film 4">
  <option value="Film 5">
  <option value="Film 6">
  <option value="Film 7">
  <option value="Film 8">
  <option value="Film 9">
</datalist>

          <label for="birthday">Birthday:</label>
          <input type="date" id="birthday" name="birthday" max="2007-01-01">
            <label for="birthdaytime">Birthday (date and time):</label>
  <input type="datetime-local" id="birthdaytime" name="birthdaytime">

        <label for="color">Select your favorite color:</label>
        <input type="color" id="color" name="color" >

          <input type="hidden" id="custId" name="custId" value="3487">

        <label for="message">Your Message</label>
        <textarea id="message" name="message" autocomplete="off"></textarea>

          <label for="bdayMonth">Birthday (month and year):</label>
  <input type="month" id="bdayMonth" name="bdayMonth">

    <label for="quantity">Quantity (between 1 and 5):</label>
  <input type="number" id="quantity" name="quantity" min="0" max="500" step="10">

    <label for="vol">Volume (between 0 and 50):</label>
  <input type="range" id="vol" name="vol" min="0" max="100" value="50">


        <button type="submit">Send Message</button>
        </form>
    </section>
    `;
    this.appendChild(div);
    this.setFormBinding(div.querySelector("form"));
  }

  setFormBinding(form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      this.#user.color = "#ff0000";
      console.log("Form submitted", this.#user);
    });

    // Load all the form elements into the user object
    // useful for hidden fields or default values
    Array.from(form.elements).forEach((element) => {
      if (element.name) {
        this.#user[element.name] = element.value;
      }
    });

    Array.from(form.elements).forEach((element) => {
      if (element.name) {
        element.addEventListener("change", (event) => {
          this.#user[element.name] = element.value;
        });
      }
    });
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
