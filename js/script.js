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
  const cardAtual = botao.parentElement; // .card-generico
  const conteudoAtual = botao.nextElementSibling;
  const iconAtual = botao.querySelector(".icon");

  // pega somente os cards dentro da mesma matéria
  const blocoAtual = botao.closest(".conteudo-principal");
  const todosCards = blocoAtual.querySelectorAll(".card-generico");

  todosCards.forEach((card) => {
    const conteudo = card.querySelector(".conteudo-escondido");
    const btn = card.querySelector(".toggle-conteudo");
    const icon = btn.querySelector(".icon");

    if (card !== cardAtual) {
      conteudo.classList.remove("ativo");
      icon.textContent = "+";
    }
  });

  // abre ou fecha o atual
  conteudoAtual.classList.toggle("ativo");

  iconAtual.textContent = conteudoAtual.classList.contains("ativo")
    ? "-"
    : "+";
}



function togglePrincipal(botao) {
  const blocoAtual = botao.parentElement; // .h1-formatacao
  const conteudoAtual = botao.nextElementSibling;
  const iconAtual = botao.querySelector(".icon-principal");

  const todosBlocos = document.querySelectorAll(".h1-formatacao");

  todosBlocos.forEach((bloco) => {
    const conteudo = bloco.querySelector(".conteudo-principal");
    const btn = bloco.querySelector(".toggle-principal");
    const icon = btn.querySelector(".icon-principal");

    if (bloco !== blocoAtual) {
      conteudo.classList.remove("ativo");
      icon.textContent = "+";
    }
  });

  conteudoAtual.classList.toggle("ativo");

  iconAtual.textContent = conteudoAtual.classList.contains("ativo")
    ? "-"
    : "+";
}
