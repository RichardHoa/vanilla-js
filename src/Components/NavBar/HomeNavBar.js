export default function initHomeNavBar(navbarElement) {
  navbarElement.innerHTML = `
    <a href="/" >Main page</a> 
    <a href="/second" >Second page</a> 
    <a href="/third" >Third page</a> 
    <a href="/fourth" >Fourth page</a>
    `;

  navbarElement.querySelectorAll("nav > a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      app.router.go(link.getAttribute("href"));
    });
  });
}
