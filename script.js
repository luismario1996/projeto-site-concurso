let usuario = "";
let materiaAtual = "";
let subtemaAtual = "";
let indice = 0;
let acertos = 0;
let erros = 0;

/* ================= BANCO DE QUESTÕES ================= */

const bancoQuestoes = {
  /* ================= LÍNGUA PORTUGUESA ================= */
  portugues: {},
  /* ================= INFORMÁTICA ================= */
  informatica: {},
  /* ================= GEOGRAFIA E HISTÓRIA ================= */
  geografia: {},
  /* ================= DIREITOS HUMANOS ================= */
  direitoshumanos: {},
  /* ================= DIREITO ADMINISTRATIVO ================= */
  direitoadministrativo: {},
  /* ================= DIREITO CONSTITUCIONAL ================= */
  direitoconstitucional: {},
  /* ================= DIREITO PENAL ================= */
  direitopenal: {},
  /* ================= DIREITO PROCESSUAL PENAL ================= */
  processualpenal: {},
  /* ================= LEGISLAÇÃO ================= */
  legislacao: {},
};
/* ================= SISTEMA ================= */
function entrar() {
  usuario = document.getElementById("nome").value;
  if (usuario === "") return alert("Digite seu nome");
  document.getElementById("login").classList.add("hidden");
  document.getElementById("menu").classList.remove("hidden");
  document.getElementById("bemvindo").innerText = "Bem-vindo, " + usuario;
}

async function abrirSubtemas(materia) {
  await carregarQuestoesJSON(materia);
  materiaAtual = materia;
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("subtemas").classList.remove("hidden");

  let lista = document.getElementById("listaSubtemas");
  lista.innerHTML = "";

  let titulo = "";
  if (materia === "portugues") titulo = "Língua Portuguesa";
  if (materia === "informatica") titulo = "Noções de Informática";
  if (materia === "geografia") titulo = "Geografia e História de Manaus";
  if (materia === "direito") titulo = "Noções de Direito";

  document.getElementById("tituloSubtema").innerText = titulo;

  for (let sub in bancoQuestoes[materia]) {
    let btn = document.createElement("button");
    btn.innerText = sub;
    btn.onclick = () => iniciarQuiz(sub);
    lista.appendChild(btn);
  }
}

function iniciarQuiz(sub) {
  if (bancoQuestoes[materiaAtual][sub].length === 0) {
    alert("Ainda não há questões cadastradas neste subtema.");
    return;
  }
  subtemaAtual = sub;
  indice = 0;
  acertos = 0;
  erros = 0;

  document.getElementById("subtemas").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  document.getElementById("tituloQuiz").innerText = sub;
  mostrarPergunta();
}

function mostrarPergunta() {
  let questao = bancoQuestoes[materiaAtual][subtemaAtual][indice];
  document.getElementById("pergunta").innerText = questao.pergunta;
  let divAlt = document.getElementById("alternativas");
  divAlt.innerHTML = "";

  for (let letra of ["A", "B", "C", "D", "E"]) {
    let btn = document.createElement("button");
    btn.innerText = letra + ") " + questao.alternativas[letra];
    btn.onclick = () => verificar(btn, letra);
    divAlt.appendChild(btn);
  }
}

function verificar(botao, escolha) {
  let correta = bancoQuestoes[materiaAtual][subtemaAtual][indice].correta;
  let botoes = document.querySelectorAll("#alternativas button");
  botoes.forEach((b) => (b.disabled = true));

  if (escolha === correta) {
    botao.classList.add("correct");
    acertos++;
  } else {
    botao.classList.add("wrong");
    botoes.forEach((b) => {
      if (b.innerText.startsWith(correta)) b.classList.add("correct");
    });
    erros++;
  }

  document.getElementById("btnProxima").classList.remove("hidden");
}

function proxima() {
  indice++;
  document.getElementById("btnProxima").classList.add("hidden");
  if (indice < bancoQuestoes[materiaAtual][subtemaAtual].length) {
    mostrarPergunta();
  } else {
    finalizar();
  }
}

function finalizar() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("resultado").classList.remove("hidden");
  document.getElementById("placar").innerText =
    "Acertos: " + acertos + " | Erros: " + erros;

  new Chart(document.getElementById("grafico"), {
    type: "pie",
    data: {
      labels: ["Acertos", "Erros"],
      datasets: [{ data: [acertos, erros] }],
    },
  });
}

function voltarMenu() {
  document.getElementById("resultado").classList.add("hidden");
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("subtemas").classList.add("hidden");
  document.getElementById("menu").classList.remove("hidden");
}

async function carregarQuestoesJSON(materia) {
  try {
    const resposta = await fetch("questoes/" + materia + ".json");
    const dados = await resposta.json();

    bancoQuestoes[materia] = dados;

    console.log("Questões carregadas:", bancoQuestoes[materia]);
  } catch (erro) {
    console.error("Erro ao carregar JSON:", erro);
  }
}
