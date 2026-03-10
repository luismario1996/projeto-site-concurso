let respostas = JSON.parse(localStorage.getItem("respostas")) || {};

let respondidas = JSON.parse(localStorage.getItem("respondidas")) || [];

let estatisticas = JSON.parse(localStorage.getItem("estatisticas")) || {
  respondidas: 0,
  acertos: 0,
  erros: 0,
};

let questoes = [];
let questoesFiltradas = [];

let atual = 0;
let respostaUsuario = null;

function resetarEstatisticas() {
  localStorage.removeItem("estatisticas");

  localStorage.removeItem("respondidas");

  localStorage.removeItem("respostas");

  location.reload();
}

fetch("dados/questoes.json")
  .then((res) => res.json())
  .then((data) => {
    questoes = data.questoes;

    questoesFiltradas = questoes;

    carregarFiltros();
    criarNavegacao();

    carregarQuestao();
    mostrarEstatisticas();
    atualizarGrafico();
  });

function carregarFiltros() {
  let materias = new Set();
  let assuntos = new Set();
  let bancas = new Set();
  let anos = new Set();

  questoes.forEach((q) => {
    if (q.materia) materias.add(q.materia);
    if (q.assunto) assuntos.add(q.assunto);
    if (q.banca) bancas.add(q.banca);
    if (q.ano) anos.add(q.ano);
  });

  preencherSelect("filtroMateria", materias);
  preencherSelect("filtroAssunto", assuntos);
  preencherSelect("filtroBanca", bancas);
  preencherSelect("filtroAno", anos);
}

function preencherSelect(id, valores) {
  let select = document.getElementById(id);

  valores.forEach((valor) => {
    let option = document.createElement("option");

    option.value = valor;

    option.textContent = valor;

    select.appendChild(option);
  });
}

function carregarAssuntos() {
  let select = document.getElementById("filtroAssunto");

  if (!select) return;

  let assuntos = new Set();

  questoes.forEach((q) => {
    if (q.assunto) {
      assuntos.add(q.assunto);
    }
  });

  assuntos.forEach((assunto) => {
    let option = document.createElement("option");

    option.value = assunto;

    option.textContent = assunto;

    select.appendChild(option);
  });
}

function filtrarQuestoes() {
  let materia = document.getElementById("filtroMateria").value;
  let assunto = document.getElementById("filtroAssunto").value;
  let banca = document.getElementById("filtroBanca").value;
  let ano = document.getElementById("filtroAno").value;

  questoesFiltradas = questoes.filter((q) => {
    if (materia && q.materia !== materia) return false;

    if (assunto && q.assunto !== assunto) return false;

    if (banca && q.banca !== banca) return false;

    if (ano && q.ano != ano) return false;

    return true;
  });

  atual = 0;

  criarNavegacao();

  carregarQuestao();
}

function carregarQuestao() {
  let q = questoesFiltradas[atual];

  if (!q) return;

  document.getElementById("pergunta").innerText = q.pergunta;

  atualizarContador();

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
  if (respostaUsuario === null) {
    alert("Selecione uma alternativa");

    return;
  }

  let q = questoesFiltradas[atual];

  if (!q) return;

  // REGISTRAR QUESTÃO RESPONDIDA
  if (!respondidas.includes(q.id)) {
    respondidas.push(q.id);

    localStorage.setItem("respondidas", JSON.stringify(respondidas));

    estatisticas.respondidas++;
  }

  if (respostaUsuario === q.correta) {
    estatisticas.acertos++;

    respostas[q.id] = "acerto";

    document.getElementById("resultado").innerText = "✅ Resposta correta";
  } else {
    estatisticas.erros++;

    respostas[q.id] = "erro";

    document.getElementById("resultado").innerText = "❌ Resposta errada";
  }
  localStorage.setItem("respostas", JSON.stringify(respostas));

  localStorage.setItem("estatisticas", JSON.stringify(estatisticas));

  mostrarEstatisticas();
  atualizarGrafico();
  criarNavegacao();
}

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

function atualizarContador() {
  let total = questoesFiltradas.length;

  let numero = atual + 1;

  document.getElementById("contadorQuestoes").innerText =
    `Questão ${numero} de ${total}`;
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

    if (index === atual) {
      botao.style.border = "2px solid #000";
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
