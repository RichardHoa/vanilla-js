import Router from "./Router/router.js";
import proxiedStore from "./Store/store.js";
import "./style.css";

import LandingPage from "./Pages/landingPage/landingPage.js";
import SecondPage from "./Pages/secondPage/secondPage.js";

window.app = {
  store: proxiedStore,
  router: Router,
};

window.addEventListener("DOMContentLoaded", () => {
  window.app.router.init();
});
