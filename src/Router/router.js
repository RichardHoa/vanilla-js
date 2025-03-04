import { getCookie } from "../Services/helperFunctions";

const Router = {
  isFirstInit: false,
  init() {
    // Event handler if user goes back
    window.addEventListener("popstate", (event) => {
      Router.go(event.state.route, false);
    });
    // Go to the current URL, in case the user goes to a different page rather than main
    Router.go(location.pathname);

    // Set the firstInit to true
    this.isFirstInit = true;

    window.addEventListener("accessToken-update", () => {
      console.log("access token is being triggered");
      // location.reload();
      Router.go(location.pathname, false);
    });
  },
  goBack() {
    const previousRoute = history.state?.previousRoute || "/";
    console.log("⏪ Going back to:", previousRoute);
    this.go(previousRoute);
  },

  go(route, addToHistory = true, previousRoute = "") {
    if (route == location.pathname && this.isFirstInit) {
      // If user is going to the route they are in, do nothing
      return;
    }

    // Activate the observer again
    if (this.isFirstInit && window.app?.observer) {
      console.log("Activating observer again...");
      window.app.observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    } else {
      console.warn("[Router] ⚠️ app or observer is not initialized yet.");
    }

    if (route.startsWith("/secure/")) {
      const cookie = getCookie("access-token");
      console.log("cookie: ", cookie);
      if (!cookie) {
        return this.go("/login", true, route);
      }
    }

    // Push the state to history so user can use the back button
    if (addToHistory) {
      history.pushState(
        { destination: route, previousRoute: previousRoute },
        null,
        route
      );
    }

    // Page element will contains the DOM
    let pageElement = null;
    // Default nav bar is home nav bar
    let navElement = document.createElement("home-nav-bar");

    const routeConfig = routes[route] || routes["/404"];
    if (routeConfig) {
      const routeObj = routeConfig.init();
      // Create the page element
      pageElement = routeObj.pageElement;
      // If there is custom nav, use it
      if (routeObj.navElement) {
        navElement = routeObj.navElement.cloneNode(true);
      }
    } 

    // Clear the app and add the new page
    let app = document.getElementById("app");
    while (app.firstChild) {
      app.removeChild(app.firstChild);
    }

    let navbarElement = document.getElementById("navbar");
    // Clear all the old nav
    while (navbarElement.firstChild) {
      navbarElement.removeChild(navbarElement.firstChild);
    }
    // Add the new navbar
    navbarElement.appendChild(navElement.cloneNode(true));

    // Add new page to the DOM
    if (pageElement) {
      app.appendChild(pageElement);
      // Set the scroll to the top of the page
      window.scrollTo(0, 0);
    }
  },
};

const routes = {
  "/": {
    init: () => {
      const pageElement = document.createElement("landing-page");
      return { navElement: null, pageElement: pageElement };
    },
  },
  "/second": {
    init: () => {
      const navElement = document.createElement("second-nav-bar");
      const pageElement = document.createElement("second-page");
      return { navElement: navElement, pageElement: pageElement };
    },
  },
  "/third": {
    init: () => {
      const pageElement = document.createElement("third-page");
      return { navElement: null, pageElement: pageElement };
    },
  },
  "/secure/fourth": {
    init: () => {
      const pageElement = document.createElement("fourth-page");
      return { navElement: null, pageElement: pageElement };
    },
  },
  "/login": {
    init: () => {
      const pageElement = document.createElement("login-page");
      return { navElement: null, pageElement: pageElement };
    },
  },
  "/404": {
    init: () => {
      const element = document.createElement("h1");
      element.textContent = "404 Page Not Found";
      return { pageElement: element };
    },
  },
};

export default Router;
