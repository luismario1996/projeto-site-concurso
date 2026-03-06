let usuario = "";
let materiaAtual = "";
let subtemaAtual = "";
let indice = 0;
let acertos = 0;
let erros = 0;
let questoesFeitas = {};

let bancoQuestoes = {}; // será preenchido via JSON

function entrar() {
  usuario = document.getElementById("nome").value;
  if (!usuario) return alert("Digite seu nome");
  document.getElementById("login").classList.add("hidden");
  abrirMenu();
}

function abrirMenu() {
  document.getElementById("menu").classList.remove("hidden");
  document.getElementById("bemvindo").innerText = "Bem-vindo, " + usuario;

  const container = document.getElementById("cardsMaterias");
  container.innerHTML = "";

  const materias = {
    portugues: "Língua Portuguesa",
    informatica: "Noções de Informática",
    "geografia-historia-manaus": "Geografia e História",
    direitoshumanos: "Direitos Humanos",
    direitoadministrativo: "Direito Administrativo",
    direitoconstitucional: "Direito Constitucional",
    direitopenal: "Direito Penal",
    direitoprocessual: "Direito Processual",
    legislacao: "Legislação",
  };

  for (let key in materias) {
    let card = document.createElement("div");
    card.classList.add("card");
    if (questoesFeitas[key]) card.classList.add("already-done");
    card.innerText = materias[key];
    card.onclick = () => abrirSubtemas(key);
    container.appendChild(card);
  }
}

async function abrirSubtemas(materia) {
  materiaAtual = materia;
  if (!bancoQuestoes[materia]) await carregarQuestoesJSON(materia);

  document.getElementById("menu").classList.add("hidden");
  document.getElementById("subtemas").classList.remove("hidden");

  let lista = document.getElementById("listaSubtemas");
  lista.innerHTML = "";

  document.getElementById("tituloSubtema").innerText = materia.toUpperCase();

  for (let sub in bancoQuestoes[materia]) {
    let card = document.createElement("div");
    card.classList.add("card");
    if (questoesFeitas[sub]) card.classList.add("already-done");
    card.innerText = sub;
    card.onclick = () => iniciarQuiz(sub);
    lista.appendChild(card);
  }
}

async function carregarQuestoesJSON(materia) {
  try {
    const resposta = await fetch(
      "questoes/" + materia + "/" + materia + ".json",
    );
    const dados = await resposta.json();
    bancoQuestoes[materia] = dados;
  } catch (erro) {
    console.error("Erro ao carregar JSON:", erro);
  }
}

function iniciarQuiz(sub) {
  if (!bancoQuestoes[materiaAtual][sub].length) {
    alert("Ainda não há questões neste subtema");
    return;
  }
  subtemaAtual = sub;
  indice = 0;
  acertos = 0;
  erros = 0;
  document.getElementById("subtemas").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  mostrarPergunta();
}

function mostrarPergunta() {
  let questao = bancoQuestoes[materiaAtual][subtemaAtual][indice];
  document.getElementById("pergunta").innerText = questao.pergunta;
  let divAlt = document.getElementById("alternativas");
  divAlt.innerHTML = "";

  document.getElementById("statusQuestao").innerText =
    `Questão ${indice + 1} de ${bancoQuestoes[materiaAtual][subtemaAtual].length}`;

  for (let letra in questao.alternativas) {
    let btn = document.createElement("button");
    btn.innerText = `${letra}) ${questao.alternativas[letra]}`;
    btn.onclick = () => verificar(btn, letra);
    divAlt.appendChild(btn);
  }
}

function verificar(botao, escolha) {
  let correta = bancoQuestoes[materiaAtual][subtemaAtual][indice].correta;
  document
    .querySelectorAll("#alternativas button")
    .forEach((b) => (b.disabled = true));

  if (escolha === correta) {
    botao.classList.add("correct");
    acertos++;
  } else {
    botao.classList.add("wrong");
    document.querySelectorAll("#alternativas button").forEach((b) => {
      if (b.innerText.startsWith(correta)) b.classList.add("correct");
    });
    erros++;
  }

  questoesFeitas[subtemaAtual] = true;
  document.getElementById("btnProxima").classList.remove("hidden");
}

function proxima() {
  indice++;
  document.getElementById("btnProxima").classList.add("hidden");
  if (indice < bancoQuestoes[materiaAtual][subtemaAtual].length)
    mostrarPergunta();
  else finalizar();
}

function voltarSubtema() {
  document.getElementById("quiz").classList.add("hidden");
  abrirSubtemas(materiaAtual);
}

function finalizar() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("resultado").classList.remove("hidden");
  document.getElementById("placar").innerText =
    `Acertos: ${acertos} | Erros: ${erros}`;

  new Chart(document.getElementById("grafico"), {
    type: "pie",
    data: {
      labels: ["Acertos", "Erros"],
      datasets: [
        {
          data: [acertos, erros],
          backgroundColor: ["#43a047", "#e53935"],
        },
      ],
    },
  });
}

function voltarMenu() {
  document.getElementById("resultado").classList.add("hidden");
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("subtemas").classList.add("hidden");
  abrirMenu();
}
