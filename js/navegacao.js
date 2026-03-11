function anterior() {
  atual--;

  if (atual < 0) {
    atual = questoesFiltradas.length - 1;
  }

  respostaUsuario = null;

  document.getElementById("resultado").innerText = "";

  carregarQuestao();
}

function proxima() {
  atual++;

  if (atual >= questoesFiltradas.length) {
    atual = 0;
  }

  respostaUsuario = null;

  document.getElementById("resultado").innerText = "";

  carregarQuestao();
}

function criarNavegacao() {
  let container = document.getElementById("navegacaoQuestoes");

  if (!container) return;

  container.innerHTML = "";

  questoesFiltradas.forEach((q, index) => {
    let botao = document.createElement("button");

    botao.innerText = index + 1;

    botao.classList.add("btn-numero");

    if (respostas[q.id] === "acerto") {
      botao.classList.add("questao-acerto");
    } else if (respostas[q.id] === "erro") {
      botao.classList.add("questao-erro");
    }

    botao.onclick = function () {
      atual = index;

      respostaUsuario = null;

      document.getElementById("resultado").innerText = "";

      carregarQuestao();
    };

    container.appendChild(botao);
  });
}
