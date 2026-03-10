function toggleMenu() {
  let menu = document.getElementById("menu");
  let overlay = document.getElementById("overlay");
  let hamburger = document.querySelector(".hamburger");
  let body = document.body;

  if (menu.style.left === "0px") {
    menu.style.left = "-280px";
    overlay.style.display = "none";

    hamburger.classList.remove("ativo");

    body.classList.remove("menu-aberto");
  } else {
    menu.style.left = "0px";
    overlay.style.display = "block";

    hamburger.classList.add("ativo");

    body.classList.add("menu-aberto");
  }
}
function toggleSubmenu(botao) {
  let item = botao.parentElement;

  let todos = document.querySelectorAll(".submenu");

  todos.forEach((menu) => {
    if (menu !== item) {
      menu.classList.remove("ativo");
    }
  });

  item.classList.toggle("ativo");
}
