function resetarEstatisticas() {
  localStorage.removeItem("estatisticas");

  location.reload();
}

let estatisticas = JSON.parse(localStorage.getItem("estatisticas")) || {
  respondidas: 0,
  acertos: 0,
  erros: 0,
};

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

  // soma uma questão respondida
  estatisticas.respondidas++;

  if (respostaUsuario === q.correta) {
    estatisticas.acertos++;

    document.getElementById("resultado").innerText = "✅ Resposta correta";
  } else {
    estatisticas.erros++;

    document.getElementById("resultado").innerText = "❌ Resposta errada";
  }

  // salva no navegador
  localStorage.setItem("estatisticas", JSON.stringify(estatisticas));

  carregarQuestao();
  mostrarEstatisticas();
  atualizarGrafico();
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

function mostrarEstatisticas() {
  let porcentagem = 0;

  if (estatisticas.respondidas > 0) {
    porcentagem = Math.round(
      (estatisticas.acertos / estatisticas.respondidas) * 100,
    );
  }

  document.getElementById("estatisticas").innerHTML = `

📊 Respondidas: ${estatisticas.respondidas} <br>
✅ Acertos: ${estatisticas.acertos} <br>
❌ Erros: ${estatisticas.erros} <br>
🎯 Desempenho: ${porcentagem}%

`;
}

mostrarEstatisticas();
function atualizarGrafico() {
  let ctx = document.getElementById("graficoDesempenho");

  new Chart(ctx, {
    type: "doughnut",

    data: {
      labels: ["Acertos", "Erros"],

      datasets: [
        {
          data: [estatisticas.acertos, estatisticas.erros],

          backgroundColor: ["#2ecc71", "#e74c3c"],
        },
      ],
    },

    options: {
      responsive: true,

      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });
}
