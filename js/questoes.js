let respostas = JSON.parse(localStorage.getItem("respostas")) || {};
let favoritas = JSON.parse(localStorage.getItem("favoritas")) || [];
let respondidas = JSON.parse(localStorage.getItem("respondidas")) || [];

let estatisticas = JSON.parse(localStorage.getItem("estatisticas")) || {
  respondidas: 0,
  acertos: 0,
  erros: 0,
};

let questoes = [];
let questoesFiltradas = [];

const params = new URLSearchParams(window.location.search);
const assuntoURL = params.get("assunto");

let atual = 0;
let respostaUsuario = null;

fetch("./dados/questoes.json")
  .then((res) => res.json())
  .then((data) => {
    questoes = data.questoes || data;

    if (assuntoURL) {
      questoesFiltradas = questoes.filter(
        (q) => q.assunto.toLowerCase() === assuntoURL.toLowerCase(),
      );
    } else {
      questoesFiltradas = [...questoes];
    }

    carregarFiltros();
    criarNavegacao();
    carregarQuestao();
    atualizarGrafico();
  });

/* ============================= */
/* CARREGAR QUESTÃO */
/* ============================= */

function carregarQuestao() {
  let container = document.getElementById("listaQuestoes");
  container.innerHTML = "";

  questoesFiltradas.forEach((q, index) => {
    let div = document.createElement("div");
    div.className = "questao";

    let alternativasHTML = "";

    for (let letra in q.alternativas) {
      alternativasHTML += `
        <label class="alternativa">
          <input type="radio" name="q${q.id}" value="${letra}">
          ${letra.toUpperCase()}) ${q.alternativas[letra]}
        </label>
      `;
    }

    let textoAssociado = "";

    if (q.texto) {
      textoAssociado = `
  <div class="texto-associado-box">

    <button class="texto-associado-btn" onclick="toggleTexto(this)">
      Texto associado
      <span class="texto-icon">+</span>
    </button>

    <div class="texto-associado-conteudo" style="display:none;">
      <p>${q.texto}</p>
    </div>

  </div>
  `;
    }

    div.innerHTML = `
  <h3>Questão ${index + 1}</h3>

  ${textoAssociado}

  <p>${q.pergunta}</p>

  <div class="alternativas">
    ${alternativasHTML}
  </div>

  <button onclick="verificar(${q.id}, '${q.correta}')">
    Responder
  </button>

  <div id="resultado${q.id}" class="resultado"></div>

  <hr class="linha-acoes">

  <div class="acoes-questao">

    <button onclick="toggleEstatisticas(${q.id})">
      📊 Estatísticas
    </button>

    <button onclick="notificarErro(${q.id})">
      ⚠️ Notificar erro
    </button>

    <button onclick="toggleComentarios(${q.id})">
      💬 Comentários
    </button>

  </div>

  <div id="estatisticas${q.id}" class="painel-extra"></div>

  <div id="comentarios${q.id}" class="painel-extra"></div>
`;

    container.appendChild(div);
  });
}

/* ============================= */
/* VERIFICAR RESPOSTA */
/* ============================= */

function verificar(id, correta) {
  let selecionada = document.querySelector(`input[name="q${id}"]:checked`);

  if (!selecionada) {
    alert("Escolha uma alternativa");
    return;
  }

  let resposta = selecionada.value;

  let resultado = document.getElementById("resultado" + id);

  if (resposta === correta) {
    resultado.innerHTML = "✅ Correta";

    estatisticas.acertos++;
  } else {
    resultado.innerHTML = "❌ Errado. Correta: " + correta.toUpperCase();

    estatisticas.erros++;
  }

  estatisticas.respondidas++;

  localStorage.setItem("estatisticas", JSON.stringify(estatisticas));

  atualizarGrafico();
}

/* ============================= */
/* NAVEGAÇÃO */
/* ============================= */

function proxima() {
  if (atual < questoesFiltradas.length - 1) {
    atual++;
    carregarQuestao();
  }
}

function anterior() {
  if (atual > 0) {
    atual--;
    carregarQuestao();
  }
}

/* ============================= */
/* FAVORITAR */
/* ============================= */

function favoritarQuestao() {
  let id = questoesFiltradas[atual].id;

  if (!favoritas.includes(id)) {
    favoritas.push(id);
  } else {
    favoritas = favoritas.filter((f) => f !== id);
  }

  localStorage.setItem("favoritas", JSON.stringify(favoritas));

  alert("Favorito atualizado ⭐");
}

/* ============================= */
/* NAVEGAÇÃO RÁPIDA */
/* ============================= */

function criarNavegacao() {
  let nav = document.getElementById("navegacaoQuestoes");
  nav.innerHTML = "";

  questoesFiltradas.forEach((q, index) => {
    let btn = document.createElement("button");

    btn.innerText = index + 1;

    btn.onclick = () => {
      atual = index;
      carregarQuestao();
    };

    nav.appendChild(btn);
  });
}

function toggleEstatisticas(id) {
  let div = document.getElementById("estatisticas" + id);

  if (div.innerHTML !== "") {
    div.innerHTML = "";
    return;
  }

  div.innerHTML = `
    <p>📊 Total respondidas: ${estatisticas.respondidas}</p>
    <p>✅ Acertos: ${estatisticas.acertos}</p>
    <p>❌ Erros: ${estatisticas.erros}</p>
  `;
}

function notificarErro(id) {
  alert("Obrigado! O erro da questão " + id + " foi reportado.");
}

function toggleComentarios(id) {
  let div = document.getElementById("comentarios" + id);

  if (div.innerHTML !== "") {
    div.innerHTML = "";
    return;
  }

  let comentarios = JSON.parse(localStorage.getItem("comentarios_" + id)) || [];

  let lista = comentarios.map((c) => `<p>💬 ${c}</p>`).join("");

  div.innerHTML = `
    <div class="comentarios-box">

      ${lista}

      <textarea id="novoComentario${id}" placeholder="Escreva um comentário"></textarea>

      <button onclick="enviarComentario(${id})">
        Enviar comentário
      </button>

    </div>
  `;
}

function enviarComentario(id) {
  let textarea = document.getElementById("novoComentario" + id);

  if (!textarea.value.trim()) return;

  let comentarios = JSON.parse(localStorage.getItem("comentarios_" + id)) || [];

  comentarios.push(textarea.value);

  localStorage.setItem("comentarios_" + id, JSON.stringify(comentarios));

  toggleComentarios(id);
  toggleComentarios(id);
}

function toggleTexto(btn) {
  const box = btn.parentElement;
  const conteudo = box.querySelector(".texto-associado-conteudo");
  const icon = btn.querySelector(".texto-icon");

  if (conteudo.style.display === "block") {
    conteudo.style.display = "none";
    icon.textContent = "+";
  } else {
    conteudo.style.display = "block";
    icon.textContent = "-";
  }
}
