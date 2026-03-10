let respondidas = JSON.parse(localStorage.getItem("respondidas")) || [];

let estatisticas = JSON.parse(localStorage.getItem("estatisticas")) || {
  respondidas: 0,
  acertos: 0,
  erros: 0,
};

let questoes = [];
let atual = 0;
let respostaUsuario = null;

function resetarEstatisticas() {
  localStorage.removeItem("estatisticas");
  localStorage.removeItem("respondidas");

  location.reload();
}

fetch("dados/questoes.json")
  .then((res) => res.json())
  .then((data) => {
    questoes = data.questoes;

    carregarQuestao();
    mostrarEstatisticas();
    atualizarGrafico();
  });

function carregarQuestao() {
  let q = questoes[atual];

  document.getElementById("pergunta").innerText = q.pergunta;

  // STATUS DA QUESTÃO
  if (respondidas.includes(q.id)) {
    document.getElementById("statusQuestao").innerText =
      "🟢 Você já respondeu esta questão";
  } else {
    document.getElementById("statusQuestao").innerText =
      "⚪ Questão ainda não respondida";
  }

  let altHTML = "";

  for (let letra in q.alternativas) {
    altHTML += `
<div onclick="selecionar('${letra}', this)" class="alternativa">
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

  // REGISTRAR QUESTÃO RESPONDIDA
  if (!respondidas.includes(q.id)) {
    respondidas.push(q.id);

    localStorage.setItem("respondidas", JSON.stringify(respondidas));

    estatisticas.respondidas++;
  }

  if (respostaUsuario === q.correta) {
    estatisticas.acertos++;

    document.getElementById("resultado").innerText = "✅ Resposta correta";
  } else {
    estatisticas.erros++;

    document.getElementById("resultado").innerText = "❌ Resposta errada";
  }

  localStorage.setItem("estatisticas", JSON.stringify(estatisticas));

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

function atualizarGrafico() {
  let ctx = document.getElementById("graficoDesempenho");

  if (!ctx) return;

  if (window.grafico) {
    window.grafico.destroy();
  }

  window.grafico = new Chart(ctx, {
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
