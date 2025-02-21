export default function initSecondNavBar(navbarElement) {
  navbarElement.innerHTML = `
      <a href="/" >Main page</a> 
      <a href="/fourth" >Fourth page</a>
      `;

  navbarElement.querySelectorAll("nav > a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      app.router.go(link.getAttribute("href"));
    });
  });
}
