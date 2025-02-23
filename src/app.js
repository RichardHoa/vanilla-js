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
});
