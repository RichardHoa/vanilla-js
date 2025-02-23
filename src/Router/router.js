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
    console.log("Navigating to: ", route);
    if (addToHistory) {
      history.pushState({ route }, null, route);
    }

    let navbarElement = document.getElementById("navbar");

    let pageElement = null;
    let navElement = null;

    const routeConfig = routes[route];
    if (routeConfig) {
      // Create the page element
      const routeObj = routeConfig.init();
      pageElement = routeObj.pageElement;
      navElement = routeObj.navElement.cloneNode(true);
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

    while (navbarElement.firstChild) {
      navbarElement.removeChild(navbarElement.firstChild);
    }
    // Add the new navbar
    navbarElement.appendChild(navElement.cloneNode(true));

    if (pageElement) {
      // app.appendChild(navElement);
      app.appendChild(pageElement);
      // Set the scroll to 0
      window.scrollTo(0, 0);
    }
  },
};

const routes = {
  "/": {
    init: () => {
      const navElement = document.createElement("home-nav-bar");
      const pageElement = document.createElement("landing-page");
      return { navElement: navElement, pageElement: pageElement };
    },
  },
  "/second": {
    init: () => {
      const navElement = document.createElement("second-nav-bar");
      const pageElement = document.createElement("second-page");
      return { navElement: navElement, pageElement: pageElement };
    },
  },
};

export default Router;
