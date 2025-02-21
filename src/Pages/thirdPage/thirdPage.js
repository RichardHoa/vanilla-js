import API from "../../Services/API/api";
import { loadHTMLAndCSS } from "../../Services/helperFunctions";

export default class ThirdPage extends HTMLElement {
  constructor() {
    super();

    // const Store = {
    //   accessToken: null,
    // };

    // this.innerStore = new Proxy(Store, {
    //   set(target, key, value) {
    //     target[key] = value;
    //     // Add new event based on the key name
    //     console.log("The key is: " + key);
    //     console.log("New event activated: " + `${key}-update`);
    //     window.dispatchEvent(new Event(`${key}-update`));
    //     return true;
    //   },
    // });
  }

  connectedCallback() {
    window.addEventListener("data-update", () => {
      this.render();
    });

    // Fetch the content of the third page
    API.fetchThirdPage().then((data) => {
      app.store.data = data;
      // const accessToken = import.meta.env.VITE_TEST_INFORMATION;
      // this.innerStore.accessToken = accessToken;
      // console.log(this.innerStore);
    });

    loadHTMLAndCSS("/src/Pages/thirdPage/thirdPage.html", this).then(() => {
      this.render();
    });
  }

  disconnectedCallback() {
    // Remove the style element when the component is removed
    if (this.styleElement) {
      document.head.removeChild(this.styleElement);
    }
  }

  render() {
    if (!app.store.data) {
      this.querySelector("#body-text").innerHTML = "Data is being loaded.....";
      return;
    }

    const data = app.store.data;

    // Update static text content
    this.querySelector("#heading").innerHTML = data.heading;
    this.querySelector("#subheading").innerHTML = data.subheading;
    this.querySelector("#body-text").innerHTML = data.body;
    this.querySelector("#hero-image").src = data.heroImage;

    // Populate features dynamically
    const featureList = this.querySelector("#feature-list");
    featureList.innerHTML = ""; // Clear existing content
    data.features.forEach((feature) => {
      const featureItem = document.createElement("div");
      featureItem.classList.add("feature");
      featureItem.innerHTML = `
        <span class="icon">${feature.icon}</span>
        <h4>${feature.title}</h4>
        <p>${feature.description}</p>
      `;
      featureList.appendChild(featureItem);
    });

    // Populate testimonials dynamically
    const testimonialList = this.querySelector("#testimonial-list");
    testimonialList.innerHTML = ""; // Clear existing content
    data.testimonials.forEach((testimonial) => {
      const testimonialItem = document.createElement("div");
      testimonialItem.classList.add("testimonial");
      testimonialItem.innerHTML = `
        <img src="${testimonial.avatar}" alt="${testimonial.name}" class="avatar"/>
        <blockquote>"${testimonial.quote}"</blockquote>
        <p>- ${testimonial.name}</p>
      `;
      testimonialList.appendChild(testimonialItem);
    });

    // Update CTA button
    const ctaButton = this.querySelector("#cta-button");
    ctaButton.innerHTML = data.cta.text;
    ctaButton.href = data.cta.link;
    ctaButton.addEventListener("click", (event) => {
      event.preventDefault();
      app.router.go(ctaButton.getAttribute("href"));
    });
    // make all the a do SPA
  }
}

customElements.define("third-page", ThirdPage);
