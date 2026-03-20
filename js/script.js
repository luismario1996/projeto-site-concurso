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

  let menus = document.querySelectorAll(".submenu");

  menus.forEach((menu) => {
    if (menu !== item) {
      menu.classList.remove("ativo");
    }
  });

  item.classList.toggle("ativo");
}

function toggleConteudo(botao) {
  const conteudoAtual = botao.nextElementSibling;
  const iconAtual = botao.querySelector(".icon");

  const todosConteudos = document.querySelectorAll(".conteudo-escondido");
  const todosBotoes = document.querySelectorAll(".toggle-conteudo");

  // fecha todos os outros
  todosConteudos.forEach((conteudo, index) => {
    if (conteudo !== conteudoAtual) {
      conteudo.classList.remove("ativo");
      todosBotoes[index].querySelector(".icon").textContent = "+";
    }
  });

  // alterna o atual
  conteudoAtual.classList.toggle("ativo");

  if (conteudoAtual.classList.contains("ativo")) {
    iconAtual.textContent = "-";
  } else {
    iconAtual.textContent = "+";
  }
}





function togglePrincipal(botao) {
  const conteudo = botao.nextElementSibling;
  const icon = botao.querySelector(".icon-principal");

  if (conteudo.style.display === "block") {
    conteudo.style.display = "none";
    icon.textContent = "+";
  } else {
    conteudo.style.display = "block";
    icon.textContent = "-";
  }
}


