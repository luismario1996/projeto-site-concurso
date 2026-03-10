function toggleMenu() {
  let menu = document.getElementById("menu");
  let overlay = document.getElementById("overlay");
  let hamburger = document.querySelector(".hamburger");

  if (menu.style.left === "0px") {
    menu.style.left = "-280px";
    overlay.style.display = "none";

    hamburger.classList.remove("ativo");
  } else {
    menu.style.left = "0";
    overlay.style.display = "block";

    hamburger.classList.add("ativo");
  }
}

function toggleSubmenu(botao) {
  let lista = botao.nextElementSibling;

  if (lista.style.display === "block") {
    lista.style.display = "none";
  } else {
    lista.style.display = "block";
  }
}
