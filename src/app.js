import Router from "./Router/router.js";
import proxiedStore from "./Store/store.js";

// Must import for the web component to work
import HomeNavBar from "./Components/NavBar/HomeNavBar.js";
import SecondNavBar from "./Components/NavBar/SecondNavBar.js";
import LandingPage from "./Pages/landingPage/landingPage.js";
import ThirdPage from "./Pages/thirdPage/thirdPage.js";
import LoginPage from "./Pages/ProtectedRoute/Login/login.js";
import FourthPage from "./Pages/ProtectedRoute/fourthPage/fourthPage.js";
import { handleProtectedRoutes } from "./Pages/ProtectedRoute/protectedRoute.js";
import {
  loadHTMLAndCSS,
  setCookie,
  getCookie,
} from "./Services/helperFunctions.js";
import API from "./Services/API/api.js";

window.app = {
  store: proxiedStore,
  router: Router,
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

  const secondObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("Lazy loading secondPage.js...");
        import("./Pages/secondPage/secondPage.js").then((module) => {
          if (!customElements.get("second-page")) {
            customElements.define("second-page", module.default);
            console.log("second-page loaded and defined!");
          }
        });
        observer.unobserve(entry.target); // Stop observing this one
      }
    });
  });

  // Watch for <second-page> appearing in the DOM dynamically
  const mutationObserver = new MutationObserver(() => {
    document
      .querySelectorAll("second-page")
      .forEach((el) => secondObserver.observe(el));
  });

  mutationObserver.observe(document.body, { childList: true, subtree: true });
  
});
