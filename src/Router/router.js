import { handleProtectedRoutes } from "../Pages/ProtectedRoute/protectedRoute";

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

  go(route, addToHistory = true) {
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

    // If user is going to the route they are in, do nothing
    if (route == location.pathname && this.isFirstInit) {
      return;
    }

    // Push the state to history so user can use the back button
    if (addToHistory) {
      history.pushState({ route }, null, route);
    }

    // Page element will contains the DOM
    let pageElement = null;
    // Default nav bar is home nav bar
    let navElement = document.createElement("home-nav-bar");

    const routeConfig = routes[route];
    if (routeConfig) {
      const routeObj = routeConfig.init();
      // Create the page element
      pageElement = routeObj.pageElement;
      // If there is custom nav, use it
      if (routeObj.navElement) {
        navElement = routeObj.navElement.cloneNode(true);
      }
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
  "/fourth": {
    init: () => {
      const pageElement = handleProtectedRoutes("/fourth");
      return { navElement: null, pageElement: pageElement };
    },
  },
};

export default Router;
