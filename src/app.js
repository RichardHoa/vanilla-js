import Router from "./Router/router.js";
import proxiedStore from "./Store/store.js";

// Must import for the web component to work
import HELPER from "./Services/helperFunctions.js";
import API from "./Services/API/api.js";
import Observer from "./Observer/observer.js";

window.app = {
  store: proxiedStore,
  router: Router,
  // observer is set in observer.js
  observer: null,
};

window.addEventListener("DOMContentLoaded", () => {
  window.app.router.init();

  // Configure when the fade appear
  // Show when scrolled pass the limit
  window.addEventListener("scroll", function () {
    let fade = document.getElementById("fade");

    if (window.scrollY >= 500) {
      if (!fade.querySelector("img")) {
        fade.innerHTML = `<img src="/fade.svg" />`;
      }
      fade.style.display = "block";
    } else {
      fade.style.display = "none";
    }
  });

  // Scroll to #starter when clicked
  fade.addEventListener("click", function () {
    document.getElementById("starter").scrollIntoView({ behavior: "smooth" });
  });

});
