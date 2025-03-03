import Router from "./Router/router.js";
import proxiedStore from "./Store/store.js";

// Must import for the web component to work
import HomeNavBar from "./Components/NavBar/HomeNavBar.js";
import SecondNavBar from "./Components/NavBar/SecondNavBar.js";
import LandingPage from "./Pages/landingPage/landingPage.js";
import SecondPage from "./Pages/secondPage/secondPage.js";
import ThirdPage from "./Pages/thirdPage/thirdPage.js";
import SubmitButton from "./Components/Button/submitButton.js";
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
});
