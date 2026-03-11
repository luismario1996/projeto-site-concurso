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

function filtrarQuestoes() {
  let materia = document.getElementById("filtroMateria").value;
  let assunto = document.getElementById("filtroAssunto").value;
  let banca = document.getElementById("filtroBanca").value;
  let ano = document.getElementById("filtroAno").value;
  let revisao = document.getElementById("filtroRevisao").value;

  questoesFiltradas = questoes.filter((q) => {
    if (materia && q.materia !== materia) return false;
    if (assunto && q.assunto !== assunto) return false;
    if (banca && q.banca !== banca) return false;
    if (ano && q.ano != ano) return false;

    if (revisao === "erro" && respostas[q.id] !== "erro") return false;
    if (revisao === "acerto" && respostas[q.id] !== "acerto") return false;
    if (revisao === "nao" && respostas[q.id]) return false;
    if (revisao === "favorita" && !favoritas.includes(q.id)) return false;

    return true;
  });

  atual = 0;

  criarNavegacao();
  carregarQuestao();
}
