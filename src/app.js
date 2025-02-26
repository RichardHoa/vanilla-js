import Router from "./Router/router.js";
import proxiedStore from "./Store/store.js";
import "./style.css";

import HomeNavBar from "./Components/NavBar/HomeNavBar.js";
import SecondNavBar from "./Components/NavBar/SecondNavBar.js";
import LandingPage from "./Pages/landingPage/landingPage.js";
import SecondPage from "./Pages/secondPage/secondPage.js";
import SubmitButton from "./Components/Button/submitButton.js";


window.app = {
  store: proxiedStore,
  router: Router,
};

window.addEventListener("DOMContentLoaded", () => {
  window.app.router.init();


  // Configure when the fade appear
  const fade = document.getElementById("fade");
  // Show when scrolled pass the limit
  window.addEventListener("scroll", function () {
    if (window.scrollY >= 500) {
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
