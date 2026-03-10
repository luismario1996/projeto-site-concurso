let questoes = [];
let atual = 0;
let respostaUsuario = null;

fetch("dados/questoes.json")
  .then((res) => res.json())
  .then((data) => {
    questoes = data.questoes;

    carregarQuestao();
  });

function carregarQuestao() {
  let q = questoes[atual];

  document.getElementById("pergunta").innerText = q.pergunta;

  let altHTML = "";

  for (let letra in q.alternativas) {
    altHTML += `
<div onclick="selecionar('${letra}', this)">
${letra.toUpperCase()}) ${q.alternativas[letra]}
</div>
`;
  }

  document.getElementById("alternativas").innerHTML = altHTML;
}

function selecionar(letra, elemento) {
  respostaUsuario = letra;

  document
    .querySelectorAll("#alternativas div")
    .forEach((el) => (el.style.background = "white"));

  elemento.style.background = "#d6e6ff";
}

function verificar() {
  let q = questoes[atual];

  if (respostaUsuario === q.correta) {
    document.getElementById("resultado").innerText = "✅ Resposta correta";
  } else {
    document.getElementById("resultado").innerText = "❌ Resposta errada";
  }
}

function proxima() {
  atual++;

  if (atual >= questoes.length) {
    atual = 0;
  }

  respostaUsuario = null;

  document.getElementById("resultado").innerText = "";

  carregarQuestao();
}
