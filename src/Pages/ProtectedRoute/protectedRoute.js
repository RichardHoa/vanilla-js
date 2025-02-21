import { getCookie } from "../../Services/helperFunctions";

export function handleProtectedRoutes(url) {
  //  Attempt to get accessToken from the cookie
  const accessTokenCookie = getCookie("access-token");
  if (!accessTokenCookie) {
    console.log("We don't have access token, login");
    // Meaning the user is not authorized
    return document.createElement("login-page");
  }

  console.log("Access token: ", accessTokenCookie);
  // Set the access token
  app.store.accessToken = accessTokenCookie;
  return document.createElement("fourth-page");
}
