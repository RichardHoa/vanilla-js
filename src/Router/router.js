import initHomeNavBar from "../Components/NavBar/HomeNavBar";
import initSecondNavBar from "../Components/NavBar/SecondNavBar";
import { loadCSS } from "../Services/helperFunctions";

const Router = {
  init() {
    console.log("Router initialized");
    // Event handler if user goes back
    window.addEventListener("popstate", (event) => {
      Router.go(event.state.route, false);
    });
    // Go to the current URL, in case the user goes to a different page rather than main
    Router.go(location.pathname);
  },

  go(route, addToHistory = true) {
    console.log("Navigating to", route);
    if (addToHistory) {
      history.pushState({ route }, null, route);
    }
    let pageElement = null;

    const routeConfig = routes[route];
    if (routeConfig) {
      // Load all CSS files for the route
      routeConfig.css.forEach(loadCSS);

      // Create the page element
      pageElement = routeConfig.init();
    } else {
      // Default 404 page
      const element = document.createElement("h1");
      element.textContent = "404 Page Not Found";
      pageElement = element;
    }

    // Clear the app and add the new page
    let app = document.getElementById("app");
    while (app.firstChild) {
      app.removeChild(app.firstChild);
    }

    if (pageElement) {
      app.appendChild(pageElement);
      // Set the scroll to 0
      window.scrollTo(0, 0);
    }
  },
};

let navbarElement = document.getElementById("navbar");
const routes = {
  "/": {
    css: [
      "/src/Components/NavBar/HomeNavBar.css",
      "/src/Pages/landingPage/landingPage.css",
    ],
    init: () => {
      initHomeNavBar(navbarElement);
      const element = document.createElement("landing-page");
      return element;
    },
  },
  "/second": {
    css: [
      "/src/Components/NavBar/SecondNavBar.css",
      "/src/Pages/secondPage/secondPage.css",
    ],
    init: () => {
      initSecondNavBar(navbarElement);
      const element = document.createElement("second-page");
      return element;
    },
  },
};

export default Router;
